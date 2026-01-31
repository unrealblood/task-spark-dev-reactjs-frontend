import { TasksGrid } from "../components/home";

function Home() {
    const tasks = [
        {
            id: 0,
            content: "Task item 1",
            completed: false
        },
        {
            id: 1,
            content: "Task item 2",
            completed: true
        },
        {
            id: 2,
            content: "Task item 3",
            completed: false
        },
    ];

    return (
        <div className="mt-4">
            <h2 className="text-center font-bold text-2xl underline">All Tasks</h2>

            <TasksGrid tasks={tasks} />
        </div>
    );
}

export { Home };