import React, { createContext, useEffect, useState } from "react";
import app from "../firebase/firebase.config";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const UserAuthContext = createContext();

 const events = [
   {
     title: "hello world",
     start: new Date(2022, 12, 29),
     end: new Date(2022, 12, 30),
   },
 ];
const AuthContext = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
  const [allEvent, setAllEvent] = useState(events);

  // sign up new user
  const signUpNewUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //log in user
  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // user name update
  const updateName = (name) => {
    setLoading(true);
    return updateProfile(auth.currentUser, { displayName: name });
  };

  // google login system
  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };

  const handleAddEvent = () => {

    setAllEvent([...allEvent, newEvent]);

    // setNewEvent({...newEvent });
    console.log(newEvent);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setLoading(false);
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

  const userInfo = {
    user,
    signUpNewUser,
    signInUser,
    userSignOut,
    updateName,
    setLoading,
    loading,
    googleSignIn,
    handleAddEvent,
    setNewEvent,
    newEvent,
    allEvent,
    setAllEvent,
  };

  return (
    <UserAuthContext.Provider value={userInfo}>
      {children}
    </UserAuthContext.Provider>
  );
};

export default AuthContext;
