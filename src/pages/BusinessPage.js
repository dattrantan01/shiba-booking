import axios from "axios";
import React from "react";

const BusinessPage = () => {
  axios
    .get("https://shiba-booking.herokuapp.com/api/booking/locations/cities")
    .then((res) => {
      console.log("res", res);
    })
    .catch((err) => console.error(err));
  return <div></div>;
};

export default BusinessPage;
