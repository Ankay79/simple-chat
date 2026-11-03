import './index.css';

const STORAGE_KEY = 'simple-chat-message';
const form = document.querySelector('form');
const input = document.querySelector('.form-input');
const messageDiv = document.querySelector('.message');
const userinput = document.querySelector('.user-input');

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
    messageDiv.appendChild(message);
});
}

function handleSubmit(event) {
    event.preventDefault();
    const textmуssage = input.value.trim();
    if (!textmуssage) return;
    const message = {
        text: textmassage,
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
form.addEventListener('submit', handleSubmit);
form.addEventListener('keypress', handleKeyPress);

renderMessages(getMessages());