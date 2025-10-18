// Language toggle (English/Hindi)
function setLanguage(lang) {
  document.querySelectorAll("[data-en]").forEach(el => {
    el.textContent = el.getAttribute(`data-${lang}`);
  });
}

// Voice recognition input
function startRecognition(fieldId) {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = 'hi-IN';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;
  recognition.start();

  recognition.onresult = (event) => {
    document.getElementById(fieldId).value = event.results[0][0].transcript;
  };
  recognition.onerror = (event) => {
    alert('Error: ' + event.error);
  };
}

// Save labour registration details in localStorage
document.addEventListener("DOMContentLoaded", () => {
  const labourForm = document.getElementById("labourForm");
  if (labourForm) {
    labourForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const labourData = {
        name: document.getElementById("name").value,
        trade: document.getElementById("trade").value,
        contact: document.getElementById("contact").value,
        area: document.getElementById("area").value,
        wage: document.getElementById("wage").value
      };
      localStorage.setItem("labourData", JSON.stringify(labourData));
      alert("Registration Successful! / पंजीकरण सफल!");
      window.location.href = "labour_dashboard.html";
    });
  }

  // Load data on dashboard
  const profileSection = document.getElementById("labourProfile");
  if (profileSection) {
    const storedData = localStorage.getItem("labourData");
    if (storedData) {
      const data = JSON.parse(storedData);
      document.getElementById("labourName").textContent = data.name;
      document.getElementById("labourTrade").textContent = data.trade;
      document.getElementById("labourArea").textContent = data.area;
      document.getElementById("labourWage").textContent = "₹ " + data.wage;
    }
  }
});
