import { useState } from "react";

function AddTask({tasks, setTasks}) {
    const newTask = {content: "", completed: false};

    const [newTaskContent, setNewTaskContent] = useState("");

    function addTaskToTasksList(e) {
        e.preventDefault();

        if((newTaskContent === "") || newTaskContent.trim().length === 0) {
            return;
        }

        setTasks([...tasks, {...newTask, content: newTaskContent}]);
    }

    return (
        <section className="mt-4 w-[750px] flex justify-center items-center mx-auto">
            <form className="flex justify-center items-center gap-4" onSubmit={addTaskToTasksList}>
                <input type="text" placeholder="Enter your task" className="bg-gray-200 p-2 w-[400px] mx-auto text-xl rounded-md" value={newTaskContent} onChange={(e) => setNewTaskContent(e.target.value)} />

                <button type="submit" className="bg-green-500 text-white px-8 py-2  rounded-md cursor-pointer">Add</button>
            </form>
        </section>
    );
}

export { AddTask };