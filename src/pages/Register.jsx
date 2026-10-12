import { useState } from "react";
import { useRegisterUser } from "../lib/tanstack-query/auth";
import { Sparkles } from 'lucide-react';
import THEME from "../lib/util.js";
import { useNavigate } from "react-router";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [reactionMessage, setReactionMessage] = useState("");
    const [reactionMessageType, setReactionMessageType] = useState("success");

    const registerUserMutation = useRegisterUser();
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        const result = await registerUserMutation.mutateAsync({
            name,
            email,
            password
        });

        if(result.success) {
            setReactionMessage("Successfully registered. You can now login.");
            setReactionMessageType("success");
            return;
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
                        {'Join us and start sparking productivity.'}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={`w-full px-4 py-3 rounded-xl border border-gray-200 outline-none transition-shadow focus:ring-2 ${THEME.primaryBorder}`}
                        placeholder="Full name"
                        />
                    </div>
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
                        {'Create Account'}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-gray-600 text-sm">
                        {"Already have an account? "}
                        <button 
                        onClick={() => navigate("/auth/login")}
                        className={`font-semibold ${THEME.primaryText} hover:underline`}
                        >
                        {'Login'}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}

export { Register };