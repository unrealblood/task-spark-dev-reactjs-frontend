import { useState } from "react";
import { AddTask, TasksGrid } from "../components/home";

function Home() {
    const FilterType = Object.freeze(
        {
            ALL: 0,
            COMPLETED: 1
        }
    );

    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState(FilterType.ALL);
    const [filteredTasks, setFilteredTasks] = useState(tasks);

    function changeFilter(currentFilter) {
        switch(currentFilter) {
            case FilterType.ALL:
                setFilter(currentFilter);
                setFilteredTasks(tasks);
                break;

            case FilterType.COMPLETED:
                setFilter(currentFilter);
                setFilteredTasks(tasks.filter((task) => task.completed === true));
                break;
        }
    }

    return (
        <div className="mt-4">
            <h2 className="text-center font-bold text-3xl underline">All Tasks</h2>

            <AddTask tasks={filteredTasks} setTasks={setFilteredTasks} />

            <div className="flex justify-center items-center gap-4 mt-4">
                <button type="button" className={`px-8 py-2 cursor-pointer ${(filter === FilterType.ALL) ? `bg-green-500` : `bg-blue-500`} text-white rounded-md`} onClick={() => changeFilter(FilterType.ALL)}>All</button>

                <button type="button" className={`px-8 py-2 cursor-pointer ${(filter === FilterType.COMPLETED) ? `bg-green-500` : `bg-blue-500`} text-white rounded-md`} onClick={() => changeFilter(FilterType.COMPLETED)}>Completed</button>
            </div>

            <TasksGrid tasks={filteredTasks} />
        </div>
    );
}

export { Home };