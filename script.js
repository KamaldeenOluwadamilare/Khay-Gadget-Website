// Preloader
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  preloader.style.display = 'none';
});

// WebGL Background with Three.js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('webgl-bg').appendChild(renderer.domElement);

// Stars
const starGeometry = new THREE.BufferGeometry();
const starMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.1 });
const stars = new Float32Array(5000 * 3);
for (let i = 0; i < stars.length; i += 3) {
  stars[i] = (Math.random() - 0.5) * 2000;
  stars[i + 1] = (Math.random() - 0.5) * 2000;
  stars[i + 2] = (Math.random() - 0.5) * 2000;
}
starGeometry.setAttribute('position', new THREE.BufferAttribute(stars, 3));
const starField = new THREE.Points(starGeometry, starMaterial);
scene.add(starField);

camera.position.z = 5;

function animate() {
  requestAnimationFrame(animate);
  starField.rotation.y += 0.001;
  renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

// GSAP Animations
gsap.from('.hero-content', { opacity: 0, y: 50, duration: 1, delay: 0.5 });
gsap.from('.service-card', { opacity: 0, y: 30, stagger: 0.2, duration: 0.8, scrollTrigger: '.services' });
gsap.from('.product-card', { opacity: 0, y: 30, stagger: 0.2, duration: 0.8, scrollTrigger: '.products' });
gsap.from('.testimonial-card', { opacity: 0, y: 30, stagger: 0.2, duration: 0.8, scrollTrigger: '.testimonials' });

// Hamburger Menu
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Theme Toggle
const themeToggle = document.querySelector('.theme-toggle');
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
  themeToggle.innerHTML = document.body.classList.contains('light-mode') ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
});

// Product Filters
const filterButtons = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    const filter = button.getAttribute('data-filter');
    productCards.forEach(card => {
      if (filter === 'all' || card.getAttribute('data-category') === filter) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// Location Detection
const locationBtn = document.getElementById('location-btn');
const locationOutput = document.getElementById('location-output');

if (locationBtn) {
  locationBtn.addEventListener('click', () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          locationOutput.innerHTML = `Your location: Latitude ${lat}, Longitude ${lon}`;
        },
        (error) => {
          locationOutput.innerHTML = 'Unable to retrieve location.';
          console.error(error);
        }
      );
    } else {
      locationOutput.innerHTML = 'Geolocation is not supported by your browser.';
    }
  });
}

// Voice Search
const voiceSearchBtn = document.querySelector('.voice-search');
if (voiceSearchBtn) {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (SpeechRecognition) {
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;

    voiceSearchBtn.addEventListener('click', () => {
      recognition.start();
      voiceSearchBtn.innerHTML = '<i class="fas fa-microphone" style="color: #ff6f00;"></i>';
    });

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript.toLowerCase();
      voiceSearchBtn.innerHTML = '<i class="fas fa-microphone"></i>';
      if (transcript.includes('laptop')) {
        window.location.href = 'laptop.html';
      } else if (transcript.includes('phone') || transcript.includes('iphone')) {
        window.location.href = 'phone.html';
      } else if (transcript.includes('accessories')) {
        window.location.href = 'accessories.html';
      } else {
        alert('Sorry, I didn’t understand. Try saying "laptops", "phones", or "accessories".');
      }
    };

    recognition.onerror = () => {
      voiceSearchBtn.innerHTML = '<i class="fas fa-microphone"></i>';
      alert('Voice search failed. Please try again.');
    };
  } else {
    voiceSearchBtn.style.display = 'none';
  }
}

// AI Chatbot
const chatToggle = document.querySelector('.chat-toggle');
const chatBox = document.getElementById('chat-box');
const chatClose = document.querySelector('.chat-close');
const chatBody = document.getElementById('chat-body');
const chatInput = document.getElementById('chat-input');
const chatSend = document.getElementById('chat-send');

chatToggle.addEventListener('click', () => {
  chatBox.classList.toggle('active');
});

chatClose.addEventListener('click', () => {
  chatBox.classList.remove('active');
});

chatSend.addEventListener('click', sendMessage);
chatInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') sendMessage();
});

function sendMessage() {
  const message = chatInput.value.trim();
  if (!message) return;

  // User message
  const userMsg = document.createElement('p');
  userMsg.textContent = `You: ${message}`;
  chatBody.appendChild(userMsg);

  // Bot response
  const botMsg = document.createElement('p');
  botMsg.textContent = `Bot: ${getBotResponse(message.toLowerCase())}`;
  chatBody.appendChild(botMsg);

  chatInput.value = '';
  chatBody.scrollTop = chatBody.scrollHeight;
}

function getBotResponse(message) {
  if (message.includes('hello') || message.includes('hi')) {
    return 'Hello! How can I assist you today?';
  } else if (message.includes('laptop')) {
    return 'We have a wide range of laptops! Check out our collection at <a href="laptop.html">Laptops</a>.';
  } else if (message.includes('phone') || message.includes('iphone')) {
    return 'Looking for an iPhone? See our full range at <a href="phone.html">Phones</a>.';
  } else if (message.includes('accessories')) {
    return 'We have great accessories for your gadgets! Visit <a href="accessories.html">Accessories</a>.';
  } else if (message.includes('buy') || message.includes('shop')) {
    return 'You can shop directly via WhatsApp! Click here: <a href="https://wa.me/message/XYJZJRXVXP5UD1">Shop Now</a>.';
  } else if (message.includes('repair')) {
    return 'We offer expert repair services. Contact us via WhatsApp to schedule: <a href="https://wa.me/+2349070566797">Contact Us</a>.';
  } else {
    return 'I’m not sure how to help with that. Try asking about laptops, phones, accessories, or repairs!';
  }
}

// PWA Registration
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('service-worker.js')
      .then(reg => console.log('Service Worker registered'))
      .catch(err => console.error('Service Worker registration failed:', err));
  });
}