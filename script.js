//your JS code here. If required.
document.addEventListener("DOMContentLoaded", () => {
  const tbody = document.getElementById("output");

  // Add the default "Loading..." row
  const loadingRow = document.createElement("tr");
  loadingRow.innerHTML = '<td colspan="2">Loading...</td>';
  tbody.appendChild(loadingRow);

  // Function to create a promise that resolves after a random delay
  const createPromise = (name) => {
    return new Promise((resolve) => {
      const delay = Math.random() * 2 + 1; // Random delay between 1 and 3 seconds
      setTimeout(() => {
        resolve({ name, time: delay.toFixed(3) });
      }, delay * 1000);
    });
  };

  // Create 3 promises
  const promises = [
    createPromise("Promise 1"),
    createPromise("Promise 2"),
    createPromise("Promise 3"),
  ];

  // Wait for all promises to resolve using Promise.all
  Promise.all(promises).then((results) => {
    // Remove the loading row
    tbody.innerHTML = "";

    // Populate the table with resolved promise results
    results.forEach((result) => {
      const row = document.createElement("tr");
      row.innerHTML = `<td>${result.name}</td><td>${result.time}</td>`;
      tbody.appendChild(row);
    });

    // Calculate the total time (max time of all promises)
    const totalTime = Math.max(...results.map((result) => parseFloat(result.time)));
    const totalRow = document.createElement("tr");
    totalRow.innerHTML = `<td>Total</td><td>${totalTime.toFixed(3)}</td>`;
    tbody.appendChild(totalRow);
  });
});
