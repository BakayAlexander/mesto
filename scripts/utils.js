export const openPopup = (element) => {
  //переменной element будет присвоен класс открытия popup, он меняет visibility
  element.classList.add('popup_is-opened');
  //При открытии popup мы запускаем функции закрытия по esc и клику в темной области
  document.addEventListener('keydown', closePopupByPushingEsc);
  element.addEventListener('click', closePopupByClickOverlay)
};

//Функция закрытия popup
export const closePopup = (element) => {
  element.classList.remove('popup_is-opened');
  //Убираем слушатель на закрытие по esc и клику в темной области (слушатель необходимо снимать каждый раз)
  // в протвном случае он будет навешиваться каждый раз - это баг.
  document.removeEventListener('keydown', closePopupByPushingEsc);
  element.removeEventListener('click', closePopupByClickOverlay)
};

//Функция закрытия при клике по esc
export function closePopupByPushingEsc(evt) {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_is-opened');
    closePopup(popup);
  }
}
//Функция закрытия при клике по темной области(overlay)
export function closePopupByClickOverlay (evt) {
  const popup = document.querySelector('.popup_is-opened');
  if (evt.target === popup) {
    closePopup (popup);
  }
}