import { useDispatch, useSelector } from "react-redux";
import { addTask, setTaskFilter, setTasks } from "../redux/slices/taskSlice";
import THEME from "../lib/util.js";
import { useAddTask, useGetAllTasks } from "../lib/tanstack-query/task";
import { useEffect, useState } from "react";
import { Sparkles, Plus } from 'lucide-react';
import { TaskItem } from "../components/home/TaskItem.jsx";

function Home() {
    const filter = useSelector(state => state.tasks.taskFilter);
    const dispatch = useDispatch();

    let fetchedTasks = [];
    let filteredTasks = [];

    const tasks = useSelector(state => state.tasks.tasks);
    const currentFilter = useSelector(state => state.tasks.taskFilter);

    const userId = localStorage.getItem("userId");
    
    const { data, isPending, isFetched } = useGetAllTasks(userId);
    const addTaskMutation = useAddTask();

    const newTask = {content: "", completed: false, userId};

    const [newTaskContent, setNewTaskContent] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    fetchedTasks = data?.tasks ?? [];

    useEffect(() => {
        if(isFetched) {
            dispatch(setTasks(fetchedTasks));
        }
    }, [isFetched, fetchedTasks, dispatch]);

    filteredTasks = (currentFilter === "all") ? tasks : tasks.filter((task) => task.completed === true);

    if(isPending && userId) { return (<p className="text-center mt-4">Loading tasks...</p>);};

    async function handleAdd(e) {
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
        setNewTaskContent("");
    }

    function setFilter(newFilter) {
        dispatch(setTaskFilter(newFilter));
    }

    return (
        <div className="max-w-3xl mx-auto px-4 py-8 w-full">
            <form onSubmit={handleAdd} className="mb-8 relative">
                <div className="relative flex items-center">
                    <div className="absolute left-4 text-orange-400">
                        <Plus className="w-6 h-6" />
                    </div>
                    <input
                        type="text"
                        value={newTaskContent}
                        onChange={(e) => setNewTaskContent(e.target.value)}
                        placeholder="Add a new task..."
                        className="w-full pl-12 pr-24 py-4 bg-white border border-gray-200 rounded-2xl shadow-sm text-lg outline-none focus:ring-2 focus:ring-orange-500 transition-shadow"
                    />
                    <button 
                        type="submit"
                        disabled={!newTaskContent.trim()}
                        className={`absolute right-2 px-4 py-2 rounded-xl font-medium transition-all ${
                        newTaskContent.trim() 
                            ? `${THEME.primary} shadow-md` 
                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        }`}
                    >
                        Add
                    </button>
                </div>

                {(errorMessage !== "")
                &&
                <p className="text-center text-red-500">{errorMessage}</p>}
            </form>

            <div className="flex items-center justify-between mb-6">
                <div className="flex bg-gray-200/50 p-1 rounded-xl">
                    {['all', 'completed'].map((f) => (
                        <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-4 py-1.5 rounded-lg text-sm font-medium capitalize transition-all ${
                            filter === f 
                            ? 'bg-white text-gray-900 shadow-sm' 
                            : 'text-gray-500 hover:text-gray-700'
                        }`}
                        >
                        {f}
                        </button>
                    ))}
                    </div>
                <div className="text-sm font-medium text-gray-500">
                    {filteredTasks.length} {filteredTasks.length === 1 ? 'task' : 'tasks'}
                </div>
            </div>

            <div className="space-y-1">
                {filteredTasks.length > 0 ? (
                filteredTasks.map((task, index) => (
                    <TaskItem 
                    key={task._id} 
                    {...task}
                    size={filteredTasks.length}
                    index={index}
                    />
                ))
            ) : (
            <div className="text-center py-16 px-4 bg-white rounded-2xl border border-gray-100 border-dashed">
                <div className="bg-orange-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-8 h-8 text-orange-300" />
                </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-1">No tasks found</h3>
                    <p className="text-gray-500">
                        {filter === 'all' 
                            ? "You're all caught up! Add a task to get started." 
                            : `You don't have any ${filter} tasks.`}
                    </p>
                </div>
                )}
        </div>
    </div>
    );
}

export { Home };