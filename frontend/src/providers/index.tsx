import { ReactNode } from "react";

import { AuthProvider } from "./Auth";
import { RoomProvider } from "./Room";

interface IProviderProps {
  children: ReactNode;
}

export function Providers({ children }: IProviderProps) {
  return (
    <AuthProvider>
      <RoomProvider>{children}</RoomProvider>
    </AuthProvider>
  );
}
