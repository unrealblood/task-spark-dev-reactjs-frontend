import { AddTask, TasksGrid } from "../components/home";
import { useDispatch, useSelector } from "react-redux";
import { setTaskFilter } from "../redux/slices/taskSlice";

function Home() {
    const filter = useSelector(state => state.taskFilter);
    const dispatch = useDispatch();

    function changeFilter(newFilter) {
        dispatch(setTaskFilter(newFilter));
    }

    return (
        <div className="mt-4">
            <h2 className="text-center font-bold text-3xl underline">All Tasks</h2>

            <AddTask />

            <div className="flex justify-center items-center gap-4 mt-4">
                <button type="button" className={`px-8 py-2 cursor-pointer ${(filter === "all") ? `bg-green-500` : `bg-blue-500`} text-white rounded-md`} onClick={() => changeFilter("all")}>All</button>

                <button type="button" className={`px-8 py-2 cursor-pointer ${(filter === "completed") ? `bg-green-500` : `bg-blue-500`} text-white rounded-md`} onClick={() => changeFilter("completed")}>Completed</button>
            </div>

            <TasksGrid />
        </div>
    );
}

export { Home };