import { useState, useEffect, useMemo } from "react";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import {
  ChevronDown,
  Eye,
  TrendingUp,
  CheckCircle,
  Loader,
  MoreHorizontal,
  XCircle,
  Check,
} from "react-feather";
import {
  Card,
  CardTitle,
  CardHeader,
  UncontrolledTooltip,
  Spinner,
} from "reactstrap";
import "@styles/react/apps/app-invoice.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import { useOrders } from "@src/hooks";
import Avatar from "@components/avatar";
import moment from "moment";
import { formatMoney } from "@utils";
import ReactPaginate from "react-paginate";

const OrdersList = ({ orders, isFetchingOrders }) => {
  const [currentPage, setCurrentPage] = useState(0);

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
      pageCount={Math.ceil(orders.length / 10) || 1}
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
        name: "#OrderNo",
        sortable: true,
        sortField: "orderNo",
        minWidth: "200px",
        selector: (row) => row?.orderNo,
        cell: (row) => (
          <Link to={`/dashboard/orders/${row?._id}`}>{`#${row?.orderNo}`}</Link>
        ),
      },
      {
        sortable: true,
        minWidth: "102px",
        sortField: "status",
        name: <TrendingUp size={14} />,
        selector: (row) => row?.satus,
        cell: (row) => {
          const s = row?.status;
          const color =
            s === "PENDING"
              ? "warning"
              : s === "PAID"
              ? "primary"
              : s === "PROCESSED"
              ? "info"
              : s === "DECLINED" || s === "CANCELLED"
              ? "danger"
              : "primary";
          const Icon =
            s === "PENDING"
              ? Loader
              : s === "PAID"
              ? Check
              : s === "PROCESSED"
              ? MoreHorizontal
              : s === "DECLINED" || s === "CANCELLED"
              ? XCircle
              : CheckCircle;

          return (
            <>
              <Avatar
                color={color}
                icon={<Icon size={14} />}
                id={`av-tooltip-${row?._id}`}
              />
              <UncontrolledTooltip
                placement="top"
                target={`av-tooltip-${row?._id}`}
              >
                <span className="fw-bold">Status:</span> {row?.status}
                <br />
                <span className="fw-bold">Order created:</span>{" "}
                {moment(row?.createdAt).format("DD MMM, YYYY")}
              </UncontrolledTooltip>
            </>
          );
        },
      },
      {
        name: "Items",
        sortable: true,
        minWidth: "150px",
        sortField: "items",
        selector: (row) => row?.items.length,
        cell: (row) => <span>{row?.items.length || 0}</span>,
      },
      {
        name: "Total Price",
        sortable: true,
        minWidth: "200px",
        sortField: "total",
        selector: (row) => {
          const price = row?.items
            .map((item) => {
              return item.price
                ? parseInt(item.price) * parseInt(item.quantity)
                : parseInt(item.estimatedPrice) * parseInt(item.quantity);
            })
            .reduce((a, b) => a + b, 0);
          const delivery = row?.location?.subLocation.price;
          const serviceFee = row?.items
            .map((item) => (item.fee ? item.fee : 0))
            .reduce((a, b) => a + b, 0);
          return formatMoney(price + delivery + serviceFee);
        },
        cell: (row) => {
          const price = row?.items
            .map((item) => {
              return item.price
                ? parseInt(item.price) * parseInt(item.quantity)
                : parseInt(item.estimatedPrice) * parseInt(item.quantity);
            })
            .reduce((a, b) => a + b, 0);
          const delivery = row?.location?.subLocation.price;
          const serviceFee = row?.items
            .map((item) => (item.fee ? item.fee : 0))
            .reduce((a, b) => a + b, 0);
          return <span>{formatMoney(price + delivery + serviceFee)}</span>;
        },
      },
      {
        sortable: true,
        minWidth: "200px",
        name: "Last Updated",
        sortField: "lastUpdated",
        cell: (row) => moment(row?.updatedAt).format("DD MMM, YYYY"),
        selector: (row) => moment(row?.updatedAt).format("DD MMM, YYYY"),
      },
      {
        name: "Action",
        minWidth: "110px",
        cell: (row) => (
          <div className="column-action d-flex align-items-center">
            <Link
              to={`/dashboard/orders/${row?._id}`}
              id={`pw-tooltip-${row?._id}`}
            >
              <Eye size={17} className="mx-1" />
            </Link>
            <UncontrolledTooltip
              placement="top"
              target={`pw-tooltip-${row?._id}`}
            >
              Preview Order
            </UncontrolledTooltip>
          </div>
        ),
      },
    ],
    []
  );

  return (
    <div className="invoice-list-wrapper">
      <Card>
        <CardHeader className="py-1">
          <CardTitle tag="h4">Orders</CardTitle>
        </CardHeader>
        <div className="invoice-list-dataTable react-dataTable">
          {isFetchingOrders ? (
            <div className="text-center">
              <Spinner color="primary" />
            </div>
          ) : null}

          <DataTable
            noHeader
            pagination
            columns={columns}
            paginationPerPage={10}
            className="react-dataTable"
            sortIcon={<ChevronDown size={10} />}
            paginationDefaultPage={currentPage + 1}
            paginationComponent={CustomPagination}
            data={orders}
          />
        </div>
      </Card>
    </div>
  );
};

export default OrdersList;
