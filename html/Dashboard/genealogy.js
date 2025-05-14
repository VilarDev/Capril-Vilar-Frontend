function safe(text, fallback = "Desconhecido") {
  return text || fallback;
}

function makeNode(name, reg, desc) {
  return {
    text: {
      name: safe(name),
      title: `Registro: ${safe(reg, "-")}`,
      desc
    }
  };
}

function buildGenealogyNodes(data) {
  return [
    {
      ...makeNode(data.fatherName, data.fatherRegistration, "Pai"),
      children: [
        {
          ...makeNode(data.paternalGrandfatherName, data.paternalGrandfatherRegistration, "Avô Paterno"),
          children: [
            makeNode(data.paternalGreatGrandfather1Name, data.paternalGreatGrandfather1Registration, "Bisavô Paterno"),
            makeNode(data.paternalGreatGrandmother1Name, data.paternalGreatGrandmother1Registration, "Bisavó Paterna")
          ]
        },
        {
          ...makeNode(data.paternalGrandmotherName, data.paternalGrandmotherRegistration, "Avó Paterna"),
          children: [
            makeNode(data.paternalGreatGrandfather2Name, data.paternalGreatGrandfather2Registration, "Bisavô Paterno"),
            makeNode(data.paternalGreatGrandmother2Name, data.paternalGreatGrandmother2Registration, "Bisavó Paterna")
          ]
        }
      ]
    },
    {
      ...makeNode(data.motherName, data.motherRegistration, "Mãe"),
      children: [
        {
          ...makeNode(data.maternalGrandfatherName, data.maternalGrandfatherRegistration, "Avô Materno"),
          children: [
            makeNode(data.maternalGreatGrandfather1Name, data.maternalGreatGrandfather1Registration, "Bisavô Materno"),
            makeNode(data.maternalGreatGrandmother1Name, data.maternalGreatGrandmother1Registration, "Bisavó Materna")
          ]
        },
        {
          ...makeNode(data.maternalGrandmotherName, data.maternalGrandmotherRegistration, "Avó Materna"),
          children: [
            makeNode(data.maternalGreatGrandfather2Name, data.maternalGreatGrandfather2Registration, "Bisavô Materno"),
            makeNode(data.maternalGreatGrandmother2Name, data.maternalGreatGrandmother2Registration, "Bisavó Materna")
          ]
        }
      ]
    }
  ];
}

async function loadGenealogy(registrationNumber) {
  try {
    const response = await fetch(`http://127.0.0.1:8080/genealogies/${registrationNumber}`);
    if (!response.ok) throw new Error("Erro ao buscar genealogia");

    const data = await response.json();
    console.log("📊 Genealogia recebida:", data);

    const config = {
      chart: {
        container: "#genealogy-tree",
        connectors: {
          type: "curve",
          style: { "stroke-width": 0.6, stroke: "#aaa" }
        },
        node: { HTMLclass: "gene-node" },
        levelSeparation: 20,
        siblingSeparation: 15,
        subTeeSeparation: 10,
        nodeAlign: "BOTTOM"
      },
      nodeStructure: {
        text: {
          name: safe(data.goatName),
          title: `Registro: ${safe(data.goatRegistration, "-")}`
        },
        children: buildGenealogyNodes(data)
      }
    };

    document.getElementById("goat-details-section").style.display = "block";
    document.getElementById("genealogy-section").style.display = "block";
    document.getElementById("event-section").style.display = "none";
    document.getElementById("add-event-section").style.display = "none";
    document.getElementById("genealogy-tree").innerHTML = "";

    requestAnimationFrame(() => new Treant(config));

  } catch (err) {
    console.error("❌ Erro ao montar árvore:", err);
    alert("Erro ao carregar genealogia.");
  }
}
