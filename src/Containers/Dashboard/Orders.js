import React, { useState } from 'react'

// import components
import OrderSummaryBox from "../../Components/OrderSummaryBox";
import Data from '../../asset/assignment.json'
import Table from "../../Components/Table";
import Button from "../../Components/Button";

const OrdersContainer = () => {

  // state to return table headers list and table body items
  const [{ tableHeaders, tableItems, count }, setTableData] = useState({
    tableHeaders: ['Name', 'Category', 'Price', 'Quantity', 'Tax (%)', 'Total Price (INR)'],
    tableItems: [...Data.items],
    count: 1
  })

  const [{ disableBack, disableNext }, setDisableTableControl] = useState({
    disableBack: true,
    disableNext: tableItems.length <= 7
  })

  const nextTable = (currentCount, data = []) => {
    const next = (currentCount * 7) - 1
    const nextItems = data.reduce((acc, currentValue, k,) => {
      if(k > next) {
        acc.push(currentValue)
      }
      return acc
    }, [])

    // set new item for table
    setTableData(prevState => ({
      ...prevState,
      tableItems: nextItems,
      count: currentCount + 1
    }))

    // disable control when necessary
    setDisableTableControl(prevState => ({
      ...prevState,
      disableBack: false,
      disableNext: nextItems.length <= 7
    }))
  }

  const backTable = (currentCount, data = []) => {

    const back = (currentCount - 1) * 7
    const backItems = data.reduce((acc, currentValue, k,) => {
      if(k < back) {
        acc.push(currentValue)
      }
      return acc
    }, [])

    setTableData(prevState => ({
      ...prevState,
      tableItems: backItems,
      count: currentCount - 1
    }))

    // disable control when necessary
    setDisableTableControl(prevState => ({
      ...prevState,
      disableBack: currentCount - 1 === 1,
      disableNext: false
    }))
  }

  // control button: next and previous
  const ControlButton = () => {
    return (
      <div id="actions">
        <Button disabled={disableBack} text="Back" iconPosition="left" dark icon="fas fa-chevron-left" onClick={() => backTable(count, Data.items)} />
        <span className="count">{count}</span>
        <Button disabled={disableNext} text="Next" iconPosition="right" dark icon="fas fa-chevron-right" onClick={() => nextTable(count, Data.items)} />
      </div>
    )
  }

  return (
    <div id="orders">
      <h2 className="text-center">Orders</h2>
      <section id="overview">
        <h3 className="section-title">Overview</h3>
        <div id="order-summary">
          <OrderSummaryBox title="Total Order Placed" value="24" />
          <OrderSummaryBox title="Total Money Spent" value="$1,500" />
          <OrderSummaryBox title="Total Tax Paid" value="$120" />
        </div>
      </section>

      <section>
        <h3 className="section-title">Recent Orders</h3>
        <div id="recent-orders">
          <Table tableHeaders={tableHeaders} tableItems={tableItems} />
        </div>
        <ControlButton />
      </section>
    </div>
  )
}

export default OrdersContainer;