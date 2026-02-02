import { useSelector } from "react-redux";
import { Navigate } from "react-router";

function ProtectedRoute({children}) {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    return (
        isAuthenticated ? children : <Navigate to="/auth/login" />
    );
}

export { ProtectedRoute };