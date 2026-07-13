import { useEffect, useState } from "react";
import api from "../services/api";

export default function Metrics() {
    const [metrics, setMetrics] = useState(null);
    
    useEffect(() => {
        api.get("/metrics").then(({ data }) => setMetrics(data));
    }, []);
    
    if (!metrics) return <p>Carregando...</p>;
    
    return (
    <div style={{ display: "flex", gap: 12 }}>
        <div>Total produtos: {metrics.total_products}</div>
        <div>Estoque baixo: {metrics.critical_stock}</div>
        <div>Valor total: {metrics.total_value}</div>
    </div>
    );
};