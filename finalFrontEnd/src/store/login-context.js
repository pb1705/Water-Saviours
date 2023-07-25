import { createContext, useState } from "react";

const LoginContext = createContext({
  user:null,
  setUser: () => {},
});

export const LoginContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const SetUser=(user)=>{
    console.log(user);
    setUser(user);
  }
  return (
    <LoginContext.Provider
      value={{ user: user, setUser: SetUser }}
    >{props.children}</LoginContext.Provider>
  );
};
export default LoginContext;
