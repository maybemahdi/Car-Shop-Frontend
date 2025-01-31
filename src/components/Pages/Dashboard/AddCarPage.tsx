/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from "../../shared/Button/Button";
import MyFormTextArea from "../../ui/MyForm/MyFormTextArea/MyFormTextArea";
import MyFormInput from "../../ui/MyForm/MyFormInput/MyFormInput";
import MyFormSelect from "../../ui/MyForm/MyFormSelect/MyFormSelect";
import MyFormWrapper from "../../ui/MyForm/MyFormWrapper/MyFormWrapper";
import { brands, categories, models } from "../../../constant/car.constant";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import MyFormImageUpload from "../../ui/MyForm/MyFormImageUpload/MyFormImageUpload";
import { toast } from "sonner";
import { useAddCarMutation } from "../../../redux/features/car/car.api";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const validationSchema = z.object({
  brand: z.string().nonempty("Brand is required"),
  model: z.string().nonempty("Model is required"),
  image: z.instanceof(File).optional(),
  year: z
    .number()
    .min(2018, "Year must be 2018 or later")
    .max(2024, "Year must be 2024 or earlier"),
  price: z.preprocess(
    (val) => Number(val),
    z.number().min(0, "Price must be a positive number")
  ),
  category: z.string().nonempty("Category is required"),
  quantity: z.preprocess(
    (val) => Number(val),
    z.number().min(1, "Quantity must be at least 1")
  ),
  description: z.string().nonempty("Description is required"),
});

const AddCarPage = () => {
  const [showProfile, setShowProfile] = useState(true);
  const [addCar] = useAddCarMutation();
  const navigate = useNavigate();
  // submit update
  const handleSubmit = async (formData: any, reset: any) => {
    const toastId = toast.loading("Creating Car...");

    const formDataToSend = new FormData();
    if (formData.image) {
      formDataToSend.append("image", formData.image);
      delete formData.image;
    }
    formDataToSend.append(
      "data",
      JSON.stringify({ ...formData, inStock: true })
    );

    try {
      const res = await addCar(formDataToSend).unwrap();
      console.log(res);
      if (res.success) {
        reset();
        toast.success(res.message, { id: toastId });
        navigate("/dashboard/car-management");
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong", {
        id: toastId,
      });
      reset();
    }
  };

  const brandOptions = brands?.map((brand) => ({
    label: brand,
    value: brand,
  }));
  const modelOptions = models?.map((brand) => ({
    label: brand,
    value: brand,
  }));
  const categoryOptions = categories?.map((brand) => ({
    label: brand,
    value: brand,
  }));

  return (
    <div>
      <MyFormWrapper
        onSubmit={handleSubmit}
        resolver={zodResolver(validationSchema)}
        className="flex flex-col gap-5 my-5"
      >
        {/* Personal Information Section */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <MyFormSelect
              placeHolder="Select Brand"
              options={brandOptions}
              name={"brand"}
              label="Brand"
            />
            <MyFormSelect
              placeHolder="Select Model"
              options={modelOptions}
              name={"model"}
              label="Model"
            />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <MyFormInput name={"price"} label="Price" type="number" />
            <MyFormInput name={"quantity"} label="Quantity" type="number" />
          </div>
          <MyFormImageUpload
            setShowProfile={setShowProfile}
            showProfile={showProfile}
            name="image"
            label="Upload Image"
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <MyFormSelect
              placeHolder="Select Category"
              options={categoryOptions}
              name={"category"}
              label="Select Category"
              className="-mt-1"
            />
            <MyFormSelect
              placeHolder="Year Released"
              options={[
                { label: 2018, value: 2018 },
                { label: 2019, value: 2019 },
                { label: 2020, value: 2020 },
                { label: 2021, value: 2021 },
                { label: 2022, value: 2022 },
                { label: 2023, value: 2023 },
                { label: 2024, value: 2024 },
              ]}
              name={"year"}
              label="Year Released"
              className="-mt-1"
            />
          </div>
          <MyFormTextArea name={"description"} label="Description" />
        </div>

        <div className="flex justify-start gap-4">
          <Button text="Add Car" type="submit" />
        </div>
      </MyFormWrapper>
    </div>
  );
};

export default AddCarPage;
