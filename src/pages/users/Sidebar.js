import { useState } from "react";
import Sidebar from "@components/sidebar";
import { Button, Label, FormText, Form, Input, Spinner } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { useUser } from "../../hooks";
import { setUsers } from "@store/users";
import { toast, Slide } from "react-toastify";
import { CheckCircle } from "react-feather";

const ToastContent = ({ message }) => (
  <>
    <div className="toastify-body">
      <span>{message}</span>
    </div>
  </>
);

const checkIsValid = (data) => {
  return Object.values(data).every((field) => {
    return typeof field === "object" ? field !== null : field.length > 0;
  });
};

const SidebarNewUsers = ({ open, toggleSidebar }) => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state);
  const [data, setData] = useState({
    email: "",
    phone: "",
    firstname: "",
    lastname: "",
    role: "staff",
  });
  const [error, setError] = useState("");

  const { createUser, isCreatingUser } = useUser(
    (success) => {
      setData({
        email: "",
        phone: "",
        firstname: "",
        lastname: "",
        role: "staff",
      });
      toggleSidebar();
      dispatch(setUsers([success, ...users]));
      toast.success(<ToastContent message="User Created Successfully!" />, {
        icon: <CheckCircle className="text-success" />,
        transition: Slide,
        autoClose: 3000,
      });
    },
    (err) => {
      setError(err?.message);
    }
  );

  // ** Function to handle form submit
  const onSubmit = () => {
    setError("");
    if (checkIsValid(data)) {
      createUser(data);
    } else {
      setError("All fields are required.");
    }
  };

  return (
    <Sidebar
      size="lg"
      open={open}
      title="New User"
      headerClassName="mb-1"
      contentClassName="pt-0"
      toggleSidebar={toggleSidebar}
    >
      <Form
        method="POST"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <div className="mb-1">
          <Label className="form-label" for="firstname">
            First Name <span className="text-danger">*</span>
          </Label>
          <Input
            onChange={(e) => setData({ ...data, firstname: e.target.value })}
            id="firstname"
            name="firstname"
            placeholder="John"
            value={data.firstname}
            invalid={error !== ""}
          />
        </div>
        <div className="mb-1">
          <Label className="form-label" for="lastname">
            Last Name <span className="text-danger">*</span>
          </Label>
          <Input
            onChange={(e) => setData({ ...data, lastname: e.target.value })}
            name="lastname"
            id="lastname"
            placeholder="Doe"
            value={data.lastname}
            invalid={error !== ""}
          />
        </div>
        <div className="mb-1">
          <Label className="form-label" for="email">
            Email <span className="text-danger">*</span>
          </Label>
          <Input
            onChange={(e) => setData({ ...data, email: e.target.value })}
            name="email"
            type="email"
            id="email"
            value={data.email}
            placeholder="john.doe@example.com"
            invalid={error !== ""}
          />
          <FormText color="muted">
            You can use letters, numbers & periods
          </FormText>
        </div>

        <div className="mb-1">
          <Label className="form-label" for="phone">
            Phone <span className="text-danger">*</span>
          </Label>
          <Input
            onChange={(e) => setData({ ...data, phone: e.target.value })}
            id="phone"
            name="phone"
            value={data.phone}
            placeholder="e.g: 08012345678"
            invalid={error !== ""}
          />
        </div>
        <div className="mb-1">
          <Label className="form-label" for="role">
            Role
          </Label>
          <Input
            type="select"
            id="role"
            name="role"
            value={data.role}
            onChange={(e) => setData({ ...data, role: e.target.value })}
          >
            <option value="admin">Admin</option>
            <option value="staff">Staff</option>
            <option value="customer">Customer</option>
          </Input>
          {error ? <FormText color="danger">{error}</FormText> : null}
        </div>

        <Button
          disabled={isCreatingUser}
          type="submit"
          className="me-1"
          color="primary"
        >
          {isCreatingUser ? <Spinner /> : " Submit"}
        </Button>
        <Button
          disabled={isCreatingUser}
          type="reset"
          color="secondary"
          outline
          onClick={toggleSidebar}
        >
          Cancel
        </Button>
      </Form>
    </Sidebar>
  );
};

export default SidebarNewUsers;
