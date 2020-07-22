import * as actionSDK from "action-sdk-sunny";

// ActionSDK.APIs.actionViewDidLoad(true /*success*/ );

// Fetching HTML Elements in Variables by ID.
var $root = "";
let row = {};
let actionInstance = null;

async function getTheme(request) {
    let response = await actionSDK.executeApi(request);
    let context = response.context;
    console.log("getContext response: ");
    console.log(JSON.stringify(context));
    $("form.section-1").show();
    var theme = context.theme;
    console.log(`theme: ${context.theme}`)
    $("link#theme").attr("href", "css/style-" + theme + ".css");

    $('div.section-1').append(`<div class="row"><div class="col-12"><div id="root"></div></div></div>`);
    $('div.section-1').after(modal_section);
    $('div.section-1').after(footer_section);
    $root = $("#root")

    OnPageLoad();
}

// *********************************************** HTML ELEMENT***********************************************
$(document).ready(function () {
    let request = new actionSDK.GetContext.Request();
    getTheme(request);
});

function OnPageLoad() {
    actionSDK
        .executeApi(new actionSDK.GetContext.Request())
        .then(function (response) {
            console.info("GetContext - Response: " + JSON.stringify(response));
            getActionInstance(response.context.actionId);
        })
        .catch(function (error) {
            console.error("GetContext - Error: " + JSON.stringify(error));
        });
}

function getActionInstance(actionId) {
    actionSDK
        .executeApi(new actionSDK.GetAction.Request(actionId))
        .then(function (response) {
            console.info("Response: " + JSON.stringify(response));
            actionInstance = response.action;
            createBody();
        })
        .catch(function (error) {
            console.log("Error: " + JSON.stringify(error));
        });
}

function createBody() {

    /*  Check Expiry date time  */
    var current_time = new Date().getTime();
    if (actionInstance.expiryTime <= current_time) {
        var $card = $('<div class="card"></div>');
        var $spDiv = $('<div class="col-sm-12"></div>');
        var $sDiv = $('<div class="form-group">Quiz Expired...</div>');
        $card.append($spDiv);
        $spDiv.append($sDiv);
        $root.append($card);
    } else {

        var $card = $('<div class=""></div>');
        var $title = $("<h4>" + actionInstance.displayName + "</h4>");
        var $hr = $("<hr>");
        var $description = $('<p class="">' + actionInstance.customProperties[0].value + '</p>');
        console.log(actionInstance);
        $card.append($title);
        $card.append($description);
        $root.append($card);
        createQuestionView();
        $root.append($hr);

        /* var $spDiv = $('<div class="col-sm-12"></div>');
        var $sDiv = $('<div class="form-group"></div>');
        var $submit = $('<button class="btn btn-primary btn-sm float-right submit-form" >Submit</button>'); // Create a <button> element
        $sDiv.append($submit);
        $spDiv.append($sDiv);
        $root.append($spDiv); */
        return;
    }
}

$(document).on('click', '.submit-form', function () {
    submitForm();
})

function createQuestionView() {
    var count = 1;
    actionInstance.dataTables.forEach((dataTable) => {
        dataTable.dataColumns.forEach((question, ind) => {
            var count = ind + 1;
            var $card = $('<div class="card-box card-border card-bg"></div>');
            var $questionHeading = $("<label><strong>" + count + ". " + question.displayName + "</strong></label>"); // Heading of For
            $card.append($questionHeading);
            var choice_occurance = 0;
            /* Check multichoice or single choice options  */
            if (question.valueType == "SingleOption") {
                choice_occurance = 1;
            } else {
                choice_occurance = 2;
            }

            console.log("choice occurance" + choice_occurance);
            console.log("question" + question.valueType);

            //add radio button
            if (choice_occurance > 1) {
                question.options.forEach((option) => {
                    var $radioOption = getCheckboxButton(
                        option.displayName,
                        question.name,
                        option.name
                    );
                    $card.append($radioOption);
                });
            } else {
                //add checkbox button
                question.options.forEach((option) => {
                    var $radioOption = getRadioButton(
                        option.displayName,
                        question.name,
                        option.name
                    );
                    $card.append($radioOption);
                });
            }
            $root.append($card);
        });

        count++;
    });
}

