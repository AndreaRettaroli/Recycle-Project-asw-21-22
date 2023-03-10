import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div>
      <h1>Oops! You seem to be lost.</h1>
      <p>Here are some helpful links:</p>
      <Link to="/">Login</Link>
      <Link to="/home">Home</Link>
    </div>
  );
};

export default NotFound;