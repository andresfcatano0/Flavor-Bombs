import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import UserContext from '../context/AuthContext';
import "./NotFoundPage.css"

export default function NotFoundPage() {
    const user = useContext(UserContext);
  return (
    <div
      className="mt-5 mx-2"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div class="notfound">
        <div class="notfound-404">
          <h1>
            4 <span></span> 4
          </h1>
        </div>
        <h2>Oops! Page Not Be Found</h2>
        <p>
          Sorry but the page you are looking for does not exist, have been
          removed. name changed or is temporarily unavailable
        </p>
        {user.userData.roles[0].authority === "ROLE_ADMIN" ? (
          <Link to="/admin/dashboard-menu">Back to homepage</Link>
        ) : (
          <Link to="/">Back to homepage</Link>
        )}
      </div>
    </div>
  );
}
