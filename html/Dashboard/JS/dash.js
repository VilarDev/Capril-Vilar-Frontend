// Busca dados da cabra pelo número de registro digitado
async function fetchGoatData(registrationNumber) {
    console.log("Fazendo fetch para:", registrationNumber);
    try {
        const response = await fetch(`http://127.0.0.1:8080/goats/${registrationNumber}`);
        console.log("Status da resposta:", response.status);
        if (!response.ok) {
            const errorBody = await response.text();
            console.error("Erro na resposta do servidor:", response.status, errorBody);
            alert(`Cabra não encontrada (Status: ${response.status})`);
            document.querySelector(".goat-card").style.display = "none";
            return;
        }

        const goat = await response.json();
        console.log("Dados da cabra recebidos:", goat);

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
    } catch (error) {
        console.error("Erro ao buscar cabra:", error);
        alert("Cabra não encontrada ou erro de conexão.");
        document.querySelector(".goat-card").style.display = "none";
    }
}

// Inicialização da página
window.onload = () => {
    document.querySelector(".goat-card").style.display = "none";

    // Ação ao clicar no botão 🔍
    document.getElementById("search-button").addEventListener("click", () => {
        const reg = document.getElementById("search-input").value.trim();
        console.log("Buscando registro:", reg);
        if (reg) {
            fetchGoatData(reg);
        }
    });

    // Ação ao pressionar Enter no campo
    document.getElementById("search-input").addEventListener("keyup", (event) => {
        if (event.key === "Enter") {
            document.getElementById("search-button").click();
        }
    });
};