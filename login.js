auth.onAuthStateChanged(user => {
  if (!user) {
    window.location.href = "login.html";
  }
});
function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      window.location.href = "driver.html";
    })
    .catch(error => {
      document.getElementById("msg").innerText = error.message;
    });
}
