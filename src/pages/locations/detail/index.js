// ** React Imports
import { Fragment, useState, useEffect } from "react";

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
import { CheckCircle } from "react-feather";
import SubLocationsTable from "./sublocations-table";
import { useHistory } from "react-router-dom";
import { useSubLocations, useLocations } from "@src/hooks";
import { toast, Slide } from "react-toastify";

const ToastContent = ({ message }) => (
  <>
    <div className="toastify-body">
      <span>{message}</span>
    </div>
  </>
);

const LocationSubLocations = ({ match }) => {
  const history = useHistory();
  const [location, setLocation] = useState({});
  const [subLocations, setSubLocations] = useState([]);

  const [address, setAddress] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState("");

  const { fetchLocation, isFetchingLocation } = useLocations((success) => {
    setSubLocations(success.subLocations);
    setLocation(success);
  });

  useEffect(() => {
    const { id } = match.params;
    if (!id) {
      return history.push({
        pathname: "/dashboard/locations",
      });
    }
    fetchLocation(id);
  }, []);

  const { createSubLocation, isCreatingSubLocation } = useSubLocations(
    () => {
      fetchLocation(match.params.id);
      setAddress("");
      setPrice("");
      toast.success(
        <ToastContent message="Sub location Created Successfully!" />,
        {
          icon: <CheckCircle className="text-success" />,
          transition: Slide,
          autoClose: 3000,
        }
      );
    },
    (err) => {
      setError(err?.message);
    }
  );

  const onLocationChange = () => {
    fetchLocation(match.params.id);
  };

  const handleCreateSubLocation = () => {
    setError("");
    if (!address || address.length < 3) {
      setError("Sub Location address must be more that 3 characters.");
      return;
    }
    if (!price || parseInt(price) <= 0) {
      setError("Sub Location price is required  and must greater than 0.");
      return;
    }

    createSubLocation(location._id, { address, price });
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
                  Sub Location Address
                </Label>
                <Input
                  type="text"
                  name="address"
                  value={address}
                  className={error ? "border-danger text-danger" : ""}
                  onChange={(input) => setAddress(input.target.value)}
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
        isFetchingLocation={isFetchingLocation}
        subLocations={subLocations}
        location={location}
        onLocationChange={onLocationChange}
      />
    </Fragment>
  );
};

export default LocationSubLocations;
