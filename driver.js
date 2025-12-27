const busRef = database.ref("bus/bus1");

function updateBus() {
  console.log("Update button clicked"); // 🔴 VERY IMPORTANT

  const route = document.getElementById("routeInput").value;
  const currentStop = document.getElementById("stopSelect").value;
  const arrivalTime = document.getElementById("timeInput").value;
  const seats = Number(document.getElementById("seatsInput").value);

  console.log("Sending data:", {
    route,
    currentStop,
    arrivalTime,
    seats
  });

  busRef.set({
    route,
    currentStop,
    arrivalTime,
    seats,
    lastUpdated: Date.now()
  })
  .then(() => {
    document.getElementById("status").innerText = "✔ Updated successfully";
    console.log("Firebase update SUCCESS");
  })
  .catch(err => {
    document.getElementById("status").innerText = "❌ Firebase error";
    console.error("Firebase error:", err);
  });
}
