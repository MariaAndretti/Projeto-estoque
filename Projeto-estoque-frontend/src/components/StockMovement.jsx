import React, { useState } from 'react';

export default function StockMovement({ products, setProducts, addLog }) {
  const [productId, setProductId] = useState('');
  const [type, setType] = useState('entrada');
  const [quantity, setQuantity] = useState('');

  const handleMovement = (e) => {
    e.preventDefault();
    const qty = parseInt(quantity);
    if (!productId || !qty || qty <= 0) return alert('Campos inválidos.');

    const product = products.find(p => p.id === parseInt(productId));
    if (!product) return alert('Produto não encontrado.');

    if (type === 'saída' && product.quantity < qty) {
      alert('Erro: Estoque insuficiente.');
      return;
    }

    const newQuantity = type === 'entrada' ? product.quantity + qty : product.quantity - qty;
    setProducts(products.map(p => p.id === product.id ? { ...p, quantity: newQuantity } : p));
    addLog(type.toUpperCase(), 'Stock Movement', product.id);
    
    alert(`Movimentação de ${type} realizada!`);
    setQuantity('');
  };

  return (
    <div className="form-container form-container.narrow">
      <form onSubmit={handleMovement} className="form-vertical-stack">
        <div className="form-group">
          <label>Selecione o Produto</label>
          <select value={productId} onChange={e => setProductId(e.target.value)} className="form-select">
            <option value="">Escolha um item...</option>
            {products.map(p => <option key={p.id} value={p.id}>{p.name} (Atual: {p.quantity} un)</option>)}
          </select>
        </div>

        <div className="form-group">
          <label>Tipo de Fluxo</label>
          <div className="form-radio-group">
            <label className="form-radio-label">
              <input type="radio" value="entrada" checked={type === 'entrada'} onChange={() => setType('entrada')} /> Entrada
            </label>
            <label className="form-radio-label">
              <input type="radio" value="saída" checked={type === 'saída'} onChange={() => setType('saída')} /> Saída
            </label>
          </div>
        </div>

        <div className="form-group">
          <label>Quantidade</label>
          <input type="number" min="1" value={quantity} onChange={e => setQuantity(e.target.value)} className="form-input" placeholder="Ex: 5" />
        </div>

        <button type="submit" className="btn btn-primary btn-full">
          Lançar Movimentação
        </button>
      </form>
    </div>
  );
}