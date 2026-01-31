import { TaskItem } from "./";

function TasksGrid({tasks}) {
    return (
        <div className="mt-4 w-[800px] m-auto">
            {
            (tasks.length > 0)
            ?
            tasks.map((task) => (
                <TaskItem key={task.id} {...task} />
            ))
            :
            <p className="text-center">No tasks found. Maybe add some.</p>
            }
        </div>
    );
}

export { TasksGrid };