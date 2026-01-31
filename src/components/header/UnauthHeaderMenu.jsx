import { Link } from "react-router";

function UnauthHeaderMenu() {
    return (
        <div className="absolute flex flex-col justify-start items-start bg-white border-black border top-10 right-0 rounded-md p-2 text-xl">
            <Link to="/register" className="flex justify-start items-center gap-2">
                <span className="bi-envelope" /> <span>Register</span>
            </Link>

            <Link to="/login" className="flex justify-start items-center gap-2">
                <span className="bi-envelope" /> <span>Login</span>
            </Link>
        </div>
    );
}

export { UnauthHeaderMenu };