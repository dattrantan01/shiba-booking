import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import Field from "../components/field/Field";
import Input from "../components/input/Input";
import Label from "../components/label/Label";
import Button from "../components/button/Button";
import Radio from "../components/radio/Radio";
import Dropdown from "../components/dropdown/Dropdown";
import Select from "../components/dropdown/Select";
import List from "../components/dropdown/List";
import Option from "../components/dropdown/Option";
import { toast } from "react-toastify";
import http from "../config/axiosConfig";
import { useDropdown } from "../components/dropdown/dropdown-context";

const roleData = [
  {
    id: 1,
    type: "Admin",
  },
  {
    id: 2,
    type: "Super Admin",
  },
];

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

const UserDetailPage = () => {
  const { userid } = useParams();
  const [changePassword, setChangePassword] = useState(false);
  const [user, setUser] = useState({});
  const [edit, setEdit] = useState(true);
  const [roleType, setRoleType] = useState("");

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
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      password: "",
      gender: user.gender ? 1 : 2,
    },
  });
  const watchGender = watch("gender");
  const watchpasswordConfirm = watch("passwordConfirm");
  useEffect(() => {
    http
      .get(`users/${userid}`)
      .then((res) => {
        setUser(res.data);
        reset({
          email: res.data.email,
          firstName: res.data.firstName,
          lastName: res.data.lastName,
          phone: res.data.phone,
          gender: res.data.gender ? 1 : 2,
        });
        // setValue("roleId")
      })
      .catch((err) => console.error(err));
  }, [userid, setUser, reset]);
  useEffect(() => {
    const errorsList = Object.values(errors);
    if (errorsList.length > 0) {
      toast.error(errorsList[0]?.message);
    }
  }, [errors]);

  const onSubmit = async (values) => {
    const user = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      gender: values.gender === 1 ? false : true,
      phone: values.phone,
      roleId: values.roleId,
      avatar:
        "https://images.unsplash.com/photo-1667506057200-e55b56ee2b44?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
    };
    console.log(user);
    await http
      .put(`users/${userid}`, user)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleRoleType = (item) => {
    setValue("roleId", item.id);
    setRoleType(item.type);
  };
  return (
    <div className="p-8 w-full">
      <div className="flex flex-row items-center gap-8">
        <div className="w-20 h-20">
          <img
            src={user.avatar}
            alt=""
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        <h1 className="font-bold text-2xl text-primary">{user.fullName}</h1>
        <div className="ml-auto">
          <Button
            onClick={() => {
              setEdit(!edit);
            }}
          >
            Edit
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
              edit={edit}
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
                checked={Number(watchGender) === 1}
              >
                Male
              </Radio>
              <Radio
                name="gender"
                control={control}
                value={2}
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
                edit={edit}
              ></Select>
              <List>
                {roleData.map((item) => (
                  <Option key={item.id} onClick={() => handleRoleType(item)}>
                    {item.type}
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
              <Button type="submit">Submit</Button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default UserDetailPage;
