// ===============================
// CONFIGURACIÓN PRINCIPAL
// ===============================
const FIXED_YEAR = 2026;
const FIXED_MONTH = 3; // Abril (0=Enero, 3=Abril)

// ===============================
// GENERAR DÍAS DEL MES AUTOMÁTICAMENTE
// ===============================
function generateMonth(year, month) {
  let days = [];
  let date = new Date(year, month, 1);

  while (date.getMonth() === month) {
    let weekday = date.toLocaleDateString("es-MX", { weekday: "long" });
    let dayNumber = date.getDate();

    days.push({
      date: date.toISOString().split("T")[0],
      weekday: weekday.charAt(0).toUpperCase() + weekday.slice(1),
      dayNumber: dayNumber,
      disabled: weekday.toLowerCase() === "lunes",
      elders: null,
      hermanas: null
    });

    date.setDate(date.getDate() + 1);
  }

  return days;
}

let monthDays = generateMonth(FIXED_YEAR, FIXED_MONTH);

// ===============================
// RENDERIZAR VISTA DE LISTA
// ===============================
function renderList() {
  const listView = document.getElementById("listView");
  listView.innerHTML = "";

  monthDays.forEach(day => {
    let block = document.createElement("div");
    block.className = "day-block";

    if (day.disabled) block.classList.add("monday");

    block.innerHTML = `
      <h3>${day.weekday} ${day.dayNumber}</h3>

      <div class="slot">
        <strong>Élderes:</strong> 
        ${day.elders ? day.elders : (day.disabled ? "No disponible" : `<button onclick="openSignup('${day.date}','elders')">Apuntarse</button>`)}
      </div>

      <div class="slot">
        <strong>Hermanas:</strong> 
        ${day.hermanas ? day.hermanas : (day.disabled ? "No disponible" : `<button onclick="openSignup('${day.date}','hermanas')">Apuntarse</button>`)}
      </div>
    `;

    listView.appendChild(block);
  });
}

// ===============================
// RENDERIZAR VISTA DE CALENDARIO
// ===============================
function renderCalendar() {
  const calendarView = document.getElementById("calendarView");
  calendarView.innerHTML = "";

  monthDays.forEach(day => {
    let div = document.createElement("div");
    div.className = "day-block";

    if (day.disabled) div.classList.add("monday");

    div.innerHTML = `
      <h3>${day.weekday} ${day.dayNumber}</h3>
      <p>Élderes: ${day.elders ? day.elders : "Disponible"}</p>
      <p>Hermanas: ${day.hermanas ? day.hermanas : "Disponible"}</p>
    `;

    calendarView.appendChild(div);
  });
}

// ===============================
// MANEJO DEL MODAL DE REGISTRO
// ===============================
let selectedDate = null;
let selectedSlot = null;

function openSignup(date, slot) {
  selectedDate = date;
  selectedSlot = slot;
  document.getElementById("signupModal").style.display = "block";
}

document.getElementById("closeModal").onclick = () => {
  document.getElementById("signupModal").style.display = "none";
};

document.getElementById("saveSignup").onclick = () => {
  let name = document.getElementById("famName").value;

  if (!name) {
    alert("Por favor ingrese un nombre.");
    return;
  }

  let day = monthDays.find(d => d.date === selectedDate);
  day[selectedSlot] = name;

  document.getElementById("signupModal").style.display = "none";
  renderList();
  renderCalendar();
};

// ===============================
// BOTONES DE NAVEGACIÓN
// ===============================
document.getElementById("viewList").onclick = () => {
  document.getElementById("listView").style.display = "block";
  document.getElementById("calendarView").style.display = "none";
};

document.getElementById("viewCalendar").onclick = () => {
  document.getElementById("listView").style.display = "none";
  document.getElementById("calendarView").style.display = "block";
};

// ===============================
// INICIALIZACIÓN
// ===============================
renderList();
renderCalendar();
document.getElementById("calendarView").style.display = "none";
