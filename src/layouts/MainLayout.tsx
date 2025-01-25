import { Outlet } from 'react-router-dom';
import Navbar from '../components/shared/Navbar/Navbar';
import Footer from '../components/shared/Footer/Footer';

const MainLayout = () => {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="min-h-screen">
        <Outlet />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
