class Pagination {
  constructor(e) {
    this._config = e || {};
  }

  click(e, mainArray) {
    let hash = e.hash.split('page-')[1],
      numb = Array.isArray(mainArray) ? mainArray.length : mainArray;
    this.createPage(numb, Number(hash), mainArray);
  }

  createElement(id, className, mainArray, name) {
    let a = document.createElement(className == 'page-numbers current' ? 'span' : 'a');
    a.className = className;
    a.href = `#${id}`;
    if (className != 'page-numbers current')
      a.addEventListener('click', (e) => {
        e.preventDefault();
        this.click(a, mainArray);
      });
    a.innerText = name || id.split('page-')[1];
    return a;
  }

  createPage(arrayLength, currentPage, mainArray) {
    let active,
      offices,
      pageId,
      mainElement = document.createElement('div'),
      pageCutLow = currentPage - 1,
      pageCutHigh = currentPage + 1;
    mainArray = mainArray || arrayLength;
    mainElement.className = 'pagination';
    if (arrayLength >= 2) {
      if (currentPage > 1) {
        offices = arrayLength <= 2 ? 'prev-left' : 'prev page-numbers';
        pageId = `page-${(currentPage - 1)}`;
        mainElement.appendChild(this.createElement(pageId, offices, mainArray, '« Sebelumnya'));
      }
      if (arrayLength > 2) {
        if (arrayLength <= 6) {
          for (let index = 1; index <= arrayLength; index++) {
            active = currentPage == index ? "page-numbers current" : "page-numbers";
            pageId = `page-${index}`;
            mainElement.appendChild(this.createElement(pageId, active, mainArray));
          }
        } else {
          if (currentPage > 2) {
            pageId = `page-1`;
            mainElement.appendChild(this.createElement(pageId, 'page-numbers', mainArray));
            if (currentPage > 3 && currentPage != arrayLength && currentPage != (arrayLength - 1)) {
              pageId = `page-${(currentPage - 2)}`;
              mainElement.appendChild(this.createElement(pageId, 'page-numbers', mainArray));
            }
          }

          if (currentPage === 1) {
            pageCutHigh += 2;
          } else if (currentPage === 2) {
            pageCutHigh += 1;
          }
          if (currentPage === arrayLength) {
            pageCutLow -= 2;
          } else if (currentPage === arrayLength - 1) {
            pageCutLow -= 1;
          }

          for (let index = pageCutLow; index <= pageCutHigh; index++) {
            if (index === 0) {
              index += 1;
            }
            if (index > arrayLength) {
              continue
            }
            active = currentPage == index ? "page-numbers current" : "page-numbers";
            if (currentPage != arrayLength || currentPage == arrayLength && index != arrayLength - 3) {
              pageId = `page-${index}`;
              mainElement.appendChild(this.createElement(pageId, active, mainArray));
            };
          }

          if (currentPage < arrayLength - 1) {
            if (currentPage < arrayLength - 2 && currentPage != 1 && currentPage != 2) {
              pageId = `page-${(currentPage + 2)}`;
              mainElement.appendChild(this.createElement(pageId, 'page-numbers', mainArray));
            }
            pageId = `page-${arrayLength}`;
            mainElement.appendChild(this.createElement(pageId, 'page-numbers', mainArray));
          }
        }
      }
      if (currentPage < arrayLength) {
        offices = arrayLength <= 2 ? 'next-r' : 'next page-numbers';
        pageId = `page-${(currentPage + 1)}`;
        mainElement.appendChild(this.createElement(pageId, offices, mainArray, 'Berikutnya »'));
      }
    }
    (this._config.callback && this._config.callback(mainElement, currentPage, mainArray));
    return {
      'currentPage': currentPage,
      'mainElement': mainElement
    };
  }

  arrayToPage(items, max, ex) {
    let index = Array.isArray(items) ? items.length : items,
      mainArray = Array(Math.ceil(index / max)).fill(0).map((v, i) => ({
        'id': `page-${i + 1}`,
        'items': Array.isArray(items) ? items.slice(i * max, Math.min(items.length, (i + 1) * max)) : []
      }));
    return ex ? this.createPage(mainArray.length, 1, mainArray) : mainArray;
  }
}