"use client"

import { useForm } from "react-hook-form"
import Task from "../modal/Task"
import Header from "../components/Header"
import { useContext } from "react"
import TaskContext from "@/context/task"
import { useRouter } from "next/navigation"

type Inputs = {
    title: string,
    description: string,
    category: string
}

export default function FormTask() {

    const { register, handleSubmit, formState: { errors }, reset } = useForm<Inputs>()
    const { createTask } = useContext(TaskContext)
    const router = useRouter()


    const onSubmit = (data: Inputs) => {
        const task = new Task(data)
        console.log(task);
        createTask(task)
        reset()
        router.push("/")
    }
    
    return(
        <main className="bg-slate-200 h-screen p-2">
            <Header/>
            <form className="flex flex-col items-center gap-3" onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="title">Titulo</label>
                <input className="bg-slate-300 rounded p-1 focus:outline-none focus:ring-0 focus:border-transparent" type="text" {...register("title", {required: "Title is required"})} />
                {errors.title && <p className="text-red-500">This field is required</p>}
                <label htmlFor="title">Descricao</label>
                <input className="bg-slate-300 rounded p-1 focus:outline-none focus:ring-0 focus:border-transparent" type="text" {...register("description", {required: "Description is required"})} />
                {errors.description && <p className="text-red-500">This field is required</p>}
                <div className="flex gap-2">
                    <input className="bg-red-200" type="radio" value={"Trabalho"} {...register("category", { required: "Category is required" })}/>
                    <label htmlFor="title">Trabalho</label>
                    <input className="bg-red-200" type="radio" value={"Privado"} {...register("category", { required: "Category is required" })}/>
                    <label htmlFor="title">Privado</label>
                    <input className="bg-red-200" type="radio" value={"Lazer"} {...register("category", { required: "Category is required" })}/>
                    <label htmlFor="title">Lazer</label>
                    <input className="bg-red-200" type="radio" value={"Esporte"} {...register("category", { required: "Category is required" })}/>
                    <label htmlFor="title">Esporte</label>
                    <input className="bg-red-200" type="radio" value={"Outros"} {...register("category", { required: "Category is required" })}/>
                    <label htmlFor="title">Outros</label>
                    {errors.category && <p className="text-red-500">This field is required</p>}
                </div>
                    <input className="bg-slate-300 p-2 rounded hover:bg-green-500 cursor-pointer" type="submit"/>
            </form>
        </main>
    )
}