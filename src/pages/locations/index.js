import React, { Fragment } from "react";
import LocationsTable from "./locations-table";
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
import { useLocations } from "../../hooks";
import { setLocations } from "@store/locations";
import { useDispatch } from "react-redux";

const Locations = () => {
  const dispatch = useDispatch();

  const [name, setName] = React.useState("");
  const [error, setError] = React.useState("");

  const { createLocation, isCreatingLocation } = useLocations(
    (success) => {
      dispatch(setLocations(success));
      setName("");
    },
    (err) => {
      setError(err?.message);
    }
  );

  const handleCreateLocation = () => {
    setError("");
    if (!name || name.length < 3) {
      setError("Location name must be more that 3 characters.");
      return;
    }
    createLocation({ name });
  };

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
          <Form
            onSubmit={(e) => {
              e.preventDefeault();
              handleCreateLocation();
            }}
          >
            <Row>
              <Col md="8" sm="12" className="mb-1">
                <Label className="form-label" for="nameMulti">
                  Location Name
                </Label>
                <Input
                  type="text"
                  name="name"
                  className={error ? "border-danger text-danger" : ""}
                  value={name}
                  onChange={(input) => setName(input.target.value)}
                  id="location-name"
                  placeholder="Format: State - Area. e.g: Enugu - Agbani."
                />
                <span className="text-danger small">{error}</span>
              </Col>
              <Col sm="12">
                <div className="d-flex">
                  <Button
                    className="me-1"
                    color="primary"
                    onClick={handleCreateLocation}
                    disabled={isCreatingLocation}
                  >
                    {isCreatingLocation ? <Spinner /> : "Create"}
                  </Button>
                  <Button
                    disabled={isCreatingLocation}
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

      <LocationsTable />
    </Fragment>
  );
};

export default Locations;
