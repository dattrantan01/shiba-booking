import React, { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import Field from "../components/field/Field";
import Input from "../components/input/Input";
import Label from "../components/label/Label";
import Button from "../components/button/Button";
import Radio from "../components/radio/Radio";
import { toast } from "react-toastify";
import http from "../config/axiosConfig";
import { useNavigate } from "react-router-dom";

const schema = yup.object({
  email: yup
    .string()
    .email("Please enter valid email address")
    .required("Please enter your email"),
  firstName: yup.string().required("Please enter your firstName"),
  lastName: yup.string().required("Please enter your lastName"),
  phone: yup.string().matches(/^\d+$/, "Phone must be number"),
  password: yup
    .string()
    .required("Please enter your password")
    .min(8, "min 8")
    .max(20),
});
const AddUserPage = () => {
  const {
    handleSubmit,
    control,
    getValues,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      phone: "",
      password: "",
      gender: 1,
    },
  });
  const navigate = useNavigate();
  const watchGender = watch("gender");
  const watchpasswordConfirm = watch("passwordConfirm");
  useEffect(() => {
    const errorsList = Object.values(errors);
    if (errorsList.length > 0) {
      toast.error(errorsList[0]?.message);
    }
  }, [errors]);

  const onSubmit = async (values) => {
    const user = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      gender: values.gende === 1 ? false : true,
      password: values.password,
      phone: values.phone,
      roleId: "636723c71f1cbcef36804e82",
      avatar:
        "https://images.unsplash.com/photo-1667506057200-e55b56ee2b44?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
    };

    await http
      .post("users", user)
      .then((res) => {
        console.log(res);
        navigate("users");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="p-8 w-full">
      <h1 className="font-bold text-2xl text-primary">ADD NEW USER</h1>
      <form
        className="w-full max-w-[600px] mt-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="w-full grid grid-cols-2 gap-4">
          <Field>
            <Label htmlFor="firstName">First Name</Label>
            <Input
              type="text"
              name="firstName"
              placeholder="Enter your first name"
              control={control}
            ></Input>
          </Field>
          <Field>
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              type="text"
              name="lastName"
              placeholder="Enter your last name"
              control={control}
            ></Input>
          </Field>
        </div>
        <Field>
          <Label htmlFor="name" className="name">
            Email
          </Label>
          <Input
            type="email"
            name="email"
            placeholder="Enter your email"
            control={control}
          ></Input>
        </Field>
        <Field>
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            name="password"
            placeholder="Enter your password"
            control={control}
          ></Input>
        </Field>
        <Field>
          <Label htmlFor="passwordConfirm">Password Confirm</Label>
          <Input
            type="password"
            name="passwordConfirm"
            placeholder="Confirm your password"
            control={control}
          ></Input>

          {getValues("password") &&
            watchpasswordConfirm !== getValues("password") && (
              <div className="text-red-500">Not match</div>
            )}
        </Field>
        <Field>
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            type="text"
            name="phone"
            placeholder="Enter your phone number"
            control={control}
          ></Input>
        </Field>
        <Field>
          <Label htmlFor="gender">Gender</Label>
          <div className="flex flex-row items-center gap-3">
            <Radio
              name="gender"
              control={control}
              value={1}
              checked={Number(watchGender) === 1}
            >
              Male
            </Radio>
            <Radio
              name="gender"
              control={control}
              value={2}
              checked={Number(watchGender) === 2}
            >
              Female
            </Radio>
          </div>
        </Field>

        <div className="button-container">
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </div>
  );
};

export default AddUserPage;