function getRadioButton(text, name, id) {
    var $div_data = $(`<div class="form-group radio-section custom-radio-outer" id="${id}" columnId="${name}" ><label class="custom-radio"><input type="radio" name="${name}" id="${id}"> <span class="radio-block"></span> ${text}</label></div>`)
    return $div_data;
}

function getCheckboxButton(text, name, id) {
    /* var $oDiv = $('<div class="form-group radio-section custom-check-outer" id="' + id + '" columnId="' + name + '" ></div>');
    var $soDiv = $('<label class="custom-check form-check-label"></label>');
    var radiobox = '<input type="checkbox" class="form-check-input" name="' + name + '" id="' + id + '">';
    var $lDiv = $(radiobox + ' <span class="checkmark"></span>' + text);
    $oDiv.append($soDiv);
    $soDiv.append($lDiv);
    return $oDiv; */
    var div_data = $(`<div class="form-group radio-section custom-check-outer" id="${id}" columnId="${name}" ><label class="custom-check form-check-label"><input type="checkbox" class="form-check-input" name="${name}" id="${id}"><span class="checkmark"></span> ${text}</label></div>`)
    return div_data;
}

$(document).on('click', 'div.radio-section', function () {
    radiobuttonclick($(this).id, $(this).attr('columnId'));
})


// *********************************************** HTML ELEMENT END***********************************************

// *********************************************** SUBMIT ACTION***********************************************

function submitForm() {
    actionSDK
        .executeApi(new actionSDK.GetContext.Request())
        .then(function (response) {
            console.info("GetContext - Response: " + JSON.stringify(response));

            /*  Check Show Correct Answer  */
            if (Object.keys(row).length > 0) {
                if (actionInstance.customProperties[3].value == 'Yes') {
                    var correct_answer = $.parseJSON(actionInstance.customProperties[4].value);
                    console.log('correct_answer: ');
                    console.log(correct_answer);
                    var count = 0;

                    var ans_rsp = '';
                    $('#root').find('div.card-box').each(function (i, val) {

                        var searchIDs = $(val).find('input:checked').map(function () {
                            return $(this).attr('id');
                        });

                        var correct_ans = '';
                        var your_ans = '';

                        if (JSON.stringify(correct_answer[count]) == JSON.stringify(searchIDs.get())) {
                            /*  Answer is correct  */
                            $.each(correct_answer[count], function (ind, ans_id) {
                                correct_ans += '<div class="alert alert-success"><p class="mb0">' + $.trim($(val).find('input#' + ans_id).parents('label').text()) + '<i class="fa fa-pull-right fa-check"></i></p></div>';
                            });
                            console.log('correct_ans' + correct_ans);

                            ans_rsp += '<p class="mb0"><strong>' + (i + 1) + '. Your Answer is right. </strong ></p> <p> Your answer is </p>' + correct_ans;

                        } else {
                            /*  Answer is incorrect  */
                            $.each(searchIDs.get(), function (yind, yans_id) {
                                console.log('your ans: ' + $(val).find('input#' + yans_id).attr('id'));
                                console.log(JSON.stringify(correct_answer[count]));
                                if ($.inArray($(val).find('input#' + yans_id).attr('id'), correct_answer[count]) != -1) {
                                    // found it
                                    your_ans += '<div class="alert alert-success"><p class="mb0">' + $.trim($(val).find('input#' + yans_id).parents('label').text()) + '<i class="fa fa-pull-right fa-check"></i></p></div>';
                                } else {
                                    your_ans += '<div class="alert alert-danger"><p class="mb0">' + $.trim($(val).find('input#' + yans_id).parents('label').text()) + '<i class="fa fa-pull-right fa-close"></i></p></div>';
                                }
                            })

                            $.each(correct_answer[count], function (ind, ans_id) {
                                correct_ans += '<div class="alert alert-success"><p class="mb0">' + $.trim($(val).find('input#' + ans_id).parents('label').text()) + '<i class="fa fa-pull-right fa-check"></i></p></div>';
                            })

                            ans_rsp += '<p class="mb0"><strong>' + (i + 1) + '. Your Answer is wrong. </strong></p> <p>Your Answer is </p> ' + your_ans + ' <p> Right Answer is </p>' + correct_ans;
                        }
                        count++;
                    });

                    $('#exampleModalCenter').find('#exampleModalLongTitle').html('<img src="images/warning.png"/> Answer response!');
                    $('#exampleModalCenter').find('.modal-body').html(ans_rsp);
                    $('#exampleModalCenter').find('.modal-footer').html('<button type="button" class="btn btn-primary btn-sm" data-dismiss="modal">Next</button>');
                    $('#exampleModalCenter').find('#save-changes').hide();
                    $('#exampleModalCenter').modal('show');

                    $("#exampleModalCenter").on("hidden.bs.modal", function () {
                        // put your default event here
                        addDataRows(response.context.actionId);
                    });
                } else {
                    addDataRows(response.context.actionId);
                }
            }
        })
        .catch(function (error) {
            console.error("GetContext - Error: " + JSON.stringify(error));
        });
}

