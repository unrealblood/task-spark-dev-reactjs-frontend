import { useDispatch } from "react-redux";
import { Header } from "./components/header";
import { useGetUser } from "./lib/tanstack-query/user";
import { AllRoutes } from "./routes/AllRoutes";
import { setIsAuthenticated } from "./redux/slices/authSlice";

function App() {
  const userId = localStorage.getItem("userId");
  const { data, isPending } = useGetUser(userId);

  const dispatch = useDispatch();
  dispatch(setIsAuthenticated(data?.success === true));

  if(isPending && userId) { return (<p className="text-center mt-4">Loading...</p>); }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-1 overflow-auto">
        <AllRoutes />
      </div>
    </div>
  );
}

export default App
