const minusBtnEl = document.querySelector('.minus-button')
const pluseBtnEl = document.querySelector('.pluse-button')
const quantityEl = document.querySelector('.quantity')

minusBtnEl.addEventListener('click', () => {
  if(quantityEl.value == 0){
    return
  }
  quantityEl.value--;
})

pluseBtnEl.addEventListener('click', () => {
  quantityEl.value++;
})

function changeImage(url){
  document.querySelector('.main-img').src = url;
}

document.querySelectorAll('.thumbnail').forEach((img) => {
  img.addEventListener('click', (e) => {
    changeImage(e.target.src);
  })
})