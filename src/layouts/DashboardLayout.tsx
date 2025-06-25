import { ReactNode } from "react";
import Topbar from "../components/Topbar";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <main className="flex-1 flex flex-col">
      <Topbar />
      <div className="flex-1 p-6 overflow-auto">{children}</div>
    </main>
  );
}
