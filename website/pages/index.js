import React from "react";

import SEOItem from "@ansuzdev/nexi/dist/comps/items/common/SEOItem";
import Button from "@ansuzdev/nexi/dist/comps/items/buttons/Button";

const HomePage = () => (
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
  </div>
);

export default HomePage;
