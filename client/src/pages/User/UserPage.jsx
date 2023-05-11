import useLocalState from '../../utils/localState';
import UserInfo from './tabs/UserInfoTab';
import { useState, useEffect } from 'react';
import defaultPic from '../../assets/default.jpg';
import { useGlobalContext } from '../../utils/contextHook';
import { useParams } from 'react-router-dom';
import UserTabs from './tabs/UserTabs';
import UserBlogsTab from './tabs/UserBlogsTab';
import Modal from '../../components/atoms/Modal';
import Alert from '../../components/atoms/Alert';
import Spinner from '../../components/atoms/Spinner';
import { getParticularUser, deleteParticularUser } from '../../actions/user';

const UserPage = () => {
  const { user } = useGlobalContext();
  const { id, section } = useParams();
  const [isMainUser, setIsMainUser] = useState(user._id === id);
  const { alert, showAlert, loading, setLoading, hideAlert } = useLocalState();
  const [userData, setuserData] = useState({});
  const [deleteUser, setDeleteUser] = useState(false);

  const getUser = async () => {
    hideAlert();
    setLoading(true);
    const { status, data } = await getParticularUser(id);
    if (status === 'success' && data?.user) {
      setuserData(data.user);
      hideAlert();
    } else {
      showAlert({ text: data || 'there was an error', type: 'danger' });
    }
    setLoading(false);
  };

  const confirmHandler = async () => {
    hideAlert();
    setLoading(true);
    const { status, data } = await deleteParticularUser(userData._id);
    if (status === 'success') {
      setDeleteUser(false);
      setLoading(false);
      window.location = '/';
    } else {
      showAlert({ text: data || 'there was an error', type: 'danger' });
    }
    setLoading(false);
  };

  const deleteUserHandler = async () => {
    setDeleteUser(true);
  };
  const closeHandler = () => {
    setDeleteUser(false);
  };

  useEffect(() => {
    if (user._id === id) {
      setIsMainUser(true);
    }
    if (isMainUser) {
      setLoading(false);
      setuserData(user);
    } else {
      getUser();
    }
  }, [id]);

  useEffect(() => {
    if (userData && userData?.name) {
      document.title = `${userData.name} | Wanderer's Blog`;
    }
  }, [userData]);

  if (loading) {
    return <Spinner />;
  }

  if (userData) {
    return (
      <>
        {alert.show && (
          <Alert
            type={alert.type}
            display={alert.show}
            text={alert.text}
            hideAlert={hideAlert}
          />
        )}
        <main className="container flex justify-start my-20 gap-14 flex-col lg:flex-row px-4 md:px-0">
          <UserTabs
            imgUrl={defaultPic}
            isMainUser={isMainUser}
            user={userData._id}
            activeTab={section}
          />
          {section === 'user-info' ? (
            <UserInfo
              id={id}
              userdata={userData}
              isMainUser={isMainUser}
              deleteUserHandler={deleteUserHandler}
            />
          ) : (
            <UserBlogsTab blogs={userData.blogs} isPersonalPage={isMainUser} />
          )}
        </main>
        <Modal
          show={deleteUser}
          close={closeHandler}
          text="Are you confirm that you want to delete your account?"
          title=""
          confirm={confirmHandler}
        />
      </>
    );
  }
};

export default UserPage;
