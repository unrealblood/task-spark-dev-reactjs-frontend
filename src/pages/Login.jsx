import { useState } from "react";
import { useNavigate } from "react-router";
import { useLoginUser } from "../lib/tanstack-query/auth";
import { useQueryClient } from "@tanstack/react-query";
import { setIsAuthenticated } from "../redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { Sparkles} from 'lucide-react';
import THEME from "../lib/util.js";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [reactionMessage, setReactionMessage] = useState("");
    const [reactionMessageType, setReactionMessageType] = useState("success");

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const queryClient = useQueryClient();

    const loginUserMutation = useLoginUser();

    async function handleSubmit(e) {
        e.preventDefault();

        const result = await loginUserMutation.mutateAsync({
            email,
            password
        });

        if(result.success) {
            const accessToken = result.accessToken;

            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("userId", result.userId.toString());

            dispatch(setIsAuthenticated(true));

            queryClient.invalidateQueries({ queryKey: ["getUserQuery"] });

            navigate("/");
        }
        
        if(result.error) {
            setReactionMessage(result.error);
            setReactionMessageType("error");
            return;
        }
    }

    return (
        <div className={`min-h-screen flex items-center justify-center ${THEME.bgGradient} p-4`}>
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md transform transition-all">
                <div className="flex flex-col items-center mb-8">
                    <div className="bg-orange-100 p-3 rounded-full mb-3">
                        <Sparkles className="w-8 h-8 text-orange-500" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900">Task Spark</h1>
                    <p className="text-gray-500 mt-2 text-center">
                        {'Welcome back! Let\'s get things done.'}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`w-full px-4 py-3 rounded-xl border border-gray-200 outline-none transition-shadow focus:ring-2 ${THEME.primaryBorder}`}
                        placeholder="you@example.com"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={`w-full px-4 py-3 rounded-xl border border-gray-200 outline-none transition-shadow focus:ring-2 ${THEME.primaryBorder}`}
                        placeholder="••••••••"
                        />
                    </div>

                    {(reactionMessage !== "")
                    &&
                    <div className={`${(reactionMessageType === "success") ? `text-green-500` : `text-red-500`} text-center`}>
                        {reactionMessage}
                    </div>}
                
                    <button
                        type="submit"
                        className={`w-full py-3 rounded-xl font-semibold shadow-md transition-all transform active:scale-[0.98] ${THEME.primary}`}
                    >
                        {'Sign In'}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-gray-600 text-sm">
                        {"Don't have an account? "}
                        <button 
                        onClick={() => navigate("/auth/register")}
                        className={`font-semibold ${THEME.primaryText} hover:underline`}
                        >
                        {'Sign up'}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}

export { Login };