import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import MainLayout from "./Pages/MainLayout";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "../src/index.css";
import AdminPage from "./Pages/AdminPage";
import FoodDetail from "./Pages/FoodDetail";
import DrinkDetail from "./Pages/DrinkDetail";
import NotFound from "./Pages/NotFound";
import HomePage from "./Pages/HomePage";
import Login from "./Pages/Login";
import Cart from "./Pages/Cart";
import AdminOrdersPage from "./Pages/AdminOrdersPage";
import OrderStatusPage from "./Pages/OrderStatusPage";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserRegister from "./Pages/UserRegister";
import AdminRegister from "./Pages/AdminRegister";

// import { PrimeReactProvider, PrimeReactContext } from "primereact/api";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<HomePage />}></Route>
      <Route path="/userRegister" element={<UserRegister />}></Route>
      <Route path="/adminRegister" element={<AdminRegister />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/admin" element={<AdminPage />}></Route>
      <Route path="/food/:foodId" element={<FoodDetail />}></Route>
      <Route path="/drink/:drinkId" element={<DrinkDetail />}></Route>
      <Route path="/cart" element={<Cart />}></Route>
      <Route path="/adminOrders" element={<AdminOrdersPage />}></Route>
      <Route path="/orderStatus" element={<OrderStatusPage />}></Route>
      <Route path="*" element={<NotFound />}></Route>
    </Route>
  )
);

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
