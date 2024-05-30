"use client"

import React, { ReactNode, createContext, use, useEffect, useState } from "react"
import { createClient } from "@supabase/supabase-js";

const supabase = createClient("https://nwzgcygpeaprnylgxgoe.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im53emdjeWdwZWFwcm55bGd4Z29lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQyMzI3MjEsImV4cCI6MjAyOTgwODcyMX0.c0x8l1mWxXHe5KOimNd-ls6juLTkz715yTWuLG7kq0w")

//Tipo dos dados da task
interface ITasktype {
    id: string
    category: string
    description: string,
    title: string,
}

//Props do contexto, os dados que vao poder ser acessados no context
interface IPropsTaskContext {
    state: ITasktype,
    setState: React.Dispatch<React.SetStateAction<ITasktype>>,
    tasks: ITasktype[] | null,
    createTask: (task: ITasktype) => Promise<void>
    deleteTask: (id: number) => Promise<void>,
    getTasks: ()=> Promise<void>
    editTask: (id: number, task: ITasktype)=> Promise<void>,
    findTask: (id: number) => ITasktype | undefined | null
}

//valor default do contexto
const DEFAUL_VALUE = {
    state: {
        id: "",
        category: "",
        description: "",
        title: ""
    },
    setState: () => {},
    tasks: [],
    createTask: async ()=> {},
    deleteTask: async ()=> {},
    getTasks: async ()=> {},
    editTask: async ()=> {},
    findTask: ()=> undefined
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
            console.log(error);
        }
    }

    const createTask = async (user: ITasktype)=>{
        try {
            await supabase.from("Tasks").insert({category: user.category, description: user.description, title: user.title})
            await getTasks()
        } catch (error) {
            console.log(error);
        }
    }

    const deleteTask = async (id: number) => {
        try {
            await supabase.from("Tasks").delete().eq("id", id)
            await getTasks()
        } catch (error) {
            console.log(error);
        }
    }

    const editTask = async (id: number, task: ITasktype) => {
        await supabase.from("Tasks").update({category: task.category, description: task.description, title: task.title}).eq("id", String(id))
        await getTasks()
    }

    const findTask = (id: number)=> {
        return tasks?.find(task => Number(task.id) === id) 
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