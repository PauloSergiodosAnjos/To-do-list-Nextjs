"use client"

import React, { ReactNode, createContext, useEffect, useState } from "react"
import { createClient } from "@supabase/supabase-js";

const supabase = createClient("https://nwzgcygpeaprnylgxgoe.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im53emdjeWdwZWFwcm55bGd4Z29lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQyMzI3MjEsImV4cCI6MjAyOTgwODcyMX0.c0x8l1mWxXHe5KOimNd-ls6juLTkz715yTWuLG7kq0w")

//Tipo dos dados da task
interface ITasktype {
    category: string
    description: string,
    title: string,
}

//Props do contexto
interface IPropsTaskContext {
    state: ITasktype,
    setState: React.Dispatch<React.SetStateAction<ITasktype>>,
    tasks: ITasktype[] | null
}

//valor default do contexto
const DEFAUL_VALUE = {
    state: {
        category: "",
        description: "",
        title: ""
    },
    setState: () => {},
    tasks: []
}

//criando nosso contexto
const TaskContext = createContext<IPropsTaskContext>(DEFAUL_VALUE)

interface IProps {
    children: ReactNode
}


const TaskContextProvider = ({ children }: IProps)=> {
    const [state, setState] = useState(DEFAUL_VALUE.state)
    const [tasks, setTasks] = useState<ITasktype[] | null>([])

    useEffect(()=>{
        getTasks()
    }, [])

    const getTasks = async ()=>{
    const { data } = await supabase.from("Tasks").select()
    console.log(data);
    
    setTasks(data)
    }

    return(
        <TaskContext.Provider value={{
            state,
            setState,
            tasks
        }}>
            { children }
        </TaskContext.Provider>
    )
}

export { TaskContextProvider }
export default TaskContext