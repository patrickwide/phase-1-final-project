let data; // Declare a variable "data" with no initial value
const api_url = "https://wide254.pythonanywhere.com/api/wide/";
// Function to fetch stock data using an async function
async function fetchStockData(symbol) {
  const response = await fetch(
    `https://wide254.pythonanywhere.com/api/wide/${symbol}`
  ); // Wait for the response from the server using the symbol passed to the function
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

// Get references to UI elements
const buyDateSelect = document.getElementById("buy-date");
const sellDateSelect = document.getElementById("sell-date");
const fromDateSelect = document.getElementById("filter-from-date");
const toDateSelect = document.getElementById("filter-to-date");
const filterButton = document.getElementById("filter-by-date");
const tableBody = document.querySelector("tbody");
const fetchButton = document.getElementById("fetch-symbol");
const symbolOptions = document.getElementById("fetch-symbol-options");
const calculateButton = document.getElementById("calculate");
const numberOfShares = document.getElementById("numberOfShares");
const buyPrice = document.getElementById("buy-price");
const sellPrice = document.getElementById("sell-price");
const results = document.getElementById("results");
const cursor = document.querySelector(".cursor");

// Function to display stock data in the table
function displayStockData(data, action = 0) {
  // Clear the existing rows
  tableBody.innerHTML = "";

  console.log(action);

  if (action <= 0) {
    //
    buyDateSelect.innerHTML = "";
    sellDateSelect.innerHTML = "";
    //
    fromDateSelect.innerHTML = "";
    toDateSelect.innerHTML = "";
  }

  let prevBuyButton;
  let prevSellButton;
  data.forEach((rowData, index) => {
    if (action <= 0) {
      //
      buyDateSelect.add(new Option(rowData.Date, rowData.Date));
      sellDateSelect.add(new Option(rowData.Date, rowData.Date));
      //
      fromDateSelect.add(new Option(rowData.Date, rowData.Date));
      toDateSelect.add(new Option(rowData.Date, rowData.Date));
    }

    // create the data table
    const tr = createTableRow(rowData);
    tableBody.appendChild(tr);

    const buyButton = tr.querySelector("button:nth-of-type(1)");
    buyButton.id = `buy-${index}`;
    const sellButton = tr.querySelector("button:nth-of-type(2)");
    sellButton.id = `sell-${index}`;

    buyButton.addEventListener("click", () => {
      //check if we have a sell button selected and if selected check if date is lesser than the current btn date clicked
      for (let i = 0; i < buyDateSelect.options.length; i++) {
        if (buyDateSelect.options[i].value === rowData.Date) {
          buyDateSelect.selectedIndex = i;
          break;
        }
      }
      if (prevBuyButton) {
        prevBuyButton.style = "";
      }
      document.getElementById(`buy-${index}`).style.backgroundColor = "#2b2b2b";
      document.getElementById(`buy-${index}`).style.color = "#f0f0f0";
      document.getElementById(`buy-${index}`).style.boxShadow =
        "0 0 5px 2px rgba(0, 255, 0, 0.5)";
      prevBuyButton = document.getElementById(`buy-${index}`); // Update the previously clicked buy button
    });

    sellButton.addEventListener("click", () => {
      //check if we have a buy button selected and if selected check if date is greater than the current btn date clicked
      if (prevSellButton) {
        prevSellButton.style = "";
      }
      for (let i = 0; i < sellDateSelect.options.length; i++) {
        if (sellDateSelect.options[i].value === rowData.Date) {
          sellDateSelect.selectedIndex = i;
          break;
        }
      }
      document.getElementById(`sell-${index}`).style.backgroundColor =
        "#2b2b2b";
      document.getElementById(`sell-${index}`).style.color = "#f0f0f0";
      document.getElementById(`sell-${index}`).style.boxShadow =
        "0 0 5px 2px rgba(255, 0, 0, 0.5)";
      prevSellButton = document.getElementById(`sell-${index}`);
    });
  });
}

const filterDataByDate = (data, startDate, endDate) => {
  const filteredData = data.filter((item) => {
    const itemDate = Date.parse(item.Date);
    const startDateMS = Date.parse(startDate);
    const endDateMS = Date.parse(endDate);
    return itemDate >= startDateMS && itemDate <= endDateMS;
  });

  return filteredData;
};

// This function takes in an array of stock data, a buy date, a buy price, a sell date,
// a sell price, and the number of shares bought/sold, and calculates the profit/loss.

function calculateProfit(
  data,
  buyDate,
  buyPrice,
  sellDate,
  sellPrice,
  noShares
) {
  // Find the index of the buy and sell dates in the data array.
  const buyIndex = data.findIndex((d) => d.Date === buyDate);
  const sellIndex = data.findIndex((d) => d.Date === sellDate);

  // Get the buy and sell prices from the data array.
  const buyPriceValue = Number(data[buyIndex][buyPrice]);
  const sellPriceValue = Number(data[sellIndex][sellPrice]);

  // Calculate the total buy and sell prices by multiplying the price by the number of shares.
  const totalBuyPrice = buyPriceValue * noShares;
  const totalSellPrice = sellPriceValue * noShares;

  // Calculate the profit/loss by subtracting the total buy price from the total sell price.
  const profitLoss = totalSellPrice - totalBuyPrice;

  // Return the profit/loss.
  return [buyPriceValue, sellPriceValue, profitLoss];
}

calculateButton.addEventListener("click", () => {
  let response = calculateProfit(
    data.data,
    buyDateSelect.value,
    buyPrice.value,
    sellDateSelect.value,
    sellPrice.value,
    numberOfShares.value
  );

  results.innerHTML = "";

  const text = `Assuming the purchase date is ${buyDateSelect.value} and the price is $${response[0]}, and the selling date is ${sellDateSelect.value} and the price is $${response[1]}, the profit would be $${response[2]}.`;
  let i = 0;

  function typeWriter() {
    if (i < text.length) {
      results.innerHTML += text.charAt(i);
      i++;
      setTimeout(typeWriter, 20);
    } else {
      cursor.style.display = "none"; // hide cursor when typing is complete
    }
  }

  setTimeout(typeWriter, 50);

  // toggle cursor visibility every 500ms
  setInterval(() => {
    cursor.style.display =
      cursor.style.display === "none" ? "inline-block" : "none";
  }, 500);
});

filterButton.addEventListener("click", () => {
  const selectedFromDate = fromDateSelect.value;
  const selectedToDate = toDateSelect.value;
  const filteredData = filterDataByDate(
    data.data,
    selectedFromDate,
    selectedToDate
  );
  displayStockData(filteredData, 1);
});

fetchButton.addEventListener("click", async () => {
  const symbol = symbolOptions.value;
  data = await fetchStockData(symbol);
  displayStockData(data.data);
});

document.addEventListener("DOMContentLoaded", async () => {
  data = await fetchStockData("AAPL");
  displayStockData(data.data);
});
