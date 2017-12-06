let beers;
let selector;
let beerInfo;
let beerImage;

let longUnitToShort = function(unit) {
  if (unit === 'grams') {
    return 'g';
  } else if (unit === 'kilograms') {
    return 'kg';
  }
};

let objectsToStrings = function(objects, maltOrHop) {
  let strings = [];
  objects.forEach((object) => {
    let string = object.amount.value.toString();
    string += longUnitToShort(object.amount.unit);
    string += ' of ' + object.name + ' ' + maltOrHop;
    strings.push(string);
  });
  return strings;
};

let makeUl = function(objects) {
  let ul = document.createElement('ul');

  objects.forEach((object) => {
    let li = document.createElement('li');
    li.innerHTML = object;
    ul.appendChild(li);
  });
  return ul;
};

let makeIngredientsParagraph = function(malts, hops, yeast) {
  let p = document.createElement('p');

  let maltsTitle = document.createElement('p');
  maltsTitle.innerHTML = 'Malts:';
  maltsList = makeUl(malts);

  let hopsTitle = document.createElement('p');
  hopsTitle.innerHTML = 'Hops:';
  hopsList = makeUl(hops);

  let yeastTitle = document.createElement('p');
  yeastTitle.innerHTML = 'Yeast:';
  let yeastList = document.createElement('ul');
  let yeastLi = document.createElement('li');
  yeastLi.innerHTML = yeast;
  yeastList.appendChild(yeastLi);

  p.appendChild(maltsTitle);
  p.appendChild(maltsList);
  p.appendChild(hopsTitle);
  p.appendChild(hopsList);
  p.appendChild(yeastTitle);
  p.appendChild(yeastList);

  return p;
};

let fetchIngredients = function(beer) {
  let maltStringsArray = objectsToStrings(beer.ingredients.malt, 'malt');
  let hopStringsArray = objectsToStrings(beer.ingredients.hops, 'hop');
  let yeast = beer.ingredients.yeast;

  return makeIngredientsParagraph(maltStringsArray, hopStringsArray, yeast);
};

let updatePage = function(beer) {
  beerImage.src = beer.image_url;

  let info = `Tagline: ${beer.tagline}<br><br>`;
  info += `Description: ${beer.description}<br><br>`;
  info += `ABV: ${beer.abv}%<br><br>`;
  info += 'Ingredients:<br>';

  beerInfo.innerHTML = info;
  beerInfo.appendChild(fetchIngredients(beer));
};

let pickBeer = function() {
  let beer = beers[selector.value];
  updatePage(beer);
};

let populateBeerSelector = function() {
  beers.forEach((element, index) => {
    let option = document.createElement('option');
    option.value = index;
    option.innerHTML = beers[index].name;
    selector.appendChild(option);
  });
};

let requestComplete = function(event) {
  if (this.status !== 200) return;

  beers = JSON.parse(this.responseText);
  populateBeerSelector();
};

let fetchBeers = function() {
  let url = 'https://api.punkapi.com/v2/beers';
  let request = new XMLHttpRequest();
  request.open('GET', url);
  request.addEventListener('load', requestComplete);
  request.send();
};

let addListeners = function() {
  selector.addEventListener('change', pickBeer);
};

let getDomElements = function() {
  selector = document.getElementById('beer-select');
  beerInfo = document.getElementById('beer-info');
  beerImage = document.getElementById('beer-image');

  addListeners();
};

let app = function() {
  getDomElements();
  fetchBeers();
};

window.addEventListener('load', app);
