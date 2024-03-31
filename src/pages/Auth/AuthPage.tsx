import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { ReactComponent as Logo } from "../../assets/img/logo.svg";

export const AuthPage = () => {
  const [isRegister, setIsRegister] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    if (isRegister) {
      navigate("/auth/register");
    } else {
      navigate("/auth");
    }
  }, [isRegister]);


  return (
    <section className="section">
      <div className="container">
        <div className="flex justify-center color-primary mb-14">
          <Logo />
        </div>
        <div className="max-w-[360px] mx-auto">
          <label className="switch">
            <input
              type="checkbox"
              checked={isRegister}
              onChange={() => setIsRegister(!isRegister)}
            />
            <div className="slider">
              <span className="switch-value">Log in</span>
              <span className="switch-value">Sign Up</span>
            </div>
          </label>
          <Outlet />
        </div>
      </div>
    </section>
  );
};
