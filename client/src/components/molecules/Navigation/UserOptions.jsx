import { Link } from 'react-router-dom';
import { useGlobalContext } from '../../../utils/contextHook';

export const UserOptions = () => {
  const { user, logoutUser } = useGlobalContext();

  return (
    <>
      <div className="rounded-md peer block py-2">
        <i className="bi bi-person-square text-white text-2xl"></i>
      </div>
      <div className="user-menu hidden peer-hover:flex hover:flex">
        <Link to={`/user/${user._id}/user-info`}>View Profile</Link>
        <button onClick={logoutUser} className="border-0 logout-button">
          Logout
        </button>
      </div>
    </>
  );
};
