import React from 'react';

export default function StockTable({ products, isAdmin, onAdjust, onTransfer, lowStockThreshold }) {
  return (
    <table className="stock-table">
      <thead>
        <tr>
          <th>Product</th>
          <th>SKU</th>
          <th>Store</th>
          <th>Quantity</th>
          {isAdmin && <th>Actions</th>}
        </tr>
      </thead>
      <tbody>
        {products.flatMap((p) =>
          p.stock.map((entry) => {
            const storeName = entry.store?.name || entry.store;
            const low =
              lowStockThreshold !== '' &&
              lowStockThreshold !== undefined &&
              entry.quantity <= Number(lowStockThreshold);
            return (
              <tr key={`${p._id}-${entry.store?._id || entry.store}`} className={low ? 'low-stock' : ''}>
                <td>{p.name}</td>
                <td>{p.sku}</td>
                <td>{storeName}</td>
                <td>{entry.quantity}</td>
                {isAdmin && (
                  <td className="row-actions">
                    <button onClick={() => onAdjust(p)}>Adjust</button>
                    <button onClick={() => onTransfer(p)}>Transfer</button>
                  </td>
                )}
              </tr>
            );
          })
        )}
      </tbody>
    </table>
  );
}
