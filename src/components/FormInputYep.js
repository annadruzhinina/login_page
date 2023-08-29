import React, { forwardRef } from "react";

const FormInputYep = forwardRef((props, ref) => {
  const { label, error, onChange, id, ...inputProps } = props;

  return (
    <div className="formInput">
      <label htmlFor={id}>{label}</label>
      <input id={id} {...inputProps} ref={ref} onChange={onChange} />
      {error && <span className="errorYep">{error}</span>}
    </div>
  );
});

export default FormInputYep;
