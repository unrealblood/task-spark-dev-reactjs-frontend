import { useContext } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../../contexts/AuthContext";

function AuthHeaderMenu() {
    const navigate = useNavigate();

    const { setIsAuthUser } = useContext(AuthContext);

    function handleLogout() {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userId");

        setIsAuthUser(false);

        navigate("/auth/login");
    }

    return (
        <div className="absolute flex flex-col justify-start items-start bg-white border-black border top-10 right-0 rounded-md p-2 text-xl">
            <Link to="/contact" className="flex justify-start items-center gap-2">
                <span className="bi-envelope" /> <span>Contact</span>
            </Link>

            <button className="cursor-pointer flex justify-start items-center gap-2" onClick={handleLogout}>
                <span className="bi-box-arrow-left" /> <span>Logout</span>
            </button>
        </div>
    );
}

export { AuthHeaderMenu };