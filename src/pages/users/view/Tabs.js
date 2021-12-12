import { Fragment } from "react";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import { User, Lock } from "react-feather";
import SecurityTab from "./SecurityTab";
import OrdersList from "./OrdersList";

const UserTabs = ({ active, toggleTab, orders, isLoading }) => {
  return (
    <Fragment>
      <Nav pills className="mb-2">
        <NavItem>
          <NavLink active={active === "1"} onClick={() => toggleTab("1")}>
            <User className="font-medium-3 me-50" />
            <span className="fw-bold">Account</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === "2"} onClick={() => toggleTab("2")}>
            <Lock className="font-medium-3 me-50" />
            <span className="fw-bold">Security</span>
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={active}>
        <TabPane tabId="1">
          <OrdersList isFetchingOrders={isLoading} orders={orders} />
        </TabPane>
        <TabPane tabId="2">
          <SecurityTab />
        </TabPane>
      </TabContent>
    </Fragment>
  );
};
export default UserTabs;
