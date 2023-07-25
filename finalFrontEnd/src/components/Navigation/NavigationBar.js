import classes from "./NavigationBar.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import LoginContext from "../../store/login-context";
import { useContext } from "react";
const NavigationBar = (props) => {
  // const ctxLogin = useContext(LoginContext);
  // console.log(ctxLogin.user)
  // const isLoginned = localStorage.getItem('token');
  const navigate = useNavigate();
  const logoutHandler = async () => {
    try {
      const response = await fetch("http://127.0.0.1:4000/logout");
      props.setUserState(null);
      navigate("/login");
      localStorage.removeItem("token");
    } catch {}
  };
  // console.log(props.user);
  let url = "/";
  if (props.user) {
    if (props.user.position === "WUC") {
      url = "/dashboardWUC";
    } else if (props.user.position === "WMC") {
      url = "/dashboardWMC";
    } else if (props.user.position === "NGO") {
      url = "/dashboardNGO";
    } else if (props.user.position === "PC") {
      url = "/dashboardPC";
    } else if (props.user.position === "GOV") {
      url = "/dashboardGOV";
    } else if (props.user.position === "Gram") {
      url = "/dashboardGram";
    }
  }
  return (
    <>
      <nav className={classes.nav}>
        <div className={classes.brand}>
          <NavLink to="/">
            <span></span>
            <h1>Dhulikona</h1>
          </NavLink>
        </div>
        <div>
          <ul className={classes.ul}>
            <li>
              <NavLink
                className={({ isActive }) => (isActive ? classes.active : null)}
                to="/"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/grievances"
                className={({ isActive }) => (isActive ? classes.active : null)}
              >
                Grievances
              </NavLink>
            </li>

            {props.user && (
              <li>
                <NavLink
                  to={url}
                  className={({ isActive }) =>
                    isActive ? classes.active : null
                  }
                >
                  Dashboard
                </NavLink>
              </li>
            )}
            <li>
              {!props.user && (
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive ? classes.active : null
                  }
                >
                  Login
                </NavLink>
              )}
            </li>
            <li>
              {props.user && (
                <button className={classes.logout} onClick={logoutHandler}>
                  Logout
                </button>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};
export default NavigationBar;
