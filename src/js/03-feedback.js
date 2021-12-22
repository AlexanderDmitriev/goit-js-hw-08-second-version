/* В HTML есть разметка формы. Напиши скрипт который будет сохранять значения полей в локальное хранилище 
когда пользователь что-то печатает.

<form class="feedback-form" autocomplete="off">
  <label>
    Email
    <input type="email" name="email" autofocus />
  </label>
  <label>
    Message
    <textarea name="message" rows="8"></textarea>
  </label>
  <button type="submit">Submit</button>
</form>
Выполняй это задание в файлах 03-feedback.html и 03-feedback.js. 

Разбей его на несколько подзадач:
    1. Отслеживай на форме событие input, и каждый раз записывай в локальное хранилище объект с полями email и message, 
в которых сохраняй текущие значения полей формы. Пусть ключом для хранилища будет строка "feedback-form-state".
    2. При загрузке страницы проверяй состояние хранилища, и если там есть сохраненные данные, заполняй ими поля формы. 
В противном случае поля должны быть пустыми.
    3. При сабмите формы очищай хранилище и поля формы, а также выводи объект с полями email, message 
и текущими их значениями в консоль.
    4. Сделай так, чтобы хранилище обновлялось не чаще чем раз в 500 миллисекунд. 
Для этого добавь в проект и используй библиотеку lodash.throttle.
 */
import throttle from "lodash.throttle";

const refs = {
    emailInput: document.querySelector('.feedback-form').firstElementChild.children[0],
    messageInput: document.querySelector('.feedback-form ').children[1].children[0],
    formInput: document.querySelector('.feedback-form '),
    submitButton:document.querySelector('.feedback-form button'),
}

const formData = {
    inputData:"",
    messageData:""
};
let previousFormData;

 try {
    previousFormData = JSON.parse(localStorage.getItem("feedback-form-state"));

} catch (error) {
    console.log(error);
    previousFormData.inputData="";
    previousFormData.messageData="";
}
    if (previousFormData) {
     refs.emailInput.value = previousFormData.inputData;
     refs.messageInput.value = previousFormData.messageData;
 } 
 
const formInputHandler = (event) => { 
    formData.inputData = refs.emailInput.value;
    formData.messageData = refs.messageInput.value;
    localStorage.setItem("feedback-form-state", JSON.stringify(formData));
}

const submitHandler = (event) => {
    event.preventDefault();
    console.log("inputData: " + previousFormData.inputData);
    console.log("messageData: " + previousFormData.messageData);
    event.currentTarget.reset();
 }

refs.formInput.addEventListener('input', throttle(formInputHandler, 500));
refs.formInput.addEventListener("submit", submitHandler);

