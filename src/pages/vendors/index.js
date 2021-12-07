// ** React Imports
import { Fragment, useState } from "react";
import VendorsTable from "./vendors-table";

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

const locationOptions = [
  { value: "", label: "Select Location" },
  { value: "basic", label: "Basic" },
  { value: "company", label: "Company" },
  { value: "enterprise", label: "Enterprise" },
  { value: "team", label: "Team" },
];

const Vendors = () => {
  const [location, setLocation] = useState({
    value: "",
    label: "Select Location",
  });
  return (
    <Fragment>
      <Breadcrumbs
        breadCrumbTitle="Vendors"
        breadCrumbParent="Vendor Mgnt"
        breadCrumbActive="Vendors"
      />
      <Card>
        <CardHeader>
          <CardTitle tag="h4">Add Vendor</CardTitle>
        </CardHeader>

        <CardBody>
          <Form>
            <Row>
              <Col md="6" sm="12" className="mb-1">
                <Label className="form-label" for="nameMulti">
                  Vendor Name
                </Label>
                <Input
                  type="text"
                  name="name"
                  id="vendor-name"
                  placeholder="E.g: Fine Brothers."
                />
              </Col>
              <Col md="6" sm="12" className="mb-1">
                <Label className="form-label" for="nameMulti">
                  Vendor Phone Number
                </Label>
                <Input
                  type="tel"
                  name="phone"
                  id="vendor-phone"
                  placeholder="E.g: +2347012345678"
                />
              </Col>
              <Col md="6" sm="12" className="mb-1">
                <Label className="form-label" for="nameMulti">
                  Vendor Address
                </Label>
                <Input
                  type="address"
                  name="address"
                  id="vendor-address"
                  placeholder="E.g: 12 Street, State."
                />
              </Col>
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

      <VendorsTable />
    </Fragment>
  );
};

export default Vendors;
