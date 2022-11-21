import React from "react";
import PropTypes from "prop-types";

import {getAttr} from "@ansuzdev/nexi/dist/utils";
import SEOItem from "@ansuzdev/nexi/dist/comps/items/common/SEOItem";
import Button from "@ansuzdev/nexi/dist/comps/items/buttons/Button";
import {getHomepage} from "../libs/api";
import renderSection from "../comps/sections";

const HomePage = ({homepage}) => (
  <div className="container">
    <SEOItem
      title="Title"
      description="My description"
    />

    <div>
      <h1>Hello world</h1>
      <Button
        label="Click me 3"
      />
    </div>

    {getAttr(homepage, "sections")?.map((section, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <div key={`${section.__typename}-${index}`}>
        {renderSection(section)}
      </div>
    ))}
  </div>
);

export default HomePage;

HomePage.propTypes = {homepage: PropTypes.object.isRequired};

export const getStaticProps = async () => {
  const homepage = (await getHomepage() || {});

  return {props: {homepage}};
};
