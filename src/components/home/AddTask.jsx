import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../../redux/slices/taskSlice";
import { useAddTask } from "../../lib/tanstack-query/task";

function AddTask() {
    const dispatch = useDispatch();

    const userId = localStorage.getItem("userId");
    const newTask = {content: "", completed: false, userId};

    const [newTaskContent, setNewTaskContent] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const addTaskMutation = useAddTask();

    async function addTaskToTasksList(e) {
        e.preventDefault();

        if((newTaskContent === "") || newTaskContent.trim().length === 0) {
            return;
        }

        const result = await addTaskMutation.mutateAsync({...newTask, content: newTaskContent});

        if(result.error) {
            setErrorMessage(result.error);
            return;
        }

        dispatch(addTask({...newTask, _id: result.taskId, content: newTaskContent}));
    }

    return (
        <section className="mt-4 sm:w-[750px] w-[280px] flex justify-center items-center mx-auto">
            <div className="flex justify-center items-center flex-col gap-2">
                <form className="flex justify-center items-center gap-4" onSubmit={addTaskToTasksList}>
                    <input type="text" placeholder="Enter your task" className="bg-gray-200 p-2 sm:w-[400px] w-[250px] mx-auto text-xl rounded-md" value={newTaskContent} onChange={(e) => setNewTaskContent(e.target.value)} />

                    <button type="submit" className="bg-green-500 text-white px-8 py-2  rounded-md cursor-pointer">Add</button>
                </form>

                {(errorMessage !== "")
                &&
                <p className="text-center text-red-500">{errorMessage}</p>}
            </div>
        </section>
    );
}

export { AddTask };