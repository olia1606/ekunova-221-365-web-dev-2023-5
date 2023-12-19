const searchInput = document.querySelector('#searchInput');
const resultsContainer = document.getElementById('search-results');

searchInput.addEventListener('input', function () {
  const query = this.value.trim(); // Получаем значение из поисковой строки без лишних пробелов

  // Выполняем запрос только если введено хотя бы два символа
  if (query.length >= 1) {
    fetchResults(query);
  } else {
    clearResults(); // Очищаем результаты, если длина запроса меньше двух символов
  }
});

function fetchResults(query) {
  fetch(`http://cat-facts-api.std-900.ist.mospolytech.ru/facts?q=${query}`)
    .then((response) => response.json())
    .then((data) => displaySearchResults(data))
    .catch((error) => console.error('There has been a problem with your fetch operation:', error));
}

function clearResults() {
  resultsContainer.innerHTML = ''; // Очищаем контейнер результатов
}

function displaySearchResults(data) {
  resultsContainer.innerHTML = ''; // Очищаем контейнер перед добавлением новых результатов

  const records = data.records;

  if (!records || records.length === 0) {
    resultsContainer.textContent = 'No results found';
    return;
  }

  records.forEach((item) => {
    const recordText = JSON.stringify(item.text, null, 2); // Форматируем объект в JSON-строку с отступами
    const preElement = document.createElement('pre'); // Создаем элемент <pre> для отображения форматированной строки
    preElement.textContent = recordText; // Устанавливаем содержимое элемента <pre>

    resultsContainer.appendChild(preElement); // Добавляем элемент <pre> в контейнер для результатов
  });
}

function displaySearchResults(data) {
  resultsContainer.innerHTML = '';

  const records = data.records;

  if (!records || records.length === 0) {
    resultsContainer.textContent = 'No results found';
    return;
  }

  records.forEach((item) => {
    const recordText = JSON.stringify(item.text, null, 2);
    const preElement = document.createElement('pre');
    preElement.classList.add('element');

    preElement.textContent = recordText;

    preElement.addEventListener('click', function () {
      searchInput.value = item.text; // Заполняем input текстом при клике на результат
    });

    resultsContainer.appendChild(preElement);
  });
}