import { useState } from "react";

type AdminProduct = {
  id: string;
  name: string;
  price: number;
  stock_qty: number;
};

type OrderItem = {
  name: string;
  qty: number;
  price: number;
};

type AdminOrder = {
  id: number;
  customer_name: string;
  customer_email: string;
  address: string;
  total: number;
  status: string;
  created_at: string;
  items: OrderItem[];
};

const STATUS_COLORS: Record<string, string> = {
  pending: "#c0392b",
  paid: "#2980b9",
  shipped: "#8e44ad",
  delivered: "#27ae60",
};

export default function Admin() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [authError, setAuthError] = useState("");
  const [tab, setTab] = useState<"products" | "orders">("products");
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState<string | null>(null);
  const [edits, setEdits] = useState<Record<string, Partial<AdminProduct>>>({});
  const [orderStatuses, setOrderStatuses] = useState<Record<number, string>>({});
  const [flash, setFlash] = useState("");

  const headers = {
    "Content-Type": "application/json",
    "x-admin-password": password,
  };

  const showFlash = (msg: string) => {
    setFlash(msg);
    setTimeout(() => setFlash(""), 2200);
  };

  const login = async () => {
    if (!password) return;
    setLoading(true);
    setAuthError("");
    try {
      const res = await fetch("/api/admin-products", {
        headers: { "x-admin-password": password },
      });
      if (res.status === 401) {
        setAuthError("Wrong password.");
        return;
      }
      setProducts(await res.json());
      setAuthed(true);
    } catch {
      setAuthError("Connection error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const loadOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin-orders", { headers });
      const data: AdminOrder[] = await res.json();
      setOrders(data);
      const statuses: Record<number, string> = {};
      data.forEach((o) => { statuses[o.id] = o.status; });
      setOrderStatuses(statuses);
    } finally {
      setLoading(false);
    }
  };

  const switchTab = (t: "products" | "orders") => {
    setTab(t);
    if (t === "orders" && orders.length === 0) loadOrders();
  };

  const setEdit = (id: string, field: keyof AdminProduct, value: number) => {
    setEdits((prev) => ({ ...prev, [id]: { ...prev[id], [field]: value } }));
  };

  const saveProduct = async (id: string) => {
    const patch = edits[id];
    if (!patch) return;
    setSaving(id);
    try {
      const res = await fetch("/api/admin-products", {
        method: "PATCH",
        headers,
        body: JSON.stringify({ id, ...patch }),
      });
      const updated: AdminProduct = await res.json();
      setProducts((prev) => prev.map((p) => (p.id === id ? updated : p)));
      setEdits((prev) => {
        const next = { ...prev };
        delete next[id];
        return next;
      });
      showFlash("Saved");
    } finally {
      setSaving(null);
    }
  };

  const saveOrderStatus = async (id: number) => {
    setSaving(`order-${id}`);
    try {
      await fetch("/api/admin-orders", {
        method: "PATCH",
        headers,
        body: JSON.stringify({ id, status: orderStatuses[id] }),
      });
      setOrders((prev) =>
        prev.map((o) => (o.id === id ? { ...o, status: orderStatuses[id] } : o))
      );
      showFlash("Updated");
    } finally {
      setSaving(null);
    }
  };

  if (!authed) {
    return (
      <div className="admin-login">
        <div className="admin-login-card">
          <p className="admin-brand">SHEA TALES</p>
          <p className="admin-login-label">Admin Access</p>
          <input
            type="password"
            className="admin-login-input"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && login()}
            autoFocus
          />
          {authError && <p className="admin-auth-error">{authError}</p>}
          <button className="admin-login-btn" onClick={login} disabled={loading}>
            {loading ? "Checking…" : "Enter"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-wrap">
      <header className="admin-header">
        <span className="admin-header-brand">Shea Tales — Admin</span>
        {flash && <span className="admin-flash">{flash}</span>}
        <button className="admin-logout" onClick={() => setAuthed(false)}>Logout</button>
      </header>

      <div className="admin-tabs">
        <button
          className={`admin-tab ${tab === "products" ? "active" : ""}`}
          onClick={() => switchTab("products")}
        >
          Products
        </button>
        <button
          className={`admin-tab ${tab === "orders" ? "active" : ""}`}
          onClick={() => switchTab("orders")}
        >
          Orders
        </button>
      </div>

      {/* ── Products ── */}
      {tab === "products" && (
        <div className="admin-section">
          <p className="admin-section-hint">
            Edit stock or price inline, then click Save. Changes apply live on the shop.
          </p>
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price ($)</th>
                  <th>Stock (qty)</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => {
                  const edit = edits[p.id] ?? {};
                  const isDirty = !!edits[p.id];
                  const stockVal = edit.stock_qty ?? p.stock_qty;
                  return (
                    <tr key={p.id} className={isDirty ? "admin-row-dirty" : ""}>
                      <td className="admin-product-name">{p.name}</td>
                      <td>
                        <input
                          type="number"
                          step="0.01"
                          min="0"
                          className="admin-input"
                          value={edit.price ?? p.price}
                          onChange={(e) =>
                            setEdit(p.id, "price", parseFloat(e.target.value))
                          }
                        />
                      </td>
                      <td>
                        <div className="admin-stock-cell">
                          <button
                            className="admin-stock-btn"
                            onClick={() =>
                              setEdit(p.id, "stock_qty", Math.max(0, Number(stockVal) - 1))
                            }
                          >
                            −
                          </button>
                          <input
                            type="number"
                            min="0"
                            className="admin-input admin-input-stock"
                            value={stockVal}
                            onChange={(e) =>
                              setEdit(p.id, "stock_qty", parseInt(e.target.value) || 0)
                            }
                          />
                          <button
                            className="admin-stock-btn"
                            onClick={() =>
                              setEdit(p.id, "stock_qty", Number(stockVal) + 1)
                            }
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td>
                        <button
                          className="admin-save-btn"
                          onClick={() => saveProduct(p.id)}
                          disabled={!isDirty || saving === p.id}
                        >
                          {saving === p.id ? "…" : "Save"}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── Orders ── */}
      {tab === "orders" && (
        <div className="admin-section">
          {loading ? (
            <p className="admin-loading">Loading orders…</p>
          ) : orders.length === 0 ? (
            <p className="admin-empty">No orders yet.</p>
          ) : (
            <div className="admin-table-wrap">
              <table className="admin-table admin-orders-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Customer</th>
                    <th>Email</th>
                    <th>Items</th>
                    <th>Total</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((o) => {
                    const currentStatus = orderStatuses[o.id] ?? o.status;
                    return (
                      <tr key={o.id}>
                        <td className="admin-order-id">#{o.id}</td>
                        <td>{o.customer_name}</td>
                        <td className="admin-cell-sm">{o.customer_email}</td>
                        <td className="admin-cell-sm admin-items-cell">
                          {o.items?.map((item, i) => (
                            <span key={i}>
                              {item.name} ×{item.qty}
                              {i < o.items.length - 1 ? ", " : ""}
                            </span>
                          ))}
                        </td>
                        <td>${Number(o.total).toFixed(2)}</td>
                        <td className="admin-cell-sm">
                          {new Date(o.created_at).toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </td>
                        <td>
                          <select
                            className="admin-status-select"
                            value={currentStatus}
                            style={{ color: STATUS_COLORS[currentStatus] ?? "#111" }}
                            onChange={(e) =>
                              setOrderStatuses((prev) => ({
                                ...prev,
                                [o.id]: e.target.value,
                              }))
                            }
                          >
                            <option value="pending">Pending</option>
                            <option value="paid">Paid</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                          </select>
                        </td>
                        <td>
                          <button
                            className="admin-save-btn"
                            onClick={() => saveOrderStatus(o.id)}
                            disabled={
                              saving === `order-${o.id}` ||
                              currentStatus === o.status
                            }
                          >
                            {saving === `order-${o.id}` ? "…" : "Update"}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
