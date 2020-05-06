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

    $("#smartwizard").on("leaveStep", function(e, anchorObject, stepNumber, stepDirection) {
        var elmForm = $("#form-step-" + stepNumber + ' select.form-control');
        elmForm = document.querySelectorAll('select.form-control');
        // stepDirection === 'forward' :- this condition allows to do the form validation
        // // only on forward navigation, that makes easy navigation on backwards still do the validation when going next
        //if(stepDirection === 'forward' && elmForm){
        //     elmForm.validator('validate');
        //     var elmErr = elmForm.children('.has-error');
        //     if(elmErr && elmErr.length > 0){
        //         // Form validation failed
        //         return false;
        //     }
        console.log(elmForm);
        elmForm.forEach(function(elm){

            if (elm.checkValidity() === false) {
                console.log(elm.checkValidity())
            }
        });
        //}
        //return true;
    });
})
