import "./App.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/Route/Route";

function App() {
  return (
    <div className="max-w-[1440px] mx-auto px-5">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
