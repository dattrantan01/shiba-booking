import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../components/button/Button";
import Field from "../components/field/Field";
import Input from "../components/input/Input";
import Label from "../components/label/Label";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { NavLink, useNavigate } from "react-router-dom";

import http from "../config/axiosConfig";
import { useAuth } from "../context/auth-context";
import { toast } from "react-toastify";
import ErrorBusinessModal from "../components/modal/ErrorBusinessModal";

const LoginPage = () => {
  const schema = yup
    .object({
      email: yup
        .string()
        .email("Please enter valid email address")
        .required("Please enter your email address"),
      password: yup
        .string()
        .min(2, "Your password must be at least 8 characters or greater")
        .required("Please enter your password"),
    })
    .required();
  const {
    handleSubmit,
    control,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [checkMail, setCheckMail] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(true);
  const onSubmit = (e) => {
    console.log(e);
    login(e);
  };

  function login(value) {
    http
      .post("v1/users/admin/login", value)
      .then((res) => {
        console.log("login success: ", res);
        localStorage.setItem("token", res.data.token);
      })
      .then(() => {
        http.get("v1/me").then((resUser) => {
          setUser(resUser.data);
          navigate("/");
        });
      })
      .catch((err) => {
        if (err.data.message === "BusinessInactivated!")
          setShowErrorModal(true);
        toast.error(err.data.message);
        console.log("error: ", err);
      });
  }
  const forgotPassword = () => {
    if (!getValues("email")) {
      toast.error("Please fill your email address!");
      return;
    }
    setCheckMail(true);
    http
      .post(`v1/reset-password`, {
        email: getValues("email"),
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      {showErrorModal && (
        <ErrorBusinessModal handleClose={() => setShowErrorModal(false)} />
      )}
      <div className="minH-[100vh] h-[100vh] w-full flex justify-center items-center bg-grayLight">
        <div className="w-[70%] h-[90%] shadow-2xl flex flex-row bg-white">
          <div className="w-[50%] h-[100%] ">
            <img
              src="https://images.unsplash.com/photo-1661961112134-fbce0fdf3d99?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=386&q=80"
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-[50%] h-[100%] flex flex-col px-8 justify-center">
            <form onSubmit={handleSubmit(onSubmit)}>
              <Field>
                <Label name="username">Email</Label>
                <Input
                  type="text"
                  name="email"
                  placeholder="Enter your email"
                  control={control}
                ></Input>
                {errors.email && (
                  <p className="text-sm text-red-500 color-red">
                    {errors.email.message}
                  </p>
                )}
              </Field>
              <Field>
                <Label name="password">Password</Label>
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
              <div className="w-full flex justify-center pb-6">
                <Button styleClass="w-[100%]">Sign In</Button>
              </div>
            </form>
            <div className="text-sm flex justify-center text-gray">
              <span className="inline-block mr-1">Don't have an account?</span>
              <NavLink
                to={"/register"}
                className="font-semibold cursor-pointer"
              >
                Sign up
              </NavLink>
              <span
                onClick={forgotPassword}
                className="cursor-pointer ml-3 hover:text-red-500"
              >
                | forgot password
              </span>
            </div>
            {checkMail && (
              <div className="text-red-500 text-center mt-4">
                Check your mail!
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
