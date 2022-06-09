import { GoogleAuthProvider, signInWithPopup, User } from "firebase/auth";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { auth } from "../../services/firebase";

interface IAuthContext {
  authUser: IUser | undefined;
  signInWithGoogle: () => Promise<void>;
}

interface IUser {
  id: string;
  name: string;
  avatar: string;
}

interface IChildrenProps {
  children: ReactNode;
}

const AuthContext = createContext({} as IAuthContext);

export const AuthUse = () => useContext(AuthContext);

export function AuthProvider({ children }: IChildrenProps) {
  const [authUser, setAuthUser] = useState<IUser>();

  const setStateuser = (user: User | null) => {
    if (user) {
      const { displayName, photoURL, uid } = user;
      if (!displayName || !photoURL) {
        throw new Error("erro");
      }

      setAuthUser({
        id: uid,
        name: displayName,
        avatar: photoURL,
      });
    }
  };

  useEffect(() => {
    auth.onAuthStateChanged(setStateuser);
  });

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();

    const { user } = await signInWithPopup(auth, provider);
    setStateuser(user);
  };

  const value = useMemo(() => ({ authUser, signInWithGoogle }), [authUser]);

  return (
    <AuthContext.Provider value={value}> {children} </AuthContext.Provider>
  );
}
