// Ищем кнопку, по нажатии на которую будет запрос
const btnNode = document.querySelector('.btn');

// Вешаем обработчик на кнопку для запроса
btnNode.addEventListener('click', () => {
  // console.log('Размер экрана:' + window.screen.width + ' x ' + window.screen.height + 
  //   '\r\nразмер с учетом полосы прокрутки:' + window.innerWidth + ' x ' + window.innerHeight +
  //   '\r\nразмер без учета полосы прокрутки:' +  document.documentElement.clientWidth + ' x ' + document.documentElement.clientHeight);

  alert('Размер экрана: ' + window.screen.width + ' x ' + window.screen.height + 
    '\r\nразмер с учетом полосы прокрутки: ' + window.innerWidth + ' x ' + window.innerHeight +
    '\r\nразмер без учета полосы прокрутки: ' +  document.documentElement.clientWidth + ' x ' + document.documentElement.clientHeight);
})

