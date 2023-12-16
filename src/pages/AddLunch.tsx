// pages/AddLunch.tsx
import React from "react";
import {
  Card,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import UploadImage from "../components/UploadImage";

export const AddLunch = () => {
  const handleReview = (selectedImage: File | null) => {
    // ここに画像に対する批評のロジックを追加する
    if (selectedImage) {
      console.log("Selected Image:", selectedImage);
    } else {
      console.log("No image selected");
    }
  };

  return (
    <Card
      color="transparent"
      shadow={false}
      placeholder={undefined}
      className="flex flex-col items-center m-10"
    >

      <form className="mt-8 mb-2 w-full max-w-screen-lg sm:w-96">
        <div className="mb-1 flex flex-col gap-6">
          <Typography variant="h4" color="blue-gray" className="-mb-3" placeholder={undefined}>
            メニュー名
          </Typography>
          <Input
            size="lg"
            placeholder="唐揚げ定食"
            className=" !border-t-blue-gray-200 focus:!border-orange-500"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            crossOrigin={undefined}
          />
          <Typography variant="h4" color="blue-gray" className="-mb-3" placeholder={undefined} >
            値段
          </Typography>
          <Input
            size="lg"
            placeholder="430円"
            className=" !border-t-blue-gray-200 focus:!border-orange-500"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            crossOrigin={undefined}
          />
          <UploadImage onReview={handleReview} />
        </div>
        <Button className="mt-20 bg-orange-600" fullWidth placeholder={undefined}>
          <span className="text-xl">メニューを追加</span>
        </Button>
      </form>
    </Card>
  );
};

export default AddLunch;
