// src/pages/AddLunch.tsx
import React, { useState } from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import UploadImage from "../components/UploadImage";
import { addDoc, collection } from "firebase/firestore";
import { db, storage } from "../../.firebase/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const AddLunch: React.FC = () => {
  const [menuName, setMenuName] = useState<string>("");
  const [price, setPrice] = useState<string>("");

  const handleReview = async (selectedImage: File | null) => {
    // ここに画像に対する批評のロジックを追加する
    if (selectedImage) {
      try {
        // ストレージの参照を作成
        const storageRef = ref(storage, "images/" + selectedImage.name);
  
        // ファイルをアップロード
        await uploadBytes(storageRef, selectedImage);
  
        // ダウンロード URL を取得
        const downloadURL = await getDownloadURL(storageRef);
        
        // ダウンロード URL で何かを行います。例えば、画像を表示するか Firestore に保存するかです
        console.log("Download URL:", downloadURL);
  
        // これで、ダウンロード URL を使って画像を表示するか、Firestore に保存するなどができます
      } catch (error) {
        console.error("Firebase Storage への画像のアップロードエラー:", error);
      }
    } else {
      console.log("画像が選択されていません");
    }
  };

  const handleAddMenu = async () => {
    // メニューデータをFirestoreに追加
    try {
      const docRef = await addDoc(collection(db, "menu"), {
        name,
        price,
        file_name: "../assets/gyutan.jpg",
        is_soldout: false,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <Card
      color="transparent"
      shadow={false}
      placeholder={undefined}
      className="flex flex-col items-center m-10"
    >
      <Typography variant="h2" color="blue-gray" placeholder={undefined} className="text-center">
        メニューを追加できます
      </Typography>

      <form className="mt-8 mb-2 w-full max-w-screen-lg sm:w-96">
        <div className="mb-1 flex flex-col gap-6">
          <Typography variant="h4" color="blue-gray" className="-mb-3" placeholder={undefined}>
            メニュー名
          </Typography>
          <Input
            size="lg"
            placeholder="唐揚げ定食"
            value={menuName}
            onChange={(e) => setMenuName(e.target.value)}
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
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className=" !border-t-blue-gray-200 focus:!border-orange-500"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            crossOrigin={undefined}
          />
          <UploadImage onReview={handleReview} />
        </div>
        <Button onClick={handleAddMenu} className="mt-20 bg-orange-600" fullWidth placeholder={undefined}>
          <span className="text-xl">メニューを追加</span>
        </Button>
      </form>
    </Card>
  );
};

export default AddLunch;
