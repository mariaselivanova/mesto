const buttonEdit = document.querySelector('.profile__edit-button');
const buttonClose = document.querySelector('.popup__close-button');
const popup = document.querySelector('.popup');
const popupopenedClass = 'popup_opened';
let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__input_name');
let jobInput = document.querySelector('.popup__input_profession');
let paragraphName = document.querySelector('.profile__name');
let paragraphJob = document.querySelector('.profile__profession');

function openpopup() {
  popup.classList.add(popupopenedClass);
  nameInput.value = paragraphName.textContent;
  jobInput.value = paragraphJob.textContent;
}

function closepopup(){
  popup.classList.remove(popupopenedClass);
}

function formSubmitHandler (event) {
    event.preventDefault();
    paragraphName.textContent = nameInput.value;
    paragraphJob.textContent = jobInput.value;
    closepopup();
}

buttonEdit.addEventListener('click', openpopup);
buttonClose.addEventListener('click', closepopup);
formElement.addEventListener('submit', formSubmitHandler);
