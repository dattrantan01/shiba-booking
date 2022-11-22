import React, { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import Field from "../../components/field/Field";
import Label from "../../components/label/Label";
import Input from "../../components/input/Input";
import Toggle from "../../components/toggle/Toggle";
import Button from "../../components/button/Button";
import { toast } from "react-toastify";
import http from "../../config/axiosConfig";
import { useNavigate } from "react-router-dom";

const AddBusinessPage = () => {
  const schema = yup
    .object({
      name: yup.string().required("Please enter your name business"),
      email: yup
        .string()
        .email("Please enter valid email address")
        .required("Please enter your email address"),

      phone: yup.string().matches(/^\d+$/, "Phone must be number"),
    })
    .required();
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      active: true,
    },
  });
  const watchActive = watch("active");
  const navigate = useNavigate();
  useEffect(() => {
    const errorsList = Object.values(errors);
    if (errorsList.length > 0) {
      toast.error(errorsList[0]?.message);
    }
  }, [errors]);
  const onSubmit = (values) => {
    console.log("values", values);
    http
      .post("businesses", {
        name: values.name,
        email: values.email,
        phone: values.phone,
        isActive: values.active,
        // userId:
      })
      .then((response) => {
        console.log(response);
        toast.success("Success");
        reset({
          name: "",
          email: "",
          phone: "",
          active: true,
        });
        navigate("/businesses");
      })
      .catch((err) => toast.err("failed"));
  };
  return (
    <div className="p-8 w-full">
      <h1 className="font-bold text-2xl text-primary">ADD NEW BUSINESS</h1>
      <form
        className="w-full mt-8 max-w-[500px]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Field>
          <Label name="name">Name</Label>
          <Input control={control} name="name" type="text"></Input>
        </Field>
        <Field>
          <Label name="email">Email</Label>
          <Input control={control} name="email" type="text"></Input>
        </Field>
        <Field>
          <Label name="phone">Phone Number</Label>
          <Input control={control} name="phone" type="text"></Input>
        </Field>

        <div class="mb-7">
          <Toggle name="active" control={control} checked={watchActive}>
            Active
          </Toggle>
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default AddBusinessPage;
