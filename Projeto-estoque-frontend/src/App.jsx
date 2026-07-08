import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Products from "./pages/Products";
import ProductForm from "./pages/ProductForm";
import Metrics from "./pages/Metrics";
import Logs from "./pages/Logs";

export default function App() {
    return (
    <BrowserRouter>
    <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
        <Route path="/" element={<Navigate to="/products" replace />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/new" element={<ProductForm />} />
        <Route path="/products/:id/edit" element={<ProductForm />} />
        <Route path="/metrics" element={<Metrics />} />
        <Route path="/logs" element={<Logs />} />
        </Route>
        </Route>
    </Routes>
    </BrowserRouter>
    );
};