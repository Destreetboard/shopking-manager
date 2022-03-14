import { Link } from "react-router-dom";
import classnames from "classnames";
import { Edit } from "react-feather";
import { Card, CardBody, CardText, Button, Badge } from "reactstrap";
import { formatMoney } from "@utils";
import EditItemModal from "./EditItemModal";
import { useState } from "react";

const ProductCards = ({ items, user, onUpdateOrder, order }) => {
  const [selectedItem, setSelectedItem] = useState(null);

  const renderProducts = () => {
    if (items.length) {
      const [selectedImg, setSelectedImg] = useState({ id: null, img: "" });
      return items.map((item) => {
        return (
          <Card className="ecommerce-card" key={item.name}>
            <div className="item-img text-center mx-auto">
              {item.images && (
                <img
                  className="img-fluid card-img-top"
                  src={
                    selectedImg.id === item._id
                      ? selectedImg.img
                      : item.images[0]
                  }
                  alt={item.name}
                />
              )}
            </div>
            <CardBody>
              <div className="item-wrapper">
                <div className="item-cost">
                  <h6 className="item-price">
                    {formatMoney(item.price || item.estimatedPrice)}
                  </h6>
                </div>
              </div>
              <h6 className="item-name">
                <Link className="text-body" to="#">
                  {item.name}
                </Link>
                <CardText tag="span" className="item-company">
                  By{" "}
                  <a
                    className="company-name"
                    href="#"
                    onClick={(e) => e.preventDefault()}
                  >
                    {`${user?.firstname} ${user?.lastname}`}
                  </a>
                </CardText>
              </h6>
              <CardText className="item-description">
                <b>Description: </b>
                {item.description}
                <br />
                <b>Note: </b>
                {item.note}
                <br />
                <b>Fee: </b>
                {item.fee ? (
                  formatMoney(item.fee)
                ) : (
                  <span className="text-warning">Add Fee</span>
                )}
                <span className="d-block">
                  {item.images.map((img) => {
                    return (
                      <img
                        key={img}
                        onClick={() => {
                          setSelectedImg({ id: item._id, img });
                        }}
                        style={{
                          borderRadius: 5,
                          marginRight: 5,
                          borderWidth: 5,
                        }}
                        className={
                          img === selectedImg.img ? "border-success" : ""
                        }
                        alt={img}
                        src={img}
                        width="50"
                      />
                    );
                  })}
                </span>
              </CardText>
            </CardBody>
            <div className="item-options text-center">
              <div className="item-wrapper">
                <div className="item-cost">
                  <h4 className="item-price">
                    <br />
                    {item.price ? (
                      <>
                        <b>Price: </b>
                        {formatMoney(item.price)}
                      </>
                    ) : (
                      <span className="text-warning">Add Price</span>
                    )}
                  </h4>
                  {!item.price && (
                    <CardText className="shipping">
                      <Badge color="light-warning">
                        Est: {formatMoney(item.estimatedPrice)}
                      </Badge>
                    </CardText>
                  )}
                </div>
              </div>
              <Button
                color="primary"
                className="btn-cart move-cart"
                onClick={() => setSelectedItem(item)}
              >
                <Edit className="me-50" size={14} />
                <span>Edit Item</span>
              </Button>
            </div>
          </Card>
        );
      });
    }
  };

  return (
    <div
      className={classnames({
        "list-view": true,
      })}
    >
      {renderProducts()}
      {selectedItem && (
        <EditItemModal
          onUpdateOrder={onUpdateOrder}
          items={items}
          item={selectedItem}
          order={order}
          open={selectedItem !== null}
          handleModal={() => {
            setSelectedItem(null);
          }}
        />
      )}
    </div>
  );
};

export default ProductCards;
