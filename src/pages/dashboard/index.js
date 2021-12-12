import { useContext, useEffect } from "react";
import { Row, Col } from "reactstrap";
import { ThemeColors } from "@src/utility/context/ThemeColors";
import CompanyTable from "./CompanyTable";
import Earnings from "./Earnings";
import CardMeetup from "./CardMeetup";
import PaidOrderStats from "./PaidOrdersStats";
import GoalOverview from "./GoalOverview";
import RevenueReport from "./RevenueReport";
import OrdersBarChart from "./OrdersBarChart";
import CardTransactions from "./CardTransactions";
import ProfitLineChart from "./ProfitLineChart";
import CardBrowserStates from "./CardBrowserState";
import "@styles/react/libs/charts/apex-charts.scss";
import "@styles/base/pages/dashboard-ecommerce.scss";
import { useSelector, useDispatch } from "react-redux";
import { useUsers } from "../../hooks";
import { setUsers } from "@store/users";
import PaidServiceFee from "./PaidServiceFee";

const EcommerceDashboard = () => {
  const { colors } = useContext(ThemeColors);
  const dispatch = useDispatch();
  const { users, orders } = useSelector((state) => state);

  const { fetchUsers } = useUsers((success) => {
    dispatch(setUsers(success.users));
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const trackBgColor = "#e9ecef";

  return (
    <div id="dashboard-ecommerce">
      <Row className="match-height">
        <Col xl="6" md="6" xs="12">
          <PaidOrderStats cols={{ xl: "3", sm: "6" }} orders={orders} />
        </Col>
        <Col xl="6" md="6" xs="12">
          <PaidServiceFee cols={{ xl: "3", sm: "6" }} orders={orders} />
        </Col>
      </Row>
      <Row className="match-height">
        <Col lg="4" md="12">
          <Row className="match-height">
            <Col lg="6" md="3" xs="6">
              <OrdersBarChart warning={colors.warning.main} />
            </Col>
            <Col lg="6" md="3" xs="6">
              <ProfitLineChart info={colors.info.main} />
            </Col>
            <Col lg="12" md="6" xs="12">
              <Earnings success={colors.success.main} />
            </Col>
          </Row>
        </Col>
        <Col lg="8" md="12">
          <RevenueReport
            primary={colors.primary.main}
            warning={colors.warning.main}
          />
        </Col>
      </Row>
      <Row className="match-height">
        <Col lg="8" xs="12">
          <CompanyTable />
        </Col>
        <Col lg="4" md="6" xs="12">
          <CardMeetup />
        </Col>
        <Col lg="4" md="6" xs="12">
          <CardBrowserStates colors={colors} trackBgColor={trackBgColor} />
        </Col>
        <Col lg="4" md="6" xs="12">
          <GoalOverview success={colors.success.main} />
        </Col>
        <Col lg="4" md="6" xs="12">
          <CardTransactions />
        </Col>
      </Row>
    </div>
  );
};

export default EcommerceDashboard;
