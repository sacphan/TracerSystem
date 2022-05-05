// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.


//Add Rule Phone UK
$(document).ready(function () {
    jQuery.validator.addMethod('phoneUK', function (phone_number, element) {
        return this.optional(element) || phone_number.length > 9 &&
            phone_number.match(/^(\(?(0|\+44)[1-9]{1}\d{1,4}?\)?\s?\d{3,4}\s?\d{3,4})$/);
    }, 'Please specify a valid phone number'
    );
});
