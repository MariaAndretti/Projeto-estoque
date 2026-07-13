import { useEffect, useState } from "react";
import api from "../services/api";

function Produto() {
    
    const [produtos, setProdutos] = useState([]);
    const [nome, setNome] = useState("");
    const [preco, setPreco] = useState("");
    const [quantidade, setQuantidade] = useState("");
    
    async function carregarProdutos() {
        
        const response = await api.get("/produto");
        setProdutos(response.data);
        
    }

    async function cadastrarProduto() {
        
        await api.post("/produto", {
            nome,
            preco,
            quantidade
            
        });

        carregarProdutos();

    }

    async function excluirProduto(id) {

        await api.delete(`/produto/${id}`);
        carregarProdutos();

    }

    useEffect(() => {

        carregarProdutos();

    }, []);

    return (

        <div>
        <h1>Produtos</h1>

        <input
        placeholder="Nome"
        onChange={(e) => setNome(e.target.value)}
        />
        <input

        placeholder="Preço"
        onChange={(e) => setPreco(e.target.value)}

        />

        <input
        placeholder="Quantidade"
        onChange={(e) => setQuantidade(e.target.value)}

        />

        <button onClick={cadastrarProduto}>

        Cadastrar

        </button>
        <hr />

        {produtos.map((produto) => (

            <div key={produto.id}>
            <h3>{produto.nome}</h3>
            <p>Preço: {produto.preco}</p>
            <p>Quantidade: {produto.quantidade}</p>

            <button
            onClick={() =>
                excluirProduto(produto.id)
            }
            >

            Excluir
            </button>
            </div>

        ))}
        
        </div>
    );
}
export default Produto;