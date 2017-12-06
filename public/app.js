let beers;

let populateBeerSelector = function() {
  let selector = document.getElementById('beer-select');

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

let app = function() {
  fetchBeers();
};

window.addEventListener('load', app);
