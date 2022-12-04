import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";

const TextField = React.forwardRef((props, ref) => {
  const {
    label,
    helper,
    color,
    size,
    lefticon,
    righticon,
    error,
    ...rest
  } = props;

  const rootClass = cx(
    "textfield001",
    "space-y-1",
  );
  const labelClass = cx(
    "input-label",
    "text-base leading-normal font-semibold tracking-[0.5px] text-black-secondary",
  );
  const inputClass = cx(
    "input-input",
    "peer text-base leading-normal tracking-[0.5px] w-full outline-none outline-neutral-200 outline-offset-0 outline-1 px-3 py-0 rounded bg-white",
    "placeholder:text-neutral-400 hover:outline-neutral-400",
    {
      "focus:outline-primary-600": color === "primary",
      "focus:outline-secondary-600": color === "secondary",
      "outline-red-600 focus:outline-red-600": error,
      "pl-10": Boolean(lefticon),
      "pr-10": Boolean(lefticon),
      "h-12": size === "large",
      "h-10": size === "medium",
      "h-8": size === "small",
    },
  );
  const helperClass = cx(
    "input-helper",
    "text-xs md:text-sm text-black-tertiary",
    {"text-red-600": error},
  );
  const leftIconClass = cx(
    "input-leftIcon",
    "absolute left-2 w-6 h-6 overflow-hidden text-neutral-400",
    {
      "peer-focus:text-primary-600": color === "primary",
      "peer-focus:text-secondary-600": color === "secondary",
    },
  );
  const rightIconClass = cx(
    "input-rightIcon",
    "absolute right-2 w-6 h-6 overflow-hidden text-neutral-400",
    {
      "peer-focus:text-primary-600": color === "primary",
      "peer-focus:text-secondary-600": color === "secondary",
    },
  );

  return (
    <div className={rootClass}>
      {Boolean(label) && <label className={labelClass}>{label}</label>}
      <div className="relative flex items-center">
        <input
          ref={ref}
          className={inputClass}
          {...rest}
        />
        {Boolean(lefticon) && (
          <div className={leftIconClass}>
            {lefticon}
          </div>
        )}
        {Boolean(righticon) && (
          <div className={rightIconClass}>
            {righticon}
          </div>
        )}
      </div>
      {Boolean(helper) && <span className={helperClass}>{helper}</span>}
    </div>
  );
});

TextField.defaultProps = {
  type: "input",
  color: "primary",
  size: "medium",
  error: false,
};

export default TextField;
