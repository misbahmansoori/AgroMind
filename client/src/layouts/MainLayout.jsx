import Navbar from "../components/Navbar/Navbar.jsx";
import Footer from "../components/Footer/index.jsx";

const MainLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default MainLayout;
