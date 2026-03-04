import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Clientes } from "./Pages/Clientes";
import { Produtos } from "./Pages/Produtos";
import { Vendas } from "./Pages/Vendas";
import { Fornecedores } from "./Pages/Fornecedor"; 
import { Toaster } from "sonner";

export default function App() {
  return (
    <BrowserRouter>
      <Toaster richColors />

      <nav className="bg-green-800 p-4 text-white flex gap-4">
        <Link to="/">Clientes</Link>
        <Link to="/fornecedores">Fornecedores</Link>
        <Link to="/produtos">Produtos</Link>
        <Link to="/vendas">Vendas</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Clientes />} />
        <Route path="/fornecedores" element={<Fornecedores />} />
        <Route path="/produtos" element={<Produtos />} />
        <Route path="/vendas" element={<Vendas />} />
      </Routes>
    </BrowserRouter>
  );
}