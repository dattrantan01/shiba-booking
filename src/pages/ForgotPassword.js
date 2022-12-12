import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import Field from "../components/field/Field";
import Label from "../components/label/Label";
import Input from "../components/input/Input";
import Button from "../components/button/Button";
import http from "../config/axiosConfig";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const params = useParams();
  const id = params.id;
  const schema = yup
    .object({
      password: yup
        .string()
        .min(8, "Your password must be at least 8 characters or greater")
        .required("Please enter your password"),
      confirmpassword: yup
        .string()
        .oneOf([yup.ref("password"), null], "Passwords must match"),
    })
    .required();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
    defaultValues: {
      password: "",
      confirmpassword: "",
    },
  });
  const onSubmit = (values) => {
    console.log(values.password);
    http
      .post(`reset-password/${id}`, {
        password: values.password,
      })
      .then((res) => {
        toast.success("successfully reset");
        navigate("/login");
      })
      .catch((err) => {
        toast.error(err);
        console.log(err);
      });
  };

  return (
    <div className="container h-[100vh] flex justify-center items-center">
      <div className="w-full max-w-[500px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Field>
            <Label name="number">Password</Label>
            <Input
              type="password"
              name="password"
              placeholder="Enter your password"
              control={control}
            ></Input>
            {errors.password && (
              <p className="text-sm text-red-500 color-red">
                {errors.password.message}
              </p>
            )}
          </Field>
          <Field>
            <Label name="number">Confirm password</Label>
            <Input
              type="password"
              name="confirmpassword"
              placeholder="Enter your confirm password"
              control={control}
            ></Input>
            {errors.confirmpassword && (
              <p className="text-sm text-red-500 color-red">
                {errors.confirmpassword.message}
              </p>
            )}
          </Field>
          <div className="w-full flex justify-center gap-10 mb-4">
            <Button>Submit</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
