import { Link } from "react-router-dom";
import React, { useEffect, Fragment, useState, useMemo } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import { ShoppingCart } from "react-feather";
import {
  Dropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  Badge,
  Button,
} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import "@styles/react/libs/input-number/input-number.scss";
import { useOrders } from "@src/hooks";
import { setOrders } from "@store/orders";
import { formatMoney } from "@utils";

const CartDropdown = () => {
  const dispatch = useDispatch();
  const { orders: storeOrders } = useSelector((state) => state);

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { fetchOrders } = useOrders((success) => {
    dispatch(setOrders(success));
  });

  const orders = useMemo(
    () => storeOrders.filter((o) => o.status === "PENDING"),
    [storeOrders]
  );

  useEffect(() => {
    setInterval(fetchOrders, 30000);
    fetchOrders();
  }, []);

  // ** Function to toggle Dropdown
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  // ** Function to call on Dropdown Item Click
  const handleDropdownItemClick = (id) => {
    toggle();
  };

  // ** Loops through Cart Array to return Cart Items
  const renderCartItems = () => {
    if (orders.length) {
      return (
        <Fragment>
          <PerfectScrollbar
            className="scrollable-container media-list"
            options={{
              wheelPropagation: false,
            }}
          >
            {orders.map((item) => {
              const price = item.items
                .map((it) => {
                  return (
                    (it.price
                      ? parseInt(it.price)
                      : parseInt(it.estimatedPrice)) * parseInt(it.quantity)
                  );
                })
                .reduce((a, b) => a + b, 0);
              const delivery = item?.location?.subLocation.price;
              const serviceFee = item.items
                .map((it) => (it.fee ? it.fee : 0))
                .reduce((a, b) => a + b, 0);

              // console.log(price, delivery, serviceFee);

              return (
                <div key={item._id} className="list-item align-items-center">
                  <div className="list-item-body flex-grow-1">
                    <div className="media-heading">
                      <h6 className="cart-item-title">
                        <Link
                          className="text-body"
                          to={`/dashboard/orders/${item._id}`}
                          onClick={() => handleDropdownItemClick(item._id)}
                        >
                          #{item.orderNo}
                        </Link>
                      </h6>
                      <small className="cart-item-by">
                        by {item?.user?.firstname}
                      </small>
                    </div>
                    <div className="cart-item-qty">{item.items.length}</div>
                    <h5 className="cart-item-price">
                      {formatMoney(price + delivery + serviceFee)}
                    </h5>
                  </div>
                </div>
              );
            })}
          </PerfectScrollbar>
          {/* <li className="dropdown-menu-footer">
            <div className="d-flex justify-content-between mb-1">
              <h6 className="fw-bolder mb-0">Total:</h6>
              <h6 className="text-primary fw-bolder mb-0">
                $ {Number(total.toFixed(2))}
              </h6>
            </div>
            <Button
              tag={Link}
              to="/apps/ecommerce/checkout"
              color="primary"
              block
              onClick={toggle}
            >
              Checkout
            </Button>
          </li> */}
        </Fragment>
      );
    } else {
      return <p className="m-0 p-1 text-center">No new orders</p>;
    }
  };

  return (
    <Dropdown
      isOpen={dropdownOpen}
      toggle={toggle}
      tag="li"
      className="dropdown-cart nav-item me-25"
    >
      <DropdownToggle tag="a" className="nav-link position-relative">
        <ShoppingCart className="ficon" />
        <Badge pill color="danger" className="badge-up">
          {orders.length}
        </Badge>
      </DropdownToggle>
      <DropdownMenu
        end
        tag="ul"
        className="dropdown-menu-media dropdown-cart mt-0"
      >
        <li className="dropdown-menu-header">
          <DropdownItem tag="div" className="d-flex" header>
            <h4 className="notification-title mb-0 me-auto">New Orders</h4>
            <Badge color="light-primary" pill>
              {orders.length} Orders
            </Badge>
          </DropdownItem>
        </li>
        {renderCartItems()}
      </DropdownMenu>
    </Dropdown>
  );
};

export default CartDropdown;
