/***********************
 * Firebase Reference
 ***********************/
const busRef = database.ref("bus/bus1");
let latestBusData = null;

/***********************
 * LIVE LISTENER
 ***********************/
busRef.on("value", snapshot => {
  if (!snapshot.exists()) {
    showOffline("No live data available");
    return;
  }

  latestBusData = snapshot.val();
  updateUI(latestBusData);
});

/***********************
 * MANUAL REFRESH BUTTON
 ***********************/
document.getElementById("refreshBtn").addEventListener("click", () => {
  document.getElementById("lastUpdated").innerText =
    "Refreshing latest status...";

  busRef
    .once("value")
    .then(snapshot => {
      if (!snapshot.exists()) {
        showOffline("No live data available");
        return;
      }

      latestBusData = snapshot.val();
      updateUI(latestBusData, true);
    })
    .catch(() => {
      showOffline("Unable to refresh. Check internet connection.");
    });
});

/***********************
 * UI UPDATE FUNCTION
 ***********************/
function updateUI(data, manual = false) {
  document.getElementById("offlineMsg").innerText = "";

  document.getElementById("route").innerText = data.route || "-";
  document.getElementById("stop").innerText = data.currentStop || "-";
  document.getElementById("time").innerText = data.arrivalTime || "-";
  document.getElementById("seats").innerText =
    data.seats !== undefined ? data.seats : "-";

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

/***********************
 * OFFLINE MESSAGE
 ***********************/
function showOffline(msg) {
  document.getElementById("offlineMsg").innerText = msg;
}

/***********************
 * 🤖 GEMINI AI (SMART VERSION)
 ***********************/
async function askAI() {
  const question = document.getElementById("aiQuestion").value;
  if (!question) return;

  document.getElementById("aiAnswer").innerText = "Thinking...";

  // Context from Firebase (very important for judges)
  const context = latestBusData
    ? `
Bus Route: ${latestBusData.route}
Current Stop: ${latestBusData.currentStop}
Arrival Time: ${latestBusData.arrivalTime}
Available Seats: ${latestBusData.seats}
Status: ${latestBusData.status}
`
    : "Bus data is currently unavailable.";

  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyB11Rxb8-P9y1y1cqIhFarDJa7VKxsBdTY",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `
You are a helpful bus tracking assistant.
Use the following bus information to answer clearly.

${context}

User question: ${question}
`
                }
              ]
            }
          ]
        })
      }
    );

    const data = await response.json();

    const aiText =
      data?.candidates?.[0]?.content?.parts?.[0]?.text;

    document.getElementById("aiAnswer").innerText =
      aiText || "Sorry, I couldn’t generate a response right now.";

  } catch (error) {
    document.getElementById("aiAnswer").innerText =
      "AI service unavailable. Please try again later.";
  }
}
