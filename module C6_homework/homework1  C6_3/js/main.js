const buttonNode = document.querySelector('.btn');

// Ищем кнопку, по нажатии на которую будет запрос
const icoNode1 = document.querySelector('.btn_icon1');
const icoNode2 = document.querySelector('.btn_icon2');
let fl_toggle = true;

// Вешаем обработчик на кнопку для запроса
buttonNode.addEventListener('click', () => {
  if(fl_toggle)
  {
    console.log('icoNode1 none, icoNode2 block');
    
    icoNode1.style.display = 'none';
    icoNode2.style.display = 'block';
  }
  else
  {
    console.log('icoNode1 block, icoNode2 none');
    
    icoNode1.style.display = 'block';
    icoNode2.style.display = 'none';
  }

  fl_toggle = !fl_toggle;   
})

