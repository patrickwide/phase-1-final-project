let data; // Declare a variable "data" with no initial value

// Function to fetch stock data using an async function
async function fetchStockData(symbol) {
  const response = await fetch(`/${symbol}`); // Wait for the response from the server using the symbol passed to the function
  const data = await response.json(); // Wait for the JSON data from the response
  return data; // Return the JSON data
}

// Function to create a table row for the fetched stock data
function createTableRow(data) {
  const tr = document.createElement("tr"); // Create a new table row

  // Create and append the <td> elements in the order you want
  const tdDate = document.createElement("td"); // Create a new table cell for the Date
  tdDate.textContent = data["Date"]; // Set the text content of the cell to the "Date" property of the data object
  tr.appendChild(tdDate); // Append the Date cell to the table row

  const tdOpen = document.createElement("td"); // Create a new table cell for the Open price
  tdOpen.textContent = data["Open"]; // Set the text content of the cell to the "Open" property of the data object
  tr.appendChild(tdOpen); // Append the Open cell to the table row

  const tdHigh = document.createElement("td"); // Create a new table cell for the High price
  tdHigh.textContent = data["High"]; // Set the text content of the cell to the "High" property of the data object
  tr.appendChild(tdHigh); // Append the High cell to the table row

  const tdLow = document.createElement("td"); // Create a new table cell for the Low price
  tdLow.textContent = data["Low"]; // Set the text content of the cell to the "Low" property of the data object
  tr.appendChild(tdLow); // Append the Low cell to the table row

  const tdClose = document.createElement("td"); // Create a new table cell for the Close price
  tdClose.textContent = data["Close"]; // Set the text content of the cell to the "Close" property of the data object
  tr.appendChild(tdClose); // Append the Close cell to the table row

  const tdAdjClose = document.createElement("td"); // Create a new table cell for the Adjusted Close price
  tdAdjClose.textContent = data["Adj Close"]; // Set the text content of the cell to the "Adj Close" property of the data object
  tr.appendChild(tdAdjClose); // Append the Adjusted Close cell to the table row

  const tdVolume = document.createElement("td"); // Create a new table cell for the Volume
  tdVolume.textContent = data["Volume"]; // Set the text content of the cell to the "Volume" property of the data object
  tr.appendChild(tdVolume); // Append the Volume cell to the table row

  // Create the "Buy" and "Sell" buttons
  const tdAction = document.createElement("td"); // Create a new table cell for the buttons
  const buyButton = document.createElement("button"); // Create a new button for buying
  const sellButton = document.createElement("button"); // Create a new button for selling
  buyButton.textContent = "Buy"; // Set the text content of the "Buy" button to "Buy"
  sellButton.textContent = "Sell"; // Set the text content of the "Sell" button to "Sell"
  tdAction.appendChild(buyButton); // Append the "Buy" button to the cell
  tdAction.appendChild(sellButton); // Append the "Sell" button to the cell
  tr.appendChild(tdAction); // Append the cell with the buttons to the table row
  return tr; // Return the completed table row
}
