import { useState } from "react";
import { Link } from "react-router";
import { AuthHeaderMenu, UnauthHeaderMenu } from "./";

function Header() {
    const [isAuthUser, setIsAuthUser] = useState(false);
    const [showMenu, setShowMenu] = useState(false);

    function toggleHeaderMenu() {
        setShowMenu(!showMenu);
    }

    return (
        <header className="flex justify-between items-center p-4 border-gray-200 border-b">
            <div className="shrink-0 flex"></div>

            <div className="flex flex-1 justify-center">
                <h1 className="text-3xl font-bold">
                    <Link to="/">Task Spark</Link>
                </h1>
            </div>

            <div>
                <div className="relative">
                    <button className="cursor-pointer" onClick={toggleHeaderMenu}><span className="bi-list text-2xl" /></button>

                    {showMenu
                    &&
                    (isAuthUser ? <AuthHeaderMenu /> : <UnauthHeaderMenu />)
                    }
                </div>
            </div>
        </header>
    );
}

export { Header };