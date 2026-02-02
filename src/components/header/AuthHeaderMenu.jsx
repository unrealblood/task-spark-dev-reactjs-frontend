import { Link, useNavigate } from "react-router";
import { useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { setIsAuthenticated } from "../../redux/slices/authSlice";

function AuthHeaderMenu() {
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const queryClient = useQueryClient();

    function handleLogout() {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userId");

        dispatch(setIsAuthenticated(false));

        queryClient.clear();

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