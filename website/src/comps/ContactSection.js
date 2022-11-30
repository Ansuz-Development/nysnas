import React, {useMemo} from "react";
import PropTypes from "prop-types";
import {getAttr, getFormatUrl, getUrl} from "@ansuzdev/nexi/dist/utils";
import TextField from "@ansuzdev/nexi/dist/comps/items/inputs/TextField";
import Select from "@ansuzdev/nexi/dist/comps/items/inputs/Select";
import Button from "@ansuzdev/nexi/dist/comps/items/buttons/Button";
import {useForm} from "react-hook-form";
import useSWR from "swr";

import GhostImage from "@ansuzdev/nexi/dist/comps/items/images/GhostImage";
import {useRouter} from "next/router";
import DateIcon from "../../assets/icons/date.svg";
import TimeIcon from "../../assets/icons/time.svg";
import {fetcher} from "../helpers/utils";

const ContactSection = ({data}) => {
  const title = getAttr(data, "title");
  const subtitle = getAttr(data, "subtitle");

  const photo = getAttr(data, "photo");
  const photoUrl = getUrl(photo);
  const thumbnailUrl = getFormatUrl(photo, "thumbnail");

  const router = useRouter();

  const {data: services, error} = useSWR(
    router.isReady ? "/api/service" : null,
    fetcher,
  );

  const options = useMemo(() => {
    if (services && Array.isArray(services)) {
      return services.map(service => ({
        value: getAttr(service, "id"),
        label: getAttr(service, "name"),
      }));
    }

    return [];
  }, [services]);

  const {
    register,
    handleSubmit,
    formState: {errors},
    setValue,
    getValues,
  } = useForm();

  return (
    <section className="py-12">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <div className="space-y-8">
              <div className="space-y-6">
                {Boolean(title) && (
                  <h3>{title}</h3>
                )}
                {Boolean(subtitle) && (
                  <p className="subtitle1 text-black-secondary">{subtitle}</p>
                )}
              </div>
              <div className="space-y-8">
                <div className="grid grid-cols-2 gap-3">
                  <div className="col-span-2">
                    <TextField
                      label="Votre nom"
                      placeholder="Votre nom"
                    />
                  </div>
                  <div>
                    <TextField
                      label="Email"
                      placeholder="Email"
                    />
                  </div>
                  <div>
                    <TextField
                      label="Téléphone"
                      placeholder="Numéro de téléphone"
                    />
                  </div>
                  <div className="col-span-2">
                    <TextField
                      label="Adresse"
                      placeholder="Adresse"
                    />
                  </div>
                  <div className="col-span-2">
                    <TextField
                      label="Code postale"
                      placeholder="Code postale"
                    />
                  </div>
                  <div className="col-span-2">
                    <Select
                      label="Service"
                      size="medium"
                      color="primary"
                      placeholder="Service"
                      options={options}
                    />
                  </div>
                  <div>
                    <TextField
                      type="date"
                      label="Date de visite"
                      placeholder="Date de visite"
                      lefticon={<DateIcon className="fill-current" />}
                    />
                  </div>
                  <div>
                    <TextField
                      type="time"
                      label="Heure de visite"
                      placeholder="Heure de visite"
                      lefticon={<TimeIcon className="fill-current" />}
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <Button
                    className="w-full"
                    label="ENVOYER LA DEMANDE"
                  />

                  <Button
                    link
                    href="#estimation=1"
                    type="outlined"
                    className="w-full"
                    label="ESTIMATION INTERVENTION"
                  />
                </div>
              </div>
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
