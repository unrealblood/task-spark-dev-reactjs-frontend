import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteTask, toggleCompleted, updateTask } from "../../redux/slices/taskSlice";
import { useDeleteTask, useUpdateTaskCompleted, useUpdateTaskContent } from "../../lib/tanstack-query/task";
import THEME from "../../lib/util.js";
import { useNavigate } from "react-router";
import { CheckCircle2, Circle, Trash2, Edit2, ChevronRight } from 'lucide-react';

function TaskItem({_id, content, completed, size, index}) {
    const dispatch = useDispatch();

    const inputRef = useRef(null);

    const [newTaskContent, setNewTaskContent] = useState(content);
    const [isTaskCompleted, setIsTaskCompleted] = useState(completed);
    const [isEditMode, setIsEditMode] = useState(false);

    const deleteTaskMutation = useDeleteTask(_id.toString());
    const toggleTaskCompletedMutation = useUpdateTaskCompleted(_id.toString());
    const updateTaskContentMutation = useUpdateTaskContent(_id.toString());

    const navigate = useNavigate();

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

    async function handleEditTaskSubmit() {
        if(newTaskContent === "" || newTaskContent.trim().length === 0) {
            return;
        }

        await updateTaskContentMutation.mutateAsync({
            newContent: newTaskContent
        });

        dispatch(updateTask({_id, content: newTaskContent}));

        setIsEditMode(false);
    }

    useEffect(() => {
        if (isEditMode && inputRef.current) {
        inputRef.current.focus();
        }
    }, [isEditMode]);

    const handleKeyDown = async (e) => {
        if (e.key === 'Enter') await handleEditTaskSubmit();
            if (e.key === 'Escape') {
            setNewTaskContent(content);
            setIsEditMode(false);
        }
    };

    return (
        <div className={`group flex items-center justify-between p-4 mb-3 rounded-xl border ${completed ? 'bg-gray-50 border-gray-100' : 'bg-white border-gray-200 shadow-sm'} hover:shadow-md transition-all duration-200`}>
            <div className="flex items-center flex-1 gap-4">
                <button 
                onClick={handleToggleTaskCompletion}
                className={`shrink-0 transition-colors ${completed ? 'text-green-500' : 'text-gray-300 hover:text-orange-400'}`}
                >
                {completed ? <CheckCircle2 className="w-6 h-6" /> : <Circle className="w-6 h-6" />}
                </button>

                {isEditMode ? (
                <div className="flex-1 flex items-center gap-2">
                    <input
                    ref={inputRef}
                    type="text"
                    value={newTaskContent}
                    onChange={(e) => setNewTaskContent(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onBlur={handleEditTaskSubmit}
                    className={`flex-1 px-3 py-1 text-gray-900 border-b-2 outline-none bg-transparent ${THEME.primaryBorder}`}
                    />
                </div>
                ) : (
                <span 
                    className={`flex-1 text-lg ${completed ? 'text-gray-400 line-through' : 'text-gray-800'}`}
                >
                    {content}
                </span>
                )}
            </div>

            <div className="flex items-center gap-1 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                {!isEditMode && (
                <button 
                    onClick={() => setIsEditMode(true)}
                    className="p-2 text-gray-400 hover:text-blue-500 rounded-lg hover:bg-blue-50 transition-colors"
                    title="Edit Inline"
                >
                    <Edit2 className="w-4 h-4" />
                </button>
                )}
                <button 
                onClick={handleDeleteTask}
                className="p-2 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors"
                title="Delete"
                >
                <Trash2 className="w-4 h-4" />
                </button>
        </div>
    </div>
    );
}

export { TaskItem };