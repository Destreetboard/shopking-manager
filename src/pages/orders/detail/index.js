import { Fragment, useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Products from "./Products";
import Breadcrumbs from "@components/breadcrumbs";
import "@styles/react/apps/app-ecommerce.scss";
import { Spinner } from "reactstrap";
import { useOrder } from "@src/hooks";

const OrderDetails = ({ match }) => {
  const params = match.params;
  const [order, setOrder] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const onUpdateOrder = (ord) => {
    setOrder(ord);
  };

  const { fetchOrder } = useOrder(
    (success) => {
      setOrder(success);
    },
    (err) => {}
  );

  useEffect(() => {
    if (params.id) {
      fetchOrder(params.id);
    }
  }, []);

  if (!order) {
    return <Spinner color="primary" />;
  }

  return (
    <Fragment>
      <Breadcrumbs
        breadCrumbTitle={order.orderNo}
        breadCrumbParent="Orders"
        breadCrumbActive={order.orderNo}
      />
      <Products
        onUpdateOrder={onUpdateOrder}
        order={order}
        setSidebarOpen={setSidebarOpen}
      />
      <Sidebar sidebarOpen={sidebarOpen} order={order} />
    </Fragment>
  );
};
export default OrderDetails;
