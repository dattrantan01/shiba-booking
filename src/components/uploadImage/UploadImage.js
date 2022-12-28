import React from "react";
import { MdPhotoCamera } from "react-icons/md";

const UploadImage = ({
  file,
  handleDeleteImage,
  handleUploadImage,
  imgUpload,
  isLoadingImage = false,
}) => {
  console.log("isLoadingImage", isLoadingImage);
  return (
    <>
      <div className="mt-8 mb-8 relative w-[350px] h-[280px]">
        <div className="w-full h-full border-slate-300 border shadow-md cursor-pointer relative flex items-center justify-center">
          {file && imgUpload ? (
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
      </div>
      {isLoadingImage && <div>Loading . . .</div>}
    </>
  );
};

export default UploadImage;
