import React, { useState } from 'react';
import api from "../services/api"

export default function Products({ products, setproducts, addLog }) {
  const [form, setForm] = useState({ id: null, name: '', description: '', price: '', quantity: '', min_stock: '', category_id:'' });
  
  const carregarProducts= async () => {
    try {
      const response = await api.get("/products");
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!form.name || form.price || form.quantity || form.category_id) {
      alert("Preencha os dados obrigatórios");
      return;
    }
    
    try {
      if (form.id) {
        await api.put(`/products/${form.id}`, {
          name: form.name,
          description: form.description,
          price: form.price,
          quantity: form.quantity,
          min_stock: form.min_stock,
          category_id: form.category_id
          
        });
        
        addLog('UPDATE', 'Products', form.id);
        alert("Produto atualizado com sucesso");
        
      } else {
        const response = await api.post("/products", {
          name: form.name,
          description: form.description,
          price: form.price,
          quantity: form.quantity,
          min_stock: form.min_stock,
          category_id: form.category_id
          
        });
        
        addLog('CREATE', 'Products', response.data.id);
        alert("Produto registrado com sucesso");
      }
      
      await carregarCategorias();
      
      setForm({
        id: null,
        name: form.name,
        description: form.description,
        price: form.price,
        quantity: form.quantity,
        min_stock: form.min_stock,
        category_id: form.category_id
        
      });
      
    } catch (error) {
      console.log(error);
      alert("Erro ao salvar produto");
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

