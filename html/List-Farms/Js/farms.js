let currentPage = 0;
const pageSize = 12;

window.onload = () => {
  loadFarmsAppend();

  const verMaisBtn = document.getElementById("ver-mais-btn");
  verMaisBtn.addEventListener("click", loadFarmsAppend);

  const searchBtn = document.getElementById("searchFarmBtn");
  if (searchBtn) {
    searchBtn.addEventListener("click", () => {
      currentPage = 0;
      document.getElementById("farmList").innerHTML = "";
      loadFarmsAppend();
    });
  }
};

async function loadFarmsAppend() {
  const input = document.getElementById("searchFarmInput");
  const name = input ? input.value.trim() : "";

  const url = `http://127.0.0.1:8080/goatfarms/name?name=${encodeURIComponent(name)}&page=${currentPage}&size=${pageSize}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Erro ao buscar fazendas");

    const data = await response.json();
    console.log("Fazendas recebidas:", data); // 👈 debug útil

    if (!data.content || data.content.length === 0) {
      if (currentPage === 0) {
        document.getElementById("farmList").innerHTML = "<p>Nenhuma fazenda encontrada.</p>";
      }
      document.getElementById("ver-mais-btn").style.display = "none";
      return;
    }

    renderFarms(data.content, true);
    currentPage++;

    const totalPages = data.page?.totalPages || 0;
    if (currentPage >= totalPages) {
      document.getElementById("ver-mais-btn").style.display = "none";
    }
  } catch (error) {
    console.error("Erro ao carregar fazendas:", error);
    alert("Não foi possível carregar os dados das fazendas.");
  }
}

function renderFarms(farms, append = false) {
  const container = document.getElementById("farmList");
  if (!append) container.innerHTML = "";

  farms.forEach(farm => {
    const div = document.createElement("div");
    div.className = "goat-card";

    const phones = farm.phones?.map(p => `(${p.ddd}) ${p.number}`).join(", ") || "-";

    div.innerHTML = `
      <div class="goat-info">
        <h3>${farm.name}</h3>
        <p><strong>TOD:</strong> ${farm.tod}</p>
        <p><strong>Proprietário:</strong> ${farm.ownerName}</p>
        <p><strong>Endereço:</strong> ${farm.street}, ${farm.district}, ${farm.city} - ${farm.state} (${farm.cep})</p>
        <p><strong>Telefones:</strong> ${phones}</p>
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
