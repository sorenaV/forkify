import icons from '../../img/icons.svg';
import View from './View.js';
class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandleClicks(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.result.length / this._data.resultsPerPage
    );

    //Page 1, there are other pages
    if (curPage === 1 && numPages > 1) {
      return `
        <button data-goto="${
          curPage + 1
        }" class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button> 
        <p class="page">${curPage}</p>
      `;
    }
    //Last page
    if (curPage === numPages && numPages > 1) {
      return `
        <button data-goto="${
          curPage - 1
        }" class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${curPage - 1}</span>
        </button>
        <p class="page">${curPage}</p>
      `;
    }
    //Other page
    if (curPage < numPages) {
      return `
        <button data-goto="${
          curPage - 1
        }" class="btn--inline pagination__btn--prev">
           <svg class="search__icon">
           <use href="${icons}#icon-arrow-left"></use>
           </svg>
           <span>Page ${curPage - 1}</span>
        </button>
        <button data-goto="${
          curPage + 1
        }" class="btn--inline pagination__btn--next">
           <span>Page ${curPage + 1}</span>
           <svg class="search__icon">
           <use href="${icons}#icon-arrow-right"></use>
           </svg>
        </button> 
        <p class="page">${curPage}</p>
    `;
    }
    //Page 2, there are NO other pages
    return `<p class="page">${curPage}</p>`;
  }
}

export default new PaginationView();
