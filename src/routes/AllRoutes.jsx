import { Route, Routes } from "react-router";
import { Contact, Home, Login, PageNotFound, Register } from "../pages";

function AllRoutes() {
    return (
        <Routes>
            <Route path="/auth/register" element={<Register />} />
            <Route path="/auth/login" element={<Login />} />

            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />

            <Route path="*" element={<PageNotFound />} />
        </Routes>
    );
}

export { AllRoutes };