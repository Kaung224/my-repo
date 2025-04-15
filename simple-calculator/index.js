const inputEl = document.querySelector('.input')

function calculate(){
  const result = eval(inputEl.value); 

  if (Number.isInteger(result)) {
    inputEl.value = result.toString();
  } else {
    inputEl.value = result.toFixed(2);
  }
}