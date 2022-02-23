// ** React Imports
import { Fragment, useState, useEffect, useMemo } from "react";
import { Edit, Trash2, ChevronDown, CheckCircle } from "react-feather";
import {
  Row,
  Col,
  Card,
  Input,
  Label,
  CardTitle,
  CardHeader,
  Alert,
  Spinner,
  Badge,
} from "reactstrap";
import EditVendorModal from "./EditVendorModal";
import ReactPaginate from "react-paginate";
import DataTable from "react-data-table-component";
import { useVendors } from "../../hooks";
import { useSelector, useDispatch } from "react-redux";
import { setVendors } from "@store/vendors";
import { toast, Slide } from "react-toastify";

const ToastContent = ({ message }) => (
  <>
    <div className="toastify-body">
      <span>{message}</span>
    </div>
  </>
);

const VendorsTable = () => {
  const { vendors: data } = useSelector((state) => state);
  const dispatch = useDispatch();
  // ** States
  const [currentPage, setCurrentPage] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [vendor, setVendor] = useState(null);
  const [error, setError] = useState("");

  const { fetchVendors, deleteVendor, isDeletingVendor, isLoadingVendors } =
    useVendors(
      (success) => {
        dispatch(setVendors(success));
      },
      (err) => {
        setError(err?.message);
      }
    );

  useEffect(() => {
    fetchVendors();
  }, []);

  const handleDeleteCategory = async (id) => {
    if (confirm("Are you sure you want to delete this vendor?")) {
      await deleteVendor(id);
      toast.success(<ToastContent message="Vendor Deleted Successfully!" />, {
        icon: <CheckCircle className="text-success" />,
        transition: Slide,
        autoClose: 3000,
      });
    }
  };

  const columns = useMemo(
    () => [
      {
        name: "Name",
        minWidth: "250px",
        sortable: (row) => row?.name,
        selector: (row) => row?.name.toUpperCase(),
      },
      {
        name: "Contact",
        minWidth: "250px",
        selector: (row) => (
          <div className="d-flex justify-content-left align-items-center">
            <div className="d-flex flex-column">
              <a
                href={`tel:${row?.phone}`}
                className="user_name text-truncate text-body"
              >
                <span className="fw-bolder">{row?.phone}</span>
              </a>
              <a
                href={`mailto:${row?.email}`}
                className="user_name text-truncate text-body"
              >
                <small className="text-truncate text-muted mb-0">
                  {row?.email}
                </small>
              </a>
              <small className="text-truncate text-muted mb-0">
                {row?.address}
              </small>
            </div>
          </div>
        ),
        sortable: (row) => `${row?.email} ${row?.phone} ${row?.address}`,
      },
      {
        name: "Website",
        minWidth: "180px",
        sortable: (row) => row?.website,
        selector: (row) => (
          <a href={row?.website} target="_blank">
            {row?.website}
          </a>
        ),
      },
      {
        name: "Categories",
        minWidth: "250px",
        selector: (row) => {
          return row?.categories.map((c) => (
            <Badge key={c._id} color="light-info">
              {c.name}
            </Badge>
          ));
        },
        sortable: (row) => row?.catgories.map((c) => c.name),
      },
      {
        name: "Actions",
        allowOverflow: true,
        cell: (row) => {
          return (
            <div className="d-flex">
              <Edit
                size={15}
                onClick={(e) => {
                  setVendor(row);
                }}
              />
              <Trash2
                className="text-danger mx-1"
                size={15}
                onClick={() => handleDeleteCategory(row?._id)}
              />
            </div>
          );
        },
      },
    ],
    []
  );

  // ** Function to handle filter
  const handleFilter = (e) => {
    const value = e.target.value;
    let updatedData = [];
    setSearchValue(value);

    if (value.length) {
      updatedData = data.filter((item) => {
        const startsWith =
          item.name.toLowerCase().startsWith(value.toLowerCase()) ||
          item.email.toLowerCase().startsWith(value.toLowerCase()) ||
          item.phone.toLowerCase().startsWith(value.toLowerCase()) ||
          item.address.toLowerCase().startsWith(value.toLowerCase()) ||
          item.website.toLowerCase().startsWith(value.toLowerCase());

        const includes =
          item.name.toLowerCase().includes(value.toLowerCase()) ||
          item.email.toLowerCase().includes(value.toLowerCase()) ||
          item.phone.toLowerCase().includes(value.toLowerCase()) ||
          item.website.toLowerCase().includes(value.toLowerCase()) ||
          item.address.toLowerCase().includes(value.toLowerCase()) ||
          item.categories.includes(value);

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

  // ** Custom Pagination
  const CustomPagination = () => (
    <ReactPaginate
      previousLabel=""
      nextLabel=""
      forcePage={currentPage}
      onPageChange={(page) => handlePagination(page)}
      pageCount={
        searchValue.length
          ? Math.ceil(filteredData.length / 7)
          : Math.ceil(data.length / 7) || 1
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

  return (
    <Fragment>
      <Card>
        <CardHeader className="flex-md-row flex-column align-md-items-center align-items-start">
          <CardTitle tag="h4">Categroies</CardTitle>
        </CardHeader>
        {error ? (
          <Alert className="text-center" color="danger">
            {error}
            {setTimeout(() => {
              setError("");
            }, 5000)}
          </Alert>
        ) : null}
        {isLoadingVendors || isDeletingVendor ? (
          <div className="text-center">
            <Spinner color="primary" />
          </div>
        ) : null}
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
        <div className="react-dataTable">
          <DataTable
            noHeader
            pagination
            columns={columns}
            paginationPerPage={7}
            className="react-dataTable"
            sortIcon={<ChevronDown size={10} />}
            paginationDefaultPage={currentPage + 1}
            paginationComponent={CustomPagination}
            data={searchValue.length ? filteredData : data}
          />
        </div>
      </Card>
      {vendor && (
        <EditVendorModal
          vendor={vendor}
          open={location !== null}
          handleModal={() => setVendor(null)}
        />
      )}
    </Fragment>
  );
};

export default VendorsTable;
