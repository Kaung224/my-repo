const johnSelectorBtn = document.getElementById('john-selector')
const janeSelectorBtn = document.getElementById('jane-selector')

const chatHeader = document.querySelector('.chat-header')
const chatMessages = document.querySelector('.chat-messages')
const chatInputForm = document.querySelector('.chat-input-form')
const chatInput = document.querySelector('.chat-input')
const clearChatBtn = document.querySelector('.clear-chat-button')

const messages = JSON.parse(localStorage.getItem('messages')) || []

function createChatMessageElement(message) {
  return `<div class="message ${message.sender === 'John' ? 'blue-bg' : 'gray-bg'}">
      <div class="message-sender">${message.sender}</div>
      <div class="message-text">${message.text}</div>
      <div class="message-timestamp">${message.timestamp}</div>
    </div>
  `
}

window.onload = () => {
  messages.forEach((message) => {
    chatMessages.innerHTML += createChatMessageElement(message)
  })
}

let messageSender = 'John'

function updateMessageSender(name){
  messageSender = name;
  chatHeader.innerText = `${messageSender} chatting...`
  chatInput.placeholder = `Type here, ${messageSender}`
  if(name === 'John'){
    johnSelectorBtn.classList.add('active-person')
    janeSelectorBtn.classList.remove('active-person')
  }else{
    johnSelectorBtn.classList.remove('active-person')
    janeSelectorBtn.classList.add('active-person')
  }

  chatInput.focus()
}

johnSelectorBtn.onclick = () => updateMessageSender('John')
janeSelectorBtn.onclick = () => updateMessageSender('Jane')

function sendMessage(e){
  e.preventDefault();

  const timestamp = new Date().toLocaleString('en-US', {hour : 'numeric', minute : 'numeric', hour12 : true})
  const message = {
    sender : messageSender,
    text : chatInput.value,
    timestamp,
  }

  messages.push(message)

  localStorage.setItem('messages', JSON.stringify(messages))

  chatMessages.innerHTML += createChatMessageElement(message)

  chatInputForm.reset()

  chatMessages.scrollTop = chatMessages.scrollHeight
}

chatInputForm.addEventListener('submit', sendMessage)

clearChatBtn.addEventListener('click', () => {
  localStorage.clear()
  chatMessages.innerHTML = ''
})