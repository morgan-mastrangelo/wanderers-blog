import { useEffect } from 'react';
import { InfoIcon, SuccessIcon, ErrorIcon } from '../vectors/alertIcons';

const Alert = ({ type, display, text, hideAlert }) => {
  const selectIcon = () => {
    switch (type) {
      case 'info':
        return <InfoIcon />;
      case 'danger':
        return <ErrorIcon />;
      case 'success':
        return <SuccessIcon />;
      default:
        break;
    }
  };

  useEffect(() => {
    setTimeout(() => {
      hideAlert();
    }, 5000);
  });

  return (
    <div className={`alert alert-${type} alert-${display}`}>
      <div className="flex gap-2 items-start">
        {selectIcon()}
        <p>{text}</p>
      </div>
      <button className="border-0 p-0">&times;</button>
    </div>
  );
};

export default Alert;
