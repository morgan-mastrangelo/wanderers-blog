const Spinner = () => {
  return (
    <>
      <div className="spinner-backdrop absolute-fill fixed"></div>
      <div className="absolute-center z-[101]">
        <div className="lds-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </>
  );
};

export default Spinner;
