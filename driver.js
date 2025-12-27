function updateStatus() {
  const route = document.getElementById("route").value;
  const stop = document.getElementById("stop").value;
  const time = document.getElementById("time").value;
  const seats = document.getElementById("seats").value;

  database.ref("bus/bus1").update({
    route: route,
    currentStop: stop,   // 👈 ab koi bhi stop kaam karega
    arrivalTime: time,
    seats: seats,
    status: "Arrived",
    lastUpdated: Date.now()
  });

  document.getElementById("status").innerText =
    "Updated successfully!";
}
