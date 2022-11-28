import React from "react";
import PropTypes from "prop-types";

import {getAttr} from "@ansuzdev/nexi/dist/utils";
import SEOItem from "@ansuzdev/nexi/dist/comps/items/common/SEOItem";
import {getFooter, getNavbar, getService, getServiceModal, getServices} from "../../libs/api";
import BasePage from "../../comps/BasePage";

const ServicePage = ({service, navbar, footer, serviceModal}) => {
  const groupId = getAttr(service, "group", "id");
  const photo = getAttr(service, "photo");

  return (
    <BasePage
      navbar={navbar}
      footer={footer}
      serviceModal={serviceModal}
    >
      <SEOItem
        title={getAttr(service, "name")}
        description={getAttr(service, "note")}
      />

      <section className="py-12">
        <div className="container mx-auto space-y-8">
          <h3 className="text-center">{getAttr(service, "name")}</h3>
        </div>
      </section>
    </BasePage>
  );
};

export default ServicePage;

ServicePage.propTypes = {
  navbar: PropTypes.object.isRequired,
  footer: PropTypes.object.isRequired,
  service: PropTypes.object.isRequired,
  serviceModal: PropTypes.object.isRequired,
};

export const getStaticProps = async ({params}) => {
  const service = await getService(params.id);

  if (!service) {
    return {notFound: true};
  }

  const navbar = (await getNavbar() || {});
  const footer = (await getFooter() || {});
  const serviceModal = (await getServiceModal() || {});

  return {props: {service, navbar, footer, serviceModal}};
};

export const getStaticPaths = async () => {
  const services = await getServices();

  return {
    paths: services?.map(service => `/service/${getAttr(service, "id")}`) || [],
    fallback: "blocking",
  };
};
