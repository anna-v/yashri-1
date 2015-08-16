(function () {
  'use strict';

  var tableHeader = document.querySelector('.flights__header--static'),
      fixedTableHeader = tableHeader.cloneNode(true),
      container = document.querySelector('.flights');

  window.addEventListener('scroll', function () {
    var offset = tableHeader.getBoundingClientRect().top;

    if (offset <= 0.5) {
      container.appendChild(fixedTableHeader);
      fixedTableHeader.classList.remove('flights__header--static');
      fixedTableHeader.classList.add('flights__header--fixed');
    }
    else if (!(document.querySelector('.flights__header--fixed') === null) && offset >= 0) {
      container.removeChild(fixedTableHeader);
    }

  }, false);

})();
