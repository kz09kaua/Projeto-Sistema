import { useState } from 'react';
import { api } from '../../Services/api';
import { toast } from 'sonner';

export function FormCliente({ onClienteCadastrado }) {
  // Inicializando com todos os campos para evitar erros de componente não controlado
  const [novoCliente, setNovoCliente] = useState({ 
    nomeFazenda: '', 
    proprietario: '',
    email: '',
    whatsapp: ''
  });

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await api.post('/clientes', novoCliente);
      toast.success("Fazenda cadastrada com sucesso!");
      
      // Limpa todos os campos após o cadastro
      setNovoCliente({ nomeFazenda: '', proprietario: '', email: '', whatsapp: '' });
      onClienteCadastrado();
    } catch (error) {
      toast.error("Erro ao cadastrar cliente.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-md mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end border border-gray-100">
      <div className="lg:col-span-1">
        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Fazenda</label>
        <input 
          required
          type="text"
          className="w-full border p-2 rounded-md outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Ex: Boa Vista"
          value={novoCliente.nomeFazenda}
          onChange={e => setNovoCliente({...novoCliente, nomeFazenda: e.target.value})}
        />
      </div>

      <div>
        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Proprietário</label>
        <input 
          required
          type="text"
          className="w-full border p-2 rounded-md outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Nome do produtor"
          value={novoCliente.proprietario}
          onChange={e => setNovoCliente({...novoCliente, proprietario: e.target.value})}
        />
      </div>

      <div>
        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Email</label>
        <input 
          required
          type="email"
          className="w-full border p-2 rounded-md outline-none focus:ring-2 focus:ring-green-500"
          placeholder="contato@fazenda.com"
          value={novoCliente.email}
          onChange={e => setNovoCliente({...novoCliente, email: e.target.value})}
        />
      </div>

      <div>
        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">WhatsApp</label>
        <input 
          required
          type="text"
          className="w-full border p-2 rounded-md outline-none focus:ring-2 focus:ring-green-500"
          placeholder="(00) 00000-0000"
          value={novoCliente.whatsapp}
          onChange={e => setNovoCliente({...novoCliente, whatsapp: e.target.value})}
        />
      </div>

      <button type="submit" className="bg-green-700 text-white font-bold py-2 px-4 rounded-md hover:bg-green-800 transition-all shadow-lg h-[42px]">
        + Cadastrar
      </button>
    </form>
  );
}