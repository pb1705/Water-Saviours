import { Outlet, redirect } from "react-router-dom";
import NavigationBar from "../Navigation/NavigationBar";
import { LoginContextProvider } from "../../store/login-context";
import LoginContext from "../../store/login-context";
import { useContext, useEffect, useState } from "react";
const Root = () => {
  const loginCtx = useContext(LoginContext);
  const [user, setUserState] = useState(null);
  useEffect(() => {
    const getUserData = async () => {
      // console.log('ran');
      try {
        // console.log('ran');
        const response = await fetch(
          "http://127.0.0.1:4000/auth/login/success",
          {
            method: "GET",
            credentials: "include",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "Access-Control-Allow-Credentials": true,
            },
          }
        );
        // console.log(response);
        if (response.status === 200) {
          const responseData = await response.json();

          // console.log(responseData);
          return await responseData;
        } else {
          throw new Error("Authentication Failed!");
        }
      } catch {
        redirect("/login");
      }
    };
    const dataGetter = async () => {
      const data = await getUserData();
      // console.log(data);
      return data;
    };
    dataGetter().then((data) => {
      // console.log(data);
      if (data) {
        // console.log(data);
        const email = data.user[0].username;
        const firstname = data.user[0].firstname;
        const lastname = data.user[0].lasttname;
        console.log("ran")
        setUserState({ email, firstname, lastname });
      }
    });
  }, []);
  useEffect(() => {
    const getUserData = async () => {
      
      // console.log('ran');
      if (!localStorage.getItem("token")) {
        return;
      }
      try {
        // console.log('ran');
        const response = await fetch("http://127.0.0.1:4000/auth/user", {
          method: "get",
          credentials: "include",
          headers: {
            Accept: "application/json",
            Authorization: localStorage.getItem("token"),
          },
        });
        // console.log(response);
        if (response.status === 200) {
          const responseData = await response.json();

          // console.log(responseData);
          return await responseData;
        } else {
          throw new Error("Authentication Failed!");
        }
      } catch {
        redirect("/login");
      }
    };
    getUserData()
      .then((data) => {
        console.log(data);
        if (data.user) {
          setUserState({
            email: data.user.username,
            firstname: data.user.firstname,
            lastname: data.user.lastname,
            position:data.user.position
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  // console.log(user);
  return (
    <LoginContextProvider>
      <NavigationBar user={user} setUserState={setUserState} />
      <Outlet />
    </LoginContextProvider>
  );
};
export default Root;
