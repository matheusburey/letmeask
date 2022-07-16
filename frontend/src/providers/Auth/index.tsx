import { GoogleAuthProvider, signInWithPopup, User } from "firebase/auth";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";


interface IAuthContext {
  user: IUser | undefined;
  signInWithGoogle: () => Promise<void>;
}

interface IUser {
  id: string;
  name: string;
  avatar?: string;
}

interface IChildrenProps {
  children: ReactNode;
}

const AuthContext = createContext({} as IAuthContext);

export const AuthUse = () => useContext(AuthContext);

export function AuthProvider({ children }: IChildrenProps) {
  const [user, setUser] = useState<IUser>();

  const setStateuser = (user: User | null) => {
    if (user) {
      const { displayName, photoURL, uid } = user;
      setUser({
        id: uid,
        name: displayName || "User",
        avatar: photoURL || undefined,
      });
    }
  };

  useEffect(() => {
    // const unsubscribe = auth.onAuthStateChanged(setStateuser);
    // return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    await signInWithGoogle();
    const provider = new GoogleAuthProvider();
    // const { user } = await signInWithPopup(auth, provider);
    // setStateuser(user);
  };

  const value = useMemo(() => ({ user, signInWithGoogle }), [user]);

  return (
    <AuthContext.Provider value={value}> {children} </AuthContext.Provider>
  );
}
