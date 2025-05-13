$(document).ready(function() {
    $.getJSON("genealogy.json", function(data) {
        // Função para transformar os seus dados JSON na estrutura do Treant
        function transformData(jsonData) {
            return {
                text: {
                    name: jsonData.goatName,
                    registration: "Reg: " + jsonData.goatRegistration
                },
                children: [
                    {
                        text: {
                            name: jsonData.fatherName,
                            registration: "Reg: " + jsonData.fatherRegistration
                        },
                        children: [
                            { text: { name: jsonData.paternalGrandfatherName, registration: "Reg: " + jsonData.paternalGrandfatherRegistration } },
                            { text: { name: jsonData.paternalGrandmotherName, registration: "Reg: " + jsonData.paternalGrandmotherRegistration } },
                            { text: { name: jsonData.paternalGreatGrandfather1Name, registration: "Reg: " + jsonData.paternalGreatGrandfather1Registration } },
                            { text: { name: jsonData.paternalGreatGrandmother1Name, registration: "Reg: " + jsonData.paternalGreatGrandmother1Registration } },
                            { text: { name: jsonData.paternalGreatGrandfather2Name, registration: "Reg: " + jsonData.paternalGreatGrandfather2Registration } },
                            { text: { name: jsonData.paternalGreatGrandmother2Name, registration: "Reg: " + jsonData.paternalGreatGrandmother2Registration } }
                        ]
                    },
                    {
                        text: {
                            name: jsonData.motherName,
                            registration: "Reg: " + jsonData.motherRegistration
                        },
                        children: [
                            { text: { name: jsonData.maternalGrandfatherName, registration: "Reg: " + jsonData.maternalGrandfatherRegistration } },
                            { text: { name: jsonData.maternalGrandmotherName, registration: "Reg: " + jsonData.maternalGrandmotherRegistration } },
                            { text: { name: jsonData.maternalGreatGrandfather1Name, registration: "Reg: " + jsonData.maternalGreatGrandfather1Registration } },
                            { text: { name: jsonData.maternalGreatGrandmother1Name, registration: "Reg: " + jsonData.maternalGreatGrandmother1Registration } },
                            { text: { name: jsonData.maternalGreatGrandfather2Name, registration: "Reg: " + jsonData.maternalGreatGrandfather2Registration } },
                            { text: { name: jsonData.maternalGreatGrandmother2Name, registration: "Reg: " + jsonData.maternalGreatGrandmother2Registration } }
                        ]
                    }
                ]
            };
        }

        var genealogyData = {
            chart: {
                container: "#genealogy-tree",
                connectors: {
                    type: 'step'
                }
            },
            nodeStructure: transformData(data) // Chama a função para transformar os dados
        };

        new Treant(genealogyData);
    });
});