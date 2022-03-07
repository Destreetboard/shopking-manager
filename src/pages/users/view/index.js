import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Row, Col, Alert, Spinner } from "reactstrap";
import UserTabs from "./Tabs";
import UserInfoCard from "./UserInfoCard";
import "@styles/react/apps/app-users.scss";
import { useUser, useOrders } from "../../../hooks";
import { toast, Slide } from "react-toastify";

const ToastContent = ({ message }) => (
  <>
    <div className="toastify-body">
      <span>{message}</span>
    </div>
  </>
);

const UserView = () => {
  const [user, setUser] = useState(null);
  const [active, setActive] = useState("1");
  const [orders, setOrders] = useState([]);

  const { id } = useParams();

  const { getUser, isFetchingUser } = useUser(
    (success) => {
      setUser(success);
    },
    (err) => {
      toast.error(
        <ToastContent
          message={`Unable to get user  details! ${err?.message}`}
        />,
        {
          icon: <X className="text-danger" />,
          transition: Slide,
          autoClose: 5000,
        }
      );
    }
  );

  const { fetchUserOrders, isLoading } = useOrders((success) => {
    setOrders(success);
  });

  // ** Get suer on mount
  useEffect(() => {
    getUser(id);
  }, []);

  useEffect(() => {
    if (user) {
      fetchUserOrders(id);
    }
  }, [user]);

  const toggleTab = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };

  return user ? (
    <div className="app-user-view">
      <Row>
        <Col xl="4" lg="5" xs={{ order: 1 }} md={{ order: 0, size: 5 }}>
          <UserInfoCard pushUser={setUser} orders={orders} user={user} />
        </Col>
        <Col xl="8" lg="7" xs={{ order: 0 }} md={{ order: 1, size: 7 }}>
          <UserTabs
            isFetchingOrders={isLoading}
            orders={orders}
            active={active}
            toggleTab={toggleTab}
            user={user}
          />
        </Col>
      </Row>
    </div>
  ) : isFetchingUser ? (
    <Spinner color="primary" />
  ) : (
    <Alert color="danger">
      <h4 className="alert-heading">User not found</h4>
      <div className="alert-body">
        User with id: {id} doesn't exist. Check list of all Users:{" "}
        <Link to="/dashboard/users">Users List</Link>
      </div>
    </Alert>
  );
};
export default UserView;
