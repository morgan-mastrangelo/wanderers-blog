const InputComponent = ({
  id,
  type,
  label,
  value,
  inputHandler,
  minLength,
  maxLength,
  isTextArea,
  isRequired,
  placeholder,
  rows,
  autoComplete,
}) => {
  return (
    <div className="flex-col-direction gap-2">
      <label htmlFor={id} className="text-xl">
        {label}
      </label>
      {isTextArea ? (
        <textarea
          id={id}
          name={id}
          value={value}
          onChange={inputHandler}
          required={isRequired}
          placeholder={placeholder}
          rows={rows}
          className="text-black p-4 text-lg"
        />
      ) : (
        <input
          type={type}
          name={id}
          id={id}
          required={isRequired}
          value={value}
          onInput={inputHandler}
          minLength={minLength ? minLength : 0}
          maxLength={maxLength ? maxLength : 100}
          placeholder={placeholder}
          className="text-black py-1 text-lg px-3"
          autoComplete={autoComplete ? 'on' : 'off'}
        />
      )}
    </div>
  );
};

export default InputComponent;
