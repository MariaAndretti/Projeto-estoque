import React, { useState } from 'react';

export default function Logs({ logs }) {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  const totalItems = logs.length;
  const totalPages = Math.ceil(totalItems / limit) || 1;
  
  const indexOfLastItem = currentPage * limit;
  const indexOfFirstItem = indexOfLastItem - limit;
  const currentLogs = logs.slice(indexOfFirstItem, indexOfLastItem);

  const getBadgeClass = (action) => {
    if (action === 'CREATE' || action === 'ENTRADA') return 'badge-create';
    if (action === 'UPDATE') return 'badge-update';
    return 'badge-delete';
  };

  return (
    <div className="table-container">
      <table className="custom-table">
        <thead>
          <tr>
            <th>Ação</th>
            <th>Entidade</th>
            <th>ID da Entidade</th>
            <th>ID Usuário</th>
            <th>Data/Hora</th>
          </tr>
        </thead>
        <tbody>
          {currentLogs.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center text-muted">
                Nenhum log encontrado no sistema.
              </td>
            </tr>
          ) : (
            currentLogs.map(log => (
              <tr key={log.id}>
                <td>
                  <span className={`badge ${getBadgeClass(log.action)}`}>
                    {log.action}
                  </span>
                </td>
                <td className="text-semibold">{log.entity}</td>
                <td className="text-muted">#{log.entity_id}</td>
                <td className="text-muted">User #{log.user_id}</td>
                <td>{log.created_at}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="pagination">
        <div>
          Mostrando <strong>{totalItems > 0 ? indexOfFirstItem + 1 : 0}</strong> até{' '}
          <strong>{Math.min(indexOfLastItem, totalItems)}</strong> de{' '}
          <strong>{totalItems}</strong> logs
        </div>
        
        <div className="pagination-controls">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Anterior
          </button>
          <span className="text-semibold">
            Página {currentPage} de {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Próxima
          </button>
        </div>
      </div>
    </div>
  );
}