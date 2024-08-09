
import { NavLink } from 'react-router-dom';
import './PageNotFound.css';

export default function PageNotFound() {
  return (
    <div className="page-not-found-container">
      <div className="error-message">
        <span className="error-code">4</span>
        <div className="pokeball"></div>
        <span className="error-code">4</span>
      </div>
      <p className="error-text">Page not found</p>
      <NavLink to="/" className="go-home-link">Go To Home Page</NavLink>
    </div>
  );
}