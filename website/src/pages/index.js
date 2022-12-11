import React from "react";
import PropTypes from "prop-types";

import {getAttr} from "@ansuzdev/nexi/dist/utils";
import SEOItem from "@ansuzdev/nexi/dist/comps/items/common/SEOItem";
import {getFooter, getHomepage, getNavbar, getServiceModal} from "../libs/api";
import renderSection from "../comps/sections";
import BasePage from "../comps/BasePage";

const HomePage = ({homepage, navbar, footer, serviceModal}) => (
  <BasePage path="/" navbar={navbar} footer={footer} serviceModal={serviceModal}>
    <SEOItem
      title="HESTIA ECO BAT - Rénovation et dépannage de l'habitat"
      description="HESTIA ECO BAT - Rénovation et dépannage de l'habitat - plomberie, électricité, chauffage, salle de bain, cuisine, rénovation complète - Des professionnels et des garanties"
    />

    {getAttr(homepage, "sections")?.map((section, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <div key={`${section.__typename}-${index}`}>
        {renderSection(section)}
      </div>
    ))}
  </BasePage>
);

export default HomePage;

HomePage.propTypes = {
  navbar: PropTypes.object.isRequired,
  footer: PropTypes.object.isRequired,
  homepage: PropTypes.object.isRequired,
  serviceModal: PropTypes.object.isRequired,
};

export const getStaticProps = async () => {
  const homepage = (await getHomepage() || {});
  const navbar = (await getNavbar() || {});
  const footer = (await getFooter() || {});
  const serviceModal = (await getServiceModal() || {});

  return {props: {homepage, navbar, footer, serviceModal}};
};
