import React from "react";
import PropTypes from "prop-types";
import dynamic from "next/dynamic";

const Navbar = dynamic(() => import("@ansuzdev/nexi/dist/comps/sections/navbars/Navbar"));
const Footer = dynamic(() => import("@ansuzdev/nexi/dist/comps/sections/footers/Footer"));

const BasePage = ({path, navbar, footer, children}) => (
  <>
    {Boolean(navbar) && <Navbar data={navbar} active={path} />}
    {children}
    {Boolean(footer) && <Footer data={footer} />}
  </>
);

BasePage.defaultProps = {
  path: "",
  navbar: null,
  footer: null,
  children: null,
};

BasePage.propTypes = {
  path: PropTypes.string,
  navbar: PropTypes.object,
  footer: PropTypes.object,
  children: PropTypes.node,
};

export default BasePage;
