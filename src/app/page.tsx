import { IoIosAdd } from "react-icons/io";

export default function Home() {
  return (
    <main className="flex bg-slate-200">
      <aside className="bg-slate-800 mr-10 w-72 h-screen p-3">
        <h2 className="mb-10 text-white">To do</h2>
        <ul className="flex text-slate-50 flex-col gap-3 mb-10">
          <li>Home</li>
          <li>Criar</li>
          <li>Filtrar</li>
        </ul>
        <div className="bg-slate-600 h-px"></div>
        <details className="mt-10">
          <summary className="mb-5 text-slate-50">Categorias</summary>
          <ul className="flex text-slate-50 flex-col justify-items-center gap-3">
            <li>Privado</li>
            <li>Trabalho</li>
            <li>Lazer</li>
            <li>Esporte</li>
            <li>Outros</li>
          </ul>
        </details>
      </aside>
      <div className="mt-10 bg-slate-300 h-fit p-2 rounded">
        <h2 className="flex gap-2 items-center">
          Adicionar task <span><IoIosAdd size={25}/></span>
        </h2>
      </div>
    </main>
  );
}
