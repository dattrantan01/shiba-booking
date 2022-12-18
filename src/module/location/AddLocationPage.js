import React, { useEffect, useState } from "react";
import Button from "../../components/button/Button";
import Field from "../../components/field/Field";
import Input from "../../components/input/Input";
import Label from "../../components/label/Label";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import Toggle from "../../components/toggle/Toggle";
import Dropdown from "../../components/dropdown/Dropdown";
import Select from "../../components/dropdown/Select";
import List from "../../components/dropdown/List";
import Option from "../../components/dropdown/Option";
import { toast } from "react-toastify";
import { AiFillMinusCircle } from "react-icons/ai";
import useUtilities from "../../hooks/useUtilities";
import http from "../../config/axiosConfig";
import UploadImage from "../../components/uploadImage/UploadImage";
import useUploadImage from "../../hooks/useUploadImage";

const AddLocationPage = () => {
  const schema = yup
    .object({
      name: yup.string().required("Please enter your name location"),
      address: yup.string().required("Please enter your address of location"),
    })
    .required();
  const {
    handleSubmit,
    control,
    register,
    setValue,
    getValues,
    unregister,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
    defaultValues: {
      name: "",
      address: "",
      city: "",
      district: "",
      wards: "",
      active: true,
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const [cities, setCites] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [cityName, setCityName] = useState("");
  const [districtName, setDistrictName] = useState("");
  const [wardsName, setWardsName] = useState("");
  const { utilities, handleAddUtility, handleClearUtility, isLoadingImage } =
    useUtilities(unregister);
  const watchActive = watch("active");

  const { handleUploadImage, handleDeleteImage, file, imgUpload } =
    useUploadImage();

  useEffect(() => {
    http.get(`booking/locations/cities`).then((res) => {
      setCites(res?.data);
    });
  }, []);
  const handleClickCity = async (city) => {
    setValue("city", city.id);
    setCityName(city.name);
    const res = await http.get(`booking/locations/cities/${city.id}`);
    setDistricts(res?.data);
  };
  const handleClickDistrict = async (district) => {
    setValue("district", district.id);
    setDistrictName(district.name);
    const res = await http.get(`booking/locations/districts/${district.id}`);
    setWards(res?.data);
  };
  const handleClickWard = (wards) => {
    setWardsName(wards.name);
    setValue("wards", wards.id);
  };
  useEffect(() => {
    const errorsList = Object.values(errors);
    if (errorsList.length > 0) {
      toast.error(errorsList[0]?.message);
    }
  }, [errors]);
  const onSubmit = (value) => {
    let checkError = false;
    setIsLoading(true);
    for (let i = 0; i < utilities.length; i++) {
      const name = getValues(`${utilities[i].name}`);
      const price = getValues(`${utilities[i].price}`);
      if (!name || !price || isNaN(price)) {
        checkError = !checkError;
        break;
      }
    }
    if (checkError) {
      toast.error("Utility name required and price must be number");
      return;
    }
    const utilitiesAdd = [];
    utilities.forEach((item) => {
      utilitiesAdd.push({
        name: getValues(`${item.name}`),
        price: getValues(`${item.price}`),
      });
    });
    const locationAdd = {
      address: value.address,
      cityId: value.city,
      districtId: value.district,
      wardsId: value.wards,
      name: value.name,
      isActive: value.active,
      description: value.desc,
      utilities: utilitiesAdd,
      ImgId: imgUpload,
    };
    console.log(locationAdd);
    http
      .post("booking/locations", locationAdd)
      .then((res) => {
        console.log(res);
        toast.success("success");
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.error("err", err);
      });
  };
  useEffect(() => {
    return () => handleDeleteImage();
  }, []);

  return (
    <div className="p-8 w-full">
      <h1 className="font-bold text-2xl text-primary">ADD NEW LOCATION</h1>
      <form className="w-full mt-8" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2">
          <div className="max-w-[500px]">
            <Field>
              <Label name="name" className="name">
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
              <Label name="address">Address</Label>
              <Dropdown>
                <Select placeholder={cityName || "City"}></Select>
                <List>
                  {cities.map((city) => (
                    <Option key={city.id} onClick={() => handleClickCity(city)}>
                      {city.name}
                    </Option>
                  ))}
                </List>
              </Dropdown>
              <Dropdown>
                <Select placeholder={districtName || "District"}></Select>
                <List>
                  {districts.map((district) => (
                    <Option
                      key={district.id}
                      onClick={() => handleClickDistrict(district)}
                    >
                      {district.name}
                    </Option>
                  ))}
                </List>
              </Dropdown>
              <Dropdown>
                <Select placeholder={wardsName || "Wards"}></Select>
                <List>
                  {wards.map((ward) => (
                    <Option key={ward.id} onClick={() => handleClickWard(ward)}>
                      {ward.name}
                    </Option>
                  ))}
                </List>
              </Dropdown>
            </Field>

            <Input
              type="text"
              name="address"
              placeholder="Enter address of location"
              control={control}
            ></Input>
            <Field>
              <Label name="desc">Description</Label>
              <textarea
                id="desc"
                name="desc"
                className="w-full max-w-[500px] min-h-[200px] outline-none border  bg-slate-100 focus:border-primary rounded-xl p-4"
                {...register("desc")}
              ></textarea>
            </Field>
            <Toggle name="active" checked={watchActive} control={control}>
              Active
            </Toggle>

            {/* <div className="mt-8 mb-8 relative w-[350px] h-[280px]">
              <div className="w-full h-full border-slate-300 border shadow-md cursor-pointer relative flex items-center justify-center">
                {file ? (
                  <>
                    <div
                      onClick={handleDeleteImage}
                      className="absolute top-0 left-0 w-full h-full hover:bg-black hover:bg-opacity-30 z-20 flex justify-center items-center"
                    >
                      <div className="text-transparent font-semibold text-lg hover:text-white w-full h-full flex items-center justify-center">
                        Choose another picture
                      </div>
                    </div>
                    <img
                      src={file}
                      alt=""
                      className="w-[350px] h-[280px] object-cover"
                    />
                  </>
                ) : (
                  <label
                    htmlFor="uploadImage"
                    className="w-full h-full relative flex items-center justify-center cursor-pointer"
                  >
                    <MdPhotoCamera className="w-10 h-10 text-primary" />
                    <input
                      type="file"
                      id="uploadImage"
                      onChange={handleUploadImage}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </div> */}
            <UploadImage
              file={file}
              imgUpload={imgUpload}
              handleUploadImage={handleUploadImage}
              handleDeleteImage={handleDeleteImage}
              isLoadingImage={isLoadingImage}
            />
          </div>

          <div className="flex flex-col gap-5">
            <div>
              <h2 className="font-semibold text-xl text-primary mb-5">
                Utilities
              </h2>

              {utilities.map((utility, index) => {
                return (
                  <div key={index} className="flex flex-row gap-4">
                    <div className="mb-5" key={utility.index}>
                      <Field row={true}>
                        <Label name={`nameUtility${utility.index}`}>Name</Label>
                        <Input
                          type="text"
                          name={`nameUtility${utility.index}`}
                          control={control}
                        />
                      </Field>
                      <Field row={true}>
                        <Label name={`priceUtility${utility.index}`}>
                          Price
                        </Label>
                        <Input
                          type="text"
                          name={`priceUtility${utility.index}`}
                          control={control}
                        />
                      </Field>
                    </div>
                    {index !== 0 && index === utilities.length - 1 && (
                      <AiFillMinusCircle
                        className="w-9 h-9 text-primary cursor-pointer"
                        onClick={() => handleClearUtility(utility)}
                      />
                    )}
                  </div>
                );
              })}

              <h2
                className=" text-primary mb-5 text-center font-semibold cursor-pointer"
                onClick={handleAddUtility}
              >
                Add more Utilities
              </h2>
            </div>
          </div>
        </div>
        <div className="button-container mt-5">
          <Button type="submit" isLoading={isLoading}>
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddLocationPage;
