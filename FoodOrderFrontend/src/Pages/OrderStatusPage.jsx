import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLastOrder } from "../features/orders/ordersSlice";
import GoToAdminPageButton from "../components/GoToAdminPageButton";
import { Stepper } from "primereact/stepper";
import { StepperPanel } from "primereact/stepperpanel";
import {
  HourglassSplit,
  Magic,
  Truck,
  CheckCircle,
} from "react-bootstrap-icons";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";

const OrderStatusPage = () => {
  const dispatch = useDispatch();
  const lastOrder = useSelector((state) => state.orders.lastOrder);
  const isLoading = useSelector((state) => state.orders.isLoading);
  const error = useSelector((state) => state.orders.error);
  const stepperRef = useRef(null);

  useEffect(() => {
    dispatch(getLastOrder());
  }, [dispatch]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Failed to fetch the last order. Please try again later.</p>;
  }

  if (!lastOrder || !lastOrder.orderItems) {
    return <p>No last order found.</p>;
  }

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const orderStatusToText = (orderStatus) => {
    switch (orderStatus) {
      case 0:
        return "Pending";
      case 1:
        return "Preparing";
      case 2:
        return "Underway";
      case 3:
        return "Delivered";
      default:
        return "Unknown Status";
    }
  };

  const getStepperIndex = (orderStatus) => {
    switch (orderStatus) {
      case 0:
        return 0; // Pending
      case 1:
        return 1; // Preparing
      case 2:
        return 2; // Underway
      case 3:
        return 3; // Delivered
      default:
        return 0; // Default to first step if status is unknown
    }
  };

  const activeIndex =
    lastOrder.status !== undefined ? getStepperIndex(lastOrder.status) : 0;

  return (
    <div className="container my-4">
      <GoToAdminPageButton />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-4 p-3 bg-light rounded shadow-sm"
      >
        <h6 className="text-secondary mb-1">Order Status:</h6>
        <h4 className="text-success fw-bold">
          {lastOrder.status !== undefined
            ? orderStatusToText(lastOrder.status)
            : "N/A"}
        </h4>
        <h6 className="text-secondary mb-1">Ordered On:</h6>
        <h5>{lastOrder.orderDate ? formatDate(lastOrder.orderDate) : "N/A"}</h5>
        <h6 className="text-secondary mb-1">City:</h6>
        <h5>{lastOrder.city}</h5>
        <h6 className="text-secondary mb-1">Location:</h6>
        <h5>{lastOrder.location}</h5>
        <h6 className="text-secondary mb-1">Total:</h6>
        <h5>€ {lastOrder.totalAmount.toFixed(2)}</h5>
      </motion.div>
      <div>
        <h6 className="mb-3 ms-5 ps-4">Your order items:</h6>
        <div className="d-flex justify-content-around">
          {lastOrder.orderItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card text-center p-3 mb-3 shadow-sm"
              style={{ width: "18rem" }}
            >
              <img
                src={item.imageUrl}
                className="card-img-top"
                alt={item.name}
              />
              <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
                <p className="card-text">Qty: x{item.quantity}</p>
                <p className="card-text">€ {item.price.toFixed(2)}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="card flex justify-content-center my-4 p-3 shadow-sm">
        <Stepper
          ref={stepperRef}
          activeStep={activeIndex}
          linear
          style={{ flexBasis: "10rem" }}
        >
          <StepperPanel header="Pending">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="d-flex justify-content-center align-items-center fs-3"
            >
              Order is Pending <HourglassSplit className="ms-2" />
            </motion.div>
          </StepperPanel>
          <StepperPanel header="Preparing">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="d-flex justify-content-center align-items-center fs-3"
            >
              Order is Being Prepared <Magic className="ms-2" />
            </motion.div>
          </StepperPanel>
          <StepperPanel header="Underway">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="d-flex justify-content-center align-items-center fs-3"
            >
              Order is Underway <Truck className="ms-2" />
            </motion.div>
          </StepperPanel>
          <StepperPanel header="Delivered">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="d-flex justify-content-center align-items-center fs-3"
            >
              Order has been Delivered <CheckCircle className="ms-2" />
            </motion.div>
          </StepperPanel>
        </Stepper>
      </div>
    </div>
  );
};

export default OrderStatusPage;
