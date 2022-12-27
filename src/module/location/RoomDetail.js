import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Field from "../../components/field/Field";
import Input from "../../components/input/Input";
import Label from "../../components/label/Label";
import http from "../../config/axiosConfig";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import Button from "../../components/button/Button";
import { toast } from "react-toastify";
import useUploadImage from "../../hooks/useUploadImage";
import UploadImage from "../../components/uploadImage/UploadImage";
import Rating from "../../components/rating/Rating";
import "react-datetime/css/react-datetime.css";
import DatePicker from "react-datetime";
import moment from "moment";

const schema = yup.object({
  name: yup.string().required("Please enter room name"),
  capacity: yup.string().matches(/^\d+$/, "Capactiy must be number"),
  price: yup.string().matches(/^\d+$/, "Price must be number"),
});
const RoomDetail = () => {
  const param = useParams();
  const id = param.id;
  const [edit, setEdit] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [date, setDate] = useState();
  const navigate = useNavigate();
  const {
    handleUploadImage,
    handleDeleteImage,
    file,
    imgUpload,
    setFile,
    setImgUpload,
  } = useUploadImage();
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
      imgUrl: "",
      price: "",
    },
  });

  useEffect(() => {
    http
      .get(`booking/rooms/${id}/detail`)
      .then((res) => {
        reset({
          name: res.data.name,
          capacity: res.data.capacity,
          imgUrl: res.data.imgUrl,
          price: Number(
            res.data?.price
              ?.split("")
              .filter((digit) => digit !== ".")
              .join("")
          ),
        });
        const dateStart = new Date(res.data?.availableDay);
        setDate(dateStart);
        setFile(res.data.imgUrl);
        setImgUpload(res.data.imgId);
      })
      .catch((err) => console.log(err));

    http
      .get(`booking/rooms/${id}/reviews`)
      .then((res) => {
        setReviews(res.data);
      })
      .catch((err) => {
        console.log("reviews: ", err);
      });
  }, [id, reset]);
  useEffect(() => {
    const errorsList = Object.values(errors);
    if (errorsList.length > 0) {
      toast.error(errorsList[0]?.message);
    }
  }, [errors]);
  const handleUpdateRoom = (values) => {
    const availableDay = new Date(date).toISOString();
    http
      .put(`booking/rooms/${id}`, {
        name: values.name,
        capacity: values.capacity,
        imgId: imgUpload,
        price: values.price,
        availableDay: availableDay,
      })
      .then((res) => {
        toast.success("Success");
        navigate(-1);
        setEdit((prev) => !prev);
        console.log(res);
      });
  };

  return (
    <div className="p-8">
      <div className="flex flex-col gap-4">
        <div className="flex flex-row justify-between">
          <UploadImage
            file={file}
            imgUpload={imgUpload}
            handleUploadImage={handleUploadImage}
            handleDeleteImage={handleDeleteImage}
          />
          <div className="w-[150px]">
            <Button onClick={() => setEdit((prev) => !prev)}>
              {edit ? "Edit" : "Close"}
            </Button>
          </div>
        </div>
        <form
          onSubmit={handleSubmit(handleUpdateRoom)}
          className="w-full max-w-[600px]"
        >
          <Field row={true}>
            <Label name="name">Name</Label>
            <Input name="name" control={control} type="text" edit={edit} />
          </Field>
          <Field row={true}>
            <Label name="capacity">Capacity</Label>
            <Input name="capacity" control={control} type="text" edit={edit} />
          </Field>
          <Field row={true}>
            <Label name="price">Price</Label>
            <Input name="price" control={control} type="text" edit={edit} />
          </Field>
          <Label>Available Date</Label>
          <div className="date_picker_wrapper mb-5 ">
            <DatePicker
              onChange={(date) => setDate(date)}
              value={date}
              dateFormat="DD-MM-YYYY"
              timeFormat={false}
              wrapperClassName="datePicker"
              closeOnSelect={true}
              inputProps={{ readOnly: true }}
            />
          </div>
          {!edit && <Button type="submit">Update</Button>}
        </form>
      </div>

      <div className="flex flex-col gap-4 mt-7">
        {reviews.map((review) => (
          <div className="flex flex-row gap-4 items-start">
            <div className="w-[40px] h-[40px] rounded-full">
              <img
                alt=""
                src={review.avatar}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div className="bg-slate-200 px-3 py-3 rounded-2xl">
              <div className="flex flex-row gap-3">
                <span className="font-semibold">{review.name}</span>
                <Rating readonly={true} rating={review?.rating} />
              </div>
              <p className="text-sm">{review.comment}</p>
              {review.imgUrl && (
                <div className="w-[250px] h-[240px] mt-3">
                  <img
                    src={review.imgUrl}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomDetail;
