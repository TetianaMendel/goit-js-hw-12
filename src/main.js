import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import { getImagesByQuery } from "./js/pixabay-api";
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from "./js/render-functions";

const form = document.querySelector(".form");
const loadMoreBtn = document.querySelector(".load-more");

let page = 1;
let query = "";
let totalHits = 0;
const PER_PAGE = 15;

form.addEventListener("submit", handleSubmit);
loadMoreBtn.addEventListener("click", handleLoadMore);

async function handleSubmit(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  query = formData.get("search-text").trim();
  if (!query) return;

  page = 1;
  clearGallery();
  hideLoadMoreButton();

  showLoader();

  // даємо браузеру відмалювати лоадер
  setTimeout(async () => {
    try {
      const data = await getImagesByQuery(query, page);
      totalHits = data.totalHits;

      if (data.hits.length === 0) {
        iziToast.error({ message: "Sorry, no images found." });
        return;
      }

      createGallery(data.hits);

      if (totalHits > PER_PAGE) {
        showLoadMoreButton();
      } else {
        iziToast.info({
          message: "We're sorry, but you've reached the end of search results.",
        });
      }
    } catch (error) {
      iziToast.error({ message: "Error fetching images." });
    } finally {
      hideLoader();
    }
  }, 0);
}

// --- Завантажити ще ---
async function handleLoadMore() {
  hideLoadMoreButton();
  showLoader();

  setTimeout(async () => {
    try {
      page += 1;
      const data = await getImagesByQuery(query, page);

      createGallery(data.hits);

      const totalPages = Math.ceil(totalHits / PER_PAGE);
      if (page >= totalPages) {
        hideLoadMoreButton();
        iziToast.info({
          message: "We're sorry, but you've reached the end of search results.",
        });
      } else {
        showLoadMoreButton();
      }

      // плавний скрол після додавання карток
      const card = document.querySelector(".gallery-item");
      if (card) {
        const { height } = card.getBoundingClientRect();
        window.scrollBy({ top: height * 2, behavior: "smooth" });
      }
    } catch (error) {
      iziToast.error({ message: "Error loading more images." });
    } finally {
      hideLoader();
    }
  }, 0);
}