/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetSingleCarQuery,
  useUpdateCarMutation,
} from "../../../redux/features/car/car.api";
import Loading from "../../shared/Loading/Loading";
import Button from "../../shared/Button/Button";
import MyFormTextArea from "../../ui/MyForm/MyFormTextArea/MyFormTextArea";
import MyFormInput from "../../ui/MyForm/MyFormInput/MyFormInput";
import MyFormSelect from "../../ui/MyForm/MyFormSelect/MyFormSelect";
import MyFormWrapper from "../../ui/MyForm/MyFormWrapper/MyFormWrapper";
import { brands, categories, models } from "../../../constant/car.constant";
import MyFormImageUpload from "../../ui/MyForm/MyFormImageUpload/MyFormImageUpload";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const validationSchema = z.object({
  brand: z.string().optional(),
  model: z.string().optional(),
  image: z.instanceof(File).optional(),
  year: z
    .number()
    .min(2018, "Year must be 2018 or later")
    .max(2024, "Year must be 2024 or earlier")
    .optional(),
  price: z
    .preprocess(
      (val) => Number(val),
      z.number().min(0, "Price must be a positive number").optional()
    )
    .optional(),
  category: z.string().optional(),
  quantity: z
    .preprocess(
      (val) => Number(val),
      z.number().min(1, "Quantity must be at least 1").optional()
    )
    .optional(),
  description: z.string().optional(),
});

const EditCarPage = () => {
  const { id } = useParams();
  const { data: response, isLoading, isError } = useGetSingleCarQuery(id);
  const [updateCar] = useUpdateCarMutation();
  const navigate = useNavigate();

  // Loading state
  if (isLoading) {
    return <Loading />;
  }

  // Error state
  if (isError || !response) {
    return (
      <h3 className="text-main font-bold text-2xl flex items-center justify-center h-screen">
        Something went wrong. Please refresh and try again.
      </h3>
    );
  }

  // Car data from the response
  const car = response?.data;

  console.log(car);

  if (!car) {
    return (
      <h3 className="text-main font-bold text-2xl flex items-center justify-center h-screen">
        Car not found!
      </h3>
    );
  }

  // submit update
  const handleSubmit = async (formData: any, reset: any) => {
    const toastId = toast.loading("Updating Car...");

    const formDataToSend = new FormData();
    if (formData?.image) {
      formDataToSend.append("image", formData?.image);
      delete formData?.image;
    }
    formDataToSend.append(
      "data",
      JSON.stringify({ ...formData, inStock: formData.quantity > 0 })
    );

    try {
      const res = await updateCar({
        id: id,
        formData: formDataToSend,
      }).unwrap();
      console.log(res);
      if (res?.success) {
        reset();
        toast.success(res?.message, { id: toastId });
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
              defaultValue={car?.brand}
              placeHolder="Select Brand"
              options={brandOptions}
              name={"brand"}
              label="Brand"
            />
            <MyFormSelect
              defaultValue={car?.model}
              placeHolder="Select Model"
              options={modelOptions}
              name={"model"}
              label="Model"
            />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <MyFormInput
              value={car?.price}
              name={"price"}
              label="Price"
              type="number"
            />
            <MyFormInput
              value={car?.quantity}
              name={"quantity"}
              label="Quantity"
              type="number"
            />
          </div>
          <MyFormImageUpload
            // defaultValue={car?.image}
            name="image"
            label="Upload Image"
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <MyFormSelect
              defaultValue={car?.category}
              placeHolder="Select Category"
              options={categoryOptions}
              name={"category"}
              label="Select Category"
              className="-mt-1"
            />
            <MyFormSelect
              defaultValue={car?.year}
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
          <MyFormTextArea
            value={car?.description}
            name={"description"}
            label="Description"
          />
        </div>

        <div className="flex justify-start gap-4">
          <Button text="Update" type="submit" />
        </div>
      </MyFormWrapper>
    </div>
  );
};

export default EditCarPage;
