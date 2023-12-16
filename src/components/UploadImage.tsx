import React from "react";
import { useForm } from "react-hook-form";

interface ImageUploadProps {
  onReview: (file: File | null) => void;
}

const UploadImage: React.FC<ImageUploadProps> = ({ onReview }) => {
  const { register } = useForm();
  const [selectedImage, setSelectedImage] = React.useState<File | null>(null);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedImage(file);
    onReview(file);
  };

  return (
    <label className="relative cursor-pointer mt-10">
      <input
        {...register("image", { required: "画像は必須です" })}
        type="file"
        accept=".png, .jpeg"
        onChange={onFileChange}
        className="sr-only"
      />
      <div className="group w-full max-w-[640px] mx-auto">
        <div className="w-full h-full bg-gray-100 rounded-md flex items-center justify-center border border-dashed border-gray-300 transition duration-300 group-hover:border-gray-400">
          {selectedImage ? (
            <img
              src={URL.createObjectURL(selectedImage)}
              alt="Selected"
              className="w-full h-full object-cover rounded-md"
            />
          ) : (
            <svg
              className="w-32 h-32 sm:w-40 sm:h-40 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>
          )}
        </div>
        <p className="mt-2 text-2xl font-bold group-hover:text-gray-700 text-center">
          画像を選択
        </p>
      </div>
    </label>
  );
};

export default UploadImage;
