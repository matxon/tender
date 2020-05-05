$(document).ready(function(){

    let table = '#datatable';

    feather.replace();

    function table_cb() {
        var api = $(table).DataTable();
        api.$('tr').click( function () {
            let arg = $(this).find('td').first().text();
            duty_function.push(request_after_close);
            getPage('modal_container', '/modal-edit-request', arg)
            console.log('open modal-EDIT-request');
        });
    }

    function request_after_close(data) {
        console.log('request_after_close from requests.ejs')
        request_table.ajax.reload(table_cb);
    }


    /*  Кнөпкіге event байлау
     *  Мұның бәрін не үшін жасап жатырмын? Менде интернет беттері бөлек-бөлек шақырылып алатындықтан
     *  ондағы скриптілер бір-бірімен конфликтіге келіп қалмас үшін жасап жатырмын
     */
    $('#new').click(function () {
        duty_function.push(request_after_close);
        $('#new').prop('disabled', true);
        getPage('modal_container', '/modal-add-request','', function() {
            $('#new').prop('disabled', false);
        });
        console.log('open modal-ADD-request');
    });


    /*  DataTable options:
     *  {
     *      lengthChange: boolean           Таблицадағы қатарлардың санын таңдау мүмкіндігі
     *      select: boolean                 Таблица жолдарын белгілей алу мүмкіндігі
     *      ...
     *      "createdRow": function(row, data, index) {
     *          f(data.status == "Новый") {
     *              $(row).css('font-weight','bold');
     *       },
     *      "initComplete": table_cb
     *  }
     */
    let request_table = $(table).DataTable({
        "stateSave": opt.stateSave,
        "lengthMenu": opt.lengthMenu,
        "processing": opt.processing,
        "serverSide": opt.serverSide,
        "ajax": {
            "url": "/requests-view",
            "type": "POST"
        },
        "dom": 'B<"clear">flrtip',
        "buttons": [
            'copy', 'csv', 'excel', 'pdf', 'print'
        ],
        "columns": [
            { "data": "tender_id" },
            { "data": "start_date" },
            /*{ "data": "end_date" },*/
            { "data": "tender_name" },
            { "data": "customer_name" },
            { "data": "contact_name" },
            { "data": "user_name" },
            { "data": "company_name" },
            { "data": "status" }
        ],
        "createdRow": function(row, data, index) {
        },
        "initComplete": table_cb
    });

})



