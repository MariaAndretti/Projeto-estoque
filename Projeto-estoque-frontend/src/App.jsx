import React, { useState, useEffect } from "react";
import api from "./services/api"
import Login from "./components/Login.jsx";
import Metrics from "./components/metrics";
import Products from "./components/products";
import Categories from "./components/categories";
import StockMovement from "./components/stockmovement";
import Logs from "./components/logs";

export default function App() {
  const [logado, setLogado] = useState(false);

  const [activeTab, setActiveTab] = useState("metrics");

  const [categories, setCategories] = useState([]);

  const [products, setProducts] = useState([]);

  const [logs, setLogs] = useState([]);

  useEffect(() => {
  carregarDados();
}, []);

async function carregarDados() {
  try {
    const categorias = await api.get("/categories");
    const produtos = await api.get("/products");

    setCategories(categorias.data);
    setProducts(produtos.data);

  } catch (error) {
    console.log("Erro ao buscar dados:", error);
  }
}

  const addLog = (action, entity, entityId) => {
    setLogs((prev) => [
      {
        id: Date.now(),
        action,
        entity,
        entity_id: entityId,
        user_id: 1,
        created_at: new Date().toLocaleString(),
      },
      ...prev,
    ]);
  };

  const handleLogin = async () => {
    const res = await api.post("/login", {
      email,
      passwd,
    });

    localStorage.setItem("token", res.data.token);
   };
   

  return (
    <div className="app-container">
      <div className="sidebar">
        <div className="sidebar-title">StockManager</div>

        <nav className="sidebar-nav">
          {[
            { id: "metrics", label: "Dashboard" },
            { id: "products", label: "Produtos" },
            { id: "categories", label: "Categorias" },
            { id: "movements", label: "Movimentar Estoque" },
            { id: "logs", label: "Logs do Sistema" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`nav-button ${
                activeTab === tab.id ? "active" : ""
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="main-content">
        <header className="header">
          <h2 className="header-title">
            {activeTab === "metrics" ? "Painel Geral" : activeTab}
          </h2>

          <div className="user-info">
            Usuário: <strong>Admin</strong>
          </div>
        </header>

        <main className="content-body">
          {activeTab === "metrics" && <Metrics products={products} />}

          {activeTab === "products" && (
            <Products
              products={products}
              setProducts={setProducts}
              categories={categories}
              addLog={addLog}
            />
          )}

          {activeTab === "categories" && (
            <Categories
              categories={categories}
              setCategories={setCategories}
              addLog={addLog}
            />
          )}

          {activeTab === "movements" && (
            <StockMovement
              products={products}
              setProducts={setProducts}
              addLog={addLog}
            />
          )}

          {activeTab === "logs" && <Logs logs={logs} />}
        </main>
      </div>
    </div>
  );
}