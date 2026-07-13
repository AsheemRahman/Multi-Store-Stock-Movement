import React, { useState } from 'react';

export default function StoreForm({ onCreate }) {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      await onCreate(name);
      setName('');
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <form className="inline-form" onSubmit={handleSubmit}>
      <input
        placeholder="New store name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <button type="submit" disabled={busy}>Add store</button>
      {error && <span className="error">{error}</span>}
    </form>
  );
}
