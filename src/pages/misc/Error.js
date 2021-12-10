import { Link } from "react-router-dom";
import themeConfig from "@src/configs/themeConfig";
import { Button } from "reactstrap";
import { useSkin } from "@hooks/useSkin";
import "@styles/base/pages/page-misc.scss";

const Error = () => {
  const { skin } = useSkin();

  const illustration = skin === "dark" ? "error-dark.svg" : "error.svg",
    source = require(`@src/assets/images/pages/${illustration}`).default;
  return (
    <div className="misc-wrapper">
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
      <div className="misc-inner p-2 p-sm-3">
        <div className="w-100 text-center">
          <h2 className="mb-1">Page Not Found 🕵🏻‍♀️</h2>
          <p className="mb-2">
            Oops! 😖 The requested URL was not found on this server.
          </p>
          <Button
            tag={Link}
            to="/"
            color="primary"
            className="btn-sm-block mb-2"
          >
            Back to home
          </Button>
          <img className="img-fluid" src={source} alt="Not authorized page" />
        </div>
      </div>
    </div>
  );
};
export default Error;
