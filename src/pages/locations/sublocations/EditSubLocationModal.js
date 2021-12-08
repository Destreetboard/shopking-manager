// ** React Imports
import { useState, useMemo, useEffect } from "react";

// ** Third Party Components
import { User, X } from "react-feather";

// ** Reactstrap Imports
import {
  Modal,
  Input,
  Label,
  Button,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import Select from "react-select";

// ** Styles
import "@styles/react/libs/flatpickr/flatpickr.scss";

const EditSubLocationModal = ({ open, handleModal, location, locations }) => {
  // ** State
  const [selectedLocation, setSelectedLocation] = useState({
    value: location._id,
    label: location.name,
  });
  const [address, setAddress] = useState(location.address);
  const [price, setPrice] = useState(location.price);

  const locationOptions = useMemo(() => {
    return locations.map((l) => ({
      value: l._id,
      label: l.name,
    }));
  }, [locations]);

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
          <Label className="form-label" for="location">
            Select Location
          </Label>
          <Select
            id="location"
            options={locationOptions}
            className="react-select"
            classNamePrefix="select"
            onChange={(data) => {
              setSelectedLocation(data);
            }}
            value={selectedLocation}
          />
        </div>
        <div className="mb-1">
          <Label className="form-label" for="address">
            Address
          </Label>
          <Input
            name="address"
            value={address}
            onChange={(input) => setAddress(input.target.value)}
            id="location-address"
            placeholder="Format: Address. E.g: Divine Favour Lodge"
          />
        </div>
        <div className="mb-1">
          <Label className="form-label" for="price">
            Price
          </Label>
          <Input
            type="number"
            onChange={(input) => setPrice(input.target.value)}
            name="price"
            value={price}
            id="price"
            placeholder="E.g: 1000."
          />
        </div>
        <Button className="me-1" color="primary" onClick={handleModal}>
          Update
        </Button>
        <Button color="secondary" onClick={handleModal} outline>
          Cancel
        </Button>
      </ModalBody>
    </Modal>
  );
};

export default EditSubLocationModal;
