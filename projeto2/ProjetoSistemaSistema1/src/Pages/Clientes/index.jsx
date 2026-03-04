import { useEffect, useState } from "react";
import { api } from "../../Services/api";
import { toast } from "sonner";
import Swal from "sweetalert2"; 
import { FormCliente } from "./FormCliente";

export function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [vendas, setVendas] = useState([]);

  function carregarDados() {
    api.get("/clientes").then((res) => setClientes(res.data));
    api.get("/vendas").then((res) => setVendas(res.data));
  }

  useEffect(() => {
    carregarDados();
  }, []);

  async function excluirCliente(id, nomeFazenda) {
    const temCompras = vendas.some((v) => v.clienteNome === nomeFazenda);

    if (temCompras) {
      toast.error("Proibido excluir: Este cliente já possui histórico de compras!");
      return;
    }

   
    Swal.fire({
      title: `Deseja excluir a fazenda ${nomeFazenda}?`,
      text: "As alterações não poderão ser revertidas!",
      icon: "warning",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Sim, excluir",
      denyButtonText: `Não salvar`,
      confirmButtonColor: "#dc2626", 
      denyButtonColor: "#6b7280",   
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await api.delete(`/clientes/${id}`);
          Swal.fire("Excluído!", "O cliente foi removido com sucesso.", "success");
          carregarDados();
        } catch (error) {
          Swal.fire("Erro!", "Ocorreu um problema ao excluir o cliente.", "error");
        }
      } else if (result.isDenied) {
        Swal.fire("Cancelado", "As alterações não foram salvas", "info");
      }
    });
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-black text-green-800 mb-8 tracking-tighter">
        Painel de Clientes
      </h1>

      <FormCliente onClienteCadastrado={carregarDados} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {clientes.map((cliente) => (
          <div
            key={cliente.id}
            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center hover:shadow-md transition-shadow"
          >
            <div>
              <h2 className="text-xl font-bold text-gray-800">
                {cliente.nomeFazenda}
              </h2>
              <p className="text-green-700 font-medium text-sm">{cliente.proprietario}</p>
              <div className="mt-2 text-gray-500 text-xs space-y-1">
                <p><strong>E-mail:</strong> {cliente.email}</p>
                <p><strong>WhatsApp:</strong> {cliente.whatsapp}</p>
              </div>
            </div>

            <button
              onClick={() => excluirCliente(cliente.id, cliente.nomeFazenda)}
              className="bg-red-50 text-red-600 px-4 py-2 rounded-lg text-xs font-bold hover:bg-red-600 hover:text-white transition-all"
            >
              Excluir
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}