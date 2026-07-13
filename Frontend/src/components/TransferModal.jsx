import React, { useState } from 'react';

export default function TransferModal({ product, stores, onClose, onSubmit }) {
  const [fromStoreId, setFromStoreId] = useState(stores[0]?._id || '');
  const [toStoreId, setToStoreId] = useState(stores[1]?._id || stores[0]?._id || '');
  const [quantity, setQuantity] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      await onSubmit({
        productId: product._id,
        fromStoreId,
        toStoreId,
        quantity: Number(quantity),
      });
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
        <h2>Transfer stock — {product.name}</h2>
        <form onSubmit={handleSubmit}>
          <label>
            From store
            <select value={fromStoreId} onChange={(e) => setFromStoreId(e.target.value)}>
              {stores.map((s) => (
                <option key={s._id} value={s._id}>{s.name}</option>
              ))}
            </select>
          </label>
          <label>
            To store
            <select value={toStoreId} onChange={(e) => setToStoreId(e.target.value)}>
              {stores.map((s) => (
                <option key={s._id} value={s._id}>{s.name}</option>
              ))}
            </select>
          </label>
          <label>
            Quantity
            <input type="number" min="1" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
          </label>
          {error && <p className="error">{error}</p>}
          <div className="modal-actions">
            <button type="button" onClick={onClose}>Cancel</button>
            <button type="submit" disabled={busy}>Transfer</button>
          </div>
        </form>
      </div>
    </div>
  );
}
