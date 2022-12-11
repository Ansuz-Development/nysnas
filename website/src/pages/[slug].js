import React from "react";
import PropTypes from "prop-types";

import {getAttr} from "@ansuzdev/nexi/dist/utils";
import SEOItem from "@ansuzdev/nexi/dist/comps/items/common/SEOItem";
import {getFooter, getNavbar, getPageBySlug, getPages, getServiceModal} from "../libs/api";
import renderSection from "../comps/sections";
import BasePage from "../comps/BasePage";

const SlugPage = ({page, navbar, footer, serviceModal}) => (
  <BasePage
    path={`/${getAttr(page, "slug")}`}
    navbar={navbar}
    footer={footer}
    serviceModal={serviceModal}
  >
    <SEOItem
      title={`${getAttr(page, "title")} - HESTIA ECO BAT - Rénovation et dépannage de l'habitat`}
      description="HESTIA ECO BAT - Rénovation et dépannage de l'habitat - plomberie, électricité, chauffage, salle de bain, cuisine, rénovation complète - Des professionnels et des garanties"
    />

    {getAttr(page, "sections")?.map((section, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <div key={`${section.__typename}-${index}`}>
        {renderSection(section)}
      </div>
    ))}
  </BasePage>
);

export default SlugPage;

SlugPage.propTypes = {
  navbar: PropTypes.object.isRequired,
  footer: PropTypes.object.isRequired,
  page: PropTypes.object.isRequired,
  serviceModal: PropTypes.object.isRequired,
};

export const getStaticProps = async ({params}) => {
  const page = await getPageBySlug(params.slug);

  if (!page) {
    return {notFound: true};
  }

  const navbar = (await getNavbar() || {});
  const footer = (await getFooter() || {});
  const serviceModal = (await getServiceModal() || {});

  return {props: {page, navbar, footer, serviceModal}};
};

export const getStaticPaths = async () => {
  const pages = await getPages();

  return {
    paths: pages?.map(page => `/${getAttr(page, "slug")}`) || [],
    fallback: "blocking",
  };
};
