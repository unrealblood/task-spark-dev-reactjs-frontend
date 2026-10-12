import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Sparkles, LogOut } from 'lucide-react';
import { setIsAuthenticated } from "../../redux/slices/authSlice";
import { useQueryClient } from "@tanstack/react-query";

function Header() {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    const dispatch = useDispatch();
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    function handleLogout() {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userId");

        dispatch(setIsAuthenticated(false));

        queryClient.clear();

        navigate("/auth/login");
    }

    return (
        <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div 
            className="flex items-center gap-2 cursor-pointer group" 
            onClick={() => navigate("/")}
          >
            <div className="bg-orange-500 p-1.5 rounded-lg group-hover:bg-orange-600 transition-colors">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-linear-to-r from-orange-600 to-orange-400">
              Task Spark
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            {isAuthenticated && <button 
              onClick={handleLogout}
              className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors flex items-center gap-2"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>}
          </div>
        </div>
      </header>
    );
}

export { Header };