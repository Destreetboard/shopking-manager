import React, { Fragment, useEffect } from "react";
import VendorsTable from "./vendors-table";
import { useCategories } from "@src/hooks";
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
import { CheckCircle, X } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { toast, Slide } from "react-toastify";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { selectThemeColors } from "@utils";
import { useVendors } from "../../hooks";
import { setVendors } from "@store/vendors";
import { setCategories as dispatchCategories } from "@store/categories";

const ToastContent = ({ message }) => (
  <>
    <div className="toastify-body">
      <span>{message}</span>
    </div>
  </>
);

const Vendors = () => {
  const dispatch = useDispatch();
  const animatedComponents = makeAnimated();
  const { categories: storeCategories } = useSelector((state) => state);

  const [name, setName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [categories, setCategories] = React.useState([]);
  const [email, setEmail] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [website, setWebsite] = React.useState("");
  const [error, setError] = React.useState("");

  const categoriesOption = storeCategories.map((c) => ({
    value: c._id,
    label: c.name,
  }));

  const { fetchCategories } = useCategories((success) => {
    dispatch(dispatchCategories(success));
  });

  const { createVendor, isCreatingVendor } = useVendors(
    (success) => {
      setName("");
      setAddress("");
      setCategories([]);
      setEmail("");
      setWebsite("");
      console.log(success);
      dispatch(setVendors(success));
      toast.success(<ToastContent message="Vendor Created Successfully!" />, {
        icon: <CheckCircle className="text-success" />,
        transition: Slide,
        autoClose: 3000,
      });
    },
    (err) => {
      toast.success(
        <ToastContent message={`Unable to create vendor! ${err?.message}`} />,
        {
          icon: <X className="text-danger" />,
          transition: Slide,
          autoClose: 3000,
        }
      );
    }
  );

  const handleCreateCategory = () => {
    // return console.log(categories);
    setError("");
    if (!name || name.length < 3) {
      setError("Vendor name must be more that 3 characters.");
      return;
    }
    if (!address || address.length < 3) {
      setError("Vendor address must be more that 3 characters.");
      return;
    }
    if (!phone || phone.length < 3) {
      setError("Vendor phone number must be more that 3 characters.");
      return;
    }
    if (!email || email.length < 3) {
      setError("Vendor email must be more that 3 characters.");
      return;
    }
    createVendor({
      name,
      email,
      phone,
      address,
      website,
      categories: categories.map((c) => c.value),
    });
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <Fragment>
      <Breadcrumbs
        breadCrumbTitle="Vendors"
        breadCrumbParent="Vendor Mgnt"
        breadCrumbActive="Vendors"
      />
      <Card>
        <CardHeader>
          <CardTitle tag="h4">Create Vendor</CardTitle>
        </CardHeader>

        <CardBody>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              handleCreateCategory();
            }}
          >
            <Row>
              <Col md="6" sm="12" className="mb-1">
                <Label className="form-label" for="vendor-name">
                  Vendor Name
                </Label>
                <Input
                  type="text"
                  name="name"
                  className={error ? "border-danger text-danger" : ""}
                  value={name}
                  onChange={(input) => setName(input.target.value)}
                  id="vendor-name"
                  placeholder="E.g: Gloceries."
                />
              </Col>
              <Col md="6" sm="12" className="mb-1">
                <Label className="form-label" for="vendor-phone">
                  Vendor Phone
                </Label>
                <Input
                  type="tel"
                  name="phone"
                  className={error ? "border-danger text-danger" : ""}
                  value={phone}
                  onChange={(input) => setPhone(input.target.value)}
                  id="vendor-phone"
                  placeholder="E.g: 09012345678."
                />
              </Col>
              <Col md="6" sm="12" className="mb-1">
                <Label className="form-label" for="vendor-email">
                  Vendor Email
                </Label>
                <Input
                  type="email"
                  name="email"
                  className={error ? "border-danger text-danger" : ""}
                  value={email}
                  onChange={(input) => setEmail(input.target.value)}
                  id="vendor-email"
                  placeholder="E.g: example@mail.com."
                />
              </Col>
              <Col md="6" sm="12" className="mb-1">
                <Label className="form-label" for="vendor-address">
                  Vendor Address
                </Label>
                <Input
                  type="address"
                  name="address"
                  className={error ? "border-danger text-danger" : ""}
                  value={address}
                  onChange={(input) => setAddress(input.target.value)}
                  id="vendor-address"
                  placeholder="E.g: 123 Agbani rd."
                />
              </Col>
              <Col md="6" sm="12" className="mb-1">
                <Label className="form-label" for="vendor-category">
                  Vendor Website
                </Label>
                <Input
                  type="url"
                  name="website"
                  className={error ? "border-danger text-danger" : ""}
                  value={website}
                  placeholder="E.g: https://example.com"
                  onChange={(input) => setWebsite(input.target.value)}
                  id="vendor-website"
                />
              </Col>
              <Col className="mb-1" md="6" sm="12">
                <Label className="form-label">Select Categories</Label>
                <Select
                  isClearable={false}
                  theme={selectThemeColors}
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  defaultValue={categories}
                  isMulti
                  options={categoriesOption}
                  className="react-select"
                  classNamePrefix="select"
                  onChange={(val) => setCategories(val)}
                />
              </Col>
              <span className="text-danger small">{error}</span>
              <Col sm="12">
                <div className="d-flex">
                  <Button
                    className="me-1"
                    color="primary"
                    disabled={isCreatingVendor}
                    onClick={handleCreateCategory}
                  >
                    {isCreatingVendor ? <Spinner /> : "Create"}
                  </Button>
                  <Button
                    disabled={isCreatingVendor}
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

      <VendorsTable />
    </Fragment>
  );
};

export default Vendors;
