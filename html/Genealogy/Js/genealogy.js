function showGenealogy() {
  document.getElementById("goat-details-section").style.display = "block";

  const goatData = {
    goatName: "XEQUE V DO CAPRIL VILAR",
    goatRegistration: "1643218012",
    fatherName: "C.V.C SIGNOS PETROLEO",
    fatherRegistration: "1635717065",
    motherName: "NAIDE DO CRS",
    motherRegistration: "2114517012",
    paternalGrandfatherName: "PETRÓLEO CAPRIVAMA",
    paternalGrandfatherRegistration: "1422915618",
    paternalGrandmotherName: "BÉLGICA DA CAPRIVAMA",
    paternalGrandmotherRegistration: "1422913470",
    maternalGrandfatherName: "JOSA CAPRIMEL",
    maternalGrandfatherRegistration: "1650113018",
    maternalGrandmotherName: "PANTALONA DO CRS",
    maternalGrandmotherRegistration: "2114513061",
    paternalGreatGrandfather1Name: "BALOTELI DA CAPRIVAMA",
    paternalGreatGrandfather1Registration: "1422913451",
    paternalGreatGrandmother1Name: "COROA DA CAPRIVAMA",
    paternalGreatGrandmother1Registration: "1422913488",
    paternalGreatGrandfather2Name: "SHEREK SANRI",
    paternalGreatGrandfather2Registration: "1421308033",
    paternalGreatGrandmother2Name: "JUCELISE DO INLI",
    paternalGreatGrandmother2Registration: "1418510219",
    maternalGreatGrandfather1Name: "NATAL DO JACOMÉ",
    maternalGreatGrandfather1Registration: "1403110395",
    maternalGreatGrandmother1Name: "12018 CAPRIMEL",
    maternalGreatGrandmother1Registration: "1650112018",
    maternalGreatGrandfather2Name: "HERE DO ANGICANO",
    maternalGreatGrandfather2Registration: "2104406006",
    maternalGreatGrandmother2Name: "TOPÁZIO DO CRS",
    maternalGreatGrandmother2Registration: "2114510040"
  };

  const chart_config = {
    chart: {
      container: "#genealogy-tree",
      connectors: {
        type: "curve",
        style: {
          "stroke-width": 0.8,
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
        name: goatData.goatName,
        title: `Registro: ${goatData.goatRegistration}`
      },
      children: [
        {
          text: {
            name: goatData.fatherName,
            title: `Registro: ${goatData.fatherRegistration}`,
            desc: "Pai"
          },
          children: [
            {
              text: {
                name: goatData.paternalGrandfatherName,
                title: `Registro: ${goatData.paternalGrandfatherRegistration}`,
                desc: "Avô Paterno"
              },
              children: [
                {
                  text: {
                    name: goatData.paternalGreatGrandfather1Name,
                    title: `Registro: ${goatData.paternalGreatGrandfather1Registration}`,
                    desc: "Bisavô Paterno"
                  }
                },
                {
                  text: {
                    name: goatData.paternalGreatGrandmother1Name,
                    title: `Registro: ${goatData.paternalGreatGrandmother1Registration}`,
                    desc: "Bisavó Paterna"
                  }
                }
              ]
            },
            {
              text: {
                name: goatData.paternalGrandmotherName,
                title: `Registro: ${goatData.paternalGrandmotherRegistration}`,
                desc: "Avó Paterna"
              },
              children: [
                {
                  text: {
                    name: goatData.paternalGreatGrandfather2Name,
                    title: `Registro: ${goatData.paternalGreatGrandfather2Registration}`,
                    desc: "Bisavô Paterno"
                  }
                },
                {
                  text: {
                    name: goatData.paternalGreatGrandmother2Name,
                    title: `Registro: ${goatData.paternalGreatGrandmother2Registration}`,
                    desc: "Bisavó Paterna"
                  }
                }
              ]
            }
          ]
        },
        {
          text: {
            name: goatData.motherName,
            title: `Registro: ${goatData.motherRegistration}`,
            desc: "Mãe"
          },
          children: [
            {
              text: {
                name: goatData.maternalGrandfatherName,
                title: `Registro: ${goatData.maternalGrandfatherRegistration}`,
                desc: "Avô Materno"
              },
              children: [
                {
                  text: {
                    name: goatData.maternalGreatGrandfather1Name,
                    title: `Registro: ${goatData.maternalGreatGrandfather1Registration}`,
                    desc: "Bisavô Materno"
                  }
                },
                {
                  text: {
                    name: goatData.maternalGreatGrandmother1Name,
                    title: `Registro: ${goatData.maternalGreatGrandmother1Registration}`,
                    desc: "Bisavó Materna"
                  }
                }
              ]
            },
            {
              text: {
                name: goatData.maternalGrandmotherName,
                title: `Registro: ${goatData.maternalGrandmotherRegistration}`,
                desc: "Avó Materna"
              },
              children: [
                {
                  text: {
                    name: goatData.maternalGreatGrandfather2Name,
                    title: `Registro: ${goatData.maternalGreatGrandfather2Registration}`,
                    desc: "Bisavô Materno"
                  }
                },
                {
                  text: {
                    name: goatData.maternalGreatGrandmother2Name,
                    title: `Registro: ${goatData.maternalGreatGrandmother2Registration}`,
                    desc: "Bisavó Materna"
                  }
                }
              ]
            }
          ]
        }
      ]
    }
  };

  new Treant(chart_config);

  const events = [
    { date: "2024-01-01", type: "Nascimento", description: "Nascimento" },
    { date: "2024-04-15", type: "Cobertura", description: "Cobertura com Baruc" }
  ];

  const tbody = document.getElementById("event-list");
  tbody.innerHTML = "";
  events.forEach(ev => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${ev.date}</td><td>${ev.type}</td><td>${ev.description}</td>`;
    tbody.appendChild(tr);
  });
}