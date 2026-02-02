import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteTask, toggleCompleted, updateTask } from "../../redux/slices/taskSlice";
import { useDeleteTask, useUpdateTaskCompleted, useUpdateTaskContent } from "../../lib/tanstack-query/task";

function TaskItem({_id, content, completed, size, index}) {
    const dispatch = useDispatch();

    const [newTaskContent, setNewTaskContent] = useState(content);
    const [isTaskCompleted, setIsTaskCompleted] = useState(completed);
    const [isEditMode, setIsEditMode] = useState(false);

    const deleteTaskMutation = useDeleteTask(_id.toString());
    const toggleTaskCompletedMutation = useUpdateTaskCompleted(_id.toString());
    const updateTaskContentMutation = useUpdateTaskContent(_id.toString());

    function handleEditTask() {
        setIsEditMode(true);
    }

    function handleCloseEditMode() {
        setIsEditMode(false);
    }

    async function handleToggleTaskCompletion() {
        await toggleTaskCompletedMutation.mutateAsync({
            newCompleted: !isTaskCompleted
        });

        setIsTaskCompleted(!isTaskCompleted);

        dispatch(toggleCompleted(_id));
    }

    async function handleDeleteTask() {
        await deleteTaskMutation.mutateAsync();

        dispatch(deleteTask(_id));
    }

    async function handleEditTaskSubmit(e) {
        e.preventDefault();

        if(newTaskContent === "" || newTaskContent.trim().length === 0) {
            return;
        }

        await updateTaskContentMutation.mutateAsync({
            newContent: newTaskContent
        });

        dispatch(updateTask({_id, content: newTaskContent}));
        
        setIsEditMode(false);
    }

    return (
        <article>
            {isEditMode
            ?
            <div className={`flex justify-between items-center p-2 ${(size !== (index + 1)) && `border-b border-gray-200`}`}>
                <div className={`text-2xl ${isTaskCompleted && `line-through`}`}>
                    <form onSubmit={handleEditTaskSubmit} className="flex justify-between items-center gap-4 p-2">
                        <input type="text" placeholder="New task content here" className="bg-gray-200 p-2 w-[480px]" value={newTaskContent} onChange={(e) => setNewTaskContent(e.target.value)} />

                        <div className="flex justify-start items-center gap-4">
                            <div>
                                <button type="submit" className="cursor-pointer">
                                    <span className={`bi-check-circle text-green-500 text-2xl`} />
                                </button>
                            </div>

                            <div>
                                <button type="button" className="cursor-pointer" onClick={handleCloseEditMode}>
                                    <span className={`bi-x-circle text-2xl text-red-500`} />
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            :
            <div className={`flex justify-between items-center p-2 ${(size !== (index + 1)) && `border-b border-gray-200`}`}>
                <div className={`text-2xl ${isTaskCompleted && `line-through`}`}>{_id}, {content}</div>

                <div className="flex justify-start items-center gap-4">
                    <div>
                        <button type="button" className="cursor-pointer" onClick={handleEditTask}>
                            <span className={`bi-pen text-2xl text-yellow-500`} />
                        </button>
                    </div>

                    <div>
                        <button type="button" className="cursor-pointer" onClick={handleToggleTaskCompletion}>
                            <span className={`${isTaskCompleted ? `bi-x-circle text-blue-500` : `bi-check-circle text-green-500`} text-2xl`} />
                        </button>
                    </div>

                    <div>
                        <button type="button" className="cursor-pointer" onClick={handleDeleteTask}>
                            <span className={`bi-trash text-2xl text-red-500`} />
                        </button>
                    </div>
                </div>
            </div>
            }
        </article>
    );
}

export { TaskItem };