// ** React Imports
import { useEffect, useState } from "react";
import { CheckCircle, X } from "react-feather";
import {
  Modal,
  Input,
  Label,
  Button,
  ModalHeader,
  ModalBody,
  Spinner,
} from "reactstrap";
import "@styles/react/libs/flatpickr/flatpickr.scss";
import { useCategories, useVendors } from "../../hooks";
import { useDispatch, useSelector } from "react-redux";
import { toast, Slide } from "react-toastify";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { selectThemeColors } from "@utils";
import { setVendors } from "@store/vendors";
import { setCategories as dispatchCategories } from "@store/categories";

const ToastContent = ({ message }) => (
  <>
    <div className="toastify-body">
      <span>{message}</span>
    </div>
  </>
);

const EditLocationModal = ({ open, handleModal, vendor }) => {
  const dispatch = useDispatch();
  const animatedComponents = makeAnimated();
  const { categories: storeCategories } = useSelector((state) => state);

  const [name, setName] = useState(vendor.name);
  const [phone, setPhone] = useState(vendor.phone);
  const [categories, setCategories] = useState(
    vendor.categories.map((c) => ({
      value: c._id,
      label: c.name,
    }))
  );
  const [email, setEmail] = useState(vendor.email);
  const [address, setAddress] = useState(vendor.address);
  const [website, setWebsite] = useState(vendor.website);
  const [error, setError] = useState("");

  const categoriesOption = storeCategories.map((c) => ({
    value: c._id,
    label: c.name,
  }));

  const { fetchCategories } = useCategories((success) => {
    dispatch(dispatchCategories(success));
  });

  const { updateVendor, isUpdatingVendor } = useVendors(
    (success) => {
      setName("");
      setAddress("");
      setCategories([]);
      setEmail("");
      setWebsite("");
      dispatch(setVendors(success));
      toast.success(<ToastContent message="Vendor Update Successfully!" />, {
        icon: <CheckCircle className="text-success" />,
        transition: Slide,
        autoClose: 3000,
      });
      handleModal();
    },
    (err) => {
      toast.success(
        <ToastContent message={`Unable to update vendor! ${err?.message}`} />,
        {
          icon: <X className="text-danger" />,
          transition: Slide,
          autoClose: 3000,
        }
      );
    }
  );

  const handleUpdateVendor = () => {
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
    updateVendor(vendor._id, {
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

  // ** Custom close btn
  const CloseBtn = (
    <X className="cursor-pointer" size={15} onClick={handleModal} />
  );

  return (
    <Modal
      isOpen={open}
      toggle={handleModal}
      className="sidebar-sm"
      modalClassName="modal-slide-in"
      contentClassName="pt-0"
    >
      <ModalHeader
        className="mb-1"
        toggle={handleModal}
        close={CloseBtn}
        tag="div"
      >
        <h5 className="modal-title">Edit Record</h5>
      </ModalHeader>
      <ModalBody className="flex-grow-1">
        <div className="mb-1">
          <Label className="form-label" for="name">
            Name
          </Label>
          <Input
            onChange={(input) => setName(input.target.value)}
            name="name"
            value={name}
            className={error ? "border-danger text-danger" : ""}
            id="name"
            placeholder="Gloceries"
          />
        </div>
        <div className="mb-1">
          <Label className="form-label" for="email">
            Email
          </Label>
          <Input
            onChange={(input) => setEmail(input.target.value)}
            name="email"
            value={email}
            className={error ? "border-danger text-danger" : ""}
            id="email"
            placeholder="E.g: example@mail.com"
          />
        </div>
        <div className="mb-1">
          <Label className="form-label" for="phone">
            Phone
          </Label>
          <Input
            onChange={(input) => setPhone(input.target.value)}
            name="phone"
            value={phone}
            className={error ? "border-danger text-danger" : ""}
            id="phone"
            placeholder="E.g: 09012345678"
          />
        </div>
        <div className="mb-1">
          <Label className="form-label" for="address">
            Address
          </Label>
          <Input
            onChange={(input) => setAddress(input.target.value)}
            name="address"
            value={address}
            className={error ? "border-danger text-danger" : ""}
            id="address"
            placeholder="E.g: 123 Agbani rd."
          />
        </div>
        <div className="mb-1">
          <Label className="form-label" for="website">
            Website
          </Label>
          <Input
            onChange={(input) => setWebsite(input.target.value)}
            name="website"
            value={website}
            className={error ? "border-danger text-danger" : ""}
            id="website"
            placeholder="E.g: 123 Agbani rd."
          />
        </div>
        <div className="mb-1">
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
        </div>
        <span className="text-danger small">{error}</span>
        <Button
          className="me-1"
          color="primary"
          disabled={isUpdatingVendor}
          onClick={handleUpdateVendor}
        >
          {isUpdatingVendor ? <Spinner /> : "Update"}
        </Button>
        <Button
          disabled={isUpdatingVendor}
          color="secondary"
          onClick={handleModal}
          outline
        >
          Cancel
        </Button>
      </ModalBody>
    </Modal>
  );
};

export default EditLocationModal;
