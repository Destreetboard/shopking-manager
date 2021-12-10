import { Button, Form, Input, Row, Col } from "reactstrap";
import { useSkin } from "@hooks/useSkin";
import "@styles/base/pages/page-misc.scss";
import themeConfig from "@src/configs/themeConfig";

const Maintenance = () => {
  const { skin } = useSkin();

  const illustration =
      skin === "dark" ? "under-maintenance-dark.svg" : "under-maintenance.svg",
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
          <h2 className="mb-1">Under Maintenance 🛠</h2>
          <p className="mb-3">
            Sorry for the inconvenience but we're performing some maintenance at
            the moment
          </p>
          <Form
            tag={Row}
            onSubmit={(e) => e.preventDefault()}
            className="row-cols-md-auto justify-content-center align-items-center m-0 mb-2 gx-3"
          >
            <Col sm="12" className="m-0 mb-1">
              <Input placeholder="john@example.com" />
            </Col>
            <Col sm="12" className="d-md-block d-grid ps-md-0 ps-auto">
              <Button className="mb-1 btn-sm-block" color="primary">
                Notify
              </Button>
            </Col>
          </Form>
          <img
            className="img-fluid"
            src={source}
            alt="Under maintenance page"
          />
        </div>
      </div>
    </div>
  );
};
export default Maintenance;
