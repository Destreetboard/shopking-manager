// ** React Imports
import { Fragment, useState, useMemo, useEffect } from "react";

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
import SubLocationsTable from "./sublocations-table";
import { useHistory } from "react-router-dom";
import { useSubLocations } from "../../../hooks";

const LocationSubLocations = ({ match }) => {
  const history = useHistory();
  const [location, setLocation] = useState({});

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState("");
  const [isSubLocationCreated, setIsSubLocationCreated] = useState(false);

  useEffect(() => {
    const { id } = match.params;
    if (!id) {
      return history.push({
        pathname: "/dashboard/locations",
      });
    }
  }, []);

  const { createSubLocation, isCreatingSubLocation } = useSubLocations(
    () => {
      setIsSubLocationCreated(!isSubLocationCreated);
    },
    (err) => {
      setError(err.message);
    }
  );

  const handleCreateSubLocation = () => {
    setError("");
    if (!name || name.length < 3) {
      setError("Sub Location name must be more that 3 characters.");
      return;
    }
    if (!price || parseInt(price) <= 0) {
      setError("Sub Location price is required  and must greater than 0.");
      return;
    }

    createSubLocation(location._id, { name, price });
  };

  return (
    <Fragment>
      <Breadcrumbs
        breadCrumbTitle={location?.name || "Sub Locations"}
        breadCrumbParent="Location Mgnt"
        breadCrumbActive="Sub Locations"
      />

      <Card>
        <CardHeader>
          <CardTitle tag="h4">
            Create Sub Location for {location?.name}
          </CardTitle>
        </CardHeader>

        <CardBody>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              handleCreateSubLocation();
            }}
          >
            <Row>
              <Col md="6" sm="12" className="mb-1">
                <Label className="form-label" for="nameMulti">
                  Sub Location Name
                </Label>
                <Input
                  type="text"
                  name="name"
                  value={name}
                  className={error ? "border-danger text-danger" : ""}
                  onChange={(input) => setName(input.target.value)}
                  id="sub-location-name"
                  placeholder="E.g: Divine Favour Lodge."
                />
              </Col>
              <Col md="6" sm="12" className="mb-1">
                <Label className="form-label" for="nameMulti">
                  Sub Location Price
                </Label>
                <Input
                  type="number"
                  value={price}
                  className={error ? "border-danger text-danger" : ""}
                  onChange={(input) => setPrice(input.target.value)}
                  name="price"
                  id="sub-location-price"
                  placeholder="E.g: 1000"
                />
              </Col>
              <Col md="12" sm="12" className="mb-1">
                <span className="text-danger small">{error}</span>
              </Col>
              <Col sm="12">
                <div className="d-flex">
                  <Button
                    className="me-1"
                    color="primary"
                    disabled={isCreatingSubLocation}
                    onClick={handleCreateSubLocation}
                  >
                    {isCreatingSubLocation ? <Spinner /> : "Create"}
                  </Button>
                  <Button
                    disabled={isCreatingSubLocation}
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

      <SubLocationsTable
        isSubLocationCreated={isSubLocationCreated}
        locationId={match.params.id}
        pushLocation={setLocation}
      />
    </Fragment>
  );
};

export default LocationSubLocations;
