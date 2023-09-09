import { galleryItems } from './gallery-items.js';
// Change code below this line

const gallery = document.querySelector('.gallery');
let instance;

const renderImages = arr => {
  const markup = galleryItems
    .map(
      ({ preview, original, description }) =>
        `
        <li class="gallery__item">
          <a class="gallery__link" href="${original}">
            <img
              class="gallery__image"
              src="${preview}"
              data-source="${original}"
              alt="${description}"
            />
          </a>
        </li>
        `
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);
};

const handleClick = event => {
  event.preventDefault();
  if (!event.target.classList.contains('gallery__image')) {
    return;
  }

  const imageUrl = event.target.dataset.source;

  const handleClose = (event) => {
    if (event.key === 'Escape') {
      instance.close();
    }
  }

  instance = basicLightbox.create(
    `<img width="1400" height="900" src='${imageUrl}'>`,
    {
      onShow: () => document.addEventListener('keydown', handleClose),
      onClose: () => document.removeEventListener('keydown', handleClose),
    }
  );

  instance.show();
};


renderImages(galleryItems);
gallery.addEventListener('click', handleClick);
