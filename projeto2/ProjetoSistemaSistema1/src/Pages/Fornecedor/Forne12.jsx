import { useForm } from "react-hook-form";
import { api } from "../../Services/api";
import { toast } from "sonner";

export function Forne12({ aoSalvar }) {
  const { register, handleSubmit, reset } = useForm();

  const salvarDados = async (dados) => {
    try {
      await api.post("/fornecedores", dados);
      toast.success("Fornecedor cadastrado com sucesso!");
      reset();
      aoSalvar();
    } catch (error) {
      toast.error("Erro ao cadastrar fornecedor.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(salvarDados)}
      className="bg-gray-100 p-6 rounded-lg mb-8 shadow-inner"
    >
      <h2 className="text-lg font-bold mb-4 text-gray-700">
        Novo Fornecedor
      </h2>

      <div className="flex flex-col gap-3">
        <input {...register("nome", { required: true })} placeholder="Nome do Fornecedor" />
        <input {...register("cidade", { required: true })} placeholder="Cidade" />
        <input {...register("telefone", { required: true })} placeholder="Telefone" />

        <button
          type="submit"
          className="bg-green-600 text-white font-bold py-2 rounded"
        >
          Cadastrar Fornecedor
        </button>
      </div>
    </form>
  );
}