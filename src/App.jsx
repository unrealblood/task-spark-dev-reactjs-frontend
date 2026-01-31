import { Footer } from "./components";
import { Header } from "./components/header";
import { AllRoutes } from "./routes/AllRoutes";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <div className="flex-1 overflow-auto">
        <AllRoutes />
      </div>
      
      <Footer />
    </div>
  );
}

export default App
