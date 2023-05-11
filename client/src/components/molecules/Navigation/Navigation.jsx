import { Link } from 'react-router-dom';
import { useGlobalContext } from '../../../utils/contextHook';
import { UserOptions } from './UserOptions';

const Navigation = () => {
  const { user } = useGlobalContext();

  return (
    <nav className="sticky top-0 z-50 w-full px-4 h-12">
      <div className="container mx-auto flex-justify-between items-center relative">
        <Link to="/" className="text-xl">
          Wanderer's Blog
        </Link>
        {user ? (
          <UserOptions />
        ) : (
          <div className="register-options py-3">
            <Link to="/login">Login</Link>
            <Link to="/register">Sign up</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
