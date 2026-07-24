import { useLocation } from "react-router-dom";

import Navbar from "../components/Navbar/Navbar.jsx";
import Footer from "../components/Footer/index.jsx";

const MainLayout = ({ children }) => {
  const { pathname } = useLocation();
  const hideFooter = pathname === "/auth";

  return (
    <>
      <Navbar />
      <main>{children}</main>
      {!hideFooter && <Footer />}
    </>
  );
};

export default MainLayout;
