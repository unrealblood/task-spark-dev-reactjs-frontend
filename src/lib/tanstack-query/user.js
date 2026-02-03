import { useQuery } from "@tanstack/react-query";

export const useGetUser = (userId) =>
  useQuery({
    queryKey: ["getUserQuery"],

    queryFn: async () => {
      const response = await fetch(`http://localhost:8000/users/get-user/${userId}`, {
        method: "GET"
      });
      const result = await response.json();
      
      if (result.error) throw new Error("Get user query failed.");

      return result;
    },

    enabled: !!userId
});