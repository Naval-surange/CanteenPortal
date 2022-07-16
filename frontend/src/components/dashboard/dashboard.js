export default function DashBoard() {
  if (localStorage.getItem("token") === null) {
    window.location.href = "/login";
  } else {
    if (localStorage.getItem("userType") === "buyer") {
      window.location.href = "/userdashboard";
    } else if (localStorage.getItem("userType") === "vendor") {
      window.location.href = "/vendordashboard";
    } else {
      window.location.href = "/login";
    }
  }
}
