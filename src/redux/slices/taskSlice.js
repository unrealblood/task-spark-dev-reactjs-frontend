import { createSlice } from "@reduxjs/toolkit";

export const taskSlice = createSlice({
    name: "taskSlice",
    initialState: {
        tasks: [],
        taskFilter: "all"
    },
    reducers: {
        addTask: (state = initialState, action) => {
            state.tasks.push(action.payload);
        },

        deleteTask: (state = initialState, action) => {
            state.tasks = state.tasks.filter((task) => task.id !== action.payload);
        },

        toggleCompleted: (state = initialState, action) => {
            const task = state.tasks.find((task) => task.id === action.payload);
            
            if(task) {
                task.completed = !task.completed;
            }
        },

        updateTask: (state = initialState, action) => {
            const task = state.tasks.find((task) => task.id === action.payload.id);
            
            if(task) {
                task.content = action.payload.content;
            }
        },

        setTaskFilter: (state = initialState, action) => {
            state.taskFilter = action.payload;
        }
    }
});

export const { addTask, deleteTask, toggleCompleted, updateTask, setTaskFilter } = taskSlice.actions;