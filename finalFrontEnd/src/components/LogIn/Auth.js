import {
  NavLink,
  useLocation,
  Form,
  json,
  useActionData,
  redirect,
} from "react-router-dom";
import classes from "./Auth.module.css";
import { useState } from "react";
import Google from "../../SVGs/google.svg";
import Facebook from "../../SVGs/facebook.svg";
import Twitter from "../../SVGs/twitter.svg";

const Auth = () => {
  const [error,setError] = useState(false);
  const location = useLocation();
  const islogin = location.pathname === "/login";
  const actionData = useActionData();
  const googleAuth = () => {
    if(!islogin){
      actionData={message:'You cannot signup with social at present'}
      setError(true);
      return;
    }
    window.open("http://127.0.0.1:4000/auth/google", "_self");
  };

  return (
    <section className={classes.section}>
      <div className={classes.cover}>
        <div className={classes.authTypeControls}>
          <div style={{ width: "100%" }}>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive ? `${classes.active} ${classes.type}` : classes.type
              }
            >
              Log in
            </NavLink>
          </div>
          <div style={{ width: "100%" }}>
            <NavLink
              to="/signup"
              className={({ isActive }) =>
                isActive ? `${classes.active} ${classes.type}` : classes.type
              }
            >
              Sign up
            </NavLink>
          </div>
        </div>
        <div className={classes.form}>
          <Form method="post" action={`${islogin ? "/login" : "/signup"}`}>
            {!islogin && (
              <div>
                <input type="text" name="firstname" placeholder="First Name" />
              </div>
            )}
            {!islogin && (
              <div>
                <input type="text" name="lastname" placeholder="Last Name" />
              </div>
            )}
            <div>
              <input type="text" name="username" placeholder="Username" />
            </div>
            <div>
              <input type="text" name="position" placeholder="Position" />
            </div>
            <div>
              <input type="text" name="location" placeholder="location/SerialNumber" />
            </div>
            <div>
              <input type="password" name="password" placeholder="Password" />
            </div>

            {islogin && (
              <div className={classes.forgotpassword}>
                <a>Forgot Password?</a>
              </div>
            )}
            <div className={classes.action}>
              <button>{islogin ? "Login" : "Create An Account"}</button>
            </div>
          </Form>
          {actionData && actionData.message && (
            <div style={{ color: "red", margin: "10px", textAlign: "center" }}>
              {actionData.message}
            </div>
          )}
          <div>
            <div className={classes.seprator}>
              <p>or connect with </p>
            </div>
            <div className={classes.social}>
              <div>
                <a>
                  <img src={Facebook} alt="Facebook-logo"></img>
                </a>
              </div>
              <div>
                <a href="#" onClick={googleAuth}>
                  <img src={Google} alt="Google-logo"></img>
                </a>
              </div>
              <div>
                <a>
                  <img src={Twitter} alt="Twitter-logo"></img>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export const authAction = async ({ request }) => {
  const formData = await request.formData();
  const isLogin = request.url.includes("login");
  let mode;
  let userCreds;
  if (isLogin) {
    mode = "login";
    userCreds = {
      username: formData.get("username"),
      position: formData.get("position"),
      password: formData.get("password"),
    };
  } else {
    mode = "signup";
    userCreds = {
      username: formData.get("username"),
      position:formData.get('position'),
      password: formData.get("password"),
      firstname: formData.get("firstname"),
      lastname: formData.get("lastname"),
      location: formData.get("location"),
      
    };
  }
  console.log(userCreds);
  const response = await fetch("http://localhost:4000/auth/" + mode, {
    method: "POST",
    headers:{
      'Content-Type':'application/json'
    },
    body: JSON.stringify(userCreds),
  });
  if (response.status === 401) {
    return response;
  }
  if (!response.ok) {
    throw new Error("Internal Server Error");
  }
  const data = await response.json();
  console.log(data);
  localStorage.setItem("token", data.token);
  
  return redirect("/");
};

export default Auth;
