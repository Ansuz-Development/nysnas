import React from "react";
import dynamic from "next/dynamic";

const ServiceSection = dynamic(() => import("@ansuzdev/nexi/dist/comps/sections/services/ServiceSection"));

const renderSection = data => {
  switch (data.__typename) {
  case "ComponentSectionsServiceSection":
    return <ServiceSection data={data} />;
  default:
    return null;
  }
};

export default renderSection;
