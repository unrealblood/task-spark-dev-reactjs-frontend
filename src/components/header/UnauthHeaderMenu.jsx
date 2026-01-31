function UnauthHeaderMenu() {
    return (
        <div className="absolute flex flex-col justify-start items-start bg-white border-black border top-10 right-0 rounded-md p-2 text-xl">
            <button className="cursor-pointer flex justify-start items-center gap-2">
                <span className="bi-envelope" /> <span>Register</span>
            </button>

            <button className="cursor-pointer  flex justify-start items-center gap-2">
                <span className="bi-envelope" /> <span>Login</span>
            </button>
        </div>
    );
}

export { UnauthHeaderMenu };