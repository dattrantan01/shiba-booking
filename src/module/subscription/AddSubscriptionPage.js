import React, { useEffect, useState } from "react";

import Dropdown from "../../components/dropdown/Dropdown";
import List from "../../components/dropdown/List";
import Option from "../../components/dropdown/Option";
import Select from "../../components/dropdown/Select";
import Field from "../../components/field/Field";
import Label from "../../components/label/Label";
import http from "../../config/axiosConfig";
import "react-datetime/css/react-datetime.css";
import Button from "../../components/button/Button";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import Loading from "../../components/loading/Loading";

const AddSubscriptionPage = () => {
  const [businesses, setBusinesses] = useState([]);
  const [businessesSelect, setBusinessesSelect] = useState("");
  const [packages, setPackages] = useState([]);
  const [packagesSelect, setPackagesSelect] = useState("");
  const [value, setValue] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const [currentStartEndTime, setCurrentStartEndTime] = useState({
    endTime: "",
    newEndTime: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    http
      .get(`v1/businesses`)
      .then((res) => {
        setBusinesses(res.data?.rows);
      })
      .catch((err) => {
        console.log(err);
      });
    http
      .get("v1/packages")
      .then((res) => {
        setPackages(res.data?.rows);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const handleClickBusiness = (item) => {
    setBusinessesSelect(item.email);
    setValue({
      ...value,
      businessId: item.id,
    });
    setCurrentStartEndTime({
      endTime: "",
      newEndTime: "",
    });
  };
  const handleClickPackage = (item) => {
    const businessId = value?.businessId;
    if (!businessId) return;
    setIsLoading(true);
    http
      .get(`v1/subscriptions?businessId=${businessId}`)
      .then((res) => {
        let endTime = res.data?.rows[0]?.endTime;
        if (!endTime) {
          let newEndTime = new Date();
          newEndTime = moment(newEndTime)
            .add(item.months, "months")
            .toISOString()
            .slice(0, 10);

          setCurrentStartEndTime({
            endTime: "",
            newEndTime: newEndTime,
          });
        } else {
          const newEndTime = moment(endTime)
            .add(item.months, "months")
            .toISOString()
            .slice(0, 10);
          endTime = endTime.slice(0, 10);
          setCurrentStartEndTime((prev) => {
            return {
              ...prev,
              endTime: endTime,
              newEndTime: newEndTime,
            };
          });
        }
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
      });

    setPackagesSelect(`${item.name}  -  ${item.months} months`);
    setValue({
      ...value,
      packageId: item._id,
    });
  };
  console.log(currentStartEndTime);
  const handleSubmit = () => {
    const addSub = {
      ...value,
    };
    console.log(addSub);
    http
      .post(`v1/subscriptions`, addSub)
      .then((res) => {
        toast.success("success");
        navigate("/subscriptions");
        console.log(res);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="p-8 w-full">
      <h1 className="font-bold text-2xl text-primary">ADD NEW SUBSCRIPTION</h1>
      <div className="w-full mt-8 max-w-[500px] mb-10">
        <Field>
          <Label>Business Email</Label>
          <Dropdown>
            <Select placeholder={businessesSelect || "Business Email"}></Select>
            <List>
              {businesses.length > 0 &&
                businesses.map((item) => (
                  <Option
                    key={item.id}
                    onClick={() => handleClickBusiness(item)}
                  >
                    {item.email}
                  </Option>
                ))}
            </List>
          </Dropdown>
        </Field>
        <Field>
          <Label>Package</Label>
          <Dropdown>
            <Select placeholder={packagesSelect || "Package"}></Select>
            <List>
              {packages.length > 0 &&
                packages.map((item) => (
                  <Option
                    key={item._id}
                    onClick={() => handleClickPackage(item)}
                  >
                    {`${item.name}  -  ${item.months} months`}
                  </Option>
                ))}
            </List>
          </Dropdown>
        </Field>
        {isLoading ? (
          <Loading></Loading>
        ) : (
          <div className="flex flex-col gap-2">
            {currentStartEndTime?.endTime && (
              <div>
                <span className="font-semibold">Current Endtime:</span>{" "}
                {currentStartEndTime?.endTime}
              </div>
            )}
            {currentStartEndTime?.newEndTime && (
              <div>
                <span className="font-semibold">New Endtime: </span>
                {currentStartEndTime?.newEndTime}
              </div>
            )}
          </div>
        )}
        {/* <div className="date_picker_wrapper">
          <DatePicker
            onChange={(date) => setDate(date)}
            dateFormat="YYYY-MM-DD"
            timeFormat={false}
            wrapperClassName="datePicker"
          />
        </div> */}
      </div>
      <Button onClick={handleSubmit}>Submit</Button>
    </div>
  );
};

export default AddSubscriptionPage;
