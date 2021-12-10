import classnames from "classnames";
import { useEffect, useMemo, useState } from "react";
import { Card, CardBody, Row, Col, Button, Spinner } from "reactstrap";
import { CheckCircle } from "react-feather";
import { formatMoney } from "@utils";
import Select from "react-select";
import { useOrder } from "@src/hooks";
import { toast, Slide } from "react-toastify";

const ToastContent = ({ message }) => (
  <>
    <div className="toastify-body">
      <span>{message}</span>
    </div>
  </>
);

const Sidebar = ({ order, sidebarOpen, onUpdateOrder }) => {
  const [status, setStatus] = useState({
    value: order.status,
    label: order.status,
  });
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [serviceFee, setServiceFee] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalEstPrice, setTotalEstPrice] = useState(0);
  const [error, setError] = useState("");

  const statusOptions = useMemo(() => {
    return [
      { value: "CANCELLED", label: "CANCELLED" },
      { value: "COMPLETED", label: "COMPLETED" },
      { value: "DECLINED", label: "DECLINED" },
      { value: "PAID", label: "PAID" },
      { value: "PENDING", label: "PENDING" },
      { value: "PROCESSED", label: "PROCESSED" },
    ];
  }, []);

  const { updateOrder, isLoading } = useOrder(
    (success) => {
      toast.success(<ToastContent message="Order Updated Successfully!" />, {
        icon: <CheckCircle className="text-success" />,
        transition: Slide,
        autoClose: 3000,
      });
      return onUpdateOrder && onUpdateOrder(success);
    },
    (err) => {
      setError(err?.message);
    }
  );

  const handleUpdateOrder = () => {
    setError("");
    updateOrder(order._id, { ...order, status: status.value });
  };

  useEffect(() => {
    const total = order.items
      .map((it) => {
        return (
          (it.price ? parseInt(it.price) : parseInt(it.estimatedPrice)) *
          parseInt(it.quantity)
        );
      })
      .reduce((a, b) => a + b, 0);
    const estimated = order.items
      .map((it) => {
        return parseInt(it.estimatedPrice) * parseInt(it.quantity);
      })
      .reduce((a, b) => a + b, 0);
    const delivery = order?.location?.subLocation?.price;
    const fee = order.items
      .map((it) => (it.fee ? it.fee : 0))
      .reduce((a, b) => a + b, 0);

    if (delivery) setDeliveryFee(delivery);
    if (fee) setServiceFee(fee);
    if (total) setTotalPrice(total);
    if (estimated) setTotalEstPrice(estimated);
  }, [order]);

  return (
    <div className="sidebar-detached sidebar-left">
      <div className="sidebar">
        <div
          className={classnames("sidebar-shop", {
            show: sidebarOpen,
          })}
        >
          <Row>
            <Col sm="12">
              <h6 className="filter-heading d-none d-lg-block">
                Order Summary
              </h6>
            </Col>
          </Row>
          <Card>
            <CardBody>
              <div className="multi-range-price">
                <h6 className="filter-title mt-0">Location</h6>
                <p>{order?.location?.name}</p>
              </div>
              <div className="multi-range-price">
                <h6 className="filter-title mt-0">Destination</h6>
                <p>{order?.location?.subLocation?.address}</p>
              </div>
              <div className="multi-range-price">
                <h6 className="filter-title mt-0">Total Estimated Price</h6>
                <p className="text-warning">{formatMoney(totalEstPrice)}</p>
              </div>
              <div className="multi-range-price">
                <h6 className="filter-title mt-0">Total Price</h6>
                <p className="text-primary">{formatMoney(totalPrice)}</p>
              </div>
              <div className="multi-range-price">
                <h6 className="filter-title mt-0">Delivery Fee</h6>
                <p>{formatMoney(deliveryFee)}</p>
              </div>
              <div className="multi-range-price">
                <h6 className="filter-title mt-0">Service Fee</h6>
                <p>{formatMoney(serviceFee)}</p>
              </div>
              <div className="multi-range-price">
                <h6 className="filter-title mt-0">Order Total</h6>
                <p className="text-primary">
                  {formatMoney(totalPrice + serviceFee + deliveryFee)}
                </p>
              </div>

              <br />
              <div className="multi-range-price">
                <h6 className="filter-title mt-0">Select Status</h6>

                <Select
                  options={statusOptions}
                  isSearchable
                  value={status}
                  onChange={(val) => setStatus(val)}
                />
                <br />
              </div>

              <span className="text-danger">{error}</span>

              <div id="clear-filters" className="my-5">
                <Button
                  color="primary"
                  disabled={isLoading}
                  block
                  onClick={handleUpdateOrder}
                >
                  {isLoading ? <Spinner /> : "Update Order"}
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
