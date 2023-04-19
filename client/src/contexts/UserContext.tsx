import { createContext, useState } from "react";
import Panel from "../pages/components/Panel";
import LoginButton from "../pages/components/LoginButton";

export const UserContext = createContext<any>(null);

const UserContextProvider = (props: { children: JSX.Element }) => {
  const [currentUser, setCurrentUser] = useState<any>(null);

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      <Panel title="Welcome">
        <LoginButton />
      </Panel>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
