import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import MainLayout from "../Pages/MainLayout";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "../src/index.css";
import AdminPage from "../Pages/AdminPage";
import FoodDetail from "../Pages/FoodDetail";
import DrinkDetail from "../Pages/DrinkDetail";
import NotFound from "../Pages/NotFound";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<AdminPage />}></Route>
      <Route path="/food/:id" element={<FoodDetail />}></Route>
      <Route path="/drink/:id" element={<DrinkDetail />}></Route>
      <Route path="*" element={<NotFound />}></Route>
    </Route>
  )
);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
