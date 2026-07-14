import React from 'react';

export default function StockTable({ products, isAdmin, onAdjust, onTransfer }) {

  if (!products.length) {
    return <h3>No Stock Found</h3>;
  }

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
        {products.map(stock => (
          <tr key={stock._id}>
            <td>{stock.product?.name}</td>
            <td>{stock.product?.sku}</td>
            <td>{stock.store?.name}</td>
            <td>{stock.quantity}</td>
            {isAdmin && (
              <td>
                <button onClick={() => onAdjust(stock)}>
                  Adjust
                </button>
                <button onClick={() => onTransfer(stock)}>
                  Transfer
                </button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}