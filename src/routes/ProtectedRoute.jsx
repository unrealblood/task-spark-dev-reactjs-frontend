import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Navigate } from "react-router";

function ProtectedRoute({children}) {
    const { isAuthUser } = useContext(AuthContext);

    return (
        isAuthUser ? children : <Navigate to="/auth/login" />
    );
}

export { ProtectedRoute };