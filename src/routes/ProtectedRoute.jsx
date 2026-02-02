import { Navigate } from "react-router";

function ProtectedRoute({children}) {
    const isAuthenticated = true;

    return (
        isAuthenticated ? children : <Navigate to="/auth/login" />
    );
}

export { ProtectedRoute };