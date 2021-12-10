import React, { Fragment } from "react";
import CategoriesTable from "./categories-table";
import { useCategories } from "../../hooks";
import Breadcrumbs from "@components/breadcrumbs";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Row,
  Col,
  Input,
  Form,
  Button,
  Label,
  Spinner,
} from "reactstrap";
import { CheckCircle } from "react-feather";
import { useDispatch } from "react-redux";
import { setCategories } from "@store/categories";
import { toast, Slide } from "react-toastify";

const ToastContent = ({ message }) => (
  <>
    <div className="toastify-body">
      <span>{message}</span>
    </div>
  </>
);

const Categories = () => {
  const dispatch = useDispatch();

  const [name, setName] = React.useState("");
  const [error, setError] = React.useState("");

  const { createCategory, isLoadingCategories } = useCategories(
    (success) => {
      setName("");
      dispatch(setCategories(success));
      toast.success(<ToastContent message="Category Created Successfully!" />, {
        icon: <CheckCircle className="text-success" />,
        transition: Slide,
        autoClose: 3000,
      });
    },
    (err) => {
      setError(err?.message);
    }
  );

  const handleCreateCategory = () => {
    setError("");
    if (!name || name.length < 3) {
      setError("Category name must be more that 3 characters.");
      return;
    }
    createCategory({ name });
  };

  return (
    <Fragment>
      <Breadcrumbs
        breadCrumbTitle="Categories"
        breadCrumbParent="Category Mgnt"
        breadCrumbActive="Categories"
      />
      <Card>
        <CardHeader>
          <CardTitle tag="h4">Create Category</CardTitle>
        </CardHeader>

        <CardBody>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              handleCreateCategory();
            }}
          >
            <Row>
              <Col md="8" sm="12" className="mb-1">
                <Label className="form-label" for="nameMulti">
                  Category Name
                </Label>
                <Input
                  type="text"
                  name="name"
                  className={error ? "border-danger text-danger" : ""}
                  value={name}
                  onChange={(input) => setName(input.target.value)}
                  id="category-name"
                  placeholder="E.g: Gloceries."
                />
                <span className="text-danger small">{error}</span>
              </Col>
              <Col sm="12">
                <div className="d-flex">
                  <Button
                    className="me-1"
                    color="primary"
                    disabled={isLoadingCategories}
                    onClick={handleCreateCategory}
                  >
                    {isLoadingCategories ? <Spinner /> : "Create"}
                  </Button>
                  <Button
                    disabled={isLoadingCategories}
                    outline
                    color="secondary"
                    type="reset"
                  >
                    Clear
                  </Button>
                </div>
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>

      <CategoriesTable />
    </Fragment>
  );
};

export default Categories;
