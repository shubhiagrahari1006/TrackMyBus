<<<<<<< HEAD
const busRef = database.ref("bus/bus1");

busRef.on("value", (snapshot) => {
  if (!snapshot.exists()) return;

  const data = snapshot.val();

  document.getElementById("route").innerText = data.route || "-";
  document.getElementById("stop").innerText = data.currentStop || "-";
  document.getElementById("time").innerText = data.arrivalTime || "-";
  document.getElementById("seats").innerText = data.seats ?? "-";

  // ⏱ Last updated logic
  if (data.lastUpdated) {
    const diff = Date.now() - data.lastUpdated;

    let text = "Just now";
    if (diff > 60000) {
      const mins = Math.floor(diff / 60000);
      text = `${mins} min ago`;
    }

    document.getElementById("lastUpdated").innerText =
      "Last updated: " + text;
  }
});
=======
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
>>>>>>> 1b14f220eae89373b3086d4fb1ccb908998987cc
