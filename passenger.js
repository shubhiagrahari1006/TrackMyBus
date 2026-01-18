const busRef = database.ref("bus/bus1");

// 🔴 Live listener (auto updates)
busRef.on("value", snapshot => {
  if (!snapshot.exists()) {
    showOffline("No live data available");
    return;
  }

  updateUI(snapshot.val());
});

// 🔄 Manual refresh (Where is my train style)
document.getElementById("refreshBtn").addEventListener("click", () => {
  document.getElementById("lastUpdated").innerText = "Refreshing latest status...";
  busRef.once("value")
    .then(snapshot => {
      if (!snapshot.exists()) {
        showOffline("No live data available");
        return;
      }
      updateUI(snapshot.val(), true);
    })
    .catch(() => {
      showOffline("Unable to refresh. Check connection.");
    });
});

function updateUI(data, manual = false) {
  document.getElementById("offlineMsg").innerText = "";

  document.getElementById("route").innerText = data.route || "-";
  document.getElementById("stop").innerText = data.currentStop || "-";
  document.getElementById("time").innerText = data.arrivalTime || "-";
  document.getElementById("seats").innerText = data.seats ?? "-";

  const badge = document.getElementById("statusBadge");
  badge.className = "badge";

  if (data.status === "On Time") {
    badge.innerText = "On Time";
    badge.classList.add("on-time");
  } else if (data.status === "Delayed") {
    badge.innerText = "Delayed";
    badge.classList.add("delayed");
  } else if (data.status === "Full") {
    badge.innerText = "Full";
    badge.classList.add("full");
  } else {
    badge.innerText = "-";
  }

  if (data.lastUpdated) {
    const diff = Date.now() - data.lastUpdated;
    const mins = Math.floor(diff / 60000);
    document.getElementById("lastUpdated").innerText =
      manual || mins === 0
        ? "Last updated: just now"
        : `Last updated: ${mins} min ago`;
  }
}

function showOffline(msg) {
  document.getElementById("offlineMsg").innerText = msg;
}

// 🤖 Gemini AI (demo-ready)
async function askAI() {
  const q = document.getElementById("aiQuestion").value;
  if (!q) return;

  document.getElementById("aiAnswer").innerText = "Thinking...";

  try {
    const res = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=YOUR_API_KEY",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: q }] }]
        })
      }
    );

    const data = await res.json();
    document.getElementById("aiAnswer").innerText =
      data.candidates[0].content.parts[0].text;
  } catch {
    document.getElementById("aiAnswer").innerText =
      "AI service unavailable right now.";
  }
}
