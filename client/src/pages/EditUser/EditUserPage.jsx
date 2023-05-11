import defaultPic from '../../assets/default.jpg';
import { useEffect, useState } from 'react';
import InputComponent from '../../components/atoms/InputComponent';
import { useGlobalContext } from '../../utils/contextHook';
import useLocalState from '../../utils/localState';
import Alert from '../../components/atoms/Alert';
import Modal from '../../components/atoms/Modal';
import Spinner from '../../components/atoms/Spinner';
import { editUser } from '../../actions/user';

const EditUserPage = () => {
  const { user, saveUser } = useGlobalContext();
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    description: user.description,
  });
  const { alert, showAlert, loading, setLoading, hideAlert } = useLocalState();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const textareaElement = document.getElementById('description');
    textareaElement.style.height = 'auto';
    textareaElement.style.height = textareaElement.scrollHeight + 'px';
  }, [formData.description]);

  useEffect(() => {
    document.title = "Edit Profile | Wanderer's Blog";
  }, []);

  const inputHandler = (e) => {
    if (e.target.type === 'textarea') {
      e.target.style.height = 'auto';
      e.target.style.height = e.target.scrollHeight + 'px';
    }
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    hideAlert();
    setLoading(true);
    const { name, email, description } = formData;
    const updatedUser = { name, email, description };

    const { status, data } = await editUser(user._id, updatedUser);
    if (status === 'success' && data) {
      showAlert({
        text: `Updated ${data.user.name}'s profile. Redirecting to Profile Page...`,
        type: 'success',
      });
      saveUser(data.user);
      setInterval(() => {
        window.location = `/user/${data.user._id}/user-info`;
      }, 2000);
    } else {
      showAlert({ text: data || 'there was an error', type: 'danger' });
    }
    setLoading(false);
  };

  const resetHandler = () => {
    setShowModal(false);
    setFormData({
      name: user.name,
      email: user.email,
      description: user.description,
    });
  };

  const closeHandler = () => {
    setShowModal(false);
  };

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
      <Modal
        show={showModal}
        close={closeHandler}
        title="Delete Blog"
        text={`Are you sure you want to reset the profile?`}
        confirm={resetHandler}
      />
      {loading && <Spinner />}
      <main className="container mx-auto w-full my-16 px-4 md:px-0">
        <>
          <form
            method="patch"
            onSubmit={submitHandler}
            className={`edit-user-container ${loading} loading`}
          >
            <div className="flex-col-direction gap-4 mr-4">
              <img src={defaultPic} alt="" className="w-fit mx-auto" />
              <InputComponent
                id="name"
                name="name"
                type="text"
                label="Name: "
                value={formData.name}
                inputHandler={inputHandler}
                minLength={3}
                maxLength={50}
              />
              <InputComponent
                id="email"
                name="email"
                type="email"
                label="Email: "
                value={formData.email}
                inputHandler={inputHandler}
              />
            </div>
            <div>
              <InputComponent
                id="description"
                name="description"
                type="text"
                label="About : "
                value={formData.description}
                inputHandler={inputHandler}
                isTextArea={true}
                rows={10}
              />
              <div className="user-info-actions gap-5 mt-4">
                <button type="submit" className="w-full" value="Submit">
                  {loading ? 'Submitting' : 'Save'}
                </button>
                <button
                  className="w-full"
                  type="button"
                  onClick={() => setShowModal(true)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </>
      </main>
    </>
  );
};

export default EditUserPage;
