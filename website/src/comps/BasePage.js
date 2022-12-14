/* eslint-disable no-process-env */
import React, {useCallback, useMemo} from "react";
import PropTypes from "prop-types";
import dynamic from "next/dynamic";
import {useRouter} from "next/router";
import Script from "next/script";
import ServiceModal from "./ServiceModal";

const Navbar = dynamic(() => import("@ansuzdev/nexi/dist/comps/sections/navbars/Navbar"));
const Footer = dynamic(() => import("@ansuzdev/nexi/dist/comps/sections/footers/Footer"));

const BasePage = ({path, navbar, footer, serviceModal, children}) => {
  const router = useRouter();

  const estimation = useMemo(() => {
    const hash = router.asPath?.split("#")?.[1] || "";

    const parsedHash = new URLSearchParams(hash);

    return parsedHash.get("estimation");
  }, [router.asPath]);

  const handleModalClosed = useCallback(() => {
    const newPath = router.asPath?.replace("#estimation=1", "");
    router.replace(newPath, newPath, {scroll: false});
  }, [router]);

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}');
        gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ADS}');
      `}
      </Script>

      {Boolean(navbar) && <Navbar data={navbar.attributes} active={path} />}
      <main className="min-h-[550px]">
        {children}
      </main>
      {Boolean(footer) && <Footer data={footer.attributes} />}
      <ServiceModal
        data={serviceModal}
        isOpen={Boolean(estimation)}
        onClose={handleModalClosed}
      />
    </>
  );
};

BasePage.defaultProps = {
  path: "",
  navbar: null,
  footer: null,
  serviceModal: null,
  children: null,
};

BasePage.propTypes = {
  path: PropTypes.string,
  navbar: PropTypes.object,
  footer: PropTypes.object,
  serviceModal: PropTypes.object,
  children: PropTypes.node,
};

export default BasePage;
