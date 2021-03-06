const template = document.querySelector("#car-template").content;
const nave = document.querySelector("#categories-nav");
const categID = parameters.get("catid");

function getCategories(){
    fetch(baseLink+"categories").then(e=>e.json()).then(makeCatMenu);
}

function getCarsByCat(categID){
    fetch(baseLink+"car?categories="+categID+"&_embed").then(e=>e.json()).then(showCars);
}

function makeCatMenu(categories){
    categories.forEach(category=>{
        const newA = document.createElement("a");
        newA.textContent=category.name;
        newA.href="?catid="+category.id;
        nave.appendChild(newA);
    })
}

getCategories();

function showCars(carList){
    carList.forEach(showSingleCar)
}

function showSingleCar(car){
    //make copy of the template
    const copy = template.cloneNode(true);
    copy.querySelector("h2").textContent=car.title.rendered;
    copy.querySelector(".year span").textContent=car.acf.year;
    copy.querySelector(".horse-power span").textContent=car.acf.horse_power;
    copy.querySelector(".price span").textContent=car.acf.price;
    copy.querySelector("a").href="details.html?carid="+car.id;

    if(car._embedded['wp:featuredmedia']){
        copy.querySelector("img").src=car._embedded['wp:featuredmedia'][0].media_details.sizes.medium.source_url;
    }else{
        copy.querySelector("img").remove();
    }

    document.querySelector("main").appendChild(copy);

    myLoader.classList.add("hide");
}


//fetch content
function getCars(){
    fetch(baseLink+"car?_embed").then(res => res.json()).then(showCars);
}

if(categID){
    getCarsByCat(categID);
}else{
    getCars();
}