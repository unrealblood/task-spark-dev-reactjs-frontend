import { Link } from "react-router";

function AuthHeaderMenu() {
    return (
        <div className="absolute flex flex-col justify-start items-start bg-white border-black border top-10 right-0 rounded-md p-2 text-xl">
            <Link to="/contact" className="flex justify-start items-center gap-2">
                <span className="bi-envelope" /> <span>Contact</span>
            </Link>

            <button className="cursor-pointer flex justify-start items-center gap-2">
                <span className="bi-envelope" /> <span>Logout</span>
            </button>
        </div>
    );
}

export { AuthHeaderMenu };