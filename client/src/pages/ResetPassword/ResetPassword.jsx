import { useState, useEffect } from 'react';
import InputComponent from '../../components/atoms/InputComponent';
import useLocalState from '../../utils/localState';
import Alert from '../../components/atoms/Alert';
import { useLocation } from 'react-router-dom';
import { resetPassword } from '../../actions/auth';
import Spinner from '../../components/atoms/Spinner';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const ResetPassword = () => {
  const query = useQuery();
  const { alert, showAlert, loading, setLoading, hideAlert } = useLocalState();
  const [formData, setFormData] = useState({
    password: '',
  });

  useEffect(() => {
    document.title = "Reset Password | Wanderer's Blog";
  }, []);

  const inputHandler = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    hideAlert();
    setLoading(true);
    const { password } = formData;
    const resetUser = {
      token: query.get('token'),
      email: query.get('email'),
      password,
    };

    const { status, data } = await resetPassword(resetUser);
    if (data && status === 'success') {
      setFormData({ password: '' });
      showAlert({
        text: `Password updated. Redirecting to Login Page...`,
        type: 'success',
      });
      setInterval(() => {
        window.location = '/login';
      }, 2000);
    } else {
      showAlert({ text: data || 'there was an error', type: 'danger' });
    }
    setLoading(false);
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
      {loading && <Spinner />}
      <div className="container mx-auto w-fit absolute-center">
        <h2 className="text-4xl mb-7">Reset password</h2>
        <form
          action=""
          method="post"
          onSubmit={submitHandler}
          className={`flex-col-direction forgot-password-form ${loading}`}
        >
          <InputComponent
            id="password"
            isRequired={true}
            type="password"
            label="Password : "
            value={formData.password}
            inputHandler={inputHandler}
          />
          <button type="submit" className="text-xl mt-6">
            {loading ? 'Submitting' : 'Submit'}
          </button>
        </form>
      </div>
    </>
  );
};

export default ResetPassword;
