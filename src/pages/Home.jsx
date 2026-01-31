import { useState } from "react";
import { AddTask, TasksGrid } from "../components/home";

function Home() {
    const [tasks, setTasks] = useState([]);

    return (
        <div className="mt-4">
            <h2 className="text-center font-bold text-3xl underline">All Tasks</h2>

            <AddTask tasks={tasks} setTasks={setTasks} />
            <TasksGrid tasks={tasks} />
        </div>
    );
}

export { Home };