const busRef = database.ref("bus/bus1");

function updateBus() {
  const route = document.getElementById("routeInput").value;
  const currentStop = document.getElementById("stopSelect").value;
  const arrivalTime = document.getElementById("timeInput").value;
  const seats = Number(document.getElementById("seatsInput").value);

  busRef.set({
    route: route,
    currentStop: currentStop,
    arrivalTime: arrivalTime,
    seats: seats,
    lastUpdated: Date.now()
  }).then(() => {
    document.getElementById("status").innerText =
      "✔ Updated successfully";
  }).catch(err => {
    document.getElementById("status").innerText =
      "❌ Error updating data";
    console.error(err);
  });
}
