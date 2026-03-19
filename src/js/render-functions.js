import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const gallery = document.querySelector(".gallery");
const loader = document.querySelector(".loader");
const loadMoreBtn = document.querySelector(".load-more");

const lightbox = new SimpleLightbox(".gallery a", {
  captionsData: "alt",
  captionDelay: 250,
});

export function createGallery(images) {
  const markup = images
    .map(createGalleryItem)
    .join("");

  gallery.insertAdjacentHTML("beforeend", markup);

  lightbox.refresh();
}

function createGalleryItem({
  webformatURL,
  largeImageURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) {
  return `
<li class="gallery-item">
  <a href="${largeImageURL}">
    <img src="${webformatURL}" alt="${tags}" />
  </a>
  <div class="info">
    <p><b>Likes</b><br><span class="value">${likes}</span></p>
    <p><b>Views</b><br><span class="value">${views}</span></p>
    <p><b>Comments</b><br><span class="value">${comments}</span></p>
    <p><b>Downloads</b><br><span class="value">${downloads}</span></p>
  </div>
</li>`;
}

export function clearGallery() {
  gallery.innerHTML = "";
  lightbox.refresh(); 
}

export function showLoader() {
  loader.classList.add("is-visible");
}

export function hideLoader() {
  loader.classList.remove("is-visible");
}

export function showLoadMoreButton() {
  loadMoreBtn.classList.add("visible");
}

export function hideLoadMoreButton() {
  loadMoreBtn.classList.remove("visible");
}