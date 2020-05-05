$(document).ready(function() {

    $('#smartwizard').smartWizard({
        //selected: 0,
        //useURLhash: false,
        //showStepURLhash: false,
        contentURL: '/wizard',
        keyNavigation: false,
        ajaxSettings: {
            method: "post"
        }
    });
})
