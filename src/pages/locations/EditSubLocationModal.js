import { useState } from "react";
import { X } from "react-feather";
import {
  Modal,
  Input,
  Label,
  Button,
  ModalHeader,
  ModalBody,
  Spinner,
} from "reactstrap";
import { useSubLocations } from "../../hooks";
import "@styles/react/libs/flatpickr/flatpickr.scss";

const EditLocationModal = ({ open, handleModal, subLocation, location }) => {
  const [address, setAddress] = useState(subLocation.address);
  const [price, setPrice] = useState(subLocation.price);
  const [error, setError] = useState("");

  const { updateSubLocation, isUpdatingSubLocation } = useSubLocations(
    () => {
      return handleModal && handleModal();
    },
    (err) => {
      setError(err?.message);
    }
  );

  const handleUpdateSubLocation = () => {
    setError("");
    if (!address || address.length < 3) {
      setError("Sub Location address must be more that 3 characters.");
      return;
    }
    if (!price || parseInt(price) <= 0) {
      setError("Sub Location price is required  and must greater than 0.");
      return;
    }
    updateSubLocation(
      { locationId: location._id, subLocationId: subLocation._id },
      { address, price }
    );
  };

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
          <Label className="form-label" for="full-name">
            Address
          </Label>
          <Input
            name="address"
            value={address}
            onChange={(input) => setAddress(input.target.value)}
            className={error ? "border-danger text-danger" : ""}
            id="address"
            placeholder="Format: Address. E.g: Divine Favour Lodge."
          />
        </div>
        <div className="mb-1">
          <Label className="form-label" for="full-name">
            Price
          </Label>
          <Input
            name="price"
            type="number"
            value={price}
            onChange={(input) => setPrice(input.target.value)}
            className={error ? "border-danger text-danger" : ""}
            id="price"
            placeholder="E.g: 1000."
          />
        </div>
        <span className="text-danger small">{error}</span>
        <Button
          disabled={isUpdatingSubLocation}
          onClick={handleUpdateSubLocation}
          className="me-1"
          color="primary"
        >
          {isUpdatingSubLocation ? <Spinner /> : "Update"}
        </Button>
        <Button
          disabled={isUpdatingSubLocation}
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
