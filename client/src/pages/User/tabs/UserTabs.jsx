import { Link } from 'react-router-dom';

const UserTabs = ({ imgUrl, isMainUser, user, activeTab }) => {
  return (
    <div className="w-fit static lg:sticky h-fit top-14">
      <img src={imgUrl} alt="" className="mb-5 h-96 w-[32rem] max-w-sm" />
      <div className="flex-col-direction items-start text-xl gap-3 user-tabs">
        <Link
          to={`/user/${user}/user-info`}
          className={`border-0 ${activeTab === 'user-info' && 'active'}`}
        >
          Profile
        </Link>
        <Link
          to={`/user/${user}/user-blogs`}
          className={`border-0 ${activeTab === 'user-blogs' && 'active'}`}
        >
          Blogs
        </Link>
        {isMainUser && <Link to="/user/forgot-password">Change password</Link>}
      </div>
    </div>
  );
};

export default UserTabs;
