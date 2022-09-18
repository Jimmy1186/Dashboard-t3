// src/pages/_app.tsx
import { withTRPC } from "@trpc/next";
import type { AppRouter } from "../server/router";
import type { AppType } from "next/dist/shared/lib/utils";
import superjson from "superjson";
import { SessionProvider } from "next-auth/react";
import "../styles/globals.css";
import Navbar from "../components/layout/Navbar";
import { useState } from "react";
import GlassContainer from "../components/layout/GlassContainer";
import NavBtn from "../components/tools/NavBtn";
import Head from "next/head";

const MyApp: AppType = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const [navState, setNavState] = useState<boolean>(false);
  const [pageIndex, setPageIndex] = useState<number>(0);

  return (
    <>
    <Head>
      <link rel="shortcut icon" href="/favicon.ico" />
    </Head>
    <SessionProvider session={session}>
    
      <NavBtn navState={navState} setNavState={setNavState} />
      <Navbar
        navState={navState}
        setNavState={setNavState}
        pageIndex={pageIndex}
        setPageIndex={setPageIndex}
      />
      <GlassContainer>
        <Component {...pageProps} />
      </GlassContainer>
    </SessionProvider>
    </>
    
  );
};

const getBaseUrl = () => {
  if (typeof window !== undefined) return ""; // browser should use relative url
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url
  return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
};

export default withTRPC<AppRouter>({
  config() {
    /**
     * If you want to use SSR, you need to use the server's full URL
     * @link https://trpc.io/docs/ssr
     */
    const url = `${getBaseUrl()}/api/trpc`;

    return {
      url,
      transformer: superjson,
      /**
       * @link https://react-query.tanstack.com/reference/QueryClient
       */
      // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
    };
  },
  /**
   * @link https://trpc.io/docs/ssr
   */
  ssr: false,
})(MyApp);
