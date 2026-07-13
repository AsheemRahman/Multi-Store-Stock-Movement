import React, { useState } from 'react';

export default function ProductForm({ onCreate }) {
  const [name, setName] = useState('');
  const [sku, setSku] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      await onCreate(name, sku);
      setName('');
      setSku('');
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <form className="inline-form" onSubmit={handleSubmit}>
      <input placeholder="Product name" value={name} onChange={(e) => setName(e.target.value)} required />
      <input placeholder="SKU" value={sku} onChange={(e) => setSku(e.target.value)} required />
      <button type="submit" disabled={busy}>Add product</button>
      {error && <span className="error">{error}</span>}
    </form>
  );
}
