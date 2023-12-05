// Initialise un objet vide pour stocker les régions
const regions = {};

function init() {
    fetchData();
    addData();
    console.log(regions);
}

init();

function fetchData() {
    fetch("cities.json")
        .then((response) => response.json())
        .then((data) => run(data.cities), addData(data.cities))
        .catch((error) => console.log(error));
}

function run(cities) {
    cities.forEach(function (city) {
        if (regions[city.region_name] === undefined) {
            // Si la région n'existe pas encore, crée un nouvel objet pour cette région
            regions[city.region_name] = {
                name: city.region_name,
                departments: [
                    {
                        name: city.department_name,
                        cities: [
                            {
                                name: city.label // Correction de la syntaxe : objet { name: city.label }
                            }
                        ]
                    }
                ]
            };
        } else {
            // Si la région existe déjà, ajoute le département et la ville
            const existingRegion = regions[city.region_name];
            const departmentExists = existingRegion.departments.some(
                (department) => department.name === city.department_name
            );

            if (!departmentExists) {
                // Si le département n'existe pas encore, crée un nouvel objet pour ce département
                existingRegion.departments.push({
                    name: city.department_name,
                    cities: [
                        {
                            name: city.label // Correction de la syntaxe : objet { name: city.label }
                        }
                    ]
                });
            } else {
                // Si le département existe déjà, ajoute simplement la ville
                const existingDepartment = existingRegion.departments.find(
                    (department) => department.name === city.department_name
                );
                existingDepartment.cities.push({
                    name: city.label // Correction de la syntaxe : objet { name: city.label }
                });
            }
        }
    });
}