import { Link } from 'react-router-dom';

const UserInfo = ({ userdata, deleteUserHandler, isMainUser }) => {
  if (userdata) {
    return (
      <div
        className="border-4 p-8 w-full text-xl relative h-fit"
        data-tabname="user-info"
      >
        <h2 className="text-2xl">{userdata.name}</h2>
        {isMainUser && <div>{userdata.email}</div>}
        <section className="about-user-section">
          <h2>About:</h2>
          {userdata.description ? (
            <div className="p-7">
              <pre className="whitespace-pre-wrap">{userdata.description}</pre>
            </div>
          ) : (
            isMainUser && (
              <div className="flex-center-content">
                <p>
                  Tell us more about yourself
                  <Link
                    to={`/user/${userdata._id}/edit`}
                    className="text-indigo-400"
                  >
                    &nbsp;here!
                  </Link>
                </p>
              </div>
            )
          )}
        </section>
        {isMainUser && (
          <div className="user-info-actions">
            <Link to={`/user/${userdata._id}/edit`}>Edit Profile</Link>
            <button onClick={deleteUserHandler}>Delete Account</button>
          </div>
        )}
      </div>
    );
  }
};

export default UserInfo;
