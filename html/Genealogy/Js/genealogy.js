async function showGenealogy() {
  const registrationNumber = document.getElementById("registration-number").textContent;
  if (!registrationNumber) {
    alert("Nenhuma cabra carregada.");
    return;
  }

  try {
    const response = await fetch(`http://127.0.0.1:8080/genealogies/${registrationNumber}`);
    if (!response.ok) {
      throw new Error("Erro ao buscar genealogia");
    }

    const data = await response.json();

    const chart_config = {
      chart: {
        container: "#genealogy-tree",
        connectors: {
          type: "curve",
          style: {
            "stroke-width": 0.6,
            "stroke": "#aaa"
          }
        },
        node: {
          HTMLclass: "gene-node"
        },
        levelSeparation: 20,
        siblingSeparation: 15,
        subTeeSeparation: 10,
        nodeAlign: "BOTTOM"
      },
      nodeStructure: {
        text: {
          name: data.goatName,
          title: `Registro: ${data.goatRegistration}`
        },
        children: buildGenealogyNodes(data)
      }
    };

    document.getElementById("goat-details-section").style.display = "block";
    new Treant(chart_config);
  } catch (error) {
    console.error("Erro ao montar genealogia:", error);
    alert("Não foi possível carregar a árvore genealógica.");
  }
}

function buildGenealogyNodes(data) {
  return [
    {
      text: {
        name: data.fatherName,
        title: `Registro: ${data.fatherRegistration}`,
        desc: "Pai"
      },
      children: [
        {
          text: {
            name: data.paternalGrandfatherName,
            title: `Registro: ${data.paternalGrandfatherRegistration}`,
            desc: "Avô Paterno"
          },
          children: [
            {
              text: {
                name: data.paternalGreatGrandfather1Name,
                title: `Registro: ${data.paternalGreatGrandfather1Registration}`,
                desc: "Bisavô Paterno"
              }
            },
            {
              text: {
                name: data.paternalGreatGrandmother1Name,
                title: `Registro: ${data.paternalGreatGrandmother1Registration}`,
                desc: "Bisavó Paterna"
              }
            }
          ]
        },
        {
          text: {
            name: data.paternalGrandmotherName,
            title: `Registro: ${data.paternalGrandmotherRegistration}`,
            desc: "Avó Paterna"
          },
          children: [
            {
              text: {
                name: data.paternalGreatGrandfather2Name,
                title: `Registro: ${data.paternalGreatGrandfather2Registration}`,
                desc: "Bisavô Paterno"
              }
            },
            {
              text: {
                name: data.paternalGreatGrandmother2Name,
                title: `Registro: ${data.paternalGreatGrandmother2Registration}`,
                desc: "Bisavó Paterna"
              }
            }
          ]
        }
      ]
    },
    {
      text: {
        name: data.motherName,
        title: `Registro: ${data.motherRegistration}`,
        desc: "Mãe"
      },
      children: [
        {
          text: {
            name: data.maternalGrandfatherName,
            title: `Registro: ${data.maternalGrandfatherRegistration}`,
            desc: "Avô Materno"
          },
          children: [
            {
              text: {
                name: data.maternalGreatGrandfather1Name,
                title: `Registro: ${data.maternalGreatGrandfather1Registration}`,
                desc: "Bisavô Materno"
              }
            },
            {
              text: {
                name: data.maternalGreatGrandmother1Name,
                title: `Registro: ${data.maternalGreatGrandmother1Registration}`,
                desc: "Bisavó Materna"
              }
            }
          ]
        },
        {
          text: {
            name: data.maternalGrandmotherName,
            title: `Registro: ${data.maternalGrandmotherRegistration}`,
            desc: "Avó Materna"
          },
          children: [
            {
              text: {
                name: data.maternalGreatGrandfather2Name,
                title: `Registro: ${data.maternalGreatGrandfather2Registration}`,
                desc: "Bisavô Materno"
              }
            },
            {
              text: {
                name: data.maternalGreatGrandmother2Name,
                title: `Registro: ${data.maternalGreatGrandmother2Registration}`,
                desc: "Bisavó Materna"
              }
            }
          ]
        }
      ]
    }
  ];
}
