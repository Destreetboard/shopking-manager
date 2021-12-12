import classnames from "classnames";
import { TrendingUp, User, Box, DollarSign } from "react-feather";
import Avatar from "@components/avatar";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  CardText,
  Row,
  Col,
} from "reactstrap";
import { kFormatter } from "@utils";
import {
  paidOrdersThisMonth,
  paidOrdersThisWeek,
  paidOrdersToday,
  paidOrdersTotal,
} from "./functions";

const PaidOrdersStats = ({ cols, orders }) => {
  const data = [
    {
      title: kFormatter(paidOrdersToday(orders)),
      subtitle: "Today",
      color: "light-success",
      icon: <span style={{ fontSize: 20 }}>{"\u20A6"}</span>,
    },
    {
      title: kFormatter(paidOrdersThisWeek(orders)),
      subtitle: "This Week",
      color: "light-info",
      icon: <span style={{ fontSize: 20 }}>{"\u20A6"}</span>,
    },
    {
      title: kFormatter(paidOrdersThisMonth(orders)),
      subtitle: "This Month",
      color: "light-success",
      icon: <span style={{ fontSize: 20 }}>{"\u20A6"}</span>,
    },
    {
      title: kFormatter(paidOrdersTotal(orders)),
      subtitle: "Total",
      color: "light-info",
      icon: <span style={{ fontSize: 20 }}>{"\u20A6"}</span>,
    },
  ];

  const renderData = () => {
    return data.map((item, index) => {
      const colMargin = Object.keys(cols);
      const margin = index === 2 ? "sm" : colMargin[0];
      return (
        <Col
          key={index}
          {...cols}
          className={classnames({
            [`mb-2 mb-${margin}-0`]: index !== data.length - 1,
          })}
        >
          <div className="d-flex align-items-center">
            <Avatar color={item.color} icon={item.icon} className="me-2" />
            <div className="my-auto">
              <h4 className="fw-bolder mb-0">{item.title}</h4>
              <CardText className="font-small-3 mb-0">{item.subtitle}</CardText>
            </div>
          </div>
        </Col>
      );
    });
  };

  return (
    <Card className="card-statistics">
      <CardHeader>
        <CardTitle tag="h4">Paid Orders</CardTitle>
        <CardText className="card-text font-small-2 me-25 mb-0">
          Updated 1 minute ago
        </CardText>
      </CardHeader>
      <CardBody className="statistics-body">
        <Row>{renderData()}</Row>
      </CardBody>
    </Card>
  );
};

export default PaidOrdersStats;
