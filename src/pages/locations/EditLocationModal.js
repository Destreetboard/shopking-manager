// ** React Imports
import { useState } from "react";

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
  InputGroup,
  InputGroupText,
} from "reactstrap";

// ** Styles
import "@styles/react/libs/flatpickr/flatpickr.scss";

const EditLocationModal = ({ open, handleModal, location }) => {
  const [name, setName] = useState(location.name);
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
            name="name"
            value={name}
            onChange={(input) => setName(input.target.value)}
            id="name"
            placeholder="Format: State - Area. E.g: Enugu - Agbani."
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

export default EditLocationModal;
