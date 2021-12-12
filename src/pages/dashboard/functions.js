import moment from "moment";

export const paidOrdersToday = (orders, type = "price") => {
  const items = orders
    .filter((o) => o.status === "PAID" || o.status === "COMPLETED")
    .filter((o) => {
      return (
        moment(o.createdAt).format("DD MMM YYYY") ===
        moment().format("DD MMM YYYY")
      );
    })
    .map((o) => o.items);

  if (type === "price") {
    return items
      .flat()
      .map((a) => a.price)
      .reduce((a, b) => a + b, 0);
  }
  if (type === "service") {
    return items
      .flat()
      .map((a) => a.fee)
      .reduce((a, b) => a + b, 0);
  }

  return items.reduce((a, b) => a + b, 0);
};

export const paidOrdersThisMonth = (orders, type = "price") => {
  const items = orders
    .filter((o) => o.status === "PAID" || o.status === "COMPLETED")
    .filter((o) => {
      return (
        moment(o.createdAt).format("MMM YYYY") === moment().format("MMM YYYY")
      );
    })
    .map((o) => o.items);

  if (type === "price") {
    return items
      .flat()
      .map((a) => a.price)
      .reduce((a, b) => a + b, 0);
  }
  if (type === "service") {
    return items
      .flat()
      .map((a) => a.fee)
      .reduce((a, b) => a + b, 0);
  }

  return items.reduce((a, b) => a + b, 0);
};

export const paidOrdersThisWeek = (orders, type = "price") => {
  const items = orders
    .filter((o) => o.status === "PAID" || o.status === "COMPLETED")
    .filter((o) => {
      return (
        moment(o.createdAt).week() === moment().week() &&
        moment(o.createdAt).format("YYYY") === moment().format("YYYY")
      );
    })
    .map((o) => o.items);

  if (type === "price") {
    return items
      .flat()
      .map((a) => a.price)
      .reduce((a, b) => a + b, 0);
  }
  if (type === "service") {
    return items
      .flat()
      .map((a) => a.fee)
      .reduce((a, b) => a + b, 0);
  }

  return items.reduce((a, b) => a + b, 0);
};

export const paidOrdersTotal = (orders, type = "price") => {
  const items = orders
    .filter((o) => o.status === "PAID" || o.status === "COMPLETED")
    .map((o) => o.items);

  if (type === "price") {
    return items
      .flat()
      .map((a) => a.price)
      .reduce((a, b) => a + b, 0);
  }
  if (type === "service") {
    return items
      .flat()
      .map((a) => a.fee)
      .reduce((a, b) => a + b, 0);
  }

  return items.reduce((a, b) => a + b, 0);
};
