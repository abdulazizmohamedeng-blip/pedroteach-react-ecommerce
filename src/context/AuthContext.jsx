import { createContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

let AuthContext = createContext();

export function AuthProvider({ children }) {
  const [accounts, setAccounts] = useLocalStorage("accounts", []);
  const [currentUser, setCurrentUser] = useLocalStorage("currentUser", null);
  function signUp(email, password) {
    if (accounts.some((account) => account.email == email))
      return {
        success: false,
        error: "Email already exists ",
      };
    let updatatedAccounts = [...accounts, { email, password }];
    setCurrentUser({ email });
    setAccounts(updatatedAccounts);

    return { success: true };
  }

  function login(email, password) {
    let user = null;
    if (accounts.some((account) => account.email == email)) {
      user = accounts.find((account) => account.email == email);
      if (password != user.password) {
        return { success: false, error: "Email or password did`t correct" };
      }
    } else {
      return { success: false, error: "Email or password did`t correct" };
    }
    setCurrentUser({ email });
    return { success: true };
  }
  function logout() {
    localStorage.setItem("currentUser", "");
    setCurrentUser(null);
  }
  return (
    <AuthContext.Provider value={{ signUp, currentUser, logout, login }}>
      {children}
    </AuthContext.Provider>
  );
}
export default AuthContext;
