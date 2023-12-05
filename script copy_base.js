/**
 * Fonction d'initialisaton du code, listes des fonctions éxécutées dans le code
 */

function init() {
    fetchData();
};

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
    let regions = [];

    cities.forEach( function(city) {
        if (regions[city.region_name] === undefined) {
            regions[city.region_name] = {
                name : city.region_name,
                departments : [
                    {
                        "name" : city.department_name,
                        "cities" : [
                            "name": city.label
                        ]
                    }
                ]
            }
        } else { // si la région existe déjà

            let departement = regions[city.region_name].departements[city.department_name] // variable qu définie le département

             // gerer si le departement existe déjà ou non
            if !(departement === undefined) {
                regions[city.region_name].departements[city.department_name] = {
                    {
                        "name" : city.department_name,
                        "cities" : [
                            "name": city.label
                        ]
                    }
                }
            } else { // si le département existe déja

                departement.cities.push({"name": city.label})
            }
        } 
    })
}

