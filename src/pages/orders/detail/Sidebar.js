import classnames from "classnames";
import { useEffect, useMemo, useState } from "react";
import { Card, CardBody, Row, Col, Button, Spinner } from "reactstrap";
import { CheckCircle, X } from "react-feather";
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

const Sidebar = ({ order, sidebarOpen, onUpdateOrder, setSidebarOpen }) => {
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
    let count = 0;
    order.items.forEach((it) => {
      if (status.value === "PROCESSED" && (!it.price || it.fee < 0)) {
        count++;
      }
    });
    if (count > 0) {
      return toast.error(
        <ToastContent message="Please update items prices and fees!" />,
        {
          icon: <X className="text-danger" />,
          transition: Slide,
          autoClose: 3000,
        }
      );
    }
    const totalAmount = order.items
      .map((it) => parseInt(it.price) * parseInt(it.quantity))
      .reduce((a, b) => a + b, 0);
    updateOrder(order._id, { status: status.value, totalAmount });
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

    setDeliveryFee(order.delivery);
    setServiceFee(order.totalFee);
    setTotalPrice(total);
    setTotalEstPrice(order.estimatedAmount);
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
            <Row className="justify-content-end d-lg-none mt-3">
              <X
                onClick={() => setSidebarOpen(false)}
                style={{ width: "auto" }}
                className="mx-1"
              />
            </Row>
            <CardBody>
              <div className="multi-range-price">
                <h6 className="filter-title mt-0">Delivery Address</h6>
                <p>{order?.address.location.place}</p>
              </div>
              <div className="multi-range-price">
                <h6 className="filter-title mt-0">Total Estimated Price</h6>
                <p className="text-warning">
                  {formatMoney(order.estimatedAmount)}
                </p>
              </div>
              <div className="multi-range-price">
                <h6 className="filter-title mt-0">Total Price</h6>
                <p className="text-primary">{formatMoney(order.totalAmount)}</p>
              </div>
              <div className="multi-range-price">
                <h6 className="filter-title mt-0">Delivery Fee</h6>
                <p>{formatMoney(order.delivery)}</p>
              </div>
              <div className="multi-range-price">
                <h6 className="filter-title mt-0">Service Fee</h6>
                <p>{formatMoney(order.totalFee)}</p>
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
