import { Outlet } from 'react-router-dom';
import NavBarMenuApp from '../components/NavBarMenuApp';
import FooterApp from '../components/FooterApp';

function RootLayout() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <NavBarMenuApp />
      
      <main className="flex-grow-1">
        <Outlet />
      </main>
      
      <FooterApp />
    </div>
  );
}

export default RootLayout;