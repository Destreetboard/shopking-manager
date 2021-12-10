import { Fragment, useState, useEffect, useMemo } from "react";
import { Edit, Trash2, ChevronDown, Eye, CheckCircle } from "react-feather";
import {
  Row,
  Col,
  Card,
  Input,
  Label,
  CardTitle,
  CardHeader,
  Spinner,
  Alert,
} from "reactstrap";
import EditLocationModal from "./EditLocationModal";
import ReactPaginate from "react-paginate";
import DataTable from "react-data-table-component";
import { useLocations } from "../../hooks";
import { useSelector, useDispatch } from "react-redux";
import { setLocations } from "@store/locations";
import { Link } from "react-router-dom";
import { toast, Slide } from "react-toastify";

const ToastContent = ({ message }) => (
  <>
    <div className="toastify-body">
      <span>{message}</span>
    </div>
  </>
);

const LocationDTable = () => {
  const { locations: data } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [location, setLocation] = useState(null);
  const [error, setError] = useState("");

  const {
    fetchLocations,
    deleteLocation,
    isFetchingLocations,
    isDeletingLocation,
  } = useLocations(
    (success) => {
      dispatch(setLocations(success));
    },
    (err) => {
      setError(err?.message);
    }
  );

  useEffect(() => {
    fetchLocations();
  }, []);

  const handleDeleteLocation = async (id) => {
    if (confirm("Are you sure you want to delete this location?")) {
      await deleteLocation(id);
      toast.success(<ToastContent message="Location Deleted Successfully!" />, {
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
        sortable: (row) => row.name,
        selector: (row) => row.name,
      },
      {
        name: "Sub Locations",
        selector: (row) => row.subLocations?.length,
      },
      {
        name: "Actions",
        allowOverflow: true,
        cell: (row) => {
          return (
            <div className="d-flex">
              <Link to={`/dashboard/locations/${row._id}/sub-locations`}>
                <Eye className="mx-1" size={15} />
              </Link>
              <Edit
                size={15}
                onClick={(e) => {
                  setLocation(row);
                }}
              />
              <Trash2
                className="text-danger mx-1"
                size={15}
                onClick={() => handleDeleteLocation(row._id)}
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
        const startsWith = item.name
          .toLowerCase()
          .startsWith(value.toLowerCase());

        const includes = item.name.toLowerCase().includes(value.toLowerCase());

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
          <CardTitle tag="h4">Locations</CardTitle>
        </CardHeader>
        {error ? (
          <Alert className="text-center" color="danger">
            {error}
            {setTimeout(() => {
              setError("");
            }, 5000)}
          </Alert>
        ) : null}
        {isFetchingLocations || isDeletingLocation ? (
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
      {location && (
        <EditLocationModal
          location={location}
          open={location !== null}
          handleModal={() => setLocation(null)}
        />
      )}
    </Fragment>
  );
};

export default LocationDTable;
