import { useState } from "react";
import { Link } from "react-router";
import { AuthHeaderMenu, UnauthHeaderMenu } from "./";
import { useSelector } from "react-redux";

function Header() {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    const [showMenu, setShowMenu] = useState(false);

    function toggleHeaderMenu() {
        setShowMenu(!showMenu);
    }

    return (
        <header className="flex justify-between items-center p-4 border-gray-200 border-b">
            <div className="shrink-0 flex"></div>

            <div className="flex flex-1 justify-center">
                <h1 className="sm:text-3xl text-2xl font-bold">
                    <Link to="/">Task Spark</Link>
                </h1>
            </div>

            <div>
                <div className="relative">
                    <button className="cursor-pointer" onClick={toggleHeaderMenu}><span className="bi-list text-2xl" /></button>

                    {showMenu
                    &&
                    (isAuthenticated ? <AuthHeaderMenu /> : <UnauthHeaderMenu />)
                    }
                </div>
            </div>
        </header>
    );
}

export { Header };