import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import FormInputYup from "./FormInputYup";

const schema = Yup.object().shape({
  username: Yup.string()
    .matches(
      /^[A-Za-z0-9]{3,16}$/,
      "Username should be 3-16 characters and shouldn't include any special characters!"
    )
    .required("Username is required"),
  password: Yup.string()
    .matches(
      /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/,
      "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!"
    )
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords don't match!")
    .required("Confirm Password is required"),
});

const Dashboard = () => {
  const {
    handleSubmit,
    register,
    formState: { isValid, errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  const submitButtonRef = useRef(null);

  useEffect(() => {
    if (submitButtonRef.current && isValid) {
      submitButtonRef.current.focus();
    }
  }, [isValid]);

  const onSubmit = (data) => {
    console.log("Input data: ", data);
  };

  useEffect(() => {
    console.log("Form errors:", errors);
  }, [errors]);

  return (
    <div className="App">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Register_2</h2>
        <FormInputYup
          {...register("username")}
          label="Username"
          error={errors.username?.message}
        />
        <FormInputYup
          {...register("password")}
          label="Password"
          type="password"
          error={errors.password?.message}
        />
        <FormInputYup
          {...register("confirmPassword")}
          label="Confirm Password"
          type="password"
          error={errors.confirmPassword?.message}
        />
        <button type="submit" disabled={!isValid} ref={submitButtonRef}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Dashboard;
