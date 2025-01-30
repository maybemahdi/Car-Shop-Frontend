/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from "../../shared/Button/Button";
import MyFormTextArea from "../../ui/MyForm/MyFormTextArea/MyFormTextArea";
import MyFormInput from "../../ui/MyForm/MyFormInput/MyFormInput";
import MyFormSelect from "../../ui/MyForm/MyFormSelect/MyFormSelect";
import MyFormWrapper from "../../ui/MyForm/MyFormWrapper/MyFormWrapper";
import { brands, categories, models } from "../../../constant/car.constant";

const AddCarPage = () => {
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
            <MyFormInput name={"price"} label="Price" type="number" />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <MyFormSelect
              placeHolder="Select Category"
              options={categoryOptions}
              name={"category"}
              label="Select Category"
              className="-mt-1"
            />
            <MyFormInput name={"quantity"} label="Quantity" type="number" />
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
