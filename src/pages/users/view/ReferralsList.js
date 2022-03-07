import React, { useState, useEffect, useMemo } from "react";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import { ChevronDown, Edit2, Slack, User } from "react-feather";
import {
  Card,
  CardTitle,
  CardHeader,
  CardBody,
  Row,
  Col,
  Badge,
} from "reactstrap";
import "@styles/react/apps/app-invoice.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import Avatar from "@components/avatar";
import moment from "moment";
import ReactPaginate from "react-paginate";
import { useReferrals } from "../../../hooks";

// ** Renders Client Columns
const renderClient = (row) => {
  const stateNum = Math.floor(Math.random() * 3),
    states = ["light-success", "light-info", "light-primary"],
    color = states[stateNum];

  if (row?.photo) {
    return <Avatar className="me-1" img={row?.photo} width="32" height="32" />;
  } else {
    return (
      <Avatar
        color={color || "primary"}
        className="me-1"
        content={`${row?.firstname} ${row?.lastname}`}
        initials
      />
    );
  }
};

// ** Renders Role Columns
const renderRole = (row) => {
  const roleObj = {
    customer: {
      class: "text-success",
      icon: User,
    },
    staff: {
      class: "text-primary",
      icon: Edit2,
    },
    admin: {
      class: "text-danger",
      icon: Slack,
    },
  };

  const Icon = roleObj[row?.role] ? roleObj[row?.role].icon : Edit2;

  return (
    <span className="text-truncate text-capitalize align-middle">
      <Icon
        size={18}
        className={`${
          roleObj[row?.role] ? roleObj[row?.role].class : ""
        } me-50`}
      />
      {row?.role}
    </span>
  );
};

const statusObj = {
  pending: "light-warning",
  active: "light-success",
  inactive: "light-secondary",
};

const ReferralsList = ({ user }) => {
  const [currentPage, setCurrentPage] = React.useState(0);
  const [referrals, setReferrals] = React.useState([]);

  const { fetchReferrals, isFetchingReferrals } = useReferrals((success) => {
    setReferrals(success.referrals);
  });

  React.useEffect(() => {
    fetchReferrals(user._id);
  }, []);

  // ** Function to handle Pagination
  const handlePagination = (page) => {
    setCurrentPage(page.selected);
  };

  const CustomPagination = () => (
    <ReactPaginate
      previousLabel=""
      nextLabel=""
      forcePage={currentPage}
      onPageChange={(page) => handlePagination(page)}
      pageCount={Math.ceil(referrals.length / 10) || 1}
      breakLabel="..."
      pageRangeDisplayed={2}
      marginPagesDisplayed={2}
      activeClassName="active"
      pageClassName="page-item"
      breakClassName="page-item"
      nextLinkClassName="page-link"
      pageLinkClassName="page-link"
      breakLinkClassName="page-link"
      previousLinkClassName="page-link"
      nextClassName="page-item next-item"
      previousClassName="page-item prev-item"
      containerClassName="pagination react-paginate separated-pagination pagination-sm justify-content-end pe-1 mt-1"
    />
  );

  const columns = useMemo(
    () => [
      {
        name: "User",
        sortable: true,
        minWidth: "300px",
        sortField: "name",
        selector: (row) => `${row?.firstname} ${row?.lastname}`,
        cell: (row) => (
          <div className="d-flex justify-content-left align-items-center">
            {renderClient(row)}
            <div className="d-flex flex-column">
              <Link
                to={`/dashboard/users/${row?._id}`}
                className="user_name text-truncate text-body"
              >
                <span className="fw-bolder">{`${row?.firstname} ${row?.lastname}`}</span>
              </Link>
              <small className="text-truncate text-muted mb-0">
                {row?.email}
              </small>
            </div>
          </div>
        ),
      },
      {
        name: "Role",
        sortable: true,
        minWidth: "172px",
        sortField: "role",
        selector: (row) => row?.role,
        cell: (row) => renderRole(row),
      },
      {
        name: "Date Joined",
        minWidth: "200px",
        sortable: true,
        sortField: "date",
        selector: (row) => moment(row?.createdAt).format("DD MMM, YYYY."),
        cell: (row) => (
          <span className="text-capitalize">
            {moment(row?.createdAt).format("DD MMM, YYYY.")}
          </span>
        ),
      },
      {
        name: "Status",
        minWidth: "138px",
        sortable: true,
        sortField: "status",
        selector: (row) => (row?.isVerified ? "unverified" : row?.status),
        cell: (row) => (
          <Badge
            className="text-capitalize"
            color={
              row?.isVerified
                ? statusObj[row?.status.toLowerCase()]
                : statusObj["pending"]
            }
            pill
          >
            {row?.isVerified ? row?.status : "unverified"}
          </Badge>
        ),
      },
    ],
    []
  );

  return (
    <div className="invoice-list-wrapper">
      <Card>
        <CardHeader>
          <CardTitle tag="h4">Total Referrals</CardTitle>
        </CardHeader>
        <CardBody>
          <Row>
            <Col md="6">
              <Avatar
                initials
                color="light-success"
                className="rounded mt-3 mb-2"
                content={`${referrals?.length || 0}`}
                contentStyles={{
                  borderRadius: 0,
                  fontSize: "calc(48px)",
                  width: "100%",
                  height: "100%",
                }}
                style={{
                  height: "110px",
                  width: "110px",
                }}
              />
            </Col>
          </Row>
        </CardBody>
      </Card>

      <Card>
        <CardHeader className="py-1">
          <CardTitle tag="h4">Referrals</CardTitle>
        </CardHeader>
        <div className="invoice-list-dataTable react-dataTable">
          <DataTable
            noHeader
            pagination
            columns={columns}
            paginationPerPage={10}
            className="react-dataTable"
            sortIcon={<ChevronDown size={10} />}
            paginationDefaultPage={currentPage + 1}
            paginationComponent={CustomPagination}
            data={referrals}
          />
        </div>
      </Card>
    </div>
  );
};

export default ReferralsList;
