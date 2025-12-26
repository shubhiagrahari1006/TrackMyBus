database.ref("bus/bus1").on("value", (snapshot) => {
  const bus = snapshot.val();
  if (!bus) return;

  // Basic info
  document.getElementById("route").innerText = bus.route;
  document.getElementById("time").innerText = bus.arrivalTime;
  document.getElementById("seats").innerText = bus.seats;

  // Timeline logic
  const stops = ["Mumbai", "Surat", "Vadodara", "Delhi"];

  stops.forEach(stop => {
    document.getElementById(stop).classList.remove("active");
  });

  if (bus.currentStop && document.getElementById(bus.currentStop)) {
    document.getElementById(bus.currentStop).classList.add("active");
  }

  // Last updated time
  document.getElementById("lastUpdated").innerText =
    "Last updated: " + new Date(bus.lastUpdated).toLocaleTimeString();
});
