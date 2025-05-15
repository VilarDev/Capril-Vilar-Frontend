// listGoat.js

let currentPage = 0;
const pageSize = 12;
const farmId = 1; // ID fixo da fazenda (pode vir de login no futuro)

window.onload = () => {
  loadGoatsAppend(); // Carrega a primeira página

  const verMaisBtn = document.getElementById("ver-mais-btn");
  verMaisBtn.addEventListener("click", loadGoatsAppend);
};

// Função para buscar e renderizar mais cabras
async function loadGoatsAppend() {
  const url = `http://127.0.0.1:8080/goatfarms/${farmId}/goats?page=${currentPage}&size=${pageSize}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Erro ao buscar cabras");

    const data = await response.json();
    renderGoats(data.content, true);
    currentPage++;

    if (currentPage >= data.page.totalPages) {
      document.getElementById("ver-mais-btn").style.display = "none";
    }
  } catch (error) {
    console.error("Erro ao carregar cabras:", error);
    alert("Não foi possível carregar os dados das cabras.");
  }
}

// Renderiza cards de cabras dinamicamente
function renderGoats(goats, append = false) {
  const container = document.querySelector(".goat-list");

  if (!append) container.innerHTML = "";

  goats.forEach(goat => {
    const div = document.createElement("div");
    div.className = "goat-card";

    div.innerHTML = `
      <div class="goat-info">
        <h3>${goat.name}</h3>
        <p><strong>Registro:</strong> ${goat.registrationNumber}</p>
        <p><strong>Sexo:</strong> ${goat.gender}</p>
        <p><strong>Raça:</strong> ${goat.breed}</p>
        <p><strong>Pelagem:</strong> ${goat.color}</p>
        <p><strong>Data de Nascimento:</strong> ${formatDate(goat.birthDate)}</p>
        <p><strong>Status:</strong> ${goat.status}</p>
        <p><strong>TOD:</strong> ${goat.tod || '-'}</p>
        <p><strong>TOE:</strong> ${goat.toe || '-'}</p>
        <p><strong>Categoria:</strong> ${goat.category || '-'}</p>
        <p><strong>Pai:</strong> ${goat.fatherName || '-'} — ${goat.fatherRegistrationNumber || '-'}</p>
        <p><strong>Mãe:</strong> ${goat.motherName || '-'} — ${goat.motherRegistrationNumber || '-'}</p>
        <p><strong>Proprietário:</strong> ${goat.ownerName}</p>
        <p><strong>Fazenda:</strong> ${goat.farmName}</p>
      </div>
      <div class="goat-actions">
        <button class="btn-secondary">Ver detalhes</button>
        <button class="btn-warning">Editar</button>
        <button class="btn-danger">Excluir</button>
      </div>
    `;

    container.appendChild(div);
  });
}

// Formata data no padrão brasileiro
function formatDate(dateStr) {
  if (!dateStr) return "-";
  const [year, month, day] = dateStr.split("-");
  return `${day}/${month}/${year}`;
}
