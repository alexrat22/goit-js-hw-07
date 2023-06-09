import { galleryItems } from "./gallery-items.js";
// Change code below this line

const gallery = document.querySelector(".gallery");
const cardsMarkup = createGalleryCard(galleryItems);

gallery.insertAdjacentHTML("beforeend", cardsMarkup);

function createGalleryCard(items) {
  return items
    .map(({ preview, original, description }) => {
      return `
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
    `;
    })
    .join("");
}

gallery.addEventListener("click", onGalleryItemClick);

function onGalleryItemClick(event) {
  if (!event.target.classList.contains("gallery__image")) {
    return;
  }

  event.preventDefault();
  const modalPicture = basicLightbox.create(`
    <img src=${event.target.dataset.source}>
`);

  modalPicture.show();

  gallery.addEventListener("keydown", onCloseKeyPress);

  function onCloseKeyPress(event) {
    if (event.code === "Escape") {
      modalPicture.close();
      gallery.removeEventListener("keydown", onCloseKeyPress);
    }
  }
}
