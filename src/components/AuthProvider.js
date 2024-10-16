import { createContext, useContext, useEffect, useState } from "react";
import supabase from "../supabase.js";

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

/**
 * signs the user out
 */
const signOut = () => supabase.auth.signOut();

/**
 * Logs user in
 * @param {*} email user email
 * @param {*} password user password
 */
const login = (email, password) =>
  supabase.auth.signInWithPassword({ email, password });



const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    setLoading(true);

    /**
     * Gets the user data from local storage
     */
    const getUser = async () => {
      const {data} = await supabase.auth.getUser();
      const {user: currentUser} = data;
      setUser(currentUser ?? null);
      setLoading(false);
    };
    getUser();

    /**
     * update local storage when session changes
     */
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN") {
        setUser(session.user);
        setAuth(true);
      } else if (event === "SIGNED_OUT") {
        setUser(null);
        setAuth(false);
      }
    });
    return () => {
      data.subscription.unsubscribe();
    };
  }, []);



  return (
    <AuthContext.Provider value={{ user, login, signOut }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;