// ** React Imports
import { useState } from "react";
import { User, X } from "react-feather";
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
import { useCategories } from "../../hooks";
import { useDispatch } from "react-redux";
import { setCategories } from "@store/categories";

const EditLocationModal = ({ open, handleModal, category }) => {
  const dispatch = useDispatch();

  const [name, setName] = useState(category.name);
  const [error, setError] = useState("");

  const { updateCategory, isUpdatingCategory } = useCategories(
    (success) => {
      dispatch(setCategories(success));
      return handleModal && handleModal();
    },
    (err) => {
      setError(err?.message);
    }
  );

  const handleUpdateCategory = () => {
    setError("");
    if (!name || name.length < 3) {
      setError("Category name must be more that 3 characters.");
      return;
    }
    updateCategory(category._id, { name });
  };

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
          <Label className="form-label" for="full-name">
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
          <span className="text-danger small">{error}</span>
        </div>
        <Button
          className="me-1"
          color="primary"
          disabled={isUpdatingCategory}
          onClick={handleUpdateCategory}
        >
          {isUpdatingCategory ? <Spinner /> : "Update"}
        </Button>
        <Button
          disabled={isUpdatingCategory}
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
