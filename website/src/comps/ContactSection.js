import React, {useCallback, useState} from "react";
import PropTypes from "prop-types";
import {getAttr, getFormatUrl, getUrl} from "@ansuzdev/nexi/dist/utils";
import {GoogleReCaptchaProvider} from "react-google-recaptcha-v3";

import GhostImage from "@ansuzdev/nexi/dist/comps/items/images/GhostImage";
import Button from "@ansuzdev/nexi/dist/comps/items/buttons/Button";
import ContactForm from "./ContactForm";

const ContactSection = ({data}) => {
  const title = getAttr(data, "title");
  const subtitle = getAttr(data, "subtitle");
  const successTitle = getAttr(data, "successTitle");
  const successMessage = getAttr(data, "successMessage");
  const successLink = getAttr(data, "successLink");
  const links = getAttr(data, "links");

  const photo = getAttr(data, "photo");
  const photoUrl = getUrl(photo);
  const thumbnailUrl = getFormatUrl(photo, "thumbnail");

  const [success, setSuccess] = useState(false);

  const onSuccess = useCallback(() => {
    window.scrollTo({top: 0, behavior: "smooth"});
    setSuccess(true);
  }, []);

  return (
    <section className="py-12">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-6 lg:min-h-[500px]">
          <div className="space-y-8">
            {success
              ? (
                <>
                  <div className="space-y-6">
                    {Boolean(successTitle) && (
                      <h3>{successTitle}</h3>
                    )}
                    {Boolean(successMessage) && (
                      <p className="successMessage1 text-black-secondary">
                        {successMessage}
                      </p>
                    )}
                  </div>
                  <div className="space-y-4">
                    {
                      Boolean(successLink) && (
                        <Button
                          link
                          className="w-full"
                          href={getAttr(successLink, "link")}
                          label={getAttr(successLink, "title")}
                        />
                      )
                    }

                    <Button
                      link
                      href="#estimation=1"
                      type="outline"
                      className="w-full"
                      label="ESTIMATION INTERVENTION"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-6">
                    {Boolean(title) && (
                      <h3>{title}</h3>
                    )}
                    {Boolean(subtitle) && (
                      <p className="subtitle1 text-black-secondary">{subtitle}</p>
                    )}
                  </div>
                  <div>
                    <GoogleReCaptchaProvider
                          // eslint-disable-next-line no-process-env
                      reCaptchaKey={process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_API_KEY}
                      language="fr"
                      scriptProps={{
                        async: false,
                        defer: false,
                        appendTo: "head",
                        nonce: undefined,
                      }}
                    >
                      <ContactForm onSuccess={onSuccess} />
                    </GoogleReCaptchaProvider>
                  </div>
                </>
              )}
          </div>
          <div className="hidden lg:block">
            <GhostImage
              className="relative w-full h-full"
              imgClassName="bg-contain bg-no-repeat"
              layout="fill"
              alt="Contact background"
              src={photoUrl}
              loading="lazy"
              placeholder="blur"
              blurDataURL={thumbnailUrl}
              objectFit="contain"
              objectPosition="center top"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

ContactSection.propTypes = {data: PropTypes.object.isRequired};

export default ContactSection;
