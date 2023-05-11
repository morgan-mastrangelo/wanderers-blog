import InputComponent from '../../components/atoms/InputComponent';
import { useState, useEffect } from 'react';
import RegisterFlowLayout from '../../components/molecules/LoginRegisterLayout/RegisterFlowLayout';
import useLocalState from '../../utils/localState';
import { useGlobalContext } from '../../utils/contextHook';
import Alert from '../../components/atoms/Alert';
import Spinner from '../../components/atoms/Spinner';
import { register } from '../../actions/auth';

const Register = () => {
  const { saveUser } = useGlobalContext();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const { alert, showAlert, loading, setLoading, hideAlert } = useLocalState();
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
    const { name, email, password } = formData;
    const registerUser = { name, email, password };

    const { status, data } = await register(registerUser);
    if (data && status === 'success') {
      setFormData({ name: '', email: '', password: '' });
      showAlert({
        text: `Please verify your email`,
        type: 'success',
      });
      saveUser(data.tokenUser);
    } else {
      showAlert({ text: data || 'there was an error', type: 'danger' });
    }
    setLoading(false);
  };

  useEffect(() => {
    document.title = "Register | Wanderer's Blog";
  }, []);

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
      <RegisterFlowLayout title="Register">
        <form action="/auth/register" method="post" onSubmit={submitHandler}>
          <InputComponent
            id="name"
            type="text"
            label="Name:"
            value={formData.name}
            inputHandler={inputHandler}
            minLength={2}
            maxLength={50}
            placeholder="John Doe"
          />
          <InputComponent
            id="email"
            type="email"
            label="Email:"
            value={formData.email}
            inputHandler={inputHandler}
          />
          <InputComponent
            id="password"
            type="password"
            label="Password:"
            value={formData.password}
            inputHandler={inputHandler}
          />
          <button type="submit">Sign Up</button>
        </form>
      </RegisterFlowLayout>
    </>
  );
};

export default Register;
