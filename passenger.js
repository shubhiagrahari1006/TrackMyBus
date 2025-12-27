const busRef = database.ref("bus/bus1");

busRef.on("value", (snapshot) => {
  if (!snapshot.exists()) return;

  const bus = snapshot.val();

  // Basic info
  document.getElementById("route").innerText = bus.route || "-";
  document.getElementById("stop").innerText = bus.currentStop || "-";
  document.getElementById("time").innerText = bus.arrivalTime || "-";
  document.getElementById("seats").innerText = bus.seats ?? "-";

  // Timeline logic
  const stops = ["Mumbai", "Surat", "Vadodara", "Delhi"];
  stops.forEach(stop => {
    const el = document.getElementById(stop);
    if (el) el.classList.remove("active");
  });

  if (bus.currentStop && document.getElementById(bus.currentStop)) {
    document.getElementById(bus.currentStop).classList.add("active");
  }

  // Last updated logic
  if (bus.lastUpdated) {
    const diff = Date.now() - bus.lastUpdated;
    let text = "Just now";

    if (diff > 60000) {
      const mins = Math.floor(diff / 60000);
      text = `${mins} min ago`;
    }

    document.getElementById("lastUpdated").innerText =
      "Last updated: " + text;
  }
});
