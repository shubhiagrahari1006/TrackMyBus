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
