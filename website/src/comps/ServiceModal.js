import React from "react";
import PropTypes from "prop-types";
import Modal from "react-modal";
import NextImage from "next/legacy/image";

import Link from "next/link";
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

const ServiceModal = ({isOpen, onClose}) => (
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
      <h3 className="text-white text-center">Mon depannage concerne</h3>
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 bg-white rounded">
          <Link href="/questionnaire/1">
            <div className="relative w-full h-40">
              <NextImage
                src={"https://cms.hestiaecobat.fr/uploads/logo_electricite_1ec19b0fe4.png"}
                layout="fill"
                objectFit="contain"
                objectPosition="center"
              />
            </div>
          </Link>
        </div>
        <div className="p-4 bg-white rounded">
          <Link href="/questionnaire/2">
            <div className="relative w-full h-40">
              <NextImage
                src={"https://cms.hestiaecobat.fr/uploads/logo_electricite_1ec19b0fe4.png"}
                layout="fill"
                objectFit="contain"
                objectPosition="center"
              />
            </div>
          </Link>
        </div>
        <div className="p-4 bg-white rounded">
          <div className="relative w-full h-40">
            <NextImage
              src={"https://cms.hestiaecobat.fr/uploads/logo_electricite_1ec19b0fe4.png"}
              layout="fill"
              objectFit="contain"
              objectPosition="center"
            />
          </div>
        </div>
      </div>
      <div>
        <p className="body1 text-white text-center">
          for emergency, please contact us via hotline {process.env.NEXT_PUBLIC_CONTACT_PHONE}
        </p>
      </div>
    </div>
  </Modal>
);

ServiceModal.defaultProps = {
  isOpen: false,
  onClose: undefined,
};

ServiceModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};

export default ServiceModal;
