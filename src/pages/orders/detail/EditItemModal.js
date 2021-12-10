import { useState, useMemo } from "react";
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
import { useOrder } from "@src/hooks";
import "@styles/react/libs/flatpickr/flatpickr.scss";
import { useSelector } from "react-redux";
import Select from "react-select";
import { toast, Slide } from "react-toastify";

const ToastContent = ({ message }) => (
  <>
    <div className="toastify-body">
      <span>{message}</span>
    </div>
  </>
);

const EditItemModal = ({
  open,
  handleModal,
  onUpdateOrder,
  items,
  item,
  order,
}) => {
  const { categories } = useSelector((state) => state);
  const [name, setName] = useState(item.name);
  const [category, setCategory] = useState({
    value: item.category._id,
    label: item.category.name,
  });
  const [description, setDescription] = useState(item.description || "");
  const [note, setNote] = useState(item.note || "");
  const [price, setPrice] = useState(item.price || "");
  const [fee, setFee] = useState(item.fee || "");
  const [quantity, setQuantity] = useState(item.quantity || "");
  const [estimatedPrice, setEstimatedPrice] = useState(
    item.estimatedPrice || ""
  );
  const [error, setError] = useState("");

  const categoryOptions = useMemo(() => {
    return categories.map((cat) => ({ value: cat._id, label: cat.name }));
  }, []);

  const { updateItem, isLoading } = useOrder(
    (success) => {
      onUpdateOrder(success);
      toast.success(<ToastContent message="Item Updated Successfully!" />, {
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

  const handleUpdateItem = () => {
    setError("");
    if (!name || name.length < 3) {
      setError("Item name must be more that 3 characters.");
      return;
    }
    if (!price || parseInt(price) <= 0) {
      setError("Item price is required  and must greater than 0.");
      return;
    }
    if (!quantity) {
      setError("Item quantity is required.");
      return;
    }
    if (!fee) {
      setError("Item fee is required.");
      return;
    }

    updateItem(
      { orderId: order._id, itemId: item._id },
      { note, quantity, fee, price }
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
            Name
          </Label>
          <Input
            name="name"
            disabled
            type="text"
            value={name}
            onChange={(input) => setName(input.target.value)}
            className={error ? "border-danger text-danger" : ""}
            id="name"
            placeholder="E.g: Pizza."
          />
        </div>
        <div className="mb-1">
          <Label className="form-label" for="full-name">
            Description
          </Label>
          <Input
            name="description"
            type="text"
            disabled
            value={description}
            onChange={(input) => setDescription(input.target.value)}
            className={error ? "border-danger text-danger" : ""}
            id="description"
            placeholder="E.g: Pepperoni Beef Pizza."
          />
        </div>
        <div className="mb-1">
          <Label className="form-label" for="full-name">
            Category
          </Label>
          <Select
            options={categoryOptions}
            isSearchable
            value={category}
            isDisabled
            onChange={(val) => setCategory(val)}
          />
        </div>
        <div className="mb-1">
          <Label className="form-label" for="full-name">
            EstimatedPrice
          </Label>
          <Input
            name="estimatedPrice"
            type="number"
            disabled
            value={estimatedPrice}
            onChange={(input) => setEstimatedPrice(input.target.value)}
            className={error ? "border-danger text-danger" : ""}
            id="estimatedPrice"
            placeholder="E.g: 1000."
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
        <div className="mb-1">
          <Label className="form-label" for="full-name">
            Quantity
          </Label>
          <Input
            name="quantity"
            type="number"
            value={quantity}
            onChange={(input) => setQuantity(input.target.value)}
            className={error ? "border-danger text-danger" : ""}
            id="quantity"
            placeholder="E.g: 2."
          />
        </div>
        <div className="mb-1">
          <Label className="form-label" for="full-name">
            Fee
          </Label>
          <Input
            name="fee"
            type="number"
            value={fee}
            onChange={(input) => setFee(input.target.value)}
            className={error ? "border-danger text-danger" : ""}
            id="fee"
            placeholder="E.g: 100."
          />
        </div>
        <div className="mb-1">
          <Label className="form-label" for="full-name">
            Note
          </Label>
          <Input
            name="note"
            type="text"
            disabled
            value={note}
            onChange={(input) => setNote(input.target.value)}
            className={error ? "border-danger text-danger" : ""}
            id="fee"
            placeholder="Enter more details"
          />
        </div>
        <span className="text-danger small">{error}</span>
        <Button
          disabled={isLoading}
          onClick={handleUpdateItem}
          className="me-1"
          color="primary"
        >
          {isLoading ? <Spinner /> : "Update"}
        </Button>
        <Button
          disabled={isLoading}
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

export default EditItemModal;
