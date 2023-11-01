let array = [1,2,3,4,5,6,7,8,9],
      perPage = 3;

    let paginationElement, //Global variable khusus pagination element yang akan di buat.
      contentId = document.getElementById('content'),
      paginationId = document.getElementById('pagination'),

      // Dalam membuat pagination kita tambahkan paramater object callback untuk membuat html.
      pagination = new Pagination({
        'callback': function(mainElement, currentPage, mainArray) {

          // Memperbarui global variable paginationElement
          paginationElement = {
            mainElement,
            currentPage
          };

          // Menambahkan content halaman ke html
          if(contentId) {
            let html = '';

            // currentPage harus di kurangi 1 karena item pertama dalam array adalah 0 bukan 1
            currentPage = currentPage - 1;

            /* mainArray merupakan array yang awalnya 9 kemudian di bagi menjadi 3 per halaman,
            Kemudian di gabung dengan currentPage menjadi mainArray[currentPage]. 
            Jadi misalkan currentPage nilai nya 2 maka item yang di tampilkan adalah [7,8,9].
            Selanjut nya tinggal di extrack menggunakan foreach */

            mainArray[currentPage].items.forEach(item => {
              html += `<li>${item}</li>`;
            });
            contentId.innerHTML = html;
          }

          //Menambahkan pagination ke html
          if(paginationId) {
            paginationId.innerHTML = '';
            paginationId.appendChild(mainElement);
          }

        }
      });

    /*Execute Code.
    Karena saat ini kita akan menambakan pagination ke html, 
    jadi parameter terakhir kita isi dengan true bukan false*/

    paginationElement = pagination.arrayToPage(array, perPage, true)