function radiobuttonclick(questionResponse, colomnId) {
    var data = [];
    row = {};
    $.each($("input[type='checkbox']:checked"), function (ind, v) {
        var col = $(this).parents("div.form-group").attr("columnid");
        data.push($(this).attr("id"));

        if (!row[col]) row[col] = [];
        row[col] = JSON.stringify(data);
    });

    $.each($("input[type='radio']:checked"), function () {
        var col = $(this).parents("div.form-group").attr("columnid");

        if (!row[col]) row[col] = [];
        row[col] = $(this).attr("id");
    });

    console.log(row);
}

function generateGUID() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
        var r = (Math.random() * 16) | 0,
            v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}

function getDataRow(actionId) {
    var data = {
        id: generateGUID(),
        actionId: actionId,
        dataTableId: "TestDataSet",
        columnValues: row,
    };
    console.log("data-:  " + JSON.stringify(data));
    console.log(data);
    return data;
}

function addDataRows(actionId) {
    var addDataRowRequest = new actionSDK.AddActionDataRow.Request(
        getDataRow(actionId)
    );
    var closeViewRequest = new actionSDK.CloseView.Request();
    var batchRequest = new actionSDK.BaseApi.BatchRequest([
        addDataRowRequest,
        closeViewRequest,
    ]);
    actionSDK
        .executeBatchApi(batchRequest)
        .then(function (batchResponse) {
            console.info("BatchResponse: " + JSON.stringify(batchResponse));
        })
        .catch(function (error) {
            console.error("Error: " + JSON.stringify(error));
        });
}

// *********************************************** SUBMIT ACTION END***********************************************

var footer_section = `<div class="footer">
        <div class="footer-padd bt">
            <div class="container ">
                <div class="row">

                    <div class="col-12 text-right">
                        <button class="btn btn-primary btn-sm float-right submit-form">Submit</button>
                    </div>
                </div>
            </div>
        </div>
    </div>`;

var modal_section = `<div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog"
        aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title app-black-color" id="exampleModalLongTitle">Modal title</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div class="modal-body app-black-color">
                    ...
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-secondary btn-sm" data-dismiss="modal">Back</button>
                    <button type="button" class="btn btn-primary btn-sm" id="save-changes">Save changes</button>
                </div>
            </div>
        </div>
    </div>`;