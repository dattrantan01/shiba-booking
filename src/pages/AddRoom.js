import React, { useState } from "react";
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
import useUploadImage from "../hooks/useUploadImage";
import UploadImage from "../components/uploadImage/UploadImage";
import "react-datetime/css/react-datetime.css";
import DatePicker from "react-datetime";

const schema = yup.object({
  name: yup.string().required("Please enter room name"),
  capacity: yup.string().required("Please enter room capacity"),
  price: yup.string().required("Please enter room price"),
});
const AddRoom = ({ locationId, handleClose = () => {} }) => {
  const [date, setDate] = useState();
  const [isLoading, setIsLoading] = useState(false);
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
      capacity: "",
      price: "",
    },
  });

  const {
    handleUploadImage,
    handleDeleteImage,
    file,
    imgUpload,
    setFile,
    setImgUpload,
    isLoadingImage,
  } = useUploadImage();
  const addRoom = (values) => {
    const availableDay = date.toISOString();
    const roomAdd = {
      name: values.name,
      locationId: locationId,
      capacity: Number(values.capacity),
      price: Number(values.price),
      availableDay: availableDay,
      imgId: imgUpload,
    };
    setIsLoading(true);
    http
      .post(`booking/rooms`, roomAdd)
      .then((res) => {
        reset({
          name: "",
          capacity: "",
          price: "",
        });
        setFile("");
        setImgUpload("");
        setIsLoading(false);
        toast.success("Add new room success");
      })
      .catch((err) => {
        setIsLoading(false);
        toast.error(err.data.message);
      });
  };
  return (
    <div className="position fixed z-20 left-0 top-0 w-full h-full bg-opacity-40 bg-black">
      <div className="w-[650px] relative h-full bg-white ml-auto px-4 flex flex-col justify-center overflow-y-auto">
        <UploadImage
          file={file}
          imgUpload={imgUpload}
          isLoadingImage={isLoadingImage}
          handleUploadImage={handleUploadImage}
          handleDeleteImage={handleDeleteImage}
        />
        <form onSubmit={handleSubmit(addRoom)} className="max-w-[400px]">
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
          <Label>Available Date</Label>
          <div className="date_picker_wrapper mb-5 ">
            <DatePicker
              onChange={(date) => setDate(date)}
              dateFormat="DD-MM-YYYY"
              value={date}
              timeFormat={false}
              wrapperClassName="datePicker"
              closeOnSelect={true}
              inputProps={{ readOnly: true }}
            />
          </div>
          <Button type="submit" isLoading={isLoading}>
            ADD
          </Button>
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
