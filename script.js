function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
    document.getElementById("user-location").innerText = "Geolocation is not supported by this browser.";
  }
}
function showPosition(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  document.getElementById("user-location").innerText = `Your Location: Latitude ${lat.toFixed(5)}, Longitude ${lon.toFixed(5)}`;
}
function showError(error) {
  let msg = "";
  switch(error.code) {
    case error.PERMISSION_DENIED:
      msg = "User denied the request for Geolocation.";
      break;
    case error.POSITION_UNAVAILABLE:
      msg = "Location information is unavailable.";
      break;
    case error.TIMEOUT:
      msg = "The request to get user location timed out.";
      break;
    default:
      msg = "An unknown error occurred.";
  }
  document.getElementById("user-location").innerText = msg;
}