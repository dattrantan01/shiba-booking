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
import "react-datetime/css/react-datetime.css";
import DatePicker from "react-datetime";

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
          price: res.data.price,
        });
        const dateStart = res.data?.availableDay?.slice(0, 10);
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
            <Button onClick={() => setEdit((prev) => !prev)}>Edit</Button>
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
          <div className="date_picker_wrapper mb-5 ">
            <DatePicker
              onChange={(date) => setDate(date)}
              value={date}
              dateFormat="YYYY-MM-DD"
              timeFormat={false}
              wrapperClassName="datePicker"
            />
          </div>
          {!edit && <Button type="submit">Update</Button>}
        </form>
      </div>
      <div className="Reviews mt-7">
        <h2 className="text-2xl font-bold text-primary mb-8">Reviews</h2>
        <div className="flex flex-col gap-4">
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
                <span className="font-semibold">{review.name}</span>
                <p className="text-sm">{review.comment}</p>
                {review.imgUrl && (
                  <div className="w-[300px] h-[300px] mt-3">
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
    </div>
  );
};

export default RoomDetail;
