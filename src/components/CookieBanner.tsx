import { useState, useEffect } from "react";
import { X } from "lucide-react";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("shea-cookies")) setVisible(true);
  }, []);

  const accept = () => { localStorage.setItem("shea-cookies", "accepted"); setVisible(false); };
  const decline = () => { localStorage.setItem("shea-cookies", "declined"); setVisible(false); };

  if (!visible) return null;

  return (
    <div className="cookie-banner" role="dialog" aria-label="Cookie consent">
      <div className="cookie-content">
        <p>
          We use cookies to improve your experience and analyse site performance.
          See our <a href="/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a> for details.
        </p>
        <div className="cookie-actions">
          <button className="cookie-accept" onClick={accept}>Accept</button>
          <button className="cookie-decline" onClick={decline}>Decline</button>
        </div>
      </div>
      <button className="cookie-close" onClick={decline} aria-label="Close">
        <X size={16} />
      </button>
    </div>
  );
}
