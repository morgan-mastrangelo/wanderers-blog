import errorGif from '../../assets/error.gif';
import { useEffect } from 'react';
import notFound from '../../assets/404-error.gif';

const ErrorPage = ({ notFoundPage = false }) => {
  useEffect(() => {
    document.title = notFoundPage ? 'Not Found' : 'Error';
  }, [notFoundPage]);

  return (
    <main className="flex-center-content error-container-outer">
      <div className="error-container-inner">
        <img src={notFoundPage ? notFound : errorGif} alt="" />
        <div className="error-right-part">
          <div>
            {notFoundPage
              ? 'Oops! The page you are looking for could not be found.'
              : 'Something went wrong, Try again later'}
          </div>
          <a href="/">Back to Home</a>
        </div>
      </div>
    </main>
  );
};

export default ErrorPage;
