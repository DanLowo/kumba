import React, {useEffect, useState} from 'react'
import axios from "axios";

// import components
import OrderSummaryBox from "../../Components/OrderSummaryBox";
import Table from "../../Components/Table";
import Button from "../../Components/Button";

const OrdersContainer = () => {

  const [{ restaurant, totalMoneySpent, totalTaxPaid, totalOrders }, setOrderDetails] = useState({
    restaurant: {},
    totalMoneySpent: 0,
    totalTaxPaid: 0,
    totalOrders: 0
  })

  // state to return table headers list and table body items
  const [{ tableHeaders, tableItems, count, constItems }, setTableData] = useState({
    tableHeaders: ['Name', 'Category', 'Price', 'Quantity', 'Tax (%)', 'Total Price (INR)'],
    tableItems: [],
    constItems: [],
    count: 1
  })

  const [{ disableBack, disableNext }, setDisableTableControl] = useState({
    disableBack: true,
    disableNext: tableItems.length <= 7
  })

  const getTotalData = (items) => {
    let totalMoneySpent = 0
    let totalTaxPaid = 0
    const totalOrders = items.length

    items.map(item => {
      const { price, tax_pct: tax } = item
      totalMoneySpent += price
      totalTaxPaid += (price * (tax/100))
    })
    return { totalMoneySpent, totalTaxPaid, totalOrders }
  }

  const getAndSetData = async () => {
    try {
      const { data: { restaurant, items } } = await axios.get('https://indapi.kumba.io/webdev/assignment')

      // set items for table
      setTableData(prevState => ({
        ...prevState,
        tableItems: items,
        constItems: items,
        count: 1
      }))

      const { totalMoneySpent, totalTaxPaid, totalOrders } = getTotalData(items)
      setOrderDetails(prevState => ({
        ...prevState,
        totalMoneySpent,
        totalTaxPaid,
        totalOrders,
        restaurant
      }))

    } catch (err) {
      console.log(err)
    }
  }

  // eslint-disable-next-line
  useEffect(async () => {
      await getAndSetData()
  }, [])

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
        <Button disabled={disableBack} text="Back" iconPosition="left" dark icon="fas fa-chevron-left" onClick={() => backTable(count, constItems)} />
        <span className="count">{count}</span>
        <Button disabled={disableNext} text="Next" iconPosition="right" dark icon="fas fa-chevron-right" onClick={() => nextTable(count, constItems)} />
      </div>
    )
  }

  return (
    <div id="orders">
      <h2 className="text-center">Orders</h2>
      <section id="overview">
        <h3 className="section-title">Overview</h3>
        <div id="order-summary">
          <OrderSummaryBox title="Total Order Placed" value={totalOrders} icon="fas fa-utensils" />
          <OrderSummaryBox title="Total Money Spent" value={totalMoneySpent} moneyIcon icon="fas fa-money-bill-wave" />
          <OrderSummaryBox title="Total Tax Paid" value={totalTaxPaid} moneyIcon icon="fas fa-lightbulb" />
          <OrderSummaryBox />
        </div>
      </section>

      <section id="restaurant">
        <h3>Restaurant:</h3>
        <p>Name: {restaurant.name}</p>
        <p>Street: {restaurant.street}</p>
        <p>City: {restaurant.city}</p>
        <p>State: {restaurant.state}</p>
        <p>Zipcode: {restaurant.zipcode}</p>
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