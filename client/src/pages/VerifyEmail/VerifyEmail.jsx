import { useLocation, Link } from 'react-router-dom';
import { useGlobalContext } from '../../utils/contextHook';
import { useState, useEffect } from 'react';
import Spinner from '../../components/atoms/Spinner';
import { verifyEmail } from '../../actions/auth';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const VerifyEmail = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const { isLoading } = useGlobalContext();
  const query = useQuery();

  const verifyToken = async () => {
    setLoading(true);
    const formData = {
      verificationToken: query.get('token'),
      email: query.get('email'),
    };
    const { status, data } = await verifyEmail(formData);
    if (status === 'success') {
      setMessage(data.status);
    } else {
      setError(true);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!isLoading) {
      verifyToken();
    }
  }, [isLoading]);

  useEffect(() => {
    document.title = `Verify Email`;
  }, []);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <div className="absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 text-2xl">
        There was an error, please double check your verification link.
      </div>
    );
  }

  return (
    <div className="absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4">
      <h2 className="text-3xl mb-4">{message}</h2>
      <p className="text-2xl">
        Please{' '}
        <Link to="/login" className="text-indigo-400">
          Login
        </Link>
      </p>
    </div>
  );
};

export default VerifyEmail;
