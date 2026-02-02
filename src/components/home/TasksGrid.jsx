import { useSelector } from "react-redux";
import { TaskItem } from "./";

function TasksGrid() {
    let tasks = useSelector(state => state.tasks.tasks);
    const currentFilter = useSelector(state => state.tasks.taskFilter);

    tasks = (currentFilter === "all") ? tasks : tasks.filter((task) => task.completed === true);

    return (
        <section className="mt-4 w-[600px] mx-auto">
            {
            (tasks.length > 0)
            ?
            tasks.map((task, index) => (
                <TaskItem key={index} {...task} size={tasks.length} index={index} />
            ))
            :
            <p className="text-center mt-4">No tasks found. Maybe add some.</p>
            }
        </section>
    );
}

export { TasksGrid };