import React, { useState } from 'react';

export default function AdjustModal({ product, stores, onClose, onSubmit }) {
  const [storeId, setStoreId] = useState(stores[0]?._id || '');
  const [delta, setDelta] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      await onSubmit({ productId: product._id, storeId, delta: Number(delta) });
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>Adjust stock — {product.name}</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Store
            <select value={storeId} onChange={(e) => setStoreId(e.target.value)}>
              {stores.map((s) => (
                <option key={s._id} value={s._id}>{s.name}</option>
              ))}
            </select>
          </label>
          <label>
            Delta (use a negative number to correct down)
            <input type="number" value={delta} onChange={(e) => setDelta(e.target.value)} required />
          </label>
          {error && <p className="error">{error}</p>}
          <div className="modal-actions">
            <button type="button" onClick={onClose}>Cancel</button>
            <button type="submit" disabled={busy}>Apply</button>
          </div>
        </form>
      </div>
    </div>
  );
}
