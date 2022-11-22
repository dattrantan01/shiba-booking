import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../../components/button/Button";
import http from "../../config/axiosConfig";
import { useAuth } from "../../context/auth-context";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Field from "../../components/field/Field";
import Label from "../../components/label/Label";
import Input from "../../components/input/Input";
import { toast } from "react-toastify";

const schema = yup.object({
  email: yup
    .string()
    .email("Please enter valid email address")
    .required("Please enter your email"),
  name: yup.string().required("Please enter your firstName"),
  phone: yup.string().matches(/^\d+$/, "Phone must be number"),
});
const BusinessLocalPage = () => {
  const { user } = useAuth();
  const [edit, setEdit] = useState(true);
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });
  useEffect(() => {
    if (!user) return;
    http.get(`businesses/${user.businessId}`).then((res) => {
      console.log("local business: " + res);
    });
  }, [user]);
  useEffect(() => {
    const errorsList = Object.values(errors);
    if (errorsList.length > 0) {
      toast.error(errorsList[0]?.message);
    }
  }, [errors]);

  const handeUpdateBusiness = (values) => {
    console.log(values);
  };

  return (
    <div className="p-8 w-full">
      <div className="flex flex-row justify-between items-center">
        <h1 className="font-bold text-2xl text-primary">Local Business</h1>
        <Button onClick={() => setEdit(!edit)}>Edit</Button>
      </div>
      <form onSubmit={handleSubmit(handeUpdateBusiness)}>
        <div className="w-full max-w-[800px] mt-8 mb-8">
          <Field row={true}>
            <Label name="firstName">Name:</Label>
            <Input
              type="text"
              name="name"
              control={control}
              edit={edit}
            ></Input>
          </Field>
          <Field row={true}>
            <Label name="lastName">Email:</Label>
            <Input
              type="text"
              name="email"
              control={control}
              edit={edit}
            ></Input>
          </Field>

          <Field row={true}>
            <Label name="phone">Phone:</Label>
            <Input
              type="text"
              name="phone"
              control={control}
              edit={edit}
            ></Input>
          </Field>
        </div>
        {!edit && <Button type="submit">Save</Button>}
      </form>
    </div>
  );
};

export default BusinessLocalPage;
