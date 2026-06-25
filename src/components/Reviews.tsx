import { useEffect, useState } from "react";
import { Star } from "lucide-react";

type Review = { id: number; reviewer_name: string; rating: number; body: string; created_at: string };

type Props = { productId: string };

function Stars({ rating, interactive = false, onChange }: { rating: number; interactive?: boolean; onChange?: (r: number) => void }) {
  const [hover, setHover] = useState(0);
  return (
    <div className="stars" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          size={18}
          className={`star${(interactive ? hover || rating : rating) >= n ? " filled" : ""}`}
          onClick={() => interactive && onChange?.(n)}
          onMouseEnter={() => interactive && setHover(n)}
          onMouseLeave={() => interactive && setHover(0)}
          style={interactive ? { cursor: "pointer" } : undefined}
        />
      ))}
    </div>
  );
}

export default function Reviews({ productId }: Props) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", rating: 0, body: "" });
  const [formError, setFormError] = useState("");

  useEffect(() => {
    fetch(`/api/reviews?productId=${productId}`)
      .then((r) => r.json())
      .then((data) => { if (Array.isArray(data)) setReviews(data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [productId]);

  const submit = async () => {
    if (!form.name || !form.email || !form.rating || !form.body) { setFormError("Please fill in all fields and select a rating."); return; }
    if (form.body.length < 10) { setFormError("Please write at least a short review."); return; }
    setFormError("");
    setSubmitting(true);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, name: form.name, email: form.email, rating: form.rating, body: form.body }),
      });
      if (!res.ok) { const d = await res.json(); setFormError(d.error ?? "Something went wrong."); return; }
      const newReview = await res.json();
      setReviews((prev) => [newReview, ...prev]);
      setSubmitted(true);
      setShowForm(false);
    } catch { setFormError("Connection error. Please try again."); }
    finally { setSubmitting(false); }
  };

  const avg = reviews.length ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length : 0;

  return (
    <div className="reviews-wrap">
      <div className="reviews-head">
        <div className="reviews-summary">
          <h3>Customer Reviews</h3>
          {reviews.length > 0 && (
            <div className="reviews-avg">
              <Stars rating={Math.round(avg)} />
              <span>{avg.toFixed(1)} · {reviews.length} review{reviews.length !== 1 ? "s" : ""}</span>
            </div>
          )}
        </div>
        {!submitted && (
          <button className="review-write-btn" onClick={() => setShowForm((s) => !s)}>
            {showForm ? "Cancel" : "Write a review"}
          </button>
        )}
      </div>

      {submitted && <p className="review-thanks">Thank you for your review — it means a lot to us.</p>}

      {showForm && (
        <div className="review-form">
          <Stars rating={form.rating} interactive onChange={(r) => setForm((f) => ({ ...f, rating: r }))} />
          <input placeholder="Your name" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} className="review-input" />
          <input placeholder="Email (not published)" type="email" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} className="review-input" />
          <textarea placeholder="Share your experience with this product…" value={form.body} onChange={(e) => setForm((f) => ({ ...f, body: e.target.value }))} className="review-textarea" rows={4} />
          {formError && <p className="review-error">{formError}</p>}
          <button className="review-submit-btn" onClick={submit} disabled={submitting}>
            {submitting ? "Submitting…" : "Submit Review"}
          </button>
        </div>
      )}

      {loading ? (
        <p className="reviews-loading">Loading reviews…</p>
      ) : reviews.length === 0 ? (
        <p className="reviews-empty">No reviews yet — be the first to share your experience.</p>
      ) : (
        <div className="reviews-list">
          {reviews.map((r) => (
            <div className="review-item" key={r.id}>
              <div className="review-item-head">
                <Stars rating={r.rating} />
                <span className="review-author">{r.reviewer_name}</span>
                <span className="review-date">{new Date(r.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</span>
              </div>
              <p className="review-body">{r.body}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
