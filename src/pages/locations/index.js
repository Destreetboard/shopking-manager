// ** React Imports
import { Fragment } from "react";
import LocationsTable from "./locations-table";

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
import Select from "react-select";

const Locations = () => {
  return (
    <Fragment>
      <Breadcrumbs
        breadCrumbTitle="Locations"
        breadCrumbParent="Location Mgnt"
        breadCrumbActive="Locations"
      />
      <Card>
        <CardHeader>
          <CardTitle tag="h4">Create Location</CardTitle>
        </CardHeader>

        <CardBody>
          <Form>
            <Row>
              <Col md="8" sm="12" className="mb-1">
                <Label className="form-label" for="nameMulti">
                  Location Name
                </Label>
                <Input
                  type="text"
                  name="name"
                  id="location-name"
                  placeholder="Format: State - Area. e.g: Enugu - Agbani."
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

      <LocationsTable />
    </Fragment>
  );
};

export default Locations;
