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

const UpdateSidebar = ({ open, toggleSidebar, user }) => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state);
  const [data, setData] = useState(user);
  const [error, setError] = useState("");

  const { updateUser, isUpdatingUser } = useUser(
    (success) => {
      dispatch(
        setUsers(users.map((u) => (u._id === success._id ? success : u)))
      );
      toast.success(<ToastContent message="User Updated Successfully!" />, {
        icon: <CheckCircle className="text-success" />,
        transition: Slide,
        autoClose: 3000,
      });
      toggleSidebar();
    },
    (err) => {
      setError(err?.message);
    }
  );

  // ** Function to handle form submit
  const onSubmit = () => {
    setError("");
    updateUser(user._id, data);
  };

  return (
    <Sidebar
      size="lg"
      open={open}
      title="Update User"
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
          disabled={isUpdatingUser}
          type="submit"
          className="me-1"
          color="primary"
        >
          {isUpdatingUser ? <Spinner /> : " Submit"}
        </Button>
        <Button
          disabled={isUpdatingUser}
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

export default UpdateSidebar;
