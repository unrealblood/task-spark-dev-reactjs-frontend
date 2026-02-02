import { useDispatch, useSelector } from "react-redux";
import { TaskItem } from "./";
import { useGetAllTasks } from "../../lib/tanstack-query/task";
import { setTasks } from "../../redux/slices/taskSlice";
import { useEffect } from "react";

function TasksGrid() {
    let fetchedTasks = [];
    let filteredTasks = [];

    const tasks = useSelector(state => state.tasks.tasks);
    const currentFilter = useSelector(state => state.tasks.taskFilter);
    const dispatch = useDispatch();

    const userId = localStorage.getItem("userId");
    const { data, isPending, isFetched } = useGetAllTasks(userId);

    fetchedTasks = data?.tasks ?? [];

    useEffect(() => {
        if(isFetched) {
            dispatch(setTasks(fetchedTasks));
        }
    }, [isFetched, fetchedTasks, dispatch]);

    filteredTasks = (currentFilter === "all") ? tasks : tasks.filter((task) => task.completed === true);

    if(isPending && userId) { return (<p className="text-center mt-4">Loading tasks...</p>);}

    return (
        <section className="mt-4 w-[600px] mx-auto">
            {
            (filteredTasks.length > 0)
            ?
            filteredTasks.map((task, index) => (
                <TaskItem key={task._id.toString()} {...task} size={filteredTasks.length} index={index} />
            ))
            :
            <p className="text-center mt-4">No tasks found. Maybe add some.</p>
            }
        </section>
    );
}

export { TasksGrid };