import { useState } from "react";
import { useNavigate } from "react-router";
import { useLoginUser } from "../lib/tanstack-query/auth";
import { useQueryClient } from "@tanstack/react-query";
import { setIsAuthenticated } from "../redux/slices/authSlice";
import { useDispatch } from "react-redux";

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
        <div className="w-[500px] mx-auto mt-4">
            <h1 className="text-center text-3xl font-bold underline">Login</h1>

            <form onSubmit={handleSubmit}>
                <fieldset className="border border-black p-4 rounded-md mt-4">
                    <legend>Login Form</legend>

                    <div className="flex flex-col justify-center items-center gap-4">
                        <div className="flex flex-col justify-start items-start gap-2">
                            <label htmlFor="email">Email Address</label>
                            <input id="email" type="email" placeholder="Enter your email address" className="bg-gray-200 p-2 rounded-md w-[350px]" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>

                        <div className="flex flex-col justify-start items-start gap-2">
                            <label htmlFor="password">Password</label>
                            <input id="password" type="password" placeholder="Enter your password" className="bg-gray-200 p-2 rounded-md w-[350px]" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>

                        {(reactionMessage !== "")
                        &&
                        <div className={`${(reactionMessageType === "success") ? `text-green-500` : `text-red-500`} text-center`}>
                            {reactionMessage}
                        </div>}

                        <div>
                            <button type="submit" className="bg-green-500 text-white px-8 py-2 cursor-pointer p-2 rounded-md">Login</button>
                        </div>
                    </div>
                </fieldset>
            </form>
        </div>
    );
}

export { Login };