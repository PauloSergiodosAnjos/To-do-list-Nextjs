"use client"

import React, { ReactNode, createContext, useEffect, useState } from "react"
import { createClient } from "@supabase/supabase-js";

const supabase = createClient("https://nwzgcygpeaprnylgxgoe.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im53emdjeWdwZWFwcm55bGd4Z29lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQyMzI3MjEsImV4cCI6MjAyOTgwODcyMX0.c0x8l1mWxXHe5KOimNd-ls6juLTkz715yTWuLG7kq0w")

//Tipo dos dados da task
interface ITasktype {
    id: string
    category: string
    description: string,
    title: string,
    isChecked: boolean
}

//Props do contexto, os dados que vao poder ser acessados no context
interface IPropsTaskContext {
    state: ITasktype,
    setState: React.Dispatch<React.SetStateAction<ITasktype>>,
    tasks: ITasktype[] | null,
    createTask: (task: ITasktype) => Promise<void>
    deleteTask: (id: string) => Promise<void>,
    getTasks: ()=> Promise<void>
    editTask: (id: string, task: ITasktype)=> Promise<void>,
    findTask: (id: string) => ITasktype  | null | void
}

//valor default do contexto
const DEFAUL_VALUE = {
    state: {
        id: "",
        category: "",
        description: "",
        title: "",
        isChecked: false
    },
    setState: () => {},
    tasks: [],
    createTask: async ()=> {},
    deleteTask: async ()=> {},
    getTasks: async ()=> {},
    editTask: async ()=> {},
    findTask: ()=> null
}

//criando nosso contexto, tipando ele com os dados (props) que queremos ter no nosso context
const TaskContext = createContext<IPropsTaskContext>(DEFAUL_VALUE)

//tipo da prop children
interface IProps {
    children: ReactNode
}

const TaskContextProvider = ({ children }: IProps)=> {
    //criando os states que irao compor as props necessarias do context criado
    const [state, setState] = useState<ITasktype>(DEFAUL_VALUE.state)
    const [tasks, setTasks] = useState<ITasktype[] | null>([])

    useEffect(()=>{
        getTasks()
    }, [])

    const getTasks = async ()=>{
        try {
            const { data } = await supabase.from("Tasks").select()
            setTasks(data)
        } catch (error) {
            console.log("Erro na func getTask()" + error);
        }
    }

    const createTask = async (task: ITasktype)=>{
        try {
            await supabase.from("Tasks").insert({id: task.id, category: task.category, description: task.description, title: task.title})
            await getTasks()
        } catch (error) {
            console.log("Erro na func createTask()" + error);
        }
    }

    const deleteTask = async (id: string) => {
        try {
            await supabase.from("Tasks").delete().eq("id", id)
            await getTasks()
        } catch (error) {
            console.log("Erro na func deleteTask()" + error);
        }
    }

    const editTask = async (id: string, task: ITasktype | null) => {
        try {
            if (task) {
                await supabase.from("Tasks").update({category: task.category, description: task.description, title: task.title, isChecked: task.isChecked}).eq("id", String(id))
                await getTasks()
            }
        } catch (error) {
            console.log("Erro na func editTask()" + error);
        }
    }

    const findTask = (id: string)=> {
        return tasks && tasks.find(task => task.id === id) 
    }

    return(
        <TaskContext.Provider value={{
            state,
            setState,
            tasks,
            createTask,
            deleteTask,
            getTasks,
            editTask,
            findTask
        }}>
            { children }
        </TaskContext.Provider>
    )
}

export { TaskContextProvider }
export default TaskContext