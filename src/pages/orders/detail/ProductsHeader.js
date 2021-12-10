import { Menu } from "react-feather";

// ** Reactstrap Imports
import { Row, Col } from "reactstrap";

const ProductsHeader = ({ setSidebarOpen }) => {
  return (
    <div className="ecommerce-header">
      <Row>
        <Col sm="12">
          <div className="ecommerce-header-items">
            <div className="result-toggler">
              <button
                className="navbar-toggler shop-sidebar-toggler"
                onClick={() => setSidebarOpen(true)}
              >
                <span className="navbar-toggler-icon d-block d-lg-none">
                  <Menu size={14} />
                </span>
              </button>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ProductsHeader;
