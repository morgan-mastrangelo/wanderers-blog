import { Link } from 'react-router-dom';

const LoginPageRight = () => {
  return (
    <div className="login-page-bg w-full rounded-r-2xl relative flex-center-content">
      <div className="login-page-bg-overlay absolute-fill opacity-[.6] z-[1] rounded-r-2xl"></div>
      <div className="z-10 absolute flex-col-direction gap-6 p-6">
        <p className="text-3xl">Experience other people's travel journey</p>
        <Link
          to="/"
          className="border px-3 py-1 text-xl mx-auto w-full text-center"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default LoginPageRight;
