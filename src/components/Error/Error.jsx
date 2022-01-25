import "./Error.css";

const Error = ({ message }) => {

  return (
    <div data-cy="error" className="error-container" id="error">
      <div className="error-message">
        <p className="error-text">{message}</p>
      </div>
    </div>
  );
};

export default Error;
