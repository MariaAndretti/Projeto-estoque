import React, { useState } from 'react';
import api from "../services/api"

export default function Categories({ categories, setCategories, addLog }) {
  const [form, setForm] = useState({ id: null, name: '', description: '' });
  
  const carregarCategorias = async () => {
    try {
      const response = await api.get("/categories");
      setCategories(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!form.name) {
      alert("O campo 'name' é obrigatório");
      return;
    }
    
    try {
      if (form.id) {
        await api.put(`/category/${form.id}`, {
          name: form.name,
          description: form.description
        });
        
        addLog('UPDATE', 'Category', form.id);
        alert("Categoria atualizada com sucesso");
        
      } else {
        const response = await api.post("/category", {
          name: form.name,
          description: form.description
        });
        
        addLog('CREATE', 'Category', response.data.id);
        alert("Categoria registrada com sucesso");
      }
      
      await carregarCategorias();
      
      setForm({
        id: null,
        name: '',
        description: ''
      });
      
    } catch (error) {
      console.log(error);
      alert("Erro ao salvar categoria");
    }
  };
  
  
  const handleDelete = async (id) => {
    if (confirm("Tem certeza que deseja deletar esta categoria?")) {
      
      try {
        await api.delete(`/categories/${id}`);
        
        addLog('DELETE', 'Category', id);
        alert("Categoria deletada com sucesso");
        
        await carregarCategorias();
        
      } catch (error) {
        console.log(error);
        alert("Erro ao deletar categoria");
      }
    }
  };
  
  
  return (
    <div>
    <form onSubmit={handleSubmit} className="form-container">
    <div className="form-grid">
    
    <div className="form-group">
    <label>Nome da Categoria *</label>
    <input
    type="text"
    placeholder="Ex: Eletrônicos"
    value={form.name}
    onChange={e => setForm({...form, name: e.target.value})}
    className="form-input"
    />
    </div>
    
    <div className="form-group">
    <label>Descrição</label>
    <input
    type="text"
    placeholder="Breve descrição da categoria"
    value={form.description}
    onChange={e => setForm({...form, description: e.target.value})}
    className="form-input"
    />
    </div>
    
    </div>
    
    <div className="btn-container">
    
    {form.id && (
      <button
      type="button"
      onClick={() => setForm({ id: null, name: '', description: '' })}
      className="btn btn-secondary"
      >
      Cancelar
      </button>
    )}
    
    <button type="submit" className="btn btn-primary">
    {form.id ? 'Atualizar Categoria' : 'Registrar Categoria'}
    </button>
    
    </div>
    </form>
    
    
    <div className="table-container">
    <table className="custom-table">
    
    <thead>
    <tr>
    <th>ID</th>
    <th>Nome</th>
    <th>Descrição</th>
    <th style={{ textAlign: 'right' }}>Ações</th>
    </tr>
    </thead>
    
    <tbody>
    
    {categories.length === 0 ? (
      
      <tr>
      <td
      colSpan="4"
      style={{
        textAlign: 'center',
        padding: '30px',
        color: '#6b7280'
      }}
      >
      Nenhuma categoria cadastrada.
      </td>
      </tr>
      
    ) : (
      
      categories.map(c => (
        
        <tr key={c.id}>
        
        <td style={{ color: '#6b7280', fontSize: '0.875rem' }}>
        #{c.id}
        </td>
        
        <td style={{ fontWeight: '600' }}>
        {c.name}
        </td>
        
        <td>
        {c.description || (
          <em style={{ color: '#9ca3af' }}>
          Sem descrição
          </em>
        )}
        </td>
        
        <td style={{ textAlign: 'right' }}>
        
        <button
        onClick={() => setForm(c)}
        style={{
          color: '#2563eb',
          background: 'none',
          border: 'none',
          marginRight: '12px',
          cursor: 'pointer',
          fontWeight: '500'
        }}
        >
        Editar
        </button>
        
        <button
        onClick={() => handleDelete(c.id)}
        style={{
          color: '#dc2626',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          fontWeight: '500'
        }}
        >
        Deletar
        </button>
        
        </td>
        
        </tr>
        
      ))
      
    )}
    
    </tbody>
    
    </table>
    </div>
    
    </div>
  );
}