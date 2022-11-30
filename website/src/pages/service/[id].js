import React from "react";
import PropTypes from "prop-types";

import {getAttr, getFormatUrl, getUrl} from "@ansuzdev/nexi/dist/utils";
import SEOItem from "@ansuzdev/nexi/dist/comps/items/common/SEOItem";
import GhostImage from "@ansuzdev/nexi/dist/comps/items/images/GhostImage";
import Button from "@ansuzdev/nexi/dist/comps/items/buttons/Button";
import Link from "next/link";
import {getFooter, getNavbar, getService, getServiceModal, getServices} from "../../libs/api";
import BasePage from "../../comps/BasePage";
import CheckIcon from "../../../assets/icons/check.svg";
import NavigateIcon from "../../../assets/icons/navigate.svg";

const ServicePage = ({service, navbar, footer, serviceModal}) => {
  const serviceId = getAttr(service, "id");
  const groupId = getAttr(service, "group", "id");
  const photo = getAttr(service, "photo");
  const photoUrl = getUrl(photo, "url");
  const thumbnailUrl = getFormatUrl(photo, "thumbnail");
  const plan = getAttr(service, "plan")?.split("\n");

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

          <div className="grid xl:grid-cols-12 gap-6">
            <div className="xl:col-start-2 xl:col-span-10 py-6 bg-neutral-50">
              <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-4 lg:space-x-6 md:divide-x">
                <div className="shrink-0 px-4 xl:px-6">
                  <GhostImage
                    className="relative w-full min-w-[256px] h-full min-h-[256px]"
                    src={photoUrl}
                    layout="fill"
                    objectFit="contain"
                    objectPosition="center"
                    placeholder="blur"
                    blurDataURL={thumbnailUrl}
                  />
                </div>
                <div className="flex-1 space-y-6 px-4 lg:px-6">
                  <h5>{getAttr(service, "name")}</h5>
                  <p className="subtitle1">
                    <span>
                      Le tarif estimatif est
                    </span>
                    {" "}
                    <span className="text-secondary-600">
                      {getAttr(service, "pricing")}
                    </span>
                  </p>
                  <div className="space-y-2">
                    <label className="subtitle1">Détails:</label>
                    <ul className="space-y-1">
                      {
                        plan?.map((item, index) => (
                          // eslint-disable-next-line react/no-array-index-key
                          <li key={index} className="flex items-center space-x-2">
                            <CheckIcon className="fill-secondary-600" />
                            <span>{item.trim()}</span>
                          </li>
                        ))
                      }
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <p>
                      <span className="font-semibold">Note:</span>
                      {" "}
                      {getAttr(service, "note")}
                    </p>
                    <p>
                      Contactez-nous pour plus de détails:
                      {" "}
                      <span className="text-primary-600 font-semibold">
                        {process.env.NEXT_PUBLIC_CONTACT_PHONE}
                      </span>
                    </p>
                  </div>
                  <div className="md:flex space-y-4 md:space-y-0 md:space-x-4 md:space-x-reverse md:flex-row-reverse">
                    <Button
                      link
                      className="w-full md:w-auto"
                      href={`/contactez-nous?service=${serviceId}`}
                      label="DEMANDER UNE INTERVENTION"
                    />
                    {Boolean(groupId) && (
                      <Link
                        href={`/questionnaire/${groupId}`}
                        className="flex justify-center items-center space-x-1.5 h-12 px-3 w-full md:w-auto"
                      >
                        <NavigateIcon className="fill-black-secondary rotate-180" />
                        <span className="button2 text-black-secondary">Précédent</span>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="xl:col-start-2 xl:col-span-10">
              <div className="relative border rounded border-neutral-200 space-y-12 mt-12">
                <div className="absolute flex justify-center w-full -top-6">
                  <h4 className="bg-white px-6">
                    Bonne de savoir
                  </h4>
                </div>

                <div
                  className="ck-content p-6"
                // eslint-disable-next-line react/no-danger
                  dangerouslySetInnerHTML={{__html: getAttr(service, "description")}}
                />
              </div>
            </div>
          </div>
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
