//Функция замены текста на кнопке сохранения (задействуем во время загрузки)
export const renderLoading = (popup, isLoading = false) => {
  const currentActiveButton = document.querySelector(`${popup} .popup__button-save`);
  if (isLoading) {
    currentActiveButton.textContent = 'Загрузка...';
  } else {
    currentActiveButton.textContent = 'Сохранить';
  }
};
