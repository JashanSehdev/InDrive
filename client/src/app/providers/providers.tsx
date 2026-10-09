import { ReactNode } from "react";
import Snackbar from "./snackbar";
import ReduxProvider from "./redux-provider";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { MUIProvider } from "./mui";

export default function Provider({ children }: { children: ReactNode }) {
  return (
    <ReduxProvider>
      <MUIProvider>
        <Snackbar>{children}</Snackbar>
      </MUIProvider>
    </ReduxProvider>
  );
}
