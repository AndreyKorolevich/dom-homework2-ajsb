const data = [
  {
    id: 26,
    title: 'Побег из Шоушенка',
    imdb: 9.30,
    year: 1994,
  },
  {
    id: 25,
    title: 'Крёстный отец',
    imdb: 9.20,
    year: 1972,
  },
  {
    id: 27,
    title: 'Крёстный отец 2',
    imdb: 9.00,
    year: 1974,
  },
  {
    id: 1047,
    title: 'Тёмный рыцарь',
    imdb: 9.00,
    year: 2008,
  },
  {
    id: 223,
    title: 'Криминальное чтиво',
    imdb: 8.90,
    year: 1994,
  },
];
const table = document.getElementById('table');
data.forEach((elem) => {
  const tr = document.createElement('tr');
  const tdId = document.createElement('td');
  const tdTitle = document.createElement('td');
  const tdYear = document.createElement('td');
  const tdImdb = document.createElement('td');

  tr.dataset.id = elem.id;
  tr.dataset.title = elem.title;
  tr.dataset.year = elem.year;
  tr.dataset.imdb = elem.imdb.toFixed(2);

  tdId.textContent = elem.id;
  tdTitle.textContent = elem.title;
  tdYear.textContent = elem.year;
  tdImdb.textContent = elem.imdb.toFixed(2);

  tr.insertAdjacentElement('beforeend', tdId);
  tr.insertAdjacentElement('beforeend', tdTitle);
  tr.insertAdjacentElement('beforeend', tdYear);
  tr.insertAdjacentElement('beforeend', tdImdb);

  table.insertAdjacentElement('beforeend', tr);
});

const tr = document.querySelectorAll('table > tr');
const arrTr = [...tr];

const sortTable = (arr, param, direction) => {
  if (direction === 'decrease') {
    arr.sort((a, b) => b.dataset[param] - a.dataset[param]);
  } else if (direction === 'increases') {
    arr.sort((a, b) => a.dataset[param] - b.dataset[param]);
  }
};

const { dataset } = document.querySelector('thead + tr');
const arrDataset = Object.keys(dataset);
const arrPatramsSort = [];
arrDataset.map((elem) => arrPatramsSort.push({
  param: elem,
  direction: 'increases',
}, {
  param: elem,
  direction: 'decrease',
}));

function* genArgument() {
  while (true) {
    yield* arrPatramsSort;
  }
}

const argument = genArgument();

setInterval(() => {
  const { param, direction } = argument.next().value;
  sortTable(arrTr, param, direction);
  for (let i = 0; i < arrTr.length; i += 1) {
    table.insertAdjacentElement('beforeend', arrTr[i]);
  }
}, 2000);
