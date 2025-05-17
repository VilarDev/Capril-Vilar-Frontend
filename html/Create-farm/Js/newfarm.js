// newfarm.js - Gerencia o cadastro completo da fazenda e entidades relacionadas

let ownerId = null;
let addressId = null;
let phoneIds = [];

// ==================== Proprietário ====================
document.getElementById("saveOwner").addEventListener("click", async () => {
  const body = {
    name: document.getElementById("ownerName").value,
    cpf: document.getElementById("ownerCpf").value,
    email: document.getElementById("ownerEmail").value
  };

  try {
    const res = await fetch("http://127.0.0.1:8080/owners", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
    const data = await res.json();
    ownerId = data.id;
    localStorage.setItem("ownerId", ownerId);
    alert("Proprietário cadastrado com sucesso!");
  } catch (e) {
    console.error(e);
    alert("Erro ao cadastrar proprietário.");
  }
});

// ==================== Endereço ====================
document.getElementById("saveAddress").addEventListener("click", async () => {
  if (!ownerId) {
    alert("Cadastre o proprietário antes do endereço.");
    return;
  }

  const body = {
    street: document.getElementById("street").value,
    neighborhood: document.getElementById("neighborhood").value,
    city: document.getElementById("city").value,
    state: document.getElementById("state").value,
    postalCode: document.getElementById("postalCode").value,
    country: document.getElementById("country").value,
    ownerId: ownerId
  };

  try {
    const res = await fetch("http://127.0.0.1:8080/address", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
    const data = await res.json();
    addressId = data.id;
    localStorage.setItem("addressId", addressId);
    alert("Endereço cadastrado com sucesso!");
  } catch (e) {
    console.error(e);
    alert("Erro ao cadastrar endereço.");
  }
});

// ==================== Telefones ====================
document.getElementById("addPhone").addEventListener("click", async () => {
  const goatFarmId = localStorage.getItem("goatFarmId");

  if (!goatFarmId) {
    alert("Cadastre a fazenda antes de adicionar telefones.");
    return;
  }

  const body = {
    ddd: document.getElementById("ddd").value,
    number: document.getElementById("numero").value,
    goatFarmId: goatFarmId
  };

  try {
    const res = await fetch("http://127.0.0.1:8080/phones", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
    const data = await res.json();
    phoneIds.push(data.id);
    localStorage.setItem("phoneIds", JSON.stringify(phoneIds));

    const li = document.createElement("li");
    li.textContent = `(${body.ddd}) ${body.number}`;
    document.getElementById("phoneList").appendChild(li);
    alert("Telefone cadastrado com sucesso! Você pode adicionar outro ou finalizar.");

    // Limpa campos de telefone para novo input
    document.getElementById("ddd").value = "";
    document.getElementById("numero").value = "";
    document.getElementById("ddd").focus();

    // Mostra botão de finalização
    document.getElementById("finalizarCadastro").style.display = "block";
  } catch (e) {
    console.error(e);
    alert("Erro ao cadastrar telefone.");
  }
});

// ==================== Finalização manual ====================
document.getElementById("finalizarCadastro").addEventListener("click", () => {
  localStorage.clear();
  ownerId = null;
  addressId = null;
  phoneIds = [];

  document.getElementById("owner-form").reset();
  document.getElementById("address-form").reset();
  document.getElementById("farm-form").reset();
  document.getElementById("phone-form").reset();
  document.getElementById("phoneList").innerHTML = "";

  document.getElementById("saveFarm").disabled = true;
  document.getElementById("finalizarCadastro").style.display = "none";

  alert("Cadastro finalizado. Formulário limpo para novo registro.");
});

// ==================== Fazenda ====================
document.getElementById("farm-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  if (!ownerId || !addressId) {
    alert("Complete as etapas de proprietário e endereço antes de cadastrar a fazenda.");
    return;
  }

  const body = {
    name: document.getElementById("name").value,
    tod: document.getElementById("tod").value,
    ownerId: ownerId,
    addressId: addressId
  };

  try {
    const res = await fetch("http://127.0.0.1:8080/goatfarms", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });

    if (res.ok) {
      const data = await res.json();
      localStorage.setItem("goatFarmId", data.id);
      alert("Fazenda cadastrada com sucesso! Agora você pode cadastrar os telefones.");
    } else {
      const error = await res.json();
      alert("Erro ao cadastrar fazenda: " + (error.message || res.statusText));
    }
  } catch (e) {
    console.error(e);
    alert("Erro ao cadastrar fazenda.");
  }
});
