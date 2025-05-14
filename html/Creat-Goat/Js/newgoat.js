document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("cadastroCabraForm");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const goat = {
      registrationNumber: document.getElementById("registrationNumber").value.trim(),
      name: document.getElementById("name").value.trim(),
      gender: document.getElementById("gender").value,
      breed: document.getElementById("breed").value,
      color: document.getElementById("color").value.trim(),
      birthDate: document.getElementById("birthDate").value,
      status: document.getElementById("status").value,
      tod: document.getElementById("tod").value.trim(),
      toe: document.getElementById("toe").value.trim(),
      category: document.getElementById("category").value.trim(),
      fatherRegistrationNumber: document.getElementById("fatherRegistrationNumber").value.trim(),
      motherRegistrationNumber: document.getElementById("motherRegistrationNumber").value.trim(),
      farmId: parseInt(document.getElementById("farmId").value),
      ownerId: parseInt(document.getElementById("ownerId").value)
    };

    try {
      const response = await fetch("http://127.0.0.1:8080/goats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(goat)
      });

      if (!response.ok) throw new Error("Erro ao cadastrar cabra");

      alert("Cabra cadastrada com sucesso!");
      form.reset();
    } catch (error) {
      console.error(error);
      alert("Erro ao salvar a cabra. Verifique os dados e tente novamente.");
    }
  });
});
