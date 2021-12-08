// ** React Imports
import React, { Fragment } from "react";
import CategoriesTable from "./categories-table";
import { useCategories } from "../../hooks";

// ** Custom Components
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

const Categories = () => {
  const [name, setName] = React.useState("");
  const [error, setError] = React.useState("");
  const { createCategory, isLoadingCategories } = useCategories(
    () => {
      setName(false);
    },
    (err) => {
      setError(err.message);
    }
  );

  const handleCreateCategory = () => {
    setError("");
    if (!name || name.length < 3) {
      setError("Category name m,ust be more that 3 characters.");
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
          <Form>
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
                <span class="text-danger small">{error}</span>
              </Col>
              <Col sm="12">
                <div className="d-flex">
                  <Button
                    className="me-1"
                    color="primary"
                    type="submit"
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
