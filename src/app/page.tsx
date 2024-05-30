"use client"

import Link from "next/link";
import { IoIosAdd } from "react-icons/io";
import { PiTrashSimple } from "react-icons/pi";
import { CiEdit } from "react-icons/ci";
import { IoCheckmarkOutline } from "react-icons/io5";
import { useContext, useEffect, useState } from "react";
import TaskContext from "@/context/task";

interface ITask {
  id: string,
  category: string,
  description: string,
  title: string
}

interface ICategory {
  id: number,
  title: string,
  selected: boolean
}

const categoryData: ICategory[] = [
  {
    id: 1,
    title: "Privado",
    selected: false
  },
  {
    id: 2,
    title: "Trabalho",
    selected: false
  },
  {
    id: 3,
    title: "Lazer",
    selected: false
  },
  {
    id: 4,
    title: "Esporte",
    selected: false
  },
  {
    id: 5,
    title: "Outros",
    selected: false
  },
  {
    id: 6,
    title: "Todos",
    selected: true
  }
]

export default function Home() {

  const { tasks, deleteTask } = useContext(TaskContext)
  const [category, setCategory] = useState<ICategory[]>(categoryData)
  const [filteredTask, setFilteredTask] = useState<ITask[] | null>([])

  useEffect(()=>{
    setFilteredTask(tasks ?? [])
  }, [tasks])

  const handleSelectCategory = (id: number)=> {
    const updateOptions: ICategory[] = categoryData.map((category)=>{
      if (category.id === id) {
        return { ...category, selected: true }
      }
      return { ...category, selected: false }
    })
    setCategory(updateOptions)
    filterCategory(id)
  }

  const filterCategory = (id: number)=> {
    const selectedOption = categoryData.find(category => category.id === id)

    if (selectedOption && selectedOption.title === "Todos") {
      setFilteredTask(tasks)
    } else {
      const filter = tasks && tasks.filter(task => task.category === selectedOption?.title)
      setFilteredTask(filter)
    }
  }

  return (
    <div className="flex min-h-screen">
        <aside className="bg-slate-800 w-72 p-3">
          <h2 className="mb-10 text-white">To do</h2>
          <ul className="flex text-slate-50 flex-col gap-3 mb-10">
            <li>Home</li>
            <li>Criar</li>
          </ul>
          <div className="bg-slate-600 h-px"></div>
          <details className="mt-10">
            <summary className="mb-5 text-slate-50">Categorias</summary>
            <ul className="flex text-slate-50 flex-col justify-items-center gap-3">
            {category.map((category)=>{
              return(
                <li className={`p-3 ${category.selected ? "bg-slate-500" : "bg-transparent"} rounded cursor-pointer`} onClick={()=> handleSelectCategory(category.id)} key={category.id}>{category.title}</li>
              )
            })}
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
          <div className="flex flex-wrap pr-2 pb-4 gap-10">
              {filteredTask && filteredTask.map((task, i)=>{
                return(
                <ul key={i} className="bg-slate-400 w-fit p-3 rounded">
                  <li className="text-center text-lg font-bold mb-5">{task.title}</li>
                  <li>{task.description}</li>
                  <li className="mb-2">{task.category}</li>
                  <div className="flex items-center gap-3">
                    <PiTrashSimple  className="cursor-pointer" onClick={()=> deleteTask(Number(task.id))} size={20}/>
                    <Link href={`editTask/${task.id}`}>
                      <CiEdit className="cursor-pointer" size={20}/>
                    </Link>
                    <IoCheckmarkOutline className="cursor-pointer" size={20}/>
                  </div>
                </ul>
                )
              })}
          </div>
        </main>
      </div>
  );
}