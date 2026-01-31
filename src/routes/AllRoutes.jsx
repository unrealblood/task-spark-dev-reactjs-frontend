import { Route, Routes } from "react-router";
import { Contact, Home } from "../pages";

function AllRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
        </Routes>
    );
}

export { AllRoutes };