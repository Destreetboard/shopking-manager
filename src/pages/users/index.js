import Table from "./users-table";
import { Row, Col } from "reactstrap";
import StatsHorizontal from "@components/widgets/stats/StatsHorizontal";
import { User, UserPlus, UserCheck, Shield } from "react-feather";
import "@styles/react/apps/app-users.scss";
import { useSelector } from "react-redux";
import { isToday, formatNumber } from "@utils";

const UsersList = () => {
  const { users } = useSelector((state) => state);

  return (
    <div className="app-user-list">
      <Row>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="info"
            statTitle="Total Users"
            icon={<User size={20} />}
            renderStats={
              <h3 className="fw-bolder mb-75">{formatNumber(users.length)}</h3>
            }
          />
        </Col>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="primary"
            statTitle="Today"
            icon={<UserPlus size={20} />}
            renderStats={
              <h3 className="fw-bolder mb-75">
                {formatNumber(
                  users.filter((u) => isToday(new Date(u.createdAt))).length
                )}
              </h3>
            }
          />
        </Col>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="info"
            statTitle="Active Users"
            icon={<UserCheck size={20} />}
            renderStats={
              <h3 className="fw-bolder mb-75">
                {formatNumber(
                  users.filter((u) => u.status === "ACTIVE" && u.isVerified)
                    .length
                )}
              </h3>
            }
          />
        </Col>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="success"
            statTitle="Staff"
            icon={<Shield size={20} />}
            renderStats={
              <h3 className="fw-bolder mb-75">
                {formatNumber(
                  users.filter((u) => u.role !== "customer").length
                )}
              </h3>
            }
          />
        </Col>
      </Row>
      <Table />
    </div>
  );
};

export default UsersList;
