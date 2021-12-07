// ** React Imports
import { Fragment, useState } from "react";

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
import SubLocationsTable from "./sublocations-table";

const locationOptions = [
  { value: "", label: "Select Location" },
  { value: "basic", label: "Basic" },
  { value: "company", label: "Company" },
  { value: "enterprise", label: "Enterprise" },
  { value: "team", label: "Team" },
];

const SubLocations = () => {
  const [location, setLocation] = useState({
    value: "",
    label: "Select Location",
  });

  return (
    <Fragment>
      <Breadcrumbs
        breadCrumbTitle="Sub Locations"
        breadCrumbParent="Location Mgnt"
        breadCrumbActive="Sub Locations"
      />

      <Card>
        <CardHeader>
          <CardTitle tag="h4">Create Sub Location</CardTitle>
        </CardHeader>

        <CardBody>
          <Form>
            <Row>
              <Col md="6" sm="12" className="mb-1">
                <Label className="form-label" for="nameMulti">
                  Select Location
                </Label>
                <Select
                  options={locationOptions}
                  className="react-select"
                  classNamePrefix="select"
                  onChange={(data) => {
                    setLocation(data);
                  }}
                  value={location}
                />
              </Col>
              <Col md="6" sm="12" className="mb-1">
                <Label className="form-label" for="nameMulti">
                  Sub Location Name
                </Label>
                <Input
                  type="text"
                  name="name"
                  id="sub-location-name"
                  placeholder="E.g: Divine Favour Lodge."
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

      <SubLocationsTable />
    </Fragment>
  );
};

export default SubLocations;
