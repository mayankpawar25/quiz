import * as actionSDK from "action-sdk-sunny";

// ActionSDK.APIs.actionViewDidLoad(true /*success*/ );

// Fetching HTML Elements in Variables by ID.
var root = document.getElementById("root");
var $root = $("#root");
let row = {};
let actionInstance = null;
// let resp_data = '{"action":{"id":"e38c2aa3-46dc-481c-99ba-99dec68467d8","creatorId":"0:a2c90ce0-a0da-4596-8f4a-3d1aa8ced6c8","createTime":1592204119381,"updateTime":1592204119381,"title":"Quiz Title","expiryTime":1592808910291,"version":1,"status":"Active","actionPackageId":"com.microsoft.test.mike006","subscriptions":[{"id":"19:5e1c941d899f4438b0fab5c05aaebe9c@thread.tacv2","type":"Group","source":"Teams","properties":{"teamId":"19:5e1c941d899f4438b0fab5c05aaebe9c@thread.tacv2","aadObjectId":"2949ba24-14ba-4f35-b4c5-57b1e726ca69"}}],"dataSets":[{"id":"Default","itemsVisibility":"All","itemsEditable":true,"canUserAddMultipleItems":true,"dataFields":[{"id":"1","title":"1","type":"SingleOption","allowNullValue":false,"options":[{"id":"question1option1","title":"o1"},{"id":"question1option2","title":"o2"},{"id":"question1option3","title":"o3"},{"id":"question1option4","title":"o4"}]},{"id":"2","title":"q2","type":"SingleOption","allowNullValue":false,"options":[{"id":"question2option1","title":"op1"},{"id":"question2option2","title":"op2"}]}]}]}}';

// *********************************************** HTML ELEMENT***********************************************
$(document).ready(function () {
    OnPageLoad();
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
        /* .catch(function(error) {
            console.log("Error: " + JSON.stringify(error));
        }) */
        ;
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

        var $card = $('<div class="card"></div>');
        var $title = $("<h4>" + actionInstance.displayName + "</h4>");
        var $hr = $("<hr>");
        var $description = $('<p class="mb0">' + actionInstance.properties[0].value + '</p>');
        console.log(actionInstance);
        $card.append($title);
        $card.append($description);
        $root.append($card);
        createQuestionView();
        $root.append($hr);

        var $spDiv = $('<div class="col-sm-12"></div>');
        var $sDiv = $('<div class="form-group"></div>');
        var $submit = $('<button class="btn btn-primary btn-sm float-right submit-form" >Submit</button>'); // Create a <button> element
        $sDiv.append($submit);
        $spDiv.append($sDiv);
        $root.append($spDiv);
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
            var $questionHeading = $("<label>" + count + ". " + question.displayName + "</label>"); // Heading of For
            var $card = $('<div class="card"></div>');
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
    var $oDiv = $('<div class="form-group radio-section" id="' + id + '" columnId="' + name + '" ></div>');
    var $soDiv = $('<div class="custom-control custom-checkbox"></div>');
    var radiobox = '<input type="radio" name="' + name + '" id="' + id + '">';
    var $lDiv = $("<label>" + radiobox + " " + text + "</label>");
    $oDiv.append($soDiv);
    $soDiv.append($lDiv);
    return $oDiv;
}

function getCheckboxButton(text, name, id) {
    var $oDiv = $('<div class="form-group radio-section" id="' + id + '" columnId="' + name + '" ></div>');
    var $soDiv = $('<div class="custom-control custom-checkbox"></div>');
    var radiobox = '<input type="checkbox" name="' + name + '" id="' + id + '">';
    var $lDiv = $('<label>' + radiobox + ' ' + text + '</label>');
    $oDiv.append($soDiv);
    $soDiv.append($lDiv);
    return $oDiv;
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
                if (actionInstance.properties[3].value == 'Yes') {
                    var correct_answer = $.parseJSON(actionInstance.properties[4].value);
                    console.log('correct_answer: ');
                    console.log(correct_answer);
                    var count = 0;

                    var ans_rsp = '';
                    $('#root').find('div.card').each(function (i, val) {
                        if (i > 0) {
                            var searchIDs = $(val).find('input:checked').map(function () {
                                return $(this).attr('id');
                            });

                            var correct_ans = '';
                            if (JSON.stringify(correct_answer[count]) == JSON.stringify(searchIDs.get())) {
                                $.each(correct_answer[count], function (ind, ans_id) {
                                    correct_ans += $.trim($(val).find('input#' + ans_id).parents('label').text()) + '<br>';
                                })

                                ans_rsp += '<div class="form-group"><h4>Question' + i + ' Answer is Correct. </h4 > <label> Your answer is <br>' + correct_ans + '</label><hr></div>';

                                /*  Answer is correct  */
                                // alert('Question' + i + ' Answer is Correct.\nYour Answer is ' + correct_ans);
                            } else {
                                /*  Answer is incorrect  */
                                $.each(correct_answer[count], function (ind, ans_id) {
                                    correct_ans += $.trim($(val).find('input#' + ans_id).parents('label').text()) + ' <br>';
                                })
                                // alert('Question' + i + ' Answer is Incorrect. \nCorrect Answer is ' + correct_ans);
                                ans_rsp += '<div class="form-group"><h4>Question' + i + ' Answer is Incorrect. </h4> <label> Correct Answer is <br>' + correct_ans + '</label><hr></div>';
                            }

                            count++;
                        }
                    });

                    $('#exampleModalCenter').find('#exampleModalLongTitle').html('<img src="images/warning.png"/> Answer response!');
                    $('#exampleModalCenter').find('.modal-body').html(ans_rsp);
                    $('#exampleModalCenter').find('.modal-footer').html('<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>');
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