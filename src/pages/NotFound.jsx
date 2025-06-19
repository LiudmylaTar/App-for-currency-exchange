import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div>
      <p>404...Not Found Page</p>
      <Link to="/">Return Home Page</Link>
    </div>
  );
}
export default NotFound;
