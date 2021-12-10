// ** React Imports
import { Fragment, useState, useEffect, useMemo } from "react";
import { Edit, Trash2, ChevronDown } from "react-feather";

// ** Reactstrap Imports
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
} from "reactstrap";

// ** Add New Modal Component
import EditCategoryModal from "./EditCategoryModal";

// ** Third Party Components
import ReactPaginate from "react-paginate";
import DataTable from "react-data-table-component";

import { useCategories } from "../../hooks";
import { useSelector, useDispatch } from "react-redux";
import { setCategories } from "@store/categories";

const CategoriesTable = () => {
  const { categories: data } = useSelector((state) => state);
  const dispatch = useDispatch();
  // ** States
  const [currentPage, setCurrentPage] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [category, setCategory] = useState(null);
  const [error, setError] = useState("");

  const {
    fetchCategories,
    deleteCategory,
    isDeletingCategory,
    isLoadingCategories,
  } = useCategories(
    (success) => {
      dispatch(setCategories(success));
    },
    (err) => {
      setError(err?.message);
    }
  );

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDeleteCategory = (id) => {
    if (confirm("Are you sure you want to delete this category?")) {
      deleteCategory(id);
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
        name: "Actions",
        allowOverflow: true,
        cell: (row) => {
          return (
            <div className="d-flex">
              <Edit
                size={15}
                onClick={(e) => {
                  setCategory(row);
                }}
              />
              <Trash2
                className="text-danger mx-1"
                size={15}
                onClick={() => handleDeleteCategory(row._id)}
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
        {isLoadingCategories || isDeletingCategory ? (
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
      {category && (
        <EditCategoryModal
          category={category}
          open={location !== null}
          handleModal={() => setCategory(null)}
        />
      )}
    </Fragment>
  );
};

export default CategoriesTable;
