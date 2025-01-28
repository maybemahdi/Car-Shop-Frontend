import { FormEvent, useState } from "react";
import Loading from "../../shared/Loading/Loading";
import { useGetSingleCarQuery } from "../../../redux/features/car/car.api";
import { ScrollRestoration, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { useAppSelector } from "../../../redux/hooks";
import { selectCurrentUser } from "../../../redux/features/auth/authSlice";
import Button from "../../shared/Button/Button";
import { useCreateOrderMutation } from "../../../redux/features/order/orderApi";

const CheckoutPage = () => {
  const [quantity, setQuantity] = useState(1);
  const [searchParams] = useSearchParams();
  const userDetails = useAppSelector(selectCurrentUser);
  const id = searchParams.get("id");
  const { data: response, isLoading, isError } = useGetSingleCarQuery(id);
  const [createOrder] = useCreateOrderMutation();

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

  const totalPrice = quantity * car.price;

  const handleQuantityChange = (value: number) => {
    if (car.inStock) {
      setQuantity(value);
    }
  };

  const handlePayment = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target;
    const email = (form as HTMLFormElement).email.value;
    const address = (form as HTMLFormElement).address.value;
    const phone = (form as HTMLFormElement).phone.value;
    const car = id;
    const payload = {
      email,
      car,
      quantity,
      address,
      phone,
      totalPrice,
    };
    // console.log(payload);
    const toastId = toast.loading("Placing Order");
    try {
      const response = await createOrder(payload).unwrap();
      if (response.success) {
        console.log(response)
        toast.success("Order Placed", { id: toastId });
        window.location.href = response.data;
      }
    } catch (error) {
      toast.error("Something went wrong", { id: toastId });
      console.error("Error submitting test answers:", error);
    }
  };
  return (
    <>
      <div className="mt-32 md:mt-40 w-[90%] md:w-[88%] mx-auto mb-16">
        <div className="max-w-xl mx-auto p-4 shadow-lg bg-white rounded-md">
          <div className="w-full">
            <h2 className="text-2xl font-semibold mb-4 text-primary">
              Checkout
            </h2>

            {/* car Details */}
            <div className="mb-4">
              <p>
                Name: {car.brand} {car.model}
              </p>
              <p>
                Price:{" "}
                <span className="text-primary font-semibold">${car.price}</span>
              </p>
              <p>Stock: {car.inStock ? "In Stock" : "Out of Stock"}</p>
            </div>

            {/* Order Form */}
            <form onSubmit={handlePayment} className="mb-4">
              <div className="flex flex-col gap-3">
                <div>
                  <label className="block mb-2">Quantity: (max:5)</label>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) =>
                      handleQuantityChange(Number(e.target.value))
                    }
                    className="border rounded px-2 py-1 w-full"
                    min={1}
                    max={5}
                  />
                </div>
                <div>
                  <label className="block mb-2">Name:</label>
                  <input
                    type="text"
                    name="name"
                    value={userDetails?.name}
                    className="border rounded px-2 py-1 w-full"
                    required
                    disabled
                  />
                </div>
                <div>
                  <label className="block mb-2">Email:</label>
                  <input
                    type="email"
                    name="email"
                    value={userDetails?.email}
                    className="border rounded px-2 py-1 w-full"
                    required
                    disabled
                  />
                </div>
                <div>
                  <label className="block mb-2">Phone:</label>
                  <input
                    type="text"
                    name="phone"
                    className="border rounded px-2 py-1 w-full"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2">Address:</label>
                  <textarea
                    name="address"
                    className="border rounded px-2 py-1 w-full h-32"
                    required
                  />
                </div>
              </div>
              {/* Total Price */}
              <div className="mb-4">
                <h3 className="text-lg font-medium">Total Price</h3>
                <p>${totalPrice}</p>
              </div>

              {/* Submit Button */}
                <Button text="Order Now" isFullWidth={true} />
            </form>
          </div>
        </div>
      </div>
      <ScrollRestoration />
    </>
  );
};

export default CheckoutPage;
