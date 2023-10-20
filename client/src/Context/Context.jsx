import { createContext, useState } from "react";

export const UserContext = createContext();
function Context({ children }) {
  const [userData, setuserData] = useState({
    user: undefined,
    token: undefined,
  });
  return (
    <UserContext.Provider value={[userData, setuserData]}>
      {children}
    </UserContext.Provider>
  );
}

export default Context;
