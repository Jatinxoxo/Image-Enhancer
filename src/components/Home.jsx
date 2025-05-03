import React, { useState } from "react";
import Upload from "./Upload";
import Preview from "./Preview";
import { enhancedImageAPI } from "../utils/enchancedimageApi";


const Home = () => {
  const [uploadimage, setuploadimage] = useState(null);
  const [enhancedImage, setEnhancedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const UploadImageHandler = async (file) => {
    setuploadimage(URL.createObjectURL(file));
    setLoading(true);

    try {
      const enchancedURL = await enhancedImageAPI(file);
      console.log("Enhanced image URL:", enchancedURL?.image);
      setEnhancedImage(enchancedURL);
    } catch (error) {
      console.error("Error enhancing image:", error);
      alert("Error enhancing image. Please try again.");
    }

    setLoading(false);
  };

  return (
    <>
      <Upload UploadImageHandler={UploadImageHandler} />
      <Preview
        loading={loading}
        uploaded={uploadimage}
        enhanced={enhancedImage?.image}
      />
    </>
  );
};

export default Home;
