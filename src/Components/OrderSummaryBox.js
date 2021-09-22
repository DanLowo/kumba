import React from "react";

const OrderSummaryBox = ({title, value, icon, moneyIcon}) => {
  return (
    <div className="order-summary-box">
      <span className={icon} />
      <div>
        <h2 className={moneyIcon && "fas fa-rupee-sign"}>{value}</h2>
        <p>{title}</p>
      </div>
    </div>
  )
}

export default OrderSummaryBox;