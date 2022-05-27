import React, { FC, useState } from 'react';

export const FileDrop: FC = () => {
  const [img, setImg] = useState<string | undefined>(undefined);
  return (
    <div className="border border-dashed border-gray-500 relative">
      <input
        onChange={(e) => {
          if (e.target.files) {
            const url = URL.createObjectURL(e.target.files[0]);
            setImg(url);
          }
        }}
        type="file"
        accept="image/png, image/jpeg"
        className="cursor-pointer absolute block opacity-0 w-full h-full p-10 z-50"
      />
      <>
        {img ? (
          <img className=" max-h-96 mx-auto z-20 relative p-4" src={img} />
        ) : (
          <div className="text-center p-10 relative top-0 right-0 left-0 m-auto">
            <h4>
              Drop files anywhere to upload
              <br />
              or
            </h4>
            <p className="">Select Files</p>
          </div>
        )}
      </>
    </div>
  );
};
