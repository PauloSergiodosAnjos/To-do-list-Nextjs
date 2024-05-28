import Link from "next/link";
import React from "react";

import { IoIosArrowBack } from "react-icons/io";

export default function Header() {
    return(
        <header className="w-20">
            <Link className="flex items-center gap-2" href="/">
                <IoIosArrowBack/>
                <h2>Home</h2>
            </Link>
        </header>
    )
}