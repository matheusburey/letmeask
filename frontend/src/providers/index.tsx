import { ReactNode } from "react";
import { AuthProvider } from "./Auth";
import { RoomProvider } from "./Room";

interface ProviderProps {
  children: ReactNode;
}

export function Providers({ children }: ProviderProps) {
  return (
    <AuthProvider>
      <RoomProvider>{children}</RoomProvider>
    </AuthProvider>
  );
}
