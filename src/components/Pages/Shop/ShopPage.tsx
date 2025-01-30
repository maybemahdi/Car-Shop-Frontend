/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import SectionHead from "../../shared/SectionHead/SectionHead";
import ProductCard from "../../shared/ProductCard/ProductCard";
import { Button, GetProps, Input, Select } from "antd";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useGetAllCarsQuery } from "../../../redux/features/car/car.api";
import Loading from "../../shared/Loading/Loading";
import { ICar } from "../../../types/car.interface";

type SearchProps = GetProps<typeof Input.Search>;
const { Search } = Input;

const models = ["Corolla", "Civic", "Model 3", "F-150", "X5"];
const brands = ["Toyota", "Honda", "Tesla", "Ford", "BMW"];
const categories = ["Sedan", "Electric", "Pickup Truck", "SUV"];
const availabilities = [
  { name: "In Stock", value: "inStock" },
  { name: "Out of Stock", value: "outOfStock" },
];

const ShopPage = () => {
  const [search, setSearch] = useState("");
  const [model, setModel] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [availability, setAvailability] = useState("");
  const [priceRange, setPriceRange] = useState<any>([0, 200000]);
  // console.log(priceRange);
  const queryParams = [
    { name: "searchTerm", value: search },
    { name: "model", value: model },
    { name: "brand", value: brand },
    { name: "category", value: category },
    { name: "availability", value: availability },
    { name: "priceRange", value: priceRange },
  ];
  const {
    data: response,
    isLoading,
    isError,
  } = useGetAllCarsQuery(queryParams);

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return (
      <h3 className="text-main font-bold text-2xl flex items-center justify-center h-screen">
        Broh! Refresh and try again
      </h3>
    );
  }
  const cars = response?.data;

  console.log(search, model, brand, category, availability);

  const handleModelChange = (value: string) => {
    setModel(value);
  };
  const handleBrandChange = (value: string) => {
    setBrand(value);
  };
  const handleCategoryChange = (value: string) => {
    setCategory(value);
  };
  const handleAvailabilityChange = (value: string) => {
    setAvailability(value);
  };
  const handleSliderChange = (value: any) => {
    setPriceRange(value);
  };
  const handleResetFilter = () => {
    setModel("");
    setBrand("");
    setCategory("");
    setAvailability("");
    setPriceRange([0, 200000]);
    window.location.reload();
  };
  const onSearch: SearchProps["onSearch"] = (value) => {
    setSearch(value);
  };

  return (
    <div className="mt-32 md:mt-40 w-[90%] md:w-[88%] mx-auto">
      <SectionHead
        heading="Find your favorite car!"
        description="Get your most favorite car right here!"
      />
      <section className="my-8 md:my-12 bg-gray-100">
        <div className="flex gap-4 flex-wrap justify-between items-center">
          <Search
            className="lg:basis-2/6 hover:outline-0"
            placeholder="Search by brand, car name or category"
            allowClear
            enterButton="Search"
            size="large"
            onSearch={onSearch}
          />
          <div className="flex flex-wrap items-center gap-4">
            <Select
              placeholder="Filter by model"
              style={{ width: 160, height: 40 }}
              onChange={handleModelChange}
              options={models.map((model) => ({
                label: model,
                value: model,
              }))}
            />
            <Select
              placeholder="Filter by brand"
              style={{ width: 160, height: 40 }}
              onChange={handleBrandChange}
              options={brands.map((brand) => ({
                label: brand,
                value: brand,
              }))}
            />
            <Select
              placeholder="Filter by category"
              style={{ width: 160, height: 40 }}
              onChange={handleCategoryChange}
              options={categories.map((category) => ({
                label: category,
                value: category,
              }))}
            />
            <Select
              placeholder="Filter by availability"
              style={{ width: 160, height: 40 }}
              onChange={handleAvailabilityChange}
              options={availabilities.map((option) => ({
                label: option.name,
                value: option.value,
              }))}
            />
            <Button onClick={handleResetFilter} type="primary" className="h-10">
              Clear Filter
            </Button>
          </div>
        </div>

        {/* price range  */}
        <div className="p-6 mt-4 bg-white shadow-md rounded-md z-30">
          <Slider
            range
            min={0}
            max={200000}
            value={priceRange}
            onChange={handleSliderChange}
            trackStyle={[{ backgroundColor: "#E53E29", height: 8 }]}
            handleStyle={[
              {
                borderColor: "#E53E29",
                height: 24,
                width: 24,
                marginTop: -8,
              },
              {
                borderColor: "#E53E29",
                height: 24,
                width: 24,
                marginTop: -8,
              },
            ]}
            railStyle={{ backgroundColor: "#e5e7eb", height: 8 }}
          />

          <p className="mt-3 text-gray-600">
            Price Range: <span className="font-semibold">${priceRange[0]}</span>{" "}
            - <span className="font-semibold">${priceRange[1]}</span>
          </p>
        </div>

        {/* product cards  */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-4">
          {cars?.map((car: ICar, index: number) => (
            <ProductCard key={index} car={car} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default ShopPage;
