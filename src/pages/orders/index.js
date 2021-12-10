// ** React Imports
import { Link } from "react-router-dom";
import { useState, useEffect, useMemo, Fragment } from "react";
import StatsHorizontal from "@components/widgets/stats/StatsHorizontal";
import ReactPaginate from "react-paginate";
import {
  ChevronDown,
  Eye,
  TrendingUp,
  CheckCircle,
  Loader,
  MoreHorizontal,
  XCircle,
  Check,
  ShoppingCart,
} from "react-feather";
import DataTable from "react-data-table-component";
import {
  Input,
  Row,
  Col,
  Card,
  Label,
  CardHeader,
  CardTitle,
  UncontrolledTooltip,
  Spinner,
} from "reactstrap";
import Avatar from "@components/avatar";
import { useDispatch, useSelector } from "react-redux";
import "@styles/react/apps/app-invoice.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import { useOrders } from "../../hooks";
import { formatMoney } from "@utils";
import { setOrders } from "@store/orders";
import moment from "moment";
import Breadcrumbs from "@components/breadcrumbs";

// ** renders client column
const renderClient = (row) => {
  const stateNum = Math.floor(Math.random() * 5),
    states = [
      "light-success",
      "light-danger",
      "light-warning",
      "light-info",
      "light-primary",
    ],
    color = states[stateNum];

  if (row.user.photo) {
    return (
      <Avatar className="me-50" img={row.user.photo} width="32" height="32" />
    );
  } else {
    return (
      <Avatar
        color={color}
        className="me-50"
        content={`${row.user.firstname} ${row.user.lastname}`}
        initials
      />
    );
  }
};

