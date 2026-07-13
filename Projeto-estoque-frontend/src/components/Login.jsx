import React, { useState } from "react";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  function entrar(e) {
    e.preventDefault();

    if (!email || !senha) {
      alert("Preencha todos os campos.");
      return;
    }

    onLogin();
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">StockManager</h1>
        <p className="login-subtitle">
          Sistema de Controle de Estoque
        </p>

        <form className="login-form" onSubmit={entrar}>
          <div>
            <label>E-mail</label>
            <input
              type="email"
              placeholder="Digite seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label>Senha</label>
            <input
              type="password"
              placeholder="Digite sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </div>

          <button className="login-btn" type="submit">
            Entrar
          </button>
        </form>

        
      </div>
    </div>
  );
}