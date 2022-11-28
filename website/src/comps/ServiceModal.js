import React from "react";
import PropTypes from "prop-types";
import Modal from "react-modal";
import NextImage from "next/legacy/image";

import Link from "next/link";
import {getAttr, getFormatUrl, getUrl} from "@ansuzdev/nexi/dist/utils";
import CloseIcon from "../../assets/icons/close.svg";

const customStylesModal = {
  content: {
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxWidth: "824px",
    width: "92%",
    maxHeight: "95%",
    height: "fit-content",
    padding: "40px",
    border: 0,
    borderRadius: "12px",
    outLine: "none",
    backgroundColor: "#272828",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    zIndex: 1,
  },
};

const ServiceModal = ({data, isOpen, onClose}) => {
  const title = getAttr(data, "title");
  const subtitle = getAttr(data, "subtitle");
  const services = getAttr(data, "services", "data");

  return (
    <Modal
      isOpen={isOpen}
      style={customStylesModal}
      ariaHideApp={false}
    >
      <div
        className="absolute top-4 right-8 cursor-pointer"
        onClick={onClose}
      >
        <CloseIcon className="w-8 h-8" />
      </div>
      <div className="space-y-8">
        <h3 className="text-white text-center">
          {title}
        </h3>
        <div className="grid grid-cols-3 gap-4">
          {
            services?.map(service => {
              console.log(service);
              const id = getAttr(service, "id");
              const photo = getAttr(service, "photo");
              const url = getUrl(photo, "url");
              const thumbnailUrl = getFormatUrl(photo, "thumbnail");

              console.log(url, thumbnailUrl);

              return (
                <div key={id} className="p-4 bg-white rounded">
                  <Link href={`/questionnaire/${id}`}>
                    <div>
                      <div className="relative w-full h-40">
                        {Boolean(url) && (
                          <NextImage
                            src={url}
                            layout="fill"
                            objectFit="contain"
                            objectPosition="center"
                            placeholder="blur"
                            blurDataURL={thumbnailUrl}
                            unoptimized
                          />
                        )}
                      </div>
                      <p className="body1 text-center font-medium">
                        {getAttr(service, "name")}
                      </p>
                    </div>
                  </Link>
                </div>
              );
            })
          }
        </div>
        <div>
          <p className="body1 text-white text-center">
            {subtitle}
          </p>
        </div>
      </div>
    </Modal>
  );
};

ServiceModal.defaultProps = {
  data: null,
  isOpen: false,
  onClose: undefined,
};

ServiceModal.propTypes = {
  data: PropTypes.object,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};

export default ServiceModal;