const OrdersPage = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state);

  const [currentPage, setCurrentPage] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const { fetchOrders, isLoading } = useOrders((success) => {
    dispatch(setOrders(success));
  });

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleFilter = (e) => {
    const value = e.target.value;
    let updatedData = [];
    setSearchValue(value);

    if (value.length) {
      updatedData = orders.filter((item) => {
        const startsWith =
          item.orderNo.toLowerCase().startsWith(value.toLowerCase()) ||
          item.status.toUpperCase().startsWith(value.toLowerCase()) ||
          item.user.firstname.toLowerCase().startsWith(value.toLowerCase()) ||
          item.user.lastname.toLowerCase().startsWith(value.toLowerCase()) ||
          item.user.email.toLowerCase().startsWith(value.toLowerCase());

        const includes =
          item.orderNo.toLowerCase().includes(value.toLowerCase()) ||
          item.status.toLowerCase().includes(value.toLowerCase()) ||
          item.user.firstname.toLowerCase().includes(value.toLowerCase()) ||
          item.user.lastname.toLowerCase().includes(value.toLowerCase()) ||
          item.user.email.toLowerCase().includes(value.toLowerCase());

        if (startsWith) {
          return startsWith;
        } else if (!startsWith && includes) {
          return includes;
        } else return null;
      });
      setFilteredData(updatedData);
      setSearchValue(value);
    }
  };

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
      pageCount={
        searchValue.length
          ? Math.ceil(filteredData.length / 7)
          : Math.ceil(orders.length / 7) || 1
      }
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
        selector: (row) => row.orderNo,
        cell: (row) => (
          <Link to={`/dashboard/orders/${row._id}`}>{`#${row.orderNo}`}</Link>
        ),
      },
      {
        sortable: true,
        minWidth: "102px",
        sortField: "invoiceStatus",
        name: <TrendingUp size={14} />,
        selector: (row) => row.satus,
        cell: (row) => {
          const s = row.status;
          const color =
            s === "PENDING"
              ? "warning"
              : s === "PAID"
              ? "primary"
              : s === "PROCESSED"
              ? "primary"
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
            <Fragment>
              <Avatar
                color={color}
                icon={<Icon size={14} />}
                id={`av-tooltip-${row._id}`}
              />
              <UncontrolledTooltip
                placement="top"
                target={`av-tooltip-${row._id}`}
              >
                <span className="fw-bold">Status:</span> {row.status}
                <br />
                <span className="fw-bold">Order created:</span>{" "}
                {moment(row.createdAt).format("DD MMM, YYYY")}
              </UncontrolledTooltip>
            </Fragment>
          );
        },
      },
      {
        name: "User",
        sortable: true,
        minWidth: "300px",
        sortField: "user",
        selector: (row) => `${row.user.firstname} ${row.user.lastname}`,
        cell: (row) => {
          const name = `${row.user.firstname} ${row.user.lastname}`,
            email = row.user.email;
          return (
            <div className="d-flex justify-content-left align-items-center">
              {renderClient(row)}
              <div className="d-flex flex-column">
                <h6 className="user-name text-truncate mb-0">{name}</h6>
                <small className="text-truncate text-muted mb-0">{email}</small>
              </div>
            </div>
          );
        },
      },
      {
        name: "Items",
        sortable: true,
        minWidth: "150px",
        sortField: "items",
        selector: (row) => row.items.length,
        cell: (row) => <span>{row.items.length || 0}</span>,
      },
      {
        name: "Total Price",
        sortable: true,
        minWidth: "200px",
        sortField: "total",
        selector: (row) => {
          const price = row.items
            .map((item) => {
              return item.price
                ? parseInt(item.price) * parseInt(item.quantity)
                : parseInt(item.estimatedPrice) * parseInt(item.quantity);
            })
            .reduce((a, b) => a + b, 0);
          const delivery = row?.location?.subLocation.price;
          const serviceFee = row.items
            .map((item) => (item.fee ? item.fee : 0))
            .reduce((a, b) => a + b, 0);
          return formatMoney(price + delivery + serviceFee);
        },
        cell: (row) => {
          const price = row.items
            .map((item) => {
              return item.price
                ? parseInt(item.price) * parseInt(item.quantity)
                : parseInt(item.estimatedPrice) * parseInt(item.quantity);
            })
            .reduce((a, b) => a + b, 0);
          const delivery = row?.location?.subLocation.price;
          const serviceFee = row.items
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
        cell: (row) => moment(row.updatedAt).format("DD MMM, YYYY"),
        selector: (row) => moment(row.updatedAt).format("DD MMM, YYYY"),
      },
      {
        name: "Action",
        minWidth: "110px",
        cell: (row) => (
          <div className="column-action d-flex align-items-center">
            <Link
              to={`/dashboard/orders/${row._id}`}
              id={`pw-tooltip-${row._id}`}
            >
              <Eye size={17} className="mx-1" />
            </Link>
            <UncontrolledTooltip
              placement="top"
              target={`pw-tooltip-${row._id}`}
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
    <div>
      <Breadcrumbs
        breadCrumbTitle="Orders"
        breadCrumbParent="Order Mgnt"
        breadCrumbActive="Orders"
      />

      <Row>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="primary"
            statTitle="Total Orders"
            icon={<ShoppingCart size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">{orders.length}</h3>}
          />
        </Col>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="primary"
            statTitle="Completed Orders"
            icon={<ShoppingCart size={20} />}
            renderStats={
              <h3 className="fw-bolder mb-75">
                {orders.filter((o) => o.status === "COMPLETED").length}
              </h3>
            }
          />
        </Col>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="warning"
            statTitle="Pending Orders"
            icon={<ShoppingCart size={20} />}
            renderStats={
              <h3 className="fw-bolder mb-75">
                {orders.filter((o) => o.status === "PENDING").length}
              </h3>
            }
          />
        </Col>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="info"
            statTitle="Processed Orders"
            icon={<ShoppingCart size={20} />}
            renderStats={
              <h3 className="fw-bolder mb-75">
                {orders.filter((o) => o.status === "PROCESSED").length}
              </h3>
            }
          />
        </Col>
      </Row>

      <Card className="invoice-list-wrapper">
        <CardHeader className="flex-md-row flex-column align-md-items-center align-items-start">
          <CardTitle tag="h4">Orders</CardTitle>
        </CardHeader>
        <Row className="justify-content-end mx-0">
          <Col
            className="d-flex align-items-center justify-content-end mt-1"
            md="6"
            sm="12"
          >
            <Label className="me-1" for="search-input">
              Search
            </Label>
            <Input
              className="dataTable-filter mb-50"
              type="text"
              bsSize="sm"
              id="search-input"
              value={searchValue}
              onChange={handleFilter}
            />
          </Col>
        </Row>
        <Card>
          <div className="invoice-list-dataTable react-dataTable">
            {isLoading ? (
              <div className="text-center">
                <Spinner color="primary" />
              </div>
            ) : null}

            <DataTable
              noHeader
              pagination
              columns={columns}
              paginationPerPage={7}
              className="react-dataTable"
              sortIcon={<ChevronDown size={10} />}
              paginationDefaultPage={currentPage + 1}
              paginationComponent={CustomPagination}
              data={searchValue.length ? filteredData : orders}
            />
          </div>
        </Card>
      </Card>
    </div>
  );
};

export default OrdersPage;
