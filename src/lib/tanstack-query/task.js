import { useMutation, useQuery, useQueryClient} from "@tanstack/react-query";

export const useGetAllTasks = (userId) => 
    useQuery({
        queryKey: ["getAllTasksQuery"],
        queryFn: async () => {
            const response = await fetch(`http://localhost:5000/tasks/get-all/${userId}`, {
                method: "GET"
            });

            const result = await response.json();
            return result;
        },
        enabled: !!userId
    });

export const useAddTask = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({content, completed, userId}) => {
            const response = await fetch("http://localhost:5000/tasks/add-task", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({content, completed, userId})
            });
            
            const result = await response.json();
            return result;
        },

        onError: (error) => {
            throw new Error("Add task mutation error. Error: " + error.message);
        },

        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["getAllTasksQuery"]});
        }
    });
}

export const useUpdateTaskContent = (taskId) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({newContent}) => {
            const response = await fetch(`http://localhost:5000/tasks/update-task-content/${taskId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({newContent})
            });
            
            const result = await response.json();
            return result;
        },

        onError: (error) => {
            throw new Error("Update task content mutation error. Error: " + error.message);
        },

        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["getAllTasksQuery"]});
        }
    });
}

export const useUpdateTaskCompleted = (taskId) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({newCompleted}) => {
            const response = await fetch(`http://localhost:5000/tasks/update-task-completed/${taskId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({newCompleted})
            });
            
            const result = await response.json();
            return result;
        },

        onError: (error) => {
            throw new Error("Update task completed mutation error. Error: " + error.message);
        },

        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["getAllTasksQuery"]});
        }
    });
}

export const useDeleteTask = (taskId) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async () => {
            const response = await fetch(`http://localhost:5000/tasks/delete-task/${taskId}`, {
                method: "DELETE"
            });

            const result = await response.json();
            return result;
        },

        onError: (error) => {
            throw new Error("Delete task mutation error. Error: " + error.message);
        },

        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["getAllTasksQuery"]});
        }
    });
}