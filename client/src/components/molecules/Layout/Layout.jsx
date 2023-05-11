import Navigation from '../Navigation/Navigation';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="flex-col-direction items-center min-h-screen">
      <Navigation />
      <Outlet />
      <footer className="py-4 w-full flex-center-content sticky top-[100vh]">
        <p>
          Made with ❤️ by{' '}
          <a
            href="https://github.com/Krrish105"
            target="_blank"
            rel="noreferrer"
          >
            Karishma Garg
          </a>
        </p>
      </footer>
    </div>
  );
};

export default Layout;
