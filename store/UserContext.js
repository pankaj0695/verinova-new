import React, { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    mobile: "",
    otp: "",
    name: "",
    dob: "",
    address: "",
    aadhar_url: "",
    pan_url: "",
    selfie_url: "",
    mpin: "",
    fingerprint: false,
  });

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};
