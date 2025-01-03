/* eslint-disable react/prop-types */
import {
  Dialog,
  Transition,
  TransitionChild,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { Fragment, useState } from "react";
import Button from "../Shared/Button/Button";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import axios from "axios";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const PurchaseModal = ({ closeModal, refetch, isOpen, plant }) => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const {
    sellerInf,
    quantity,
    price,
    plantphoto,
    name,
    description,
    category,
    _id,
  } = plant;
  const [totalquantity, setQuantity] = useState(1);
  const [totalPrice, setTotlPrice] = useState(price);
  const [address, setAdress] = useState("");
  const [pursesInf, setPusesInf] = useState({
    customer: {
      name: user?.displayName,
      email: user?.email,
      image: user?.photoURL,
    },
    plantId: _id,
    TotalPrice: totalPrice,
    totalquantity: totalquantity,
    seller: sellerInf?.email,
    Address: "",
    status: "pending",
  });
  // Total Price Calculation

  console.log(totalquantity);

  const handleQuantity = (value) => {
    if (value > quantity) {
      setQuantity(quantity);
      setTotlPrice(quantity * price);
      toast.error("Out of stock");
      setPusesInf((prev) => ({
        ...prev,
        totalquantity: quantity,
        TotalPrice: quantity * price,
      }));
    } else if (value <= 0) {
      setQuantity(1);
      setTotlPrice(price);
      toast.error("Quantity cannot be less than 1");
      setPusesInf((prev) => ({
        ...prev,
        totalquantity: 1,
        TotalPrice: quantity * price,
      }));
    } else {
      setQuantity(value);
      setTotlPrice(value * price);
      setPusesInf((prev) => ({
        ...prev,
        totalquantity: value,
        TotalPrice: value * price,
      }));
    }
  };
  const handlPurches = async () => {
    try {
      const { data } = await axiosSecure.post(`/orders`, pursesInf);
      console.log("data", data);
      toast.success("Purcess SucessFully");
      await axiosSecure.patch(`/plants/quantity/${_id}`, {
        quantityUpdate: totalquantity,
        status:'decrease',
      });
      toast.success('Product Order Canceled')
      refetch();
    } catch (err) {
      console.log(err);
      toast.error(err.response.data)
    } finally {
      closeModal();
    }
  };
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <DialogTitle
                  as="h3"
                  className="text-lg font-medium text-center leading-6 text-gray-900"
                >
                  Review Info Before Purchase
                </DialogTitle>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">Plant: {name}</p>
                </div>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">Category: {category}</p>
                </div>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Customer: {user?.displayName}
                  </p>
                </div>

                <div className="mt-2">
                  <p className="text-sm text-gray-500">Price: $ {price}</p>
                </div>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Available Quantity: {quantity}
                  </p>
                </div>
                {/* Quantity */}
                <div className="space-y-1 flex items-center gap-4  m-3 text-sm">
                  <label htmlFor="quantity" className="block text-gray-600">
                    Quantity
                  </label>
                  <input
                    value={totalquantity}
                    onChange={(e) =>
                      handleQuantity(parseInt(e.target.value) || 0)
                    }
                    className=" px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                    name="quantity"
                    id="quantity"
                    type="number"
                    placeholder="Available quantity"
                    required
                  />
                </div>
                {/* adress */}
                <div className="space-y-1 flex items-center gap-4  m-3 text-sm">
                  <label htmlFor="address" className=" text-gray-600 ">
                    Address
                  </label>
                  <input
                    onChange={(e) =>
                      setPusesInf((prev) => {
                        return { ...prev, Address: e.target.value };
                      })
                    }
                    className=" px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                    name="address"
                    id="address"
                    type="text"
                    placeholder="Write you address"
                    required
                  />
                </div>

                <div className="m-3">
                  <Button
                    onClick={handlPurches}
                    label={`Pay ${totalPrice}$`}
                  ></Button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default PurchaseModal;
