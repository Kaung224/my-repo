const inputEl = document.querySelector('.input');
const addBtn = document.querySelector('.add-button');
const removeBtn = document.querySelector('.remove-button');
const taskContainerEl = document.querySelector('.task-container')

function generateNewTasks(){
  const liEl = document.createElement('li');
  liEl.classList.add('task-list');
  const checkEl = document.createElement('span')
  checkEl.classList.add('check')
  checkEl.innerHTML = '&#10003;';
  const taskEl = document.createElement('span')
  taskEl.classList.add('task');
  taskEl.innerHTML = inputEl.value;
  const btnEl = document.createElement('button')
  btnEl.classList.add('remove-button')
  btnEl.innerHTML = 'Remove';

  liEl.appendChild(checkEl);
  liEl.appendChild(taskEl);
  liEl.appendChild(btnEl);
  taskContainerEl.appendChild(liEl);

  inputEl.value = ''

  saveToLocalStorage();
}

addBtn.addEventListener('click', () => {
  if(inputEl.value.trim() === ""){
    return
  }

  generateNewTasks()
})

document.addEventListener('keydown' , (e) => {
  if(e.key === 'Enter'){
    if(inputEl.value.trim() === ""){
      return
    }
  
    generateNewTasks()
  }
})

taskContainerEl.addEventListener('click' , (e) => {
  if(e.target.classList.contains('remove-button')){
    e.target.parentElement.remove();
  } else if (e.target.tagName === 'LI') {
    e.target.classList.toggle('checked')
  }
  
  saveToLocalStorage();
})

function saveToLocalStorage(){
  localStorage.setItem('tasks', taskContainerEl.innerHTML);
}

function getLocalStorage(){
  taskContainerEl.innerHTML = localStorage.getItem('tasks')
}

getLocalStorage();