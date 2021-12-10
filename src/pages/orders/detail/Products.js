import ProductCards from "./ProductCards";
import ProductsHeader from "./ProductsHeader";
import classnames from "classnames";

const ProductsPage = ({
  order,
  sidebarOpen,
  setSidebarOpen,
  onUpdateOrder,
}) => {
  return (
    <div className="content-detached content-right">
      <div className="content-body">
        <ProductsHeader setSidebarOpen={setSidebarOpen} />
        <div
          className={classnames("body-content-overlay", {
            show: sidebarOpen,
          })}
          onClick={() => setSidebarOpen(false)}
        ></div>
        {order.items.length ? (
          <ProductCards
            onUpdateOrder={onUpdateOrder}
            items={order.items}
            user={order.user}
            order={order}
          />
        ) : (
          <div className="d-flex justify-content-center mt-2">
            <p>No Results</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
