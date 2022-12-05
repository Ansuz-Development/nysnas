import React from "react";
import Head from "next/head";

import "../styles/index.scss";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "@ansuzdev/nexi/dist/scss/gs001.scss";
import "@ansuzdev/nexi/dist/scss/ps001.scss";
import "@ansuzdev/nexi/dist/scss/select001.scss";

const MyApp = ({Component, pageProps}) => (
  <>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Head>
    <Component {...pageProps} />
  </>
);

export default MyApp;
