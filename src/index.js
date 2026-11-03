import './index.css';

const STORAGE_KEY = 'simple-chat-message';
const form = document.querySelector('form');
const input = document.querySelector('.form-input');
const messageDiv = document.querySelector('.message');
const userinput = document.querySelector('.user-input');
const fileButton = document.getElementById('fileButton');
const fileInput = document.getElementById('fileInput');

function getMessages() {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
}

function saveMessages(messages) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
}

function renderMessages(messages) {
    messageDiv.innerHTML = '';
    messages.forEach(msg => {
        const message = getMessage(msg);
        messageDiv.insertAdjacentHTML('beforeend', message);
    });
}

function handleSubmit(event) {
    event.preventDefault();
    const textmеssage = input.value.trim();
    if (!textmеssage) return;
    const message = {
        text: textmеssage,
        username: getuser(),
    };

    const messages = getMessages();
    messages.push(message);
    saveMessages(messages);
    renderMessages(messages);
    input.value = '';
}

function handleKeyPress(event) {
    if (event.keyCode === 13 && !event.shiftKey) {
        event.preventDefault();
        handleSubmit(event);
    }
}

function getuser() {
    return userinput.value;
}

function getMessage(item) {
    return `
        <div class="message-item">
            <span >${item.username}</span>
            <span class="message">${item.text}</span>
        </div>
    `
}



fileButton.addEventListener('click', () => {
  fileInput.click()});

fileInput.addEventListener('change', () => {
  const file = fileInput.files[0];
  if (file) {
    console.log('Выбран файл:', file.name);
    console.log('Размер:', file.size, 'байт');
    console.log('Тип:', file.type);
  }
});

    fileInput.addEventListener('change', () => {
  const file = fileInput.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    console.log('Содержимое файла:', e.target.result);
  };
  reader.readAsText(file); 
});

form.addEventListener('submit', handleSubmit);
form.addEventListener('keypress', handleKeyPress);

renderMessages(getMessages());