import React, { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import http from "../../config/axiosConfig";
import { toast } from "react-toastify";
import Field from "../../components/field/Field";
import Label from "../../components/label/Label";
import Input from "../../components/input/Input";
import Toggle from "../../components/toggle/Toggle";
import Button from "../../components/button/Button";

const BusinessUpdatePage = () => {
  const { businessId } = useParams();
  const navigate = useNavigate();
  const schema = yup
    .object({
      name: yup.string().required("Please enter your name business"),
      email: yup
        .string()
        .email("Please enter valid email address")
        .required("Please enter your email address"),
      pphone: yup.string().matches(/^\d+$/, "Phone must be number"),
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
  useEffect(() => {
    const errorsList = Object.values(errors);
    if (errorsList.length > 0) {
      toast.error(errorsList[0]?.message);
    }
  }, [errors]);

  useEffect(() => {
    if (!businessId) return;
    http
      .get(`v1/businesses/${businessId}`)
      .then((res) => {
        reset({
          name: res.data?.name,
          email: res.data?.email,
          phone: res.data?.phone,
          active: res.data?.isActive,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [businessId, reset]);

  const onSubmit = (values) => {
    http
      .put(`v1/businesses/${businessId}`, {
        id: businessId,
        name: values.name,
        email: values.email,
        phone: values.phone,
        isActive: values.active,
      })
      .then((res) => {
        if (res.status === 200) {
          toast.success("Update successfully");
          navigate("/businesses");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="p-8 w-full">
      <h1 className="font-bold text-2xl text-primary">UPDATE BUSINESS</h1>
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
        <div className="mb-7">
          <Toggle name="active" control={control} checked={watchActive}>
            Active
          </Toggle>
        </div>
        <Button type="submit">Update</Button>
      </form>
    </div>
  );
};

export default BusinessUpdatePage;
