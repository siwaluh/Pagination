let post = [{
  id: 'post-1',
  content: 'post-content-1'
}, {
  id: 'post-2',
  content: 'post-content-2'
}, {
  id: 'post-3',
  content: 'post-content-3'
}, {
  id: 'post-4',
  content: 'post-content-4'
}, {
  id: 'post-5',
  content: 'post-content-5'
}, {
  id: 'post-6',
  content: 'post-content-6'
}, {
  id: 'post-7',
  content: 'post-content-7'
}, {
  id: 'post-8',
  content: 'post-content-8'
}];

let paginationElement,
  paginationId = document.getElementById('pagination'),
  contentId = document.getElementById('content'),
  pagination = new Pagination({
    callback: function (mainElement, currentPage, mainArray) {
      paginationElement = {
        mainElement,
        currentPage
      };

      if(contentId) {
        let html = '';
        currentPage = currentPage - 1;
        mainArray[currentPage].items.forEach(post => {
          html += `<li>${post.content}</li>`;
        });
        contentId.innerHTML = html;
      }

      if (paginationId) {
        paginationId.innerHTML = '';
        paginationId.appendChild(mainElement);
      };
    }
  });

paginationElement = pagination.arrayToPage(post, 3, true);