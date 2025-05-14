// dash.js COMPLETO COM SUPORTE AO FORMULÁRIO DE ADICIONAR EVENTO
let currentGoatRegistration = null;

// Busca dados da cabra pelo número de registro digitado
async function fetchGoatData(registrationNumber) {
    try {
        const response = await fetch(`http://127.0.0.1:8080/goats/${registrationNumber}`);
        if (!response.ok) throw new Error("Cabra não encontrada");

        const goat = await response.json();
        currentGoatRegistration = goat.registrationNumber;

        document.getElementById("goat-name").textContent = goat.name;
        document.getElementById("registration-number").textContent = goat.registrationNumber;
        document.getElementById("gender").textContent = goat.gender;
        document.getElementById("breed").textContent = goat.breed;
        document.getElementById("color").textContent = goat.color;
        document.getElementById("birth-date").textContent = goat.birthDate;
        document.getElementById("status").textContent = goat.status;
        document.getElementById("category").textContent = goat.category;
        document.getElementById("tod").textContent = goat.tod;
        document.getElementById("toe").textContent = goat.toe;
        document.getElementById("father-name").textContent = goat.fatherName;
        document.getElementById("father-reg").textContent = goat.fatherRegistrationNumber;
        document.getElementById("mother-name").textContent = goat.motherName;
        document.getElementById("mother-reg").textContent = goat.motherRegistrationNumber;
        document.getElementById("owner-name").textContent = goat.ownerName;
        document.getElementById("farm-name").textContent = goat.farmName;

        document.querySelector(".goat-card").style.display = "flex";
        document.getElementById("goat-details-section").style.display = "none";
    } catch (error) {
        console.error("Erro ao buscar cabra:", error);
        alert("Cabra não encontrada ou erro de conexão.");
        document.querySelector(".goat-card").style.display = "none";
    }
}

function showGenealogy() {
    document.getElementById("goat-details-section").style.display = "block";
    document.getElementById("genealogy-section").style.display = "block";
    document.getElementById("event-section").style.display = "none";
    document.getElementById("add-event-section").style.display = "none";
    if (currentGoatRegistration) {
        loadGenealogy(currentGoatRegistration);
    }
}

function toggleEvents() {
    document.getElementById("goat-details-section").style.display = "block";
    document.getElementById("genealogy-section").style.display = "none";
    document.getElementById("add-event-section").style.display = "none";
    document.getElementById("event-section").style.display = "block";
    if (currentGoatRegistration) {
        loadEvents(currentGoatRegistration);
    }
}

function toggleAddEvent() {
    document.getElementById("goat-details-section").style.display = "block";
    document.getElementById("genealogy-section").style.display = "none";
    document.getElementById("event-section").style.display = "none";
    document.getElementById("add-event-section").style.display = "block";
}

async function loadEvents(registrationNumber) {
    const type = document.getElementById("filter-event-type").value;
    const startDate = document.getElementById("filter-start-date").value;
    const endDate = document.getElementById("filter-end-date").value;

    let url = `http://127.0.0.1:8080/goats/${registrationNumber}/events`;
    const params = new URLSearchParams();

    if (type) params.append("eventType", type);
    if (startDate) params.append("startDate", startDate);
    if (endDate) params.append("endDate", endDate);

    if (params.toString()) {
        url += `?${params.toString()}`;
    }

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Erro ao buscar eventos");

        const data = await response.json();
        const events = data.content || [];

        const tbody = document.getElementById("event-list");
        tbody.innerHTML = "";

        if (events.length === 0) {
            tbody.innerHTML = `<tr><td colspan="6">Nenhum evento encontrado.</td></tr>`;
            return;
        }

        events.forEach(ev => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${ev.date}</td>
                <td>${ev.eventType}</td>
                <td>${ev.description}</td>
                <td>${ev.location || '-'}</td>
                <td>${ev.veterinarian || '-'}</td>
                <td>${ev.outcome || '-'}</td>
            `;
            tbody.appendChild(tr);
        });
    } catch (error) {
        console.error("Erro ao carregar eventos:", error);
        alert("Não foi possível carregar os eventos.");
    }
}

window.onload = () => {
    document.querySelector(".goat-card").style.display = "none";

    document.getElementById("search-button").addEventListener("click", () => {
        const reg = document.getElementById("search-input").value.trim();
        if (reg) fetchGoatData(reg);
    });

    document.getElementById("search-input").addEventListener("keyup", (event) => {
        if (event.key === "Enter") {
            document.getElementById("search-button").click();
        }
    });

    document.getElementById("filter-search-button")?.addEventListener("click", () => {
        if (currentGoatRegistration) {
            loadEvents(currentGoatRegistration);
        }
    });

    document.getElementById("event-form")?.addEventListener("submit", async (e) => {
        e.preventDefault();

        const eventType = document.getElementById("event-type").value;
        const date = document.getElementById("event-date").value;
        const description = document.getElementById("event-description").value;
        const location = document.getElementById("event-location").value;
        const veterinarian = document.getElementById("event-vet").value;
        const outcome = document.getElementById("event-outcome").value;

        if (!eventType || !date || !description) {
            alert("Preencha todos os campos obrigatórios.");
            return;
        }

        try {
            const response = await fetch(`http://127.0.0.1:8080/goats/${currentGoatRegistration}/events`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    eventType,
                    date,
                    description,
                    location,
                    veterinarian,
                    outcome
                }),
            });

            if (!response.ok) throw new Error("Erro ao salvar evento");

            alert("Evento cadastrado com sucesso!");
            document.getElementById("event-form").reset();
            toggleEvents(); // mostra a tabela atualizada
        } catch (err) {
            console.error(err);
            alert("Erro ao cadastrar evento.");
        }
    });
};