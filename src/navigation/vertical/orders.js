// ** Icons Import
import { Circle, ShoppingCart } from "react-feather";

export default [
  {
    id: "order-management",
    title: "Order Mgnt",
    icon: <ShoppingCart />,
    children: [
      {
        id: "all-orders",
        title: "Orders",
        icon: <Circle />,
        navLink: "/dashboard/orders",
      },
      {
        id: "pending-orders",
        title: "Pending Orders",
        icon: <Circle />,
        navLink: "/dashboard/orders/pending",
      },
      {
        id: "completed-orders",
        title: "Completed Orders",
        icon: <Circle />,
        navLink: "/dashboard/orders/completed",
      },
      {
        id: "cancelled-orders",
        title: "Cancelled Orders",
        icon: <Circle />,
        navLink: "/dashboard/orders/cancelled",
      },
    ],
  },
];
