import { useState } from "react";
import { X, CheckCircle } from "react-feather";
import {
  Modal,
  Input,
  Label,
  Button,
  ModalHeader,
  ModalBody,
  Spinner,
} from "reactstrap";
import { useLocations } from "../../hooks";
import { useDispatch } from "react-redux";
import { setLocations } from "@store/locations";
import "@styles/react/libs/flatpickr/flatpickr.scss";
import { toast, Slide } from "react-toastify";

const ToastContent = ({ message }) => (
  <>
    <div className="toastify-body">
      <span>{message}</span>
    </div>
  </>
);

const EditLocationModal = ({ open, handleModal, location }) => {
  const dispatch = useDispatch();

  const [name, setName] = useState(location.name);
  const [error, setError] = useState("");

  const { updateLocation, isUpdatingLocation } = useLocations(
    (success) => {
      dispatch(setLocations(success));
      toast.success(<ToastContent message="Location Updated Successfully!" />, {
        icon: <CheckCircle className="text-success" />,
        transition: Slide,
        autoClose: 3000,
      });
      return handleModal && handleModal();
    },
    (err) => {
      setError(err?.message);
    }
  );

  const handleUpdateLocation = () => {
    setError("");
    if (!name || name.length < 3) {
      setError("Location name must be more that 3 characters.");
      return;
    }
    updateLocation(location._id, { name });
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
            Name
          </Label>
          <Input
            name="name"
            value={name}
            onChange={(input) => setName(input.target.value)}
            className={error ? "border-danger text-danger" : ""}
            id="name"
            placeholder="Format: State - Area. E.g: Enugu - Agbani."
          />
          <span className="text-danger small">{error}</span>
        </div>
        <Button
          disabled={isUpdatingLocation}
          onClick={handleUpdateLocation}
          className="me-1"
          color="primary"
        >
          {isUpdatingLocation ? <Spinner /> : "Update"}
        </Button>
        <Button
          disabled={isUpdatingLocation}
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
