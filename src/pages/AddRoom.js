import React from "react";
import { useForm } from "react-hook-form";
import Field from "../components/field/Field";
import Input from "../components/input/Input";
import Label from "../components/label/Label";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Button from "../components/button/Button";
import http from "../config/axiosConfig";
import { toast } from "react-toastify";
import { AiOutlineCloseCircle } from "react-icons/ai";

const schema = yup.object({
  name: yup.string().required("Please enter room name"),
  capacity: yup.string().required("Please enter room capacity"),
  price: yup.string().required("Please enter room price"),
});
const AddRoom = ({ locationId, handleClose = () => {} }) => {
  const {
    handleSubmit,
    control,
    getValues,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
    defaultValues: {
      name: "",
      capacity: "",
      price: "",
    },
  });
  const addRoom = (values) => {
    http
      .post(`locations/${locationId}/rooms`, {
        name: values.name,
        businessId: 1,
        capacity: values.capacity,
        price: values.price,
      })
      .then((res) => {
        console.log("addroom", res);
        reset({
          name: "",
          capacity: "",
          price: "",
        });
        toast.success("Add new room success");
      })
      .catch((err) => {
        console.log("addroom err", err);
      });
  };
  return (
    <div className="position fixed z-20 left-0 top-0 w-full h-full bg-opacity-40 bg-black">
      <div className="w-[400px] relative h-full bg-white ml-auto px-4 flex flex-col justify-center">
        <form onSubmit={handleSubmit(addRoom)} className="">
          <Field>
            <Label name="name">Name</Label>
            <Input name="name" type="text" control={control}></Input>
          </Field>
          <Field>
            <Label name="capacity">Capacity</Label>
            <Input name="capacity" type="text" control={control}></Input>
          </Field>
          <Field>
            <Label name="price">Price</Label>
            <Input name="price" type="text" control={control}></Input>
          </Field>
          <Button type="submit">ADD</Button>
        </form>
        <div
          className="cursor-pointer absolute top-1 -left-0"
          onClick={handleClose}
        >
          <AiOutlineCloseCircle className="w-8 h-8 text-primary" />
        </div>
      </div>
    </div>
  );
};

export default AddRoom;
