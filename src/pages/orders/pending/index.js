// ** React Imports
import { Fragment, useEffect, useRef, useState } from "react";

// ** Custom Components
import Wizard from "@components/wizard";
import BreadCrumbs from "@components/breadcrumbs";

// ** Steps
import Cart from "./steps/Cart";

// ** Third Party Components
import { ShoppingCart } from "react-feather";

// ** Store & Actions
import { useDispatch, useSelector } from "react-redux";
import {
  getCartItems,
  deleteCartItem,
  deleteWishlistItem,
  addToWishlist,
} from "../store";

// ** Styles
import "@styles/base/pages/app-ecommerce.scss";

const PendingOrders = () => {
  // ** Ref & State
  const ref = useRef(null);
  const [stepper, setStepper] = useState(null);

  // ** Store Vars
  const dispatch = useDispatch();
  const store = useSelector((state) => state.ecommerce);

  // ** Get Cart Items on mount
  useEffect(() => {
    dispatch(getCartItems());
  }, []);

  const steps = [
    {
      id: "pending-orders",
      title: "Pending Orders",
      subtitle: "Orders yet to be porcessed",
      icon: <ShoppingCart size={18} />,
      content: (
        <Cart
          stepper={stepper}
          dispatch={dispatch}
          products={store.cart}
          getCartItems={getCartItems}
          addToWishlist={addToWishlist}
          deleteCartItem={deleteCartItem}
          deleteWishlistItem={deleteWishlistItem}
        />
      ),
    },
  ];

  return (
    <Fragment>
      <BreadCrumbs
        breadCrumbTitle="Pending Orders"
        breadCrumbParent="Orders"
        breadCrumbActive="Pending"
      />
      <Wizard
        ref={ref}
        steps={steps}
        className="checkout-tab-steps"
        instance={(el) => setStepper(el)}
        options={{
          linear: false,
        }}
      />
    </Fragment>
  );
};

export default PendingOrders;
