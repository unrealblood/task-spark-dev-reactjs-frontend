import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useRegisterUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({name, email, password}) => {
            const response = await fetch("http://localhost:5000/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({name, email, password})
            });

            const result = await response.json();
            return result;
        },

        onError: (error) => {
            throw new Error("Register mutation error. Error: " + error.message);
        },

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["registerQuery"] });
        }
    });
}