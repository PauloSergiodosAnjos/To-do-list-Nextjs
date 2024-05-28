import React, { ReactNode } from "react"
import { TaskContextProvider } from "./task"

interface IProps {
    children: ReactNode
}

const GlobalContext = ({ children }: IProps)=> {
    return <TaskContextProvider>{ children }</TaskContextProvider>
}

export default GlobalContext