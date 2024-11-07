import "./styles.css";

const LoadingSpinner = () => {
  return (
    <div className="loading-wrapper">
      <div className="spinner"></div>
      <div className="flex items-center">
        <div className="loading-wave">
          <span>L</span>
          <span>o</span>
          <span>a</span>
          <span>d</span>
          <span>i</span>
          <span>n</span>
          <span>g</span>
        </div>
        <p className="text-[#007acc] text-xl">....</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
