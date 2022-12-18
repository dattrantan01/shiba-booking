import axios from "axios";
import { useState } from "react";
import http from "../config/axiosConfig";

//imgUpload: id,
//file: url
export default function useUploadImage() {
  const [file, setFile] = useState();
  const [imgUpload, setImgUpload] = useState();
  const [isLoadingImage, setIsLoadingImage] = useState(false);
  const handleDeleteImage = () => {
    if (!file) return;
    setIsLoadingImage(true);
    http
      .delete(`booking/photos`, {
        ImgId: imgUpload,
      })
      .then((res) => {
        console.log("delete Img", res);
        setFile("");
        setImgUpload(null);
        setIsLoadingImage(false);
      })
      .catch((err) => {
        console.log("img err", err);
        setIsLoadingImage(false);
      });
  };

  const handleUploadImage = (e) => {
    setIsLoadingImage(true);
    const fileUpload = e.target.files[0];
    setFile(URL.createObjectURL(fileUpload));
    const formData = new FormData();
    formData.append("Img", fileUpload);
    const token = localStorage.getItem("token");
    axios
      .post(
        "https://pbl6-prod-pbl-dspnq9.mo6.mogenius.io/api/booking/photos/upload",

        formData,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        setImgUpload(res?.data.imgId);
        setFile(res?.data.imgUrl);
        setIsLoadingImage(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoadingImage(false);
      });
  };
  return {
    handleUploadImage,
    handleDeleteImage,
    file,
    setFile,
    imgUpload,
    setImgUpload,
    isLoadingImage,
  };
}
