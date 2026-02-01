function Register() {
    return (
        <div className="w-[500px] mx-auto mt-4">
            <h1 className="text-center text-3xl font-bold underline">Register</h1>

            <form>
                <fieldset className="border border-black p-4 rounded-md mt-4">
                    <legend>Registration Form</legend>

                    <div className="flex flex-col justify-center items-center gap-4">
                        <div className="flex flex-col justify-start items-start gap-2">
                            <label for="name">Full Name</label>
                            <input id="name" type="text" placeholder="Enter your full name" className="bg-gray-200 p-2 rounded-md w-[350px]" />
                        </div>

                        <div className="flex flex-col justify-start items-start gap-2">
                            <label for="name">Email Address</label>
                            <input id="name" type="email" placeholder="Enter your email address" className="bg-gray-200 p-2 rounded-md w-[350px]" />
                        </div>

                        <div className="flex flex-col justify-start items-start gap-2">
                            <label for="name">Password</label>
                            <input id="name" type="password" placeholder="Enter your password" className="bg-gray-200 p-2 rounded-md w-[350px]" />
                        </div>

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