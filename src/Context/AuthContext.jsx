/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, setPersistence, browserSessionPersistence } from "firebase/auth";
import { auth } from "../firebase/FireBaseConfig";

const AuthContext = createContext();

export { AuthContext };

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Set Firebase to use session persistence (not permanent)
    setPersistence(auth, browserSessionPersistence)
      .then(() => {
        // Now set up the auth state listener
        const unsub = onAuthStateChanged(auth, (currentUser) => {
          setUser(currentUser);
        });
        return () => unsub();
      })
      .catch((error) => {
        console.error('Error setting auth persistence:', error);
      });
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;