const buttonEdit = document.querySelector('.profile__edit-button');
const buttonClose = document.querySelector('.popup__close-button');
const popup = document.querySelector('.popup');
const popupopenedClass = 'popup_opened';

buttonEdit.addEventListener('click', function (event) {
  event.preventDefault();
  popup.classList.add(popupopenedClass);
  nameInput.value = paragraphName.textContent;
  jobInput.value = paragraphJob.textContent;
});

buttonClose.addEventListener('click', function (event){
  event.preventDefault();
  popup.classList.remove(popupopenedClass);
});

let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__name');
let jobInput = document.querySelector('.popup__profession');
let paragraphName = document.querySelector('.profile__name');
let paragraphJob = document.querySelector('.profile__profession');

function formSubmitHandler (event) {
    event.preventDefault();
    paragraphName.textContent = nameInput.value;
    paragraphJob.textContent = jobInput.value;
    popup.classList.remove(popupopenedClass);
}
formElement.addEventListener('submit', formSubmitHandler);

