import React, { useEffect, useState } from "react";
import Table from "../components/table/Table";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuth } from "../context/auth-context";
import Button from "../components/button/Button";
import Field from "../components/field/Field";
import Label from "../components/label/Label";
import Input from "../components/input/Input";
import Radio from "../components/radio/Radio";
import Dropdown from "../components/dropdown/Dropdown";
import Select from "../components/dropdown/Select";
import List from "../components/dropdown/List";
import Option from "../components/dropdown/Option";
import http from "../config/axiosConfig";
import { toast } from "react-toastify";

const schema = yup.object({
  email: yup
    .string()
    .email("Please enter valid email address")
    .required("Please enter your email"),
  firstName: yup.string().required("Please enter your firstName"),
  lastName: yup.string().required("Please enter your lastName"),
  phone: yup.string().matches(/^\d+$/, "Phone must be number"),
  // password: yup
  //   .string()
  //   .required("Please enter your password")
  //   .min(8, "min 8")
  //   .max(20),
});

const HomePage = () => {
  const { user, setUser } = useAuth();
  const [edit, setEdit] = useState(true);
  const [roleType, setRoleType] = useState("");
  const [roles, setRoles] = useState([]);
  const [changePassword, setChangePassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {
    handleSubmit,
    control,
    getValues,
    reset,
    setValue,
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
      roleId: "",
    },
  });
  const watchGender = watch("gender");
  const watchpasswordConfirm = watch("passwordConfirm");

  useEffect(() => {
    reset({
      email: user?.email,
      firstName: user?.firstName,
      lastName: user?.lastName,
      phone: user?.phone,
      gender: user?.gender === "Female" ? 2 : 1,
      roleId: user?.role?.id,
    });
    setRoleType(user.role?.name);
    http
      .get("v1/roles")
      .then((res) => {
        setRoles(res?.data?.rows);
      })
      .catch((err) => console.log(err));
  }, [user]);
  useEffect(() => {
    const errorsList = Object.values(errors);
    if (errorsList.length > 0) {
      toast.error(errorsList[0]?.message);
    }
  }, [errors]);
  const handleRoleType = (item) => {
    setValue("roleId", item._id);
    setRoleType(item.name);
  };
  const onSubmit = async (values) => {
    const userEdit = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      gender: values.gender == 1 ? true : false,
      phone: values.phone,
      roleId: values.roleId,
      avatar:
        "https://images.unsplash.com/photo-1667506057200-e55b56ee2b44?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
    };
    setIsLoading(true);
    await http
      .put(`v1/users/${user.id}`, userEdit)
      .then((res) => {
        toast.success("success");
        setIsLoading(false);
        setEdit((prev) => !prev);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });

    await http
      .get("v1/me")
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="p-8 w-full">
      <div className="flex flex-row items-center gap-8">
        <div className="w-20 h-20">
          <img
            src={user?.avatar}
            alt=""
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        <h1 className="font-bold text-2xl text-primary">{user?.fullName}</h1>
        <div className="ml-auto">
          <Button
            onClick={() => {
              setEdit(!edit);
            }}
          >
            {edit ? "Edit" : "Close"}
          </Button>
        </div>
      </div>
      <form
        className="w-full max-w-[1000px] mt-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="w-full grid grid-cols-2 gap-4">
          <Field row={true}>
            <Label name="firstName">First Name:</Label>
            <Input
              type="text"
              name="firstName"
              control={control}
              edit={edit}
            ></Input>
          </Field>
          <Field row={true}>
            <Label name="lastName">Last Name:</Label>
            <Input
              type="text"
              name="lastName"
              control={control}
              edit={edit}
            ></Input>
          </Field>
        </div>
        <div className="w-full grid grid-cols-2 gap-4">
          <Field row={true}>
            <Label name="name" className="name">
              Email:
            </Label>
            <Input
              type="email"
              name="email"
              control={control}
              edit={true}
            ></Input>
          </Field>
          <Field row={true}>
            <Label name="phone">Phone Number:</Label>
            <Input
              type="text"
              name="phone"
              control={control}
              edit={edit}
            ></Input>
          </Field>
        </div>

        <div className="w-full grid grid-cols-2 gap-4">
          <Field row={true}>
            <Label name="gender">Gender:</Label>
            <div className="flex flex-row items-center gap-3">
              <Radio
                name="gender"
                control={control}
                value={1}
                edit={edit}
                checked={Number(watchGender) === 1}
              >
                Male
              </Radio>
              <Radio
                name="gender"
                control={control}
                value={2}
                edit={edit}
                checked={Number(watchGender) === 2}
              >
                Female
              </Radio>
            </div>
          </Field>
          <Field row={true}>
            <Label name="role" className="role">
              Role:
            </Label>
            <Dropdown>
              <Select
                placeholder={roleType || "Role Type"}
                edit={true}
              ></Select>
              <List>
                {roles?.map((item) => (
                  <Option key={item._id} onClick={() => handleRoleType(item)}>
                    {item.name}
                  </Option>
                ))}
              </List>
            </Dropdown>
          </Field>
        </div>
        {!edit && (
          <>
            <span
              onClick={() => setChangePassword(!changePassword)}
              className="px-2 py-2 border inline-block rounded-md cursor-pointer mb-4 border-primary"
            >
              Change Password
            </span>
            {changePassword && (
              <div className="w-full grid grid-cols-2 gap-4">
                <Field row={true}>
                  <Label name="password">Password</Label>
                  <Input
                    type="password"
                    name="password"
                    control={control}
                  ></Input>
                </Field>
                <Field row={true}>
                  <Label name="passwordConfirm">Password Confirm</Label>
                  <Input
                    type="password"
                    name="passwordConfirm"
                    control={control}
                  ></Input>

                  {getValues("password") &&
                    watchpasswordConfirm !== getValues("password") && (
                      <div className="text-red-500">Not match</div>
                    )}
                </Field>
              </div>
            )}
            <div className="">
              <Button type="submit" isLoading={isLoading}>
                Submit
              </Button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default HomePage;
