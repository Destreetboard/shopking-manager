// ** React Imports
import { Fragment, useState, useEffect, useMemo } from "react";
import {
  MoreVertical,
  Edit,
  FileText,
  Trash2,
  ChevronDown,
} from "react-feather";
import { Link } from "react-router-dom";

// ** Reactstrap Imports
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Row,
  Col,
  Card,
  Input,
  Label,
  CardTitle,
  CardHeader,
} from "reactstrap";

// ** Add New Modal Component
import EditLocationModal from "./EditLocationModal";

// ** Third Party Components
import ReactPaginate from "react-paginate";
import DataTable from "react-data-table-component";

import { useLocations } from "../../hooks";

const LocationDTable = () => {
  // ** States
  const [currentPage, setCurrentPage] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [location, setLocation] = useState(null);
  const [data, setData] = useState([]);

  const { fetchLocations, isLoading } = useLocations((success) => {
    setData(success);
  });

  useEffect(() => {
    fetchLocations();
  }, []);

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
              <UncontrolledDropdown>
                <DropdownToggle className="pe-1" tag="span">
                  <MoreVertical size={15} />
                </DropdownToggle>
                <DropdownMenu end>
                  <DropdownItem
                    tag="a"
                    href={`/dashboard/locations/${row._id}`}
                    className="w-100"
                  >
                    <FileText size={15} />
                    <span className="align-middle ms-50">Details</span>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <Edit
                size={15}
                onClick={(e) => {
                  setLocation(row);
                }}
              />
              <Trash2
                className="text-danger mx-1"
                size={15}
                onClick={(e) => alert("hello")}
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
