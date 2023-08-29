import React, { forwardRef } from "react";

const FormInputYup = forwardRef((props, ref) => {
  const { label, error, onChange, id, ...inputProps } = props;

  return (
    <div className="formInput">
      <label htmlFor={id}>{label}</label>
      <input id={id} {...inputProps} ref={ref} onChange={onChange} />
      {error && <span className="errorYup">{error}</span>}
    </div>
  );
});

export default FormInputYup;
