// ** React Imports
import React from "react";
import { Link, useHistory } from "react-router-dom";
// ** Custom Components
import InputPasswordToggle from "@components/input-password-toggle";
// ** Reactstrap Imports
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  Form,
  Label,
  Input,
  Button,
  Spinner,
  Alert,
} from "reactstrap";
// ** Styles
import "@styles/react/pages/page-authentication.scss";
import themeConfig from "@src/configs/themeConfig";
import { useLogin } from "@src/hooks";
import { Info, Coffee } from "react-feather";
import { getHomeRouteForLoggedInUser, validateEmail } from "@utils";
import { handleLogin as dispatchLogin } from "@store/authentication";
import { useDispatch } from "react-redux";
import { toast, Slide } from "react-toastify";
import { AbilityContext } from "@src/utility/context/Can";
import jwtDecode from "jwt-decode";
import Avatar from "@components/avatar";

const ToastContent = ({ name, role }) => (
  <>
    <div className="toastify-header">
      <div className="title-wrapper">
        <Avatar size="sm" color="success" icon={<Coffee size={12} />} />
        <h6 className="toast-title fw-bold">Welcome, {name}</h6>
      </div>
    </div>
    <div className="toastify-body">
      <span>
        You have successfully logged in as an {role} user to{" "}
        {themeConfig.app.appName}. Now you can start to explore. Enjoy!
      </span>
    </div>
  </>
);

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const ability = React.useContext(AbilityContext);

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [passwordError, setPasswordError] = React.useState(false);
  const [emailError, setEmailError] = React.useState(false);

  const updateAbility = (role) => {
    let rules = [];
    if (role === "admin" || role === "staff") {
      rules = [
        {
          action: "manage",
          subject: "all",
        },
      ];
    } else {
      rules = [
        {
          action: "read",
          subject: "all",
        },
        {
          action: "read",
          subject: "Auth",
        },
      ];
    }
    ability.update(rules);
  };

  const { isLoading, handleLogin } = useLogin(
    (success) => {
      dispatch(dispatchLogin(success.token));
      const data = jwtDecode(success.token);
      updateAbility(data.role);
      history.push(getHomeRouteForLoggedInUser(data.role));
      toast.success(
        <ToastContent name={data.firstname} role={data.role || "admin"} />,
        {
          icon: false,
          transition: Slide,
          hideProgressBar: true,
          autoClose: 2000,
        }
      );
    },
    (err) => {
      setError(err.message);
    }
  );

  const onChangeEmail = (input) => {
    setEmail(input.target.value);
    setEmailError(false);
    setError("");
  };

  const onChangePassword = (input) => {
    setPassword(input.target.value);
    setError("");
    setPasswordError(false);
  };

  const onSignin = () => {
    setEmailError(false);
    setPasswordError(false);
    setError("");

    // Validate input fields
    if (!email || !validateEmail(email)) {
      setEmailError(true);
      return setError("Invalid email address");
    }
    if (!password) {
      setPasswordError(true);
      return setError("Password is required.");
    }
    handleLogin({ email, password });
  };

  return (
    <div className="auth-wrapper auth-basic px-2">
      <div className="auth-inner my-2">
        <Card className="mb-0">
          <CardBody>
            <Link
              className="brand-logo"
              to="/"
              onClick={(e) => e.preventDefault()}
              style={{ alignItems: "flex-start" }}
            >
              <img width="30" src={themeConfig.app.appLogoImage} alt="Logo" />
              <h2 className="brand-text text-primary ms-1">
                {themeConfig.app.appName}
              </h2>
            </Link>
            <CardTitle tag="h4" className="mb-1">
              Welcome to {themeConfig.app.appName}! 👋
            </CardTitle>
            <CardText className="mb-2">
              Please sign-in to your staff account.
            </CardText>
            {!passwordError && !emailError && error ? (
              <Alert color="danger">
                <p className="text-center">
                  <Info size={14} /> {error}
                </p>
              </Alert>
            ) : null}
            <Form
              className="auth-login-form mt-2"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="mb-1">
                <Label className="form-label" for="login-email">
                  Email
                </Label>
                <Input
                  onChange={onChangeEmail}
                  value={email}
                  className={emailError ? "border-danger text-danger" : ""}
                  type="email"
                  id="login-email"
                  placeholder="john@example.com"
                  autoFocus
                />
                {error && emailError ? error : null}
              </div>
              <div className="mb-1">
                <div className="d-flex justify-content-between">
                  <Label className="form-label" for="login-password">
                    Password
                  </Label>
                  <Link to="/forgot-password">
                    <small>Forgot Password?</small>
                  </Link>
                </div>
                <InputPasswordToggle
                  value={password}
                  className={passwordError ? "border-danger text-danger" : ""}
                  onChange={onChangePassword}
                  className="input-group-merge"
                  id="login-password"
                />
                {error && passwordError ? error : null}
              </div>
              <div className="form-check mb-1">
                <Input type="checkbox" id="remember-me" />
                <Label className="form-check-label" for="remember-me">
                  Remember Me
                </Label>
              </div>
              <Button color="primary" block onClick={onSignin}>
                {isLoading ? <Spinner /> : "Sign in"}
              </Button>
            </Form>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default Login;
