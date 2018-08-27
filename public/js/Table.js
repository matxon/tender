/*
 *  Тәуелділіктер:
 *          jQuery
 *          Font Awesome
 * *************************************************************************
 * 
 *  Table.js класс
 *  cols  { col1: data1, col2: data2, col3: data3, ... colN: dataN }
 *  rows  [ {cols}, {cols}, {cols}, ... {cols} ]
 *  thead { col1: text, col2: text, col3: text, ... colN: text }
 *  style { col1: classList, col2: classList, ... colN: classList }
 *  events - ???
 * 
 *  1. Obj || [Obj]   беріледі, соған қарап өзі анықтап алуы керек        
 *  2. эффектілер  hover ж.т.б
 *  3. стиль:    table   .table-dark, .table-light, .table-stripped, .table-bordered, .table-borderless, .table-hover .table-sm
 *               thead   .thead-dark, .thead-light
 *               tr, td  .table-active .table-primary .table-secondary .table-success .table-danger .table-warning .table-info .table-light .table-dark
 *
 *  4. Неше жолдан тұрады row немесе шексіз болады
 *  5. Modes:   View || Edit || Create
 * ************************************************************************* 
 *  Methods:
 *    create()
 *    render() || show()
 * 
 * 
 * 
 * 
 */


function Table(options) { //data, head, style, thstyle, tdstyle) {
    // initialization ---------------------------------------------------
    var data = options.data || [{ a: 'Мәлімет жоқ'}],
        head = options.head || ['Мәлімет жоқ'],
        style = options.style || { table: "table table-light table-hover table-sm", thead: "thead-light" },
        thstyle = options.thstyle || [],
        tdstyle = options.tdstyle || [],
        mode = options.mode || 'view',
        table;
    var rows = options.rows || 15, cols;

        if (data.length > 0) 
            cols = Object.keys(data[0]).length;   // әзірге пайдасы жоқ
        else 
            cols = head.length;


    if ( thstyle.length == 0 ) 
        for(let i = 0; i < cols; i++ ) { thstyle[i] = "text-center"; }

    if ( tdstyle.length == 0 ) 
        for(let i = 0; i < cols; i++ ) { tdstyle[i] = ""; }

    // --------------------------------------------------------------------

    this.create = function() {
        table = document.createElement('div');
        return table;
    }

    this.render = function(page = 1) {
        let html = generateHTML(page);
        // осы жерде евент жасау керек, сол арқылы жоғарыда тұрғандар 
        // сол евентті өңдеу арқылы экрандағы кестенің мазмұны өзгереді
        //
        //  төмендегі кодты сол обработчиктің ішіне салу керек 
        table.innerHTML="";
        table.insertAdjacentHTML('beforeend', html);
    }

    function generateHTML(page) {
        let from = (page - 1) * options.rows;
        let to = from + rows;
        let html = `<table class="${style.table}"><thead class="${style.thead}"><tr>`;
        for( let key in head ) html += `<th scope="col" class="${thstyle[key]}">` + head[key] + '</th>';
        if (mode == 'edit') html += `<th></th>`;
        html += '</tr></thead><tbody>';
        for(i=from; i < to; i++) { 
            html += '<tr>';
            let index = 0;  // data[i] is Object so index need
            if(data[i]) {
                for(var key in data[i]) { 
                    html += `<td class="${tdstyle[index]}">` + data[i][key] + '</td>'; index++;
                }
                if (mode == 'edit') html += `<td class="text-right"><i class="far fa-edit"></i></td>`;
            }
            html += '</tr>';
        }
        html += '</tbody></table>';
        
        return html;
    }
}