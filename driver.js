const busRef = database.ref("bus/bus1");

document.getElementById("updateBtn").addEventListener("click", () => {
  const route = document.getElementById("routeInput").value;
  const currentStop = document.getElementById("stopSelect").value;
  const arrivalTime = document.getElementById("timeInput").value;
  const seats = Number(document.getElementById("seatsInput").value);

  busRef.set({
    route,
    currentStop,
    arrivalTime,
    seats,
    lastUpdated: Date.now()
  }).then(() => {
    document.getElementById("status").innerText =
      "✔ Bus data updated successfully";
  }).catch(err => {
    document.getElementById("status").innerText =
      "❌ Error updating data";
    console.error(err);
  });
});
