import React, {useCallback, useMemo} from "react";
import PropTypes from "prop-types";
import dynamic from "next/dynamic";
import {useRouter} from "next/router";
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
      {Boolean(navbar) && <Navbar data={navbar} active={path} />}
      <main className="min-h-[500px]">
        {children}
      </main>
      {Boolean(footer) && <Footer data={footer} />}
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
