import React from "react";

const Table = ({tableHeaders, tableItems}) => {

  // function to display all the headers of the table
  const displayTableHeaders = (headersList) => {
    return headersList.map((header, k) => (
      <th key={k}>{header}</th>
    ))
  }

  // function to display all the items under each header
  const displayTableItems = (items) => {
    return items.map((item, k) => {
      const { name, category, price, quantity, tax_pct } = item
      if(k <= 6) {
        return (
          <tr key={k}>
            <td>{name}</td>
            <td>{category}</td>
            <td>{price}</td>
            <td>{quantity}</td>
            <td>{tax_pct}</td>
            <td>{price * quantity}</td>
          </tr>
        )
      }
    })
  }

  return (
    <table>
      <thead>
        <tr>{displayTableHeaders(tableHeaders)}</tr>
      </thead>
      <tbody>
        {displayTableItems(tableItems)}
      </tbody>
    </table>
  )
}

export default Table;