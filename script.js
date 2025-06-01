// Location Detection
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

// Newsletter Modal
document.addEventListener('DOMContentLoaded', function() {
  const openNewsletter = document.getElementById('open-newsletter');
  const closeNewsletter = document.getElementById('close-newsletter');
  const newsletterModal = document.getElementById('newsletter-modal');
  if(openNewsletter && closeNewsletter && newsletterModal){
    openNewsletter.onclick = () => newsletterModal.style.display = 'flex';
    closeNewsletter.onclick = () => newsletterModal.style.display = 'none';
    window.onclick = e => {
      if(e.target === newsletterModal) newsletterModal.style.display = "none";
    }
  }

  // Newsletter AJAX
  const newsletterForm = document.getElementById('newsletter-form');
  if(newsletterForm){
    newsletterForm.onsubmit = async function(e){
      e.preventDefault();
      const status = document.getElementById('newsletter-status');
      status.textContent = "Submitting...";
      try {
        let data = new FormData(newsletterForm);
        await fetch(newsletterForm.action, { method: 'POST', body: data, headers: { 'Accept': 'application/json' }});
        status.textContent = "Subscribed! Check your inbox.";
        newsletterForm.reset();
      } catch {
        status.textContent = "Could not subscribe. Please try again.";
      }
    }
  }

  // Contact Form AJAX
  const contactForm = document.getElementById('contact-form');
  if(contactForm){
    contactForm.onsubmit = async function(e){
      e.preventDefault();
      const status = document.getElementById('form-status');
      status.textContent = "Sending...";
      try {
        let data = new FormData(contactForm);
        await fetch(contactForm.action, { method: 'POST', body: data, headers: { 'Accept': 'application/json' }});
        status.textContent = "Message sent! We will reply soon.";
        contactForm.reset();
      } catch {
        status.textContent = "Could not send. Please try again.";
      }
    }
  }
});