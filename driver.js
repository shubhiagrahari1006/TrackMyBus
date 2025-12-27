<<<<<<< HEAD
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
=======
function updateStatus() {
  const route = document.getElementById("route").value;
  const stop = document.getElementById("stop").value;
  const time = document.getElementById("time").value;
  const seats = Number(document.getElementById("seats").value);

  database.ref("bus/bus1").set({
    route: route,
    currentStop: stop,
    arrivalTime: time,
    seats: seats,
    status: "Arrived",
    lastUpdated: Date.now()
  });

  document.getElementById("status").innerText =
    "✔ Data updated successfully";
}
>>>>>>> 1b14f220eae89373b3086d4fb1ccb908998987cc
