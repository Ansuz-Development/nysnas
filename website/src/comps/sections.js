import React from "react";
import dynamic from "next/dynamic";

const HeaderSection = dynamic(() => import("@ansuzdev/nexi/dist/comps/sections/headers/HeaderSection"));
const StatsSection = dynamic(() => import("@ansuzdev/nexi/dist/comps/sections/stats/StatsSection"));
const GallerySection = dynamic(() => import("@ansuzdev/nexi/dist/comps/sections/galleries/GallerySection"));
const PricingSection = dynamic(() => import("@ansuzdev/nexi/dist/comps/sections/pricings/PricingSection"));
const ServiceSection = dynamic(() => import("@ansuzdev/nexi/dist/comps/sections/services/ServiceSection"));
const PreviewSection = dynamic(() => import("@ansuzdev/nexi/dist/comps/sections/previews/PreviewSection"));
const QuoteSection = dynamic(() => import("@ansuzdev/nexi/dist/comps/sections/quotes/QuoteSection"));
const TextSection = dynamic(() => import("@ansuzdev/nexi/dist/comps/sections/texts/TextSection"));
const ContactSection = dynamic(() => import("./ContactSection"));

const renderSection = data => {
  switch (data.__typename) {
  case "ComponentSectionsHeaderSection":
    return <HeaderSection data={data} />;
  case "ComponentSectionsStatsSection":
    return <StatsSection data={data} />;
  case "ComponentSectionsGallerySection":
    return <GallerySection data={data} />;
  case "ComponentSectionsPricingSection":
    return <PricingSection data={data} />;
  case "ComponentSectionsServiceSection":
    return <ServiceSection data={data} />;
  case "ComponentSectionsPreviewSection":
    return <PreviewSection data={data} />;
  case "ComponentSectionsQuoteSection":
    return <QuoteSection data={data} />;
  case "ComponentSectionsContactSection":
    return <ContactSection data={data} />;
  case "ComponentSectionsTextSection":
    return <TextSection data={data} />;
  default:
    return null;
  }
};

export default renderSection;
