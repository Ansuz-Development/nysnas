import React from "react";
import PropTypes from "prop-types";

import {getAttr} from "@ansuzdev/nexi/dist/utils";
import SEOItem from "@ansuzdev/nexi/dist/comps/items/common/SEOItem";
import Link from "next/link";
import {useRouter} from "next/router";
import {getFooter, getNavbar, getServiceGroup, getServiceGroups} from "../../libs/api";
import BasePage from "../../comps/BasePage";

import NavigateIcon from "../../../assets/icons/navigate.svg";
import PhoneIcon from "../../../assets/icons/phone.svg";

// eslint-disable-next-line no-process-env
const contactPhone = process.env.NEXT_PUBLIC_CONTACT_PHONE;

const QuestionPage = ({serviceGroup, navbar, footer}) => {
  const router = useRouter();

  const parentId = getAttr(serviceGroup, "parent", "id");
  const subGroups = getAttr(serviceGroup, "subGroups", "data");
  const services = getAttr(serviceGroup, "services", "data");

  return (
    <BasePage navbar={navbar} footer={footer}>
      <SEOItem
        title="Title"
        description="My description"
      />

      <section className="py-12">
        <div className="container mx-auto space-y-8">
          <h3 className="text-center">{getAttr(serviceGroup, "question")}</h3>
          <div className="grid lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 space-y-6">
              <div>
                {Boolean(services) && (
                  services.map(service => {
                    const id = getAttr(service, "id");
                    return (
                      <Link key={id} href={`/service/${id}`}>
                        <div className="flex justify-between items-center py-3 space-x-2 border-b border-neutral-200 hover:font-medium">
                          <span className="body1 text-secondary-600">
                            {getAttr(service, "answer") || getAttr(service, "name")}
                          </span>
                          <NavigateIcon className="fill-secondary-600" />
                        </div>
                      </Link>
                    );
                  })
                )}
                {Boolean(subGroups) && (
                  subGroups.map(group => {
                    const id = getAttr(group, "id");
                    return (
                      <Link key={id} href={`/questionnaire/${id}`}>
                        <div className="flex justify-between items-center py-3 space-x-2 border-b border-neutral-200 hover:font-medium">
                          <span className="body1 text-secondary-600">{getAttr(group, "name")}</span>
                          <NavigateIcon className="fill-secondary-600" />
                        </div>
                      </Link>
                    );
                  })
                )}
              </div>
              <div>
                {Boolean(parentId) && (
                  <Link href={`/questionnaire/${parentId}`}>
                    <div className="flex items-center py-2.5 space-x-2">
                      <NavigateIcon className="fill-black-secondary rotate-180" />
                      <span className="button2 text-black-secondary">Précédent</span>
                    </div>
                  </Link>
                )}
              </div>
            </div>
            <div className="lg:col-start-9 lg:col-span-4">
              <div className="border border-neutral-200 rounded p-6 space-y-4 text-center">
                <p className="body1">
                  Vous ne savez pas quoi répondre ou votre situation n'est pas décrite?
                  <br />
                  Contactez notre service client au
                </p>
                <h5>
                  <a href={`tel:${contactPhone}`} className="inline-flex items-center space-x-4">
                    <PhoneIcon className="fill-primary-900" />
                    <span className="text-primary-900">{contactPhone}</span>
                  </a>
                </h5>
              </div>
            </div>
          </div>
        </div>
      </section>
    </BasePage>
  );
};

export default QuestionPage;

QuestionPage.propTypes = {
  navbar: PropTypes.object.isRequired,
  footer: PropTypes.object.isRequired,
  serviceGroup: PropTypes.object.isRequired,
};

export const getStaticProps = async ({params}) => {
  const serviceGroup = await getServiceGroup(params.id);

  if (!serviceGroup) {
    return {notFound: true};
  }

  const navbar = (await getNavbar() || {});
  const footer = (await getFooter() || {});

  return {props: {serviceGroup, navbar, footer}};
};

export const getStaticPaths = async () => {
  const serviceGroups = await getServiceGroups();

  return {
    paths: serviceGroups?.map(serviceGroup => `/questionnaire/${getAttr(serviceGroup, "id")}`) || [],
    fallback: "blocking",
  };
};
