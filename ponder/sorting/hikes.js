const items = [
    {name: "Hamborger", meat: "Cow"},
    {name: "Chicken Strips", meat: "Chicken"}, 
    {name: "Dino Nuggies", meat: "Dinosaur"}, 
    {name: "Steak", meat: "Cow"},
    {name: "T-rex Ribs", meat: "Dinosaur"}, 
    {name: "Apple", meat: "Tree"}, 
    ];

items.sort(sortItemByName);

console.log(items);

function sortItemByName(a, b){
    if (a.meat < b.meat)
        return -1
    else if (a.meat === b.meat){
        if (a.name < b.name)
            return -1;
        else if (a.name === b.name)
            return 0;
        else
            return 1;
    }
    else
        return 1;

    
}