import React from 'react';

export default function Metrics({ products, quantity }) {
  const totalProducts = products * quantity
  const totalValue = products.reduce((soma, item) => soma + (item.price * item.quantity), 0);
  const criticalStock = products.filter(p => p.quantity <= (p.min_stock || 0)).length;

  return (
    <div className="metrics-grid">
      <div className="form-container">
        <p className="metric-card-title">Total de Produtos</p>
        <p className="metric-card-value value-total">{totalProducts}</p>
      </div>
      
      <div className="form-container">
        <p className="metric-card-title">Valor em Estoque</p>
        <p className="metric-card-value value-success">R$ {totalValue.toFixed(2)}</p>
      </div>
      
      <div className="form-container">
        <p className="metric-card-title">Estoque Crítico</p>
        <p className="metric-card-value value-danger">{criticalStock}</p>
      </div>
    </div>
  );
}