import type { ReactNode } from "react";
import Sidebar from "../ui/sidebar/sidebar";
import styles from "./layout.module.css";

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className={styles.layout}>
      <Sidebar />
      <main className={styles.main}>{children}</main>
    </div>
  );
}