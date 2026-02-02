import { useState } from "react";
import { Footer } from "./components";
import { Header } from "./components/header";
import { AllRoutes } from "./routes/AllRoutes";
import { AuthContext } from "./contexts/AuthContext";
import { useEffect } from "react";

function App() {
  const [isAuthUser, setIsAuthUser] = useState(false);

  useEffect(() => {
    if(localStorage.getItem("accessToken") === null || localStorage.getItem("userId") === null) {
      setIsAuthUser(false);
    }
    else {
      setIsAuthUser(true);
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <AuthContext value={{isAuthUser, setIsAuthUser}}>
        <Header />
        <div className="flex-1 overflow-auto">
          <AllRoutes />
        </div>
        <Footer />
      </AuthContext>
    </div>
  );
}

export default App
