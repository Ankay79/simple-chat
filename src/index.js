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
const charCount = document.getElementById('char-count');

const channel = new BroadcastChannel('simple-chat');
const sendBtn = document.querySelector('#chat-screen button[type="submit"]');
const MAX_LENGTH = 1000;


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
function updateCharCount() {
  const len = input.value.length;
  charCount.textContent = `${len} / 1000`;
  charCount.style.color = len >= 900 ? '#f87171' : len >= 700 ? '#fbbf24' : '#888';
}

input.addEventListener('input', updateCharCount);
updateCharCount();

function getUser() {
  return userinput.value;
}

function handleSubmit(event) {
  event.preventDefault();
  const textMessage = input.value.trim();
  if (!textMessage) {
    alert('Сообщение не может быть пустым.');
    return;
  };

  if (textMessage.length > MAX_LENGTH) {  
    alert(`Сообщение слишком длинное. Максимум ${MAX_LENGTH} символов.`);
    return;
  }

  const username = getUser();
  if (!username) {
    userinput.focus();
    return;
  }

  const message = {
    text: textMessage,
    username: username,
    createdAt: new Date().toISOString(),
  };

  const messages = getMessages();
  messages.push(message);
  saveMessages(messages);
  renderMessages(messages);
  channel.postMessage(null);
  input.value = '';
  updateCharCount();
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

function handleKeyPress(event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    form.dispatchEvent(new Event('submit'));
  }
}

form.addEventListener('submit', handleSubmit);
form.addEventListener('keypress', handleKeyPress);

renderMessages(getMessages());
scrollToBottom(); 