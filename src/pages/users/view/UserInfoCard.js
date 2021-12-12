import { useState, Fragment } from "react";
import {
  Row,
  Col,
  Card,
  Form,
  CardBody,
  Button,
  Badge,
  Modal,
  Input,
  Label,
  ModalBody,
  ModalHeader,
  Spinner,
} from "reactstrap";
import Swal from "sweetalert2";
import Select from "react-select";
import { Check, CheckCircle, X } from "react-feather";
import { useForm, Controller } from "react-hook-form";
import withReactContent from "sweetalert2-react-content";
import Avatar from "@components/avatar";
import { selectThemeColors, formatNumber } from "@utils";
import "@styles/react/libs/react-select/_react-select.scss";
import { useUser } from "@src/hooks";
import { toast, Slide } from "react-toastify";

const ToastContent = ({ message }) => (
  <>
    <div className="toastify-body">
      <span>{message}</span>
    </div>
  </>
);

const roleColors = {
  admin: "light-danger",
  staff: "light-info",
  customer: "light-primary",
};

const statusColors = {
  ACTIVE: "light-success",
  INACTIVE: "light-secondary",
};

const MySwal = withReactContent(Swal);

const UserInfoCard = ({ user, orders, pushUser }) => {
  const [show, setShow] = useState(false);

  const { updateUser, isUpdatingUser } = useUser(
    (success) => {
      setShow(false);
      pushUser(success);
      toast.success(<ToastContent message="User Updated Successfully!" />, {
        icon: <CheckCircle className="text-success" />,
        transition: Slide,
        autoClose: 3000,
      });
    },
    (err) => {
      toast.error(
        <ToastContent message={`Unable to update user! ${err?.message}`} />,
        {
          icon: <X className="text-danger" />,
          transition: Slide,
          autoClose: 3000,
        }
      );
    }
  );

  const {
    reset,
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: user.email,
      lastname: user.lastname,
      firstname: user.firstname,
      phone: user.phone,
      role: user.role,
    },
  });

  // ** render user img
  const renderUserImg = () => {
    if (user !== null && user.photo) {
      return (
        <img
          height="110"
          width="110"
          alt="user-avatar"
          src={user.photo}
          className="img-fluid rounded mt-3 mb-2"
        />
      );
    } else {
      const stateNum = Math.floor(Math.random() * 3),
        states = ["light-success", "light-info", "light-primary"],
        color = states[stateNum];
      return (
        <Avatar
          initials
          color={color}
          className="rounded mt-3 mb-2"
          content={`${user.firstname} ${user.lastname}`}
          contentStyles={{
            borderRadius: 0,
            fontSize: "calc(48px)",
            width: "100%",
            height: "100%",
          }}
          style={{
            height: "110px",
            width: "110px",
          }}
        />
      );
    }
  };

  const onSuspendUser = async () => {
    console.log(
      await updateUser(user._id, {
        status: user.status === "INACTIVE" ? "ACTIVE" : "INACTIVE",
      })
    );
  };

  const onSubmit = (data) => {
    if (Object.values(data).every((field) => field.length > 0)) {
      updateUser(user._id, data);
    } else {
      for (const key in data) {
        if (data[key].length === 0) {
          setError(key, {
            type: "manual",
          });
        }
      }
    }
  };

  const handleReset = () => {
    reset({
      email: user.email,
      lastname: user.lastname,
      firstname: user.firstname,
      phone: user.phone,
      role: user.role,
    });
  };

  const handleSuspendedClick = () => {
    return MySwal.fire({
      title: "Warning!",
      text: `Are you sure you want to ${
        user.status === "INACTIVE" ? "unsuspend" : "suspend"
      } this user?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText:
        user.status === "INACTIVE"
          ? "Yes, Unsuspend user!"
          : "Yes, Suspend user!",
      customClass: {
        confirmButton: "btn btn-primary",
        cancelButton: "btn btn-outline-danger ms-1",
      },
      buttonsStyling: false,
    }).then(function (result) {
      if (result.value) {
        onSuspendUser();
      } else if (result.dismiss === MySwal.DismissReason.cancel) {
        MySwal.fire({
          title: "Cancelled",
          text: "Cancelled Suspension :)",
          icon: "error",
          customClass: {
            confirmButton: "btn btn-success",
          },
        });
      }
    });
  };

  return (
    <Fragment>
      <Card>
        <CardBody>
          <div className="user-avatar-section">
            <div className="d-flex align-items-center flex-column">
              {renderUserImg()}
              <div className="d-flex flex-column align-items-center text-center">
                <div className="user-info">
                  <h4>
                    {user !== null ? `${user.firstname} ${user.lastname}` : ""}
                  </h4>
                  {user !== null ? (
                    <Badge
                      color={roleColors[user.role]}
                      className="text-capitalize"
                    >
                      {user.role}
                    </Badge>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-around my-2 pt-75">
            <div className="d-flex align-items-start me-2">
              <Badge color="light-primary" className="rounded p-75">
                <Check className="font-medium-2" />
              </Badge>
              <div className="ms-75">
                <h4 className="mb-0">{formatNumber(orders.length)}</h4>
                <small>Orders</small>
              </div>
            </div>
            <div className="d-flex align-items-start">
              <Badge color="light-primary" className="rounded p-75">
                {"\u20A6"}
              </Badge>
              <div className="ms-75">
                <h4 className="mb-0">{formatNumber(user.balance)}</h4>
                <small>Balance</small>
              </div>
            </div>
          </div>
          <h4 className="fw-bolder border-bottom pb-50 mb-1">Details</h4>
          <div className="info-container">
            {user !== null ? (
              <ul className="list-unstyled">
                <li className="mb-75">
                  <span className="fw-bolder me-25">Name:</span>
                  <span>{`${user.firstname} ${user.lastname}`}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">Email:</span>
                  <span>{user.email}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">Status:</span>
                  <Badge
                    className="text-capitalize"
                    color={statusColors[user.status]}
                  >
                    {user.status}
                  </Badge>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">Role:</span>
                  <span className="text-capitalize">{user.role}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">Phone Number:</span>
                  <span>{user.phone}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">Email Status:</span>
                  <span>
                    {user.isVerified ? (
                      <Badge className="text-capitalize" color="light-success">
                        Verified
                      </Badge>
                    ) : (
                      <Badge className="text-capitalize" color="light-warning">
                        Unverified
                      </Badge>
                    )}
                  </span>
                </li>
              </ul>
            ) : null}
          </div>
          <div className="d-flex justify-content-center pt-2">
            <Button color="primary" onClick={() => setShow(true)}>
              Edit
            </Button>
            <Button
              className="ms-1"
              color={user.status === "INACTIVE" ? "info" : "danger"}
              outline
              onClick={handleSuspendedClick}
            >
              {user.status === "INACTIVE" ? "Unsuspend" : "Suspend"}
            </Button>
          </div>
        </CardBody>
      </Card>
      <Modal
        isOpen={show}
        toggle={() => setShow(!show)}
        className="modal-dialog-centered modal-lg"
      >
        <ModalHeader
          className="bg-transparent"
          toggle={() => setShow(!show)}
        ></ModalHeader>
        <ModalBody className="px-sm-5 pt-50 pb-5">
          <div className="text-center mb-2">
            <h1 className="mb-1">Edit User Information</h1>
            <p>Updating user details will receive a privacy audit.</p>
          </div>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row className="gy-1 pt-75">
              <Col md={6} xs={12}>
                <Label className="form-label" for="firstname">
                  First Name
                </Label>
                <Controller
                  defaultValue=""
                  control={control}
                  id="firstname"
                  name="firstname"
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="firstname"
                      placeholder="John"
                      invalid={errors.firstname && true}
                    />
                  )}
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className="form-label" for="lastname">
                  Last Name
                </Label>
                <Controller
                  defaultValue=""
                  control={control}
                  id="lastname"
                  name="lastname"
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="lastname"
                      placeholder="Doe"
                      invalid={errors.lastname && true}
                    />
                  )}
                />
              </Col>
              <Col md={12} xs={12}>
                <Label className="form-label" for="email">
                  Email
                </Label>
                <Controller
                  defaultValue=""
                  control={control}
                  id="email"
                  name="email"
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="email"
                      placeholder="example@email.com"
                      invalid={errors.email && true}
                    />
                  )}
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className="form-label" for="phone">
                  Phone
                </Label>
                <Controller
                  defaultValue=""
                  control={control}
                  id="phone"
                  name="phone"
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="phone"
                      placeholder="Doe"
                      invalid={errors.phone && true}
                    />
                  )}
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className="form-label" for="role">
                  Role
                </Label>
                <Controller
                  defaultValue=""
                  control={control}
                  id="role"
                  name="role"
                  render={({ field }) => (
                    <Input
                      {...field}
                      invalid={errors.phone && true}
                      type="select"
                      id="role"
                      name="role"
                    >
                      <option value="admin">Admin</option>
                      <option value="staff">Staff</option>
                      <option value="customer">Customer</option>
                    </Input>
                  )}
                />
              </Col>
              <Col xs={12} className="text-center mt-2 pt-50">
                <Button
                  disabled={isUpdatingUser}
                  type="submit"
                  className="me-1"
                  color="primary"
                >
                  {isUpdatingUser ? <Spinner /> : "Submit"}
                </Button>
                <Button
                  type="reset"
                  color="secondary"
                  outline
                  disabled={isUpdatingUser}
                  onClick={() => {
                    handleReset();
                    setShow(false);
                  }}
                >
                  Discard
                </Button>
              </Col>
            </Row>
          </Form>
        </ModalBody>
      </Modal>
    </Fragment>
  );
};

export default UserInfoCard;
