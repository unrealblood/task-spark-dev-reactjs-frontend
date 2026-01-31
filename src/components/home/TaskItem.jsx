import { useState } from "react";

function TaskItem({content, completed, size, index}) {
    const [newTaskContent, setNewTaskContent] = useState(content);
    const [isTaskCompleted, setIsTaskCompleted] = useState(completed);
    const [isEditMode, setIsEditMode] = useState(false);

    function editTask() {
        setIsEditMode(true);
    }

    function closeEditMode() {
        setIsEditMode(false);
    }

    function toggleTaskCompletion() {
        setIsTaskCompleted(!isTaskCompleted);
    }

    function deleteTask() {

    }

    function handleEditTaskSubmit(e) {
        e.preventDefault();
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
                                <button type="button" className="cursor-pointer" onClick={closeEditMode}>
                                    <span className={`bi-check-circle text-green-500 text-2xl`} />
                                </button>
                            </div>

                            <div>
                                <button type="submit" className="cursor-pointer" onClick={closeEditMode}>
                                    <span className={`bi-x-circle text-2xl text-red-500`} />
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            :
            <div className={`flex justify-between items-center p-2 ${(size !== (index + 1)) && `border-b border-gray-200`}`}>
                <div className={`text-2xl ${isTaskCompleted && `line-through`}`}>{content}</div>

                <div className="flex justify-start items-center gap-4">
                    <div>
                        <button type="button" className="cursor-pointer" onClick={editTask}>
                            <span className={`bi-pen text-2xl text-yellow-500`} />
                        </button>
                    </div>

                    <div>
                        <button type="button" className="cursor-pointer" onClick={toggleTaskCompletion}>
                            <span className={`${isTaskCompleted ? `bi-x-circle text-blue-500` : `bi-check-circle text-green-500`} text-2xl`} />
                        </button>
                    </div>

                    <div>
                        <button type="button" className="cursor-pointer" onClick={deleteTask}>
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