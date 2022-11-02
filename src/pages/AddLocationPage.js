import React from "react";
import Button from "../components/button/Button";
import Field from "../components/field/Field";
import Input from "../components/input/Input";
import Label from "../components/label/Label";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import Toggle from "../components/toggle/Toggle";

const AddLocationPage = () => {
  const schema = yup
    .object({
      name: yup.string().required("Please enter your name location"),
    })
    .required();
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = (value) => {};
  return (
    <div className="p-8 w-full h-full">
      <h1 className="font-bold text-2xl text-primary">ADD NEW LOCATION</h1>
      <form
        className="w-full max-w-[800px] mt-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Field>
          <Label htmlFor="name" className="name">
            Name
          </Label>
          <Input
            type="text"
            name="name"
            placeholder="Enter name location"
            control={control}
          ></Input>
        </Field>
        <Field>
          <Label htmlFor="address">Address</Label>
          <Input
            type="text"
            name="address"
            placeholder="Enter address of location"
            control={control}
          ></Input>
        </Field>
        <Field>
          <Label htmlFor="desc">Description</Label>
          <textarea
            id="desc"
            name="desc"
            className="w-full min-h-[200px] outline-none border border-slate-300 focus:border-primary rounded-xl p-4"
          ></textarea>
        </Field>
        <Toggle name="active" control={control}>
          Active
        </Toggle>

        <div className="button-container">
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </div>
  );
};

export default AddLocationPage;
