//Выборка popup редактирования профиля
export const popupSelectorProfile = '.popup_type_edit';
//Выборка кнопки открытия popup профиля
export const buttonOpenProfile = document.querySelector('.profile__edit-button');

//Выборка форм
export const formProfile = document.forms['form-edit'];
export const formCard = document.forms['form-card'];
export const formAvatar = document.forms['form-avatar'];
export const formDelete = document.forms['form-delete'];

//Выборка элементов профиля
export const nameElementFormProfile = '.profile__name';
export const descriptionElementFormProfile = '.profile__description';
export const picElementFormProfile = '.profile__pic';

//Выборка input формы профиля
export const nameInput = formProfile.querySelector('.popup__input_type_name');
export const descriptionInput = formProfile.querySelector('.popup__input_type_description');

//Выборка секции element
export const elementSection = document.querySelector('.elements');

//Выборка template-шаблона
export const elementTemplate = document.querySelector('.element-template');

//Выборка popup добавления карточки
export const popupFormCard = '.popup_type_card';
//Выборка кнопки открытия popup добавления карточки
export const buttonOpenFormCard = document.querySelector('.profile__add-button');

//Выборка popup редактирования аватара
export const popupFormAvatar = '.popup_type_avatar';
//Выборка кнопки открытия popup аватара
export const buttonOpenFormAvatar = document.querySelector('.profile__pic');

//Выборка popup редактирования аватара
export const popupCardDelete = '.popup_type_card-delete';
