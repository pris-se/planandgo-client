import React from "react";
import { Link, useLocation } from "react-router-dom";

export const BreadCrumbs = () => {
  const location = useLocation();
  const crumbs = location.pathname.split("/");
  
  return (
    <div className="breadcrumbs-wrapper">
      <ul className="breadcrumbs">
        {crumbs.map((crumb, index) => (
          <li key={index}>
              <Link to={crumb}>{crumb}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
