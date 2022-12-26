import React, { createContext, useEffect, useState } from "react";
import app from "../../firebase/firebase.config";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const auth = getAuth(app);

export const UserAuthContext = createContext();

const AuthContext = ({ children }) => {
  const [user, setUser] = useState(null);

  // sign up new user
  const signUpNewUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //log in user
  const logInUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // sign out user
  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };

  const userInfo = { user, signUpNewUser, logInUser, userSignOut };

  return (
    <UserAuthContext.Provider value={userInfo}>
      {children}
    </UserAuthContext.Provider>
  );
};

export default AuthContext;
