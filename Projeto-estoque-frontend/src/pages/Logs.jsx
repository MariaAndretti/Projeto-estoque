import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Logs() {
    const [logs, setLogs] = useState([]);
    
    useEffect(() => {
        api.get("/logs", { params: { page: 1 } }).then(({ data }) => {
            setLogs(data.items || data.logs || []);
        });
    }, []);
    
    return (
    <table border="1" cellPadding="8">
        <thead>
            <tr>
                <th>Ação</th>
                <th>Entidade</th>
                <th>ID</th>
                <th>Usuário</th>
                <th>Data</th>
            </tr>
        </thead>
        
        <tbody>
            {logs.map((log) => (
                <tr key={log.id}>
                    <td>{log.action}</td>
                    <td>{log.entity}</td>
                    <td>{log.entity_id}</td>
                    <td>{log.user_id}</td>
                    <td>{log.created_at}</td>
                </tr>
            ))}
        </tbody>
    </table>
    );
};