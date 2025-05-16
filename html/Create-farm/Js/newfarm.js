// Adiciona dinamicamente um novo campo de ID de telefone
function addPhoneIdField() {
    const container = document.getElementById("phones-container");

    const group = document.createElement("div");
    group.className = "phone-group";

    group.innerHTML = `
        <input type="number" name="phoneId" placeholder="ID do Telefone" required />
        <button type="button" class="btn-secondary btn-remove">Remover</button>
    `;

    // Botão de remover
    group.querySelector(".btn-remove").addEventListener("click", () => {
        container.removeChild(group);
    });

    container.appendChild(group);
}

// Envia os dados para o backend
async function cadastrarFazenda(event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const tod = document.getElementById("tod").value.trim();
    const ownerId = parseInt(document.getElementById("ownerId").value);
    const addressId = parseInt(document.getElementById("addressId").value);

    const payload = {
        name,
        tod,
        ownerId,
        addressId
    };

    console.log("Payload sendo enviado:", payload); // Para verificar os dados antes do envio

    try {
        const response = await fetch("http://127.0.0.1:8080/goatfarms", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const erro = await response.text();
            throw new Error("Erro ao cadastrar fazenda: " + erro);
        }

        alert("Fazenda cadastrada com sucesso!");
        document.getElementById("farm-form").reset();
        const phonesContainer = document.getElementById("phones-container");
        if (phonesContainer) {
            phonesContainer.innerHTML = ""; // limpa campos de telefone, se existirem
        }
    } catch (error) {
        console.error("Erro ao cadastrar fazenda:", error);
        alert("Falha ao cadastrar fazenda.");
    }
}

// Inicializa os eventos
window.onload = () => {
    const addPhoneBtn = document.getElementById("add-phone-btn");
    if (addPhoneBtn) {
        addPhoneBtn.addEventListener("click", addPhoneIdField);
    }
    document.getElementById("farm-form").addEventListener("submit", cadastrarFazenda);
};