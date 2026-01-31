import { Link } from "react-router";

function Header() {
    return (
        <header className="flex justify-between items-center p-4 border-gray-200 border-b">
            <div className="shrink-0 flex"></div>

            <div className="flex flex-1 justify-center">
                <h1 className="text-3xl font-bold">
                    <Link to="/">Task Spark</Link>
                </h1>
            </div>

            <div>
                <button className=""><span className="bi-list text-2xl" /></button>
            </div>
        </header>
    );
}

export { Header };