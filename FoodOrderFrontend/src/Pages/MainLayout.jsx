import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";

const MainLayout = () => {
  return (
    <>
      <header>
        <Header />
      </header>
      <main className="pt-5">
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};
export default MainLayout;
