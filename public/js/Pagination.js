/*
 *
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */

// LI:              .disabled                .active
// a:             tabindex="-1"           <a> -> <span>
//                                        .appendChild('<span class="sr-only">(current)</span>')
/*
<nav>
  <ul class="pagination">   // pagination-lg, pagination-sm
                            // justify-content-center, justify-content-end flexbox utilities
    <li class="page-item">
      <a class="page-link" href="#" aria-label="Previous"><span aria-hidden="true">&laquo;</span><span class="sr-only">Previous</span></a>
    </li>

    <li class="page-item"><a class="page-link" href="#">1</a></li>
    <li class="page-item"><a class="page-link" href="#">2</a></li>
    <li class="page-item"><a class="page-link" href="#">3</a></li>
    
    <li class="page-item">
      <a class="page-link" href="#" aria-label="Next"><span aria-hidden="true">&raquo;</span><span class="sr-only">Next</span></a>
    </li>

  </ul>
</nav>
*/


function Pagination(options) {

    options = options || {};
    // { size = 'pagination-sm', count = 1, align = 'justify-content-end' } = options;
    var size = options.size || 'pagination-sm', 
        count = options.count || 1, 
        align = options.align || 'justify-content-end';
    var page = { count: count, current: 1 };
    var elem;

    this.create = function() {
        elem = document.createElement('nav');
        return elem;
    }
    
    this.render = function() {
        let html = generateHTML();
        elem.innerHTML = html;
        
    }

    function generateHTML() {
        let html = `<ul class="pagination ${size} ${align}">`;

        if (page.current == 1) {
            html += `<li class="page-item disabled">` +
            `<span class="page-link" aria-label="Previous"><span aria-hidden="true">&laquo;</span><span class="sr-only">Previous</span></span>` +
            `</li>`;
        } else {
            html += `<li class="page-item">` +
            `<a class="page-link" href="#" aria-label="Previous"><span aria-hidden="true">&laquo;</span><span class="sr-only">Previous</span></a>`  +
            `</li>`;

        }
        for (let i = 1; i <= page.count; i++) {
            if (i == page.current) {
                html += `<li class="page-item active">` +
                `<span class="page-link">${i}<span class="sr-only">(current)</span></span>` +
                `</li>`;
            } else {
                html += `<li class="page-item">` +
                `<a class="page-link" href="#">${i}</a>` +
                `</li>`;
            }
        }

        if (page.current == page.count) {
            html += `<li class="page-item disabled">` +
            `<span class="page-link" aria-label="Next"><span aria-hidden="true">&raquo;</span><span class="sr-only">Next</span></span>` +
            `</li>`;
        } else {
            html += `<li class="page-item">` +
            `<a class="page-link" href="#" aria-label="Next"><span aria-hidden="true">&raquo;</span><span class="sr-only">Next</span></a>` +
            `</li>`;
        }

        html += `</ul>`;

        return html;
    } 

    this.page = function(n) {
        page.current = n;
    }

}