/**
 * Fonction d'initialisaton du code, listes des fonctions éxécutées dans le code
 */

function init() {
    fetchData();
}

init();

/**
 * Fonction de récupéartion des données du fichier cities.json avec fetch
 */

function fetchData() {
    fetch("cities.json")
        .then((response)=>response.json())
        .then((data)=>run(data.cities))
        .catch((error)=>console.log(error))
};

/**
 * Tranforme le tableau brut de cities en un tableau a 3 niveau: region -> departements->cities
 */
function run(cities) {
    let regions = {}
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
                                name: city.label
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
                            name: city.label
                        }
                    ]
                });
            } else {
                // Si le département existe déjà, ajoute simplement la ville
                const existingDepartment = existingRegion.departments.find(
                    (department) => department.name === city.department_name
                );
                existingDepartment.cities.push({
                    name: city.label
                });
            }
        }
    });

    addDataRegion(regions);
}

/**
 * Affiche les élément selon la région sélectionnée
 */
function addDataRegion(regions) {
    const region = document.getElementById("region");
    const villes = document.getElementById("villes");
    const regionValues = Object.values(regions);

    // Triez le tableau des valeurs par ordre alphabétique
    regionValues.sort(function(a, b) {
        if (a.name <  b.name) {
            return -1;
        }
        if (a.name >  b.name) {
            return 1;
        }
        return 0; // Les noms sont égaux
    });

    regionValues.forEach(function(region) { // Boucle sur le tableau des valeurs des regions
        document.getElementById("region").innerHTML += `<option>${region.name.toUpperCase()}</option>`;

        region.departments.forEach(function(department) { // Boucle de niveau 2 sur le tableau des valeurs des departements
            document.getElementById("departement").innerHTML += `<option>${department.name.toUpperCase()}</option>`;

            console.log("OK");

            // department.cities.forEach(function(city) { // Boucle de niveau 3 sur le tableau des valeurs des villes
            //         villes.innerHTML += `<ul>${city.name.toUpperCase()}</ul>`;
            // })
        })
    });
}

