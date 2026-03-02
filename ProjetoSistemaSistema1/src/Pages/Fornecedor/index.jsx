import { useEffect, useState } from "react";
import { api } from "../../Services/api";
import { Forne12 } from "./forne12";

export function Fornecedores() {
  const [fornecedores, setFornecedores] = useState([]);

  const carregarFornecedores = () => {
    api.get("/Fornecedores").then((res) => {
      setFornecedores(res.data);
    });
  };

  useEffect(() => {
    carregarFornecedores();
  }, []);

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-extrabold text-green-800 mb-6 italic">
        AGROVIDA - Nossos Fornecedores
      </h1>

      <Forne12 aoSalvar={carregarFornecedores} />

      <h2 className="text-xl font-semibold mb-4 text-gray-700">
        Fornecedores Cadastrados
      </h2>

      <div className="space-y-4">
        {fornecedores.map((Fornecedor) => (
          <div
            key={Fornecedor.id}
            className="p-4 border-l-4 border-green-500 rounded shadow bg-white"
          >
            <p className="font-bold uppercase">{Fornecedor.nome}</p>
            <p className="text-gray-500 italic text-sm">
              {Fornecedor.cidade}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}