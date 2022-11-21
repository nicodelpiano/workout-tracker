// src/pages/_app.tsx
import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";
import type { AppType } from "next/app";
import { trpc } from "../utils/trpc";
import React from "react";

const GlobalStyles: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <div className="bg-cyan-800">{children}</div>;
};

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <GlobalStyles>
        <Component {...pageProps} />
      </GlobalStyles>
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);
