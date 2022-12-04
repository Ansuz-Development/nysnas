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

  const photo = getAttr(data, "photo");
  const photoUrl = getUrl(photo);
  const thumbnailUrl = getFormatUrl(photo, "thumbnail");

  const [success, setSuccess] = useState(false);

  const onSuccess = useCallback(() => {
    setSuccess(true);
  }, []);

  return (
    <section className="py-12">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <div className="space-y-8">
              {
                success
                  ? (
                    <>
                      <div className="space-y-6">
                        {Boolean(successTitle) && (
                          <h3>{successTitle}</h3>
                        )}
                        {Boolean(successMessage) && (
                          <p className="successMessage1 text-black-secondary">
                            {subtitle}
                          </p>
                        )}
                      </div>
                      <div>
                        {
                          Boolean(successLink) && (
                            <Button
                              link
                              href={getAttr(successLink, "link")}
                              label={getAttr(successLink, "title")}
                            />
                          )
                        }
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
                  )
              }
            </div>
          </div>
          <div className="hidden md:block">
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
