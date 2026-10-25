import './index.css';

const messageMe = document.querySelector('.message-me');
const textInput = form.elements['text']
const nameInput = document.createElement("input");
const STORAGE_KEY = 'simple-chat-messages';
const stored = localStorage.getItem(STORAGE_KEY);
const messages = stored ? JSON.parse(stored) : [];

messages.push(newMessage)

localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
function loadMessage() {
    const stored = localStorage.getItem (STORAGE_KEY);
    const messages = stored ? JSON.parse(stored) : [];
    renderMessages(messages);
}