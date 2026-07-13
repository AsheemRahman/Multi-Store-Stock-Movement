import React, { useCallback, useEffect, useState } from 'react';
import { api } from '../api.js';
import { useAuth } from '../context/AuthContext.jsx';
import ProductForm from '../components/ProductForm.jsx';
import StoreForm from '../components/StoreForm.jsx';
import StockTable from '../components/StockTable.jsx';
import AdjustModal from '../components/AdjustModal.jsx';
import TransferModal from '../components/TransferModal.jsx';

export default function Dashboard() {
  const { auth, logout } = useAuth();
  const isAdmin = auth.user.role === 'admin';

  const [products, setProducts] = useState([]);
  const [stores, setStores] = useState([]);
  const [error, setError] = useState('');
  const [threshold, setThreshold] = useState('');
  const [adjustTarget, setAdjustTarget] = useState(null);
  const [transferTarget, setTransferTarget] = useState(null);

  const refresh = useCallback(async () => {
    setError('');
    try {
      const [p, s] = await Promise.all([
        api.listProducts(auth.token),
        api.listStores(auth.token),
      ]);
      setProducts(p);
      setStores(s);
    } catch (err) {
      setError(err.message);
    }
  }, [auth.token]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return (
    <div className="dashboard">
      <header>
        <h1>Multi-Store Stock</h1>
        <div>
          <span className="badge">{auth.user.email} ({auth.user.role})</span>
          <button onClick={logout}>Log out</button>
        </div>
      </header>

      {error && <p className="error">{error}</p>}

      {isAdmin && (
        <section className="admin-panel">
          <div>
            <h3>Create product</h3>
            <ProductForm onCreate={async (name, sku) => {
              await api.createProduct(auth.token, { name, sku });
              await refresh();
            }} />
          </div>
          <div>
            <h3>Create store</h3>
            <StoreForm onCreate={async (name) => {
              await api.createStore(auth.token, { name });
              await refresh();
            }} />
          </div>
        </section>
      )}

      <section className="filter-bar">
        <label>
          Low-stock threshold
          <input
            type="number"
            placeholder="e.g. 5"
            value={threshold}
            onChange={(e) => setThreshold(e.target.value)}
          />
        </label>
      </section>

      <StockTable
        products={products}
        isAdmin={isAdmin}
        lowStockThreshold={threshold}
        onAdjust={setAdjustTarget}
        onTransfer={setTransferTarget}
      />

      {adjustTarget && (
        <AdjustModal
          product={adjustTarget}
          stores={stores}
          onClose={() => setAdjustTarget(null)}
          onSubmit={async (payload) => {
            await api.adjustStock(auth.token, payload);
            await refresh();
          }}
        />
      )}

      {transferTarget && (
        <TransferModal
          product={transferTarget}
          stores={stores}
          onClose={() => setTransferTarget(null)}
          onSubmit={async (payload) => {
            await api.transferStock(auth.token, payload);
            await refresh();
          }}
        />
      )}
    </div>
  );
}
