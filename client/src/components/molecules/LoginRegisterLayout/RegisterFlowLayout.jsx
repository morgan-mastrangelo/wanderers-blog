import LoginPageRight from './LoginPageRight';

const RegisterFlowLayout = ({ title, children }) => {
  return (
    <div className="h-screen">
      <main className="login-register-container h-screen">
        <div className="flex-col-direction justify-center w-full gap-5">
          <div className="login-register-heading">{title}</div>
          <div className="w-full">{children}</div>
        </div>
        <LoginPageRight />
      </main>
    </div>
  );
};

export default RegisterFlowLayout;
