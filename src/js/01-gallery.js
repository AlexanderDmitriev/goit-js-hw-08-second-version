/* Задание 1 - библиотека SimpleLightbox Выполняй это задание в файлах 01-gallery.html и 01-gallery.js.
Разбей его на несколько подзадач:

1. Добавь библиотеку SimpleLightbox как зависимость проекта используя npm (ссылка на CDN из твоей
   прошлой работы больше не нужна).
2. Используй свой JavaScript код из предыдущей домашней работы, но выполни рефакторинг с учетом
   того, что библиотека была установлена через npm (синтаксис import/export).

Для того чтобы подключить CSS код библиотеки в проект, необходимо добавить еще один импорт, кроме
того который описан в документации.

// Описан в документации import SimpleLightbox from 'simplelightbox'; // Дополнительный импорт
стилей import 'simplelightbox/dist/simple-lightbox.min.css'; */

// Add imports above this line
import { galleryItems } from './gallery-items';
import SimpleLightbox from "simplelightbox";
import 'simplelightbox/dist/simple-lightbox.min.css';

// Change code below this line

const href = {
  galleryList: document.querySelector('.gallery'),
}

const imageFromGallery = galleryItems.map(image => `<div class="gallery__item">
  <a class="gallery__link" href=${image.original}>
    <img 
      class="gallery__image"
      src=${image.preview}
      data-source=${image.original}
      alt=${image.description}
    />
 </a>
</div>`).join('');

href.galleryList.insertAdjacentHTML('afterBegin', imageFromGallery);

let lightbox = new SimpleLightbox('.gallery a', {
  animationSpeed: 500,
  fadeSpeed: 500,
  captionsData: 'alt',
  captionDelay: 250,
  
});
