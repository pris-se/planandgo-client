import React from "react";
import { Link } from "react-router-dom";

export const NotFound = () => {

  return (
        <div className="container">
          <div className="h-screen flex flex-col items-center justify-center">
            <h1 className="text-center">Oops! You seem to be lost.</h1>
            <Link className="btn btn--primary mt-10 btn--md rounded w-60" to="/">
                Home
            </Link>
          </div>
        </div>
  );
};
