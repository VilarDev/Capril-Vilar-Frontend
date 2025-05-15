// Adiciona um novo campo de telefone no formulário
function adicionarTelefone() {
  const container = document.getElementById("phones-container");

  const grupo = document.createElement("div");
  grupo.className = "phone-group";

  grupo.innerHTML = `
    <input type="text" name="ddd" placeholder="DDD" maxlength="3" required />
    <input type="text" name="numero" placeholder="Número" required />
    <button type="button" class="btn-secondary btn-remove">Remover</button>
  `;

  // Botão de remover telefone
  grupo.querySelector(".btn-remove").addEventListener("click", () => {
    container.removeChild(grupo);
  });

  container.appendChild(grupo);
}

// Envia os dados da fazenda para o backend
async function cadastrarFazenda(event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const tod = document.getElementById("tod").value;
  const ownerId = document.getElementById("ownerId").value;
  const addressId = document.getElementById("addressId").value;

  const phones = [];
  document.querySelectorAll("#phones-container .phone-group").forEach(group => {
    const ddd = group.querySelector('input[name="ddd"]').value.trim();
    const numero = group.querySelector('input[name="numero"]').value.trim();
    if (ddd && numero) {
      phones.push({ ddd, numero });
    }
  });

  const data = { name, tod, ownerId, addressId, phones };

  try {
    const response = await fetch("http://127.0.0.1:8080/goatfarms", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      const erro = await response.text();
      throw new Error("Erro ao cadastrar fazenda: " + erro);
    }

    alert("Fazenda cadastrada com sucesso!");
    document.getElementById("form-fazenda").reset();
    document.getElementById("phones-container").innerHTML = "";

    // Reinsere dois campos de telefone após reset
    adicionarTelefone();
    adicionarTelefone();
  } catch (error) {
    console.error(error);
    alert("Falha ao cadastrar fazenda.");
  }
}

// Inicialização dos eventos
window.onload = () => {
  document.getElementById("add-phone-btn")?.addEventListener("click", adicionarTelefone);
  document.getElementById("form-fazenda")?.addEventListener("submit", cadastrarFazenda);

  // Adiciona dois campos de telefone por padrão
  adicionarTelefone();
  adicionarTelefone();
};
