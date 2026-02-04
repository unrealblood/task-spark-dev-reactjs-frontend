import { useState } from "react";
import { useRegisterUser } from "../lib/tanstack-query/auth";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [reactionMessage, setReactionMessage] = useState("");
    const [reactionMessageType, setReactionMessageType] = useState("success");

    const registerUserMutation = useRegisterUser();

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
        <div className="sm:w-[500px] w-[320px] mx-auto mt-4">
            <h1 className="text-center text-3xl font-bold underline">Register</h1>

            <form onSubmit={handleSubmit}>
                <fieldset className="border border-black p-4 rounded-md mt-4">
                    <legend>Registration Form</legend>

                    <div className="flex flex-col justify-center items-center gap-4">
                        <div className="flex flex-col justify-start items-start gap-2">
                            <label htmlFor="name">Full Name</label>
                            <input id="name" type="text" placeholder="Enter your full name" className="bg-gray-200 p-2 rounded-md sm:w-[350px] w-[300px]" value={name} onChange={(e) => setName(e.target.value)} />
                        </div>

                        <div className="flex flex-col justify-start items-start gap-2">
                            <label htmlFor="email">Email Address</label>
                            <input id="email" type="email" placeholder="Enter your email address" className="bg-gray-200 p-2 rounded-md sm:w-[350px] w-[300px]" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>

                        <div className="flex flex-col justify-start items-start gap-2">
                            <label htmlFor="password">Password</label>
                            <input id="password" type="password" placeholder="Enter your password" className="bg-gray-200 p-2 rounded-md sm:w-[350px] w-[300px]" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>

                        {(reactionMessage !== "")
                        &&
                        <div className={`${(reactionMessageType === "success") ? `text-green-500` : `text-red-500`} text-center`}>
                            {reactionMessage}
                        </div>}

                        <div>
                            <button type="submit" className="bg-green-500 text-white px-8 py-2 cursor-pointer p-2 rounded-md">Register</button>
                        </div>
                    </div>
                </fieldset>
            </form>
        </div>
    );
}

export { Register };