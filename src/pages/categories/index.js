// ** React Imports
import { Fragment } from "react";
import CategoriesTable from "./categories-table";

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
} from "reactstrap";

const Categories = () => {
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
                  id="category-name"
                  placeholder="E.g: Gloceries."
                />
              </Col>
              <Col sm="12">
                <div className="d-flex">
                  <Button
                    className="me-1"
                    color="primary"
                    type="submit"
                    onClick={(e) => e.preventDefault()}
                  >
                    Create
                  </Button>
                  <Button outline color="secondary" type="reset">
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
