import { useState, useEffect } from 'react';
import InputComponent from '../../components/atoms/InputComponent';
import RegisterFlowLayout from '../../components/molecules/LoginRegisterLayout/RegisterFlowLayout';
import { useGlobalContext } from '../../utils/contextHook';
import useLocalState from '../../utils/localState';
import { Link } from 'react-router-dom';
import Alert from '../../components/atoms/Alert';
import Spinner from '../../components/atoms/Spinner';
import { login } from '../../actions/auth';

const Login = () => {
  const { isLoading, user, saveUser } = useGlobalContext();
  const { alert, showAlert, loading, setLoading, hideAlert } = useLocalState();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

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
    const { email, password } = formData;
    const loginUser = { email, password };
    if (!email || !password) {
      return false;
    }
    const { status, data } = await login(loginUser);
    if (data && status === 'success') {
      if (data.message === 'Logged In') {
        showAlert({
          text: `Welcome ${data.tokenUser.username}. Redirecting to HomePage...`,
          type: 'success',
        });
        setTimeout(() => {
          window.location = '/';
        }, 2500);
      } else {
        showAlert({
          text: `${data.message}`,
          type: 'success',
        });
      }
      setFormData({ email: '', password: '' });
      saveUser(data.tokenUser);
    } else {
      showAlert({ text: data || 'there was an error', type: 'danger' });
    }
    setLoading(false);
  };

  useEffect(() => {
    document.title = "Login | Wanderer's Blog";
    if (!isLoading) {
      if (user) {
        window.location = '/';
      }
    }
  }, [isLoading]);

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
      <RegisterFlowLayout title="Login">
        <form
          action="/auth/login"
          method="POST"
          onSubmit={submitHandler}
          className={`${loading}`}
        >
          <InputComponent
            id="email"
            type="email"
            label="Email:"
            value={formData.email}
            inputHandler={inputHandler}
            placeholder="example@email.com"
            isRequired={true}
            autoComplete={true}
          />
          <InputComponent
            id="password"
            type="password"
            label="Password:"
            value={formData.password}
            inputHandler={inputHandler}
            isRequired={true}
            minLength={8}
          />
          <Link to="/user/forgot-password" className="underline text-lg">
            Forgot password?
          </Link>
          <button type="submit">{loading ? 'Submitting' : 'Login'}</button>
        </form>
      </RegisterFlowLayout>
    </>
  );
};

export default Login;
