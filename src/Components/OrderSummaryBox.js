import React from "react";

const OrderSummaryBox = ({title, value, icon}) => {
  return (
    <div className="order-summary-box">
      <span className={icon} />
      <div>
        <h2>{value}</h2>
        <p>{title}</p>
      </div>
    </div>
  )
}

export default OrderSummaryBox;