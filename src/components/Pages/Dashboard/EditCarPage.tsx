
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from "react-router-dom";
import { useGetSingleCarQuery } from "../../../redux/features/car/car.api";
import Loading from "../../shared/Loading/Loading";
import Button from "../../shared/Button/Button";
import MyFormTextArea from "../../ui/MyForm/MyFormTextArea/MyFormTextArea";
import MyFormInput from "../../ui/MyForm/MyFormInput/MyFormInput";
import MyFormSelect from "../../ui/MyForm/MyFormSelect/MyFormSelect";
import MyFormWrapper from "../../ui/MyForm/MyFormWrapper/MyFormWrapper";
import {
  brands,
  categories,
  models,
} from "../../../constant/car.constant";

const EditCarPage = () => {
  const { id } = useParams();
  const { data: response, isLoading, isError } = useGetSingleCarQuery(id);

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
    console.log(formData, reset);
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
        // resolver={zodResolver(validationSchema)}
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
            <MyFormInput
              value={car?.price}
              name={"price"}
              label="Price"
              type="number"
            />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <MyFormSelect
              defaultValue={car?.category}
              placeHolder="Select Category"
              options={categoryOptions}
              name={"category"}
              label="Select Category"
              className="-mt-1"
            />
            <MyFormInput
              value={car?.quantity}
              name={"quantity"}
              label="Quantity"
              type="number"
            />
          </div>
          <MyFormTextArea value={car?.description} name={"description"} label="Description" />
        </div>

        <div className="flex justify-start gap-4">
          <Button text="Update" type="submit" />
        </div>
      </MyFormWrapper>
    </div>
  );
};

export default EditCarPage;
