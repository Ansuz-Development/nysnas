/* eslint-disable react/jsx-no-bind */
import React, {useCallback, useState} from "react";
import PropTypes from "prop-types";
import TextField from "@ansuzdev/nexi/dist/comps/items/inputs/TextField";
import Select from "@ansuzdev/nexi/dist/comps/items/inputs/Select";
import Button from "@ansuzdev/nexi/dist/comps/items/buttons/Button";
import {useForm, Controller} from "react-hook-form";
import {useGoogleReCaptcha} from "react-google-recaptcha-v3";
import axios from "axios";
// import useSWR from "swr";
// import {useRouter} from "next/router";
// import {getAttr} from "@ansuzdev/nexi/dist/utils";
// import {fetcher} from "../helpers/utils";
import DateIcon from "../../assets/icons/date.svg";
import TimeIcon from "../../assets/icons/time.svg";

const options = [
  {value: "Rénovation", label: "Rénovation"},
  {value: "Dépannage plomberie", label: "Dépannage plomberie"},
  {value: "Dépannage chauffage", label: "Dépannage chauffage"},
  {value: "Dépannage électrique", label: "Dépannage électrique"},
];

const ContactForm = ({onSuccess}) => {
  const {executeRecaptcha} = useGoogleReCaptcha();
  // const router = useRouter();
  const [processing, setProcessing] = useState(false);
  // const serviceId = router.query?.service;

  // const {data: services, error} = useSWR(
  //   router.isReady ? "/api/service" : null,
  //   fetcher,
  // );

  // const options = useMemo(() => {
  //   if (services && Array.isArray(services)) {
  //     return services.map(service => ({
  //       value: getAttr(service, "id"),
  //       label: getAttr(service, "name"),
  //     }));
  //   }

  //   return [];
  // }, [services]);

  const {
    register,
    handleSubmit,
    formState: {errors},
    control,
    // setValue,
  } = useForm();

  const onSubmit = useCallback(
    async formData => {
      if (processing) return;

      if (!executeRecaptcha) {
        console.log("Execute recaptcha not yet available");
        return;
      }

      setProcessing(true);
      try {
        const token = await executeRecaptcha("send_request");

        const data = {
          token,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          zipcode: formData.zipcode,
          city: formData.city,
          date: formData.date,
          time: formData.time,
          service: formData.service?.value,
          serviceName: formData.service?.label,
          confirmed: formData.confirmed,
        };

        await axios.post("/api/contact", data);

        if (onSuccess) onSuccess();
      } catch (err) {
        console.log(err);
      } finally {
        setProcessing(false);
      }
    },
    [executeRecaptcha, onSuccess, processing],
  );

  // useEffect(() => {
  //   if (serviceId && options?.length) {
  //     const selected = options.find(e => e.value === serviceId);
  //     if (selected) {
  //       setValue("service", selected);
  //     }
  //   }
  // }, [options, serviceId, setValue]);

  return (
    <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid md:grid-cols-2 gap-3">
        <div className="md:col-span-2">
          <TextField
            label="Votre nom*"
            placeholder="Votre nom"
            {...register("name", {required: "Le nom est obligatoire"})}
            error={errors?.name}
            helper={errors?.name?.message}
          />
        </div>
        <div>
          <TextField
            label="E-mail*"
            placeholder="E-mail"
            {...register("email", {
              required: "L'e-mail est obligatoire",
              pattern: {
                // eslint-disable-next-line prefer-named-capture-group
                value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/ui,
                message: "L'e-mail n'est pas valide",
              },
            })}
            error={errors?.email}
            helper={errors?.email?.message}
          />
        </div>
        <div>
          <TextField
            label="Téléphone*"
            placeholder="Numéro de téléphone"
            {...register("phone", {required: "Le numéro de téléphone est obligatoire"})}
            error={errors?.phone}
            helper={errors?.phone?.message}
          />
        </div>
        <div className="md:col-span-2">
          <TextField
            label="Adresse"
            placeholder="Adresse"
            {...register("address")}
          />
        </div>
        <div>
          <TextField
            label="Code postal"
            placeholder="Code postal"
            {...register("zipcode")}
          />
        </div>
        <div>
          <TextField
            label="Ville"
            placeholder="Ville"
            {...register("city")}
          />
        </div>
        <div className="md:col-span-2">
          <Controller
            control={control}
            name="service"
            render={({field: {onChange, onBlur, value}}) => (
              <Select
                label="Service"
                size="medium"
                color="primary"
                placeholder="Service"
                options={options}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
          />

        </div>
        <div>
          <TextField
            type="date"
            label="Date de visite"
            placeholder="Date de visite"
            lefticon={<DateIcon className="fill-current" />}
            {...register("date")}
          />
        </div>
        <div>
          <TextField
            type="time"
            label="Heure de visite"
            placeholder="Heure de visite"
            lefticon={<TimeIcon className="fill-current" />}
            {...register("time")}
          />
        </div>
      </div>
      <div className="space-y-4">
        <Button
          onClick={handleSubmit(onSubmit)}
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
    </form>
  );
};

ContactForm.defaultProps = {onSuccess: undefined};

ContactForm.propTypes = {onSuccess: PropTypes.func};

export default ContactForm;
