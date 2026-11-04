import './index.css';

const STORAGE_KEY = 'simple-chat-message';
const NAME_KEY = 'simple_chat_username';

const loginScreen = document.getElementById('login-screen');
const chatScreen = document.getElementById('chat-screen');
const nameInput = document.getElementById('name-input');
const loginButton = document.getElementById('login-button');

const form = document.querySelector('form');
const input = document.querySelector('.form-input');
const messageDiv = document.querySelector('.message');
const userinput = document.querySelector('.user-input');
const fileButton = document.getElementById('fileButton');
const fileInput = document.getElementById('fileInput');

const channel = new BroadcastChannel('simple-chat');
channel.onmessage = () => renderMessages(getMessages());

function getMessages() {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

function saveMessages(messages) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
}

function formatDateTime(isoString) {
  if (!isoString) return '';

  const date = new Date(isoString);
  if (isNaN(date.getTime())) return '';

  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const msgStart = new Date(date.getFullYear(), date.getMonth(), date.getDate());

  if (msgStart.getTime() === todayStart.getTime()) {
    return date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
  }

  return date.toLocaleString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}


function fullDateTitle(isoString) {
  if (!isoString) return '';
  const date = new Date(isoString);
  return isNaN(date.getTime()) ? '' : date.toISOString();
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function renderMessages(messages) {
  messageDiv.innerHTML = '';
  messages.forEach(msg => {
    messageDiv.insertAdjacentHTML('beforeend', getMessage(msg));
  });
  scrollToBottom();
}

let userScrolled = false;

messageDiv.addEventListener('scroll', () => {
  const isAtBottom = Math.abs(messageDiv.scrollHeight - messageDiv.scrollTop - messageDiv.clientHeight) < 50;
  userScrolled = !isAtBottom;}); 

function scrollToBottom() {
  if (userScrolled) return;

  messageDiv.scrollTop = messageDiv.scrollHeight; // мгновенный скролл
  // Или плавный:
  // messageDiv.scrollIntoView({ block: 'end', behavior: 'smooth' });
}

function handleSubmit(event) {
  event.preventDefault();
  const textMessage = input.value.trim();
  if (!textMessage) return;

  const message = {
    text: textMessage,
    username: getUser(),
    createdAt: new Date().toISOString(),
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

function getUser() {
  return userinput.value;
}

function getMessage(item) {
  return `
    <div class="message-item">
      <span>${escapeHtml(item.username)}</span>
      <span class="message-text">${escapeHtml(item.text)}</span>
      <span class="message-time" title="${fullDateTitle(item.createdAt)}">${formatDateTime(item.createdAt)}</span>
    </div>
  `;
}

fileButton.addEventListener('click', () => {
  fileInput.click();
});

fileInput.addEventListener('change', () => {
  const file = fileInput.files[0];
  if (!file) return;

  console.log('Выбран файл:', file.name);
  console.log('Размер:', file.size, 'байт');
  console.log('Тип:', file.type);

  const reader = new FileReader();
  reader.onload = (e) => {
    console.log('Содержимое файла:', e.target.result);
  };
  reader.readAsText(file);
});
function showScreen(name) {
  loginScreen.classList.toggle('hidden', name !== 'login');
  chatScreen.classList.toggle('hidden', name !== 'chat');
}
loginButton.addEventListener('click', () => {
  const name = nameInput.value.trim();
  if (!name) {
    nameInput.focus();
    return;
  }
  localStorage.setItem(NAME_KEY, name);
  userinput.value = name;
  showScreen('chat');
});

nameInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') loginButton.click();
});

const savedName = localStorage.getItem(NAME_KEY);
if (savedName) {
  userinput.value = savedName;
  showScreen('chat');
  renderMessages(getMessages());
} else {
  showScreen('login');
}

form.addEventListener('submit', handleSubmit);
form.addEventListener('keypress', handleKeyPress);

renderMessages(getMessages());
scrollToBottom(); 