"use client"

import Link from "next/link";
import { IoIosAdd } from "react-icons/io";
import { createClient } from "@supabase/supabase-js";
import { useContext, useEffect, useState } from "react";
import TaskContext from "@/context/task";

const supabase = createClient("https://nwzgcygpeaprnylgxgoe.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im53emdjeWdwZWFwcm55bGd4Z29lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQyMzI3MjEsImV4cCI6MjAyOTgwODcyMX0.c0x8l1mWxXHe5KOimNd-ls6juLTkz715yTWuLG7kq0w")

interface ITask {
  id: number,
  category: string,
  description: string,
  title: string
}

export default function Home() {

  const { tasks } = useContext(TaskContext)

 

  

  return (
    <div className="flex">
        <aside className="bg-slate-800 w-72 h-screen p-3">
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
        <main className="bg-slate-200 w-screen pl-20 flex flex-col gap-28">
          <button className="mt-10 w-fit bg-slate-300 hover:bg-slate-400 h-fit p-2 rounded">
            <Link href="/createTask">
              <h2 className="flex gap-2 items-center">
                Adicionar task <span><IoIosAdd size={25}/></span>
              </h2>
            </Link>
          </button>
          <div className="flex flex-wrap pr-2 gap-10">
              {tasks && tasks.map((task, i)=>{
                return(
                <ul key={i} className="bg-slate-400 w-fit p-3 rounded">
                  <li className="text-center text-lg font-bold mb-5">{task.title}</li>
                  <li>{task.description}</li>
                  <li>{task.category}</li>
                </ul>
                )
              })}
          </div>
        </main>
      </div>
  );
}