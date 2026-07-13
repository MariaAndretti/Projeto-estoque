import React, { useState } from 'react';

export default function Products({ products, setProducts, categories, addLog }) {
  const [form, setForm] = useState({ id: null, name: '', description: '', price: '', quantity: '', min_stock: '', category_id: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.price || form.quantity === '' || !form.category_id) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }

    if (form.id) {
      setProducts(products.map(p => p.id === form.id ? { 
        ...form, 
        price: parseFloat(form.price), 
        quantity: parseInt(form.quantity), 
        min_stock: form.min_stock ? parseInt(form.min_stock) : 0,
        category_id: parseInt(form.category_id)
      } : p));
      addLog('UPDATE', 'Product', form.id);
    } else {
      const newId = Date.now();
      setProducts([...products, { 
        ...form, 
        id: newId, 
        price: parseFloat(form.price), 
        quantity: parseInt(form.quantity), 
        min_stock: form.min_stock ? parseInt(form.min_stock) : 0,
        category_id: parseInt(form.category_id)
      }]);
      addLog('CREATE', 'Product', newId);
    }
    setForm({ id: null, name: '', description: '', price: '', quantity: '', min_stock: '', category_id: '' });
  };

  const handleDelete = (id) => {
    if (confirm("Deseja realmente deletar?")) {
      setProducts(products.filter(p => p.id !== id));
      addLog('DELETE', 'Product', id);
    }

  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-grid">
          <div className="form-group">
            <label>Nome do Produto *</label>
            <input type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="form-input" placeholder="Ex: Iphone" />
          </div>
          <div className="form-group">
            <label>Descrição</label>
            <input type="text" value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="form-input" placeholder="Ex: 17 Pro Max" />
          </div>
          <div className="form-group">
            <label>Preço (R$) *</label>
            <input type="number" step="0.01" value={form.price} onChange={e => setForm({...form, price: e.target.value})} className="form-input" placeholder="0.00" />
          </div>
          <div className="form-group">
            <label>Quantidade *</label>
            <input type="number" value={form.quantity} onChange={e => setForm({...form, quantity: e.target.value})} className="form-input" placeholder="0" disabled={!!form.id} />
          </div>
          <div className="form-group">
            <label>Estoque Mínimo</label>
            <input type="number" value={form.min_stock} onChange={e => setForm({...form, min_stock: e.target.value})} className="form-input" placeholder="0" />
          </div>
          <div className="form-group">
            <label>Categoria *</label>
            <select value={form.category_id} onChange={e => setForm({...form, category_id: e.target.value})} className="form-select">
              <option value="">Selecione...</option>
              {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
        </div>
        <div className="btn-container">
          {form.id && <button type="button" onClick={() => setForm({ id: null, name: '', description: '', price: '', quantity: '', min_stock: '', category_id: '' })} className="btn btn-secondary">Cancelar</button>}
          <button type="submit" className="btn btn-primary">{form.id ? 'Salvar' : 'Cadastrar'}</button>
        </div>
      </form>

      <div className="table-container">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Categoria</th>
              <th>Preço</th>
              <th>Qtd Disponível</th>
              <th className="text-right">Ações</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => {
              const cat = categories.find(c => c.id === parseInt(p.category_id));
              const isCritical = p.quantity <= (p.min_stock || 0);
              return (
                <tr key={p.id}>
                  <td className="text-semibold">{p.name}</td>
                  <td className="text-muted">{cat ? cat.name : 'Não categorizado'}</td>
                  <td>R$ {p.price.toFixed(2)}</td>
                  <td>
                    <span className="badge" style={{ backgroundColor: isCritical ? '#fee2e2' : '#d1fae5', color: isCritical ? '#991b1b' : '#065f46' }}>
                      {p.quantity} un (Mín: {p.min_stock || 0})
                    </span>
                  </td>
                  <td className="text-right">
                    <button onClick={() => setForm(p)} className="btn-table-edit">Editar</button>
                    <button onClick={() => handleDelete(p.id)} className="btn-table-delete">Deletar</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}