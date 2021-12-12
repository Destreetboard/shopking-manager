import { Fragment, useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import Avatar from "@components/avatar";
import {
  Slack,
  User,
  Edit2,
  MoreVertical,
  FileText,
  Trash2,
  Archive,
  ChevronDown,
  X,
  CheckCircle,
} from "react-feather";
import {
  Badge,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Row,
  Col,
  Card,
  Input,
  Label,
  Button,
  CardBody,
  CardTitle,
  CardHeader,
  Spinner,
} from "reactstrap";
import moment from "moment";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import ReactPaginate from "react-paginate";
import DataTable from "react-data-table-component";
import { selectThemeColors } from "@utils";
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import { useUsers } from "../../hooks/useUsers";
import { setUsers } from "@store/users";
import { useUser } from "../../hooks";
import { toast, Slide } from "react-toastify";
import UpdateSidebar from "./UpdateSidebar";

const ToastContent = ({ message }) => (
  <>
    <div className="toastify-body">
      <span>{message}</span>
    </div>
  </>
);

// ** Renders Client Columns
const renderClient = (row) => {
  const stateNum = Math.floor(Math.random() * 3),
    states = ["light-success", "light-info", "light-primary"],
    color = states[stateNum];

  if (row.photo) {
    return <Avatar className="me-1" img={row.photo} width="32" height="32" />;
  } else {
    return (
      <Avatar
        color={color || "primary"}
        className="me-1"
        content={`${row.firstname} ${row.lastname}`}
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

  const Icon = roleObj[row.role] ? roleObj[row.role].icon : Edit2;

  return (
    <span className="text-truncate text-capitalize align-middle">
      <Icon
        size={18}
        className={`${roleObj[row.role] ? roleObj[row.role].class : ""} me-50`}
      />
      {row.role}
    </span>
  );
};

const statusObj = {
  pending: "light-warning",
  active: "light-success",
  inactive: "light-secondary",
};

const UsersList = () => {
  const { users } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [user, setUser] = useState(null);

  const { fetchUsers, isFetchingUsers } = useUsers((success) => {
    dispatch(setUsers(success.users));
  });

  const { deleteUser, isDeletingUser } = useUser(
    () => {
      fetchUsers();
      toast.success(<ToastContent message="User Deleted Successfully!" />, {
        icon: <CheckCircle className="text-success" />,
        transition: Slide,
        autoClose: 3000,
      });
    },
    (err) => {
      toast.error(
        <ToastContent message={`Unable to delete user! ${err?.message}`} />,
        {
          icon: <X className="text-danger" />,
          transition: Slide,
          autoClose: 5000,
        }
      );
    }
  );

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = (id, name) => {
    if (
      confirm(
        `Are you sure you want to delete ${name}?\nNB: Action cannot be undone.`
      )
    ) {
      deleteUser(id);
    }
  };

  const [currentPage, setCurrentPage] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentRole, setCurrentRole] = useState({
    value: "",
    label: "Select Role",
  });

  const [currentStatus, setCurrentStatus] = useState({
    value: "",
    label: "Select Status",
    number: 0,
  });

  // ** Function to toggle sidebar
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleUpdateSidebar = () => {
    setUser(null);
  };

  // ** User filter options
  const roleOptions = [
    { value: "", label: "Select Role" },
    { value: "admin", label: "Admin" },
    { value: "staff", label: "Staff" },
    { value: "customer", label: "Customer" },
  ];

  const statusOptions = [
    { value: "", label: "Select Status", number: 0 },
    { value: "unverified", label: "Unverified", number: 1 },
    { value: "active", label: "Active", number: 2 },
    { value: "inactive", label: "Inactive", number: 3 },
  ];

  const handleFilter = (value) => {
    let updatedData = [];
    setSearchValue(value);

    if (value.length) {
      updatedData = users.filter((item) => {
        const startsWith =
          item.status.toLowerCase().startsWith(value.toLowerCase()) ||
          item.firstname.toLowerCase().startsWith(value.toLowerCase()) ||
          item.lastname.toLowerCase().startsWith(value.toLowerCase()) ||
          item.email.toLowerCase().startsWith(value.toLowerCase()) ||
          item.role.toLowerCase().startsWith(value.toLowerCase()) ||
          (value === "unverified" && !item.isVerified);

        const includes =
          item.status.toLowerCase().includes(value.toLowerCase()) ||
          item.firstname.toLowerCase().includes(value.toLowerCase()) ||
          item.lastname.toLowerCase().includes(value.toLowerCase()) ||
          item.email.toLowerCase().includes(value.toLowerCase()) ||
          item.role.toLowerCase().includes(value.toLowerCase()) ||
          (value === "unverified" && !item.isVerified);

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
          ? Math.ceil(filteredData.length / 15)
          : Math.ceil(users.length / 15) || 1
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
        name: "User",
        sortable: true,
        minWidth: "300px",
        sortField: "name",
        selector: (row) => `${row.firstname} ${row.lastname}`,
        cell: (row) => (
          <div className="d-flex justify-content-left align-items-center">
            {renderClient(row)}
            <div className="d-flex flex-column">
              <Link
                to={`/dashboard/users/${row.id}`}
                className="user_name text-truncate text-body"
              >
                <span className="fw-bolder">{`${row.firstname} ${row.lastname}`}</span>
              </Link>
              <small className="text-truncate text-muted mb-0">
                {row.email}
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
        selector: (row) => row.role,
        cell: (row) => renderRole(row),
      },
      {
        name: "Date Joined",
        minWidth: "200px",
        sortable: true,
        sortField: "date",
        selector: (row) => moment(row.createdAt).format("DD MMM, YYYY."),
        cell: (row) => (
          <span className="text-capitalize">
            {moment(row.createdAt).format("DD MMM, YYYY.")}
          </span>
        ),
      },
      {
        name: "Status",
        minWidth: "138px",
        sortable: true,
        sortField: "status",
        selector: (row) => (row.isVerified ? "unverified" : row.status),
        cell: (row) => (
          <Badge
            className="text-capitalize"
            color={
              row.isVerified
                ? statusObj[row.status.toLowerCase()]
                : statusObj["pending"]
            }
            pill
          >
            {row.isVerified ? row.status : "unverified"}
          </Badge>
        ),
      },
      {
        name: "Actions",
        minWidth: "100px",
        cell: (row) => (
          <div className="column-action">
            <UncontrolledDropdown>
              <DropdownToggle tag="div" className="btn btn-sm">
                <MoreVertical size={14} className="cursor-pointer" />
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem
                  tag={Link}
                  className="w-100"
                  to={`/dashboard/users/${row._id}`}
                >
                  <FileText size={14} className="me-50" />
                  <span className="align-middle">Details</span>
                </DropdownItem>
                <DropdownItem
                  tag="a"
                  href="/"
                  className="w-100"
                  onClick={(e) => {
                    e.preventDefault();
                    setUser(row);
                  }}
                >
                  <Archive size={14} className="me-50" />
                  <span className="align-middle">Edit</span>
                </DropdownItem>
                <DropdownItem
                  tag="a"
                  href="/"
                  className="w-100"
                  onClick={(e) => {
                    e.preventDefault();
                    handleDelete(row._id, `${row.firstname} ${row.lastname}`);
                  }}
                >
                  <Trash2 size={14} className="me-50" />
                  <span className="align-middle">Delete</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
        ),
      },
    ],
    []
  );

  return (
    <Fragment>
      <Card>
        <CardHeader>
          <CardTitle tag="h4">Filters</CardTitle>
        </CardHeader>
        <CardBody>
          <Row>
            <Col md="6">
              <Label for="role-select">Role</Label>
              <Select
                isClearable={false}
                value={currentRole}
                options={roleOptions}
                className="react-select"
                classNamePrefix="select"
                theme={selectThemeColors}
                onChange={(val) => {
                  setCurrentRole(val);
                  handleFilter(val.value);
                }}
              />
            </Col>
            <Col md="6">
              <Label for="status-select">Status</Label>
              <Select
                theme={selectThemeColors}
                isClearable={false}
                className="react-select"
                classNamePrefix="select"
                options={statusOptions}
                value={currentStatus}
                onChange={(val) => {
                  handleFilter(val.value);
                  setCurrentStatus(val);
                }}
              />
            </Col>
          </Row>
        </CardBody>
      </Card>

      <Card className="overflow-hidden">
        <CardHeader className="flex-md-row flex-column align-md-items-center align-items-start">
          <CardTitle tag="h4">Users</CardTitle>
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
              onChange={(e) => handleFilter(e.target.value)}
            />
          </Col>
        </Row>
        <div className="react-dataTable">
          <div className="d-flex align-items-end  justify-content-end table-header-actions  m-2">
            <Button
              className="add-new-user"
              color="primary"
              onClick={toggleSidebar}
            >
              Add New User
            </Button>
          </div>

          {isFetchingUsers || isDeletingUser ? (
            <div className="text-center">
              <Spinner color="primary" />
            </div>
          ) : null}

          <DataTable
            noHeader
            pagination
            columns={columns}
            paginationPerPage={15}
            className="react-dataTable"
            sortIcon={<ChevronDown size={10} />}
            paginationDefaultPage={currentPage + 1}
            paginationComponent={CustomPagination}
            data={searchValue.length ? filteredData : users}
          />
        </div>
      </Card>

      <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} />
      {user && (
        <UpdateSidebar
          open={user !== null}
          toggleSidebar={toggleUpdateSidebar}
          user={user}
        />
      )}
    </Fragment>
  );
};

export default UsersList;
