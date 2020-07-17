import * as actionSDK from "action-sdk-sunny";
import { GetContext } from "../../assets/ActionSDK";

// var question_counter = 1
var questionCount = 0;
let questions = new Array();
let validate = true;
let setting_text = ' Due in 1 week, Results visible to everyone';

var question_section = $("#question-section div.container").clone();
var opt = $("div#option-section .option-div").clone();

/* Add Questions */
$(document).on("click", "#add-questions", function () {
    var question_counter;
    $(this).parents("div.container").before(question_section.clone());

    $("div.question-container:visible").each(function (index, elem) {
        question_counter = index + 1;
        $(elem)
            .find("span.question-number")
            .text(question_counter + ".");
        $(elem).attr({ id: "question" + question_counter });
    });
    questionCount++;
});

/* Remove Questions */
$(document).on("click", ".remove-question", function () {
    var element = $(this);
    if ($("div.question-container:visible").length > 1) {
        $("#exampleModalCenter")
            .find("#exampleModalLongTitle")
            .html('<svg height="427pt" viewBox="-40 0 427 427.00131" width="427pt" xmlns="http://www.w3.org/2000/svg" class="gt gs mt--4">< path d = "m232.398438 154.703125c-5.523438 0-10 4.476563-10 10v189c0 5.519531 4.476562 10 10 10 5.523437 0 10-4.480469 10-10v-189c0-5.523437-4.476563-10-10-10zm0 0" ></path ><path d="m114.398438 154.703125c-5.523438 0-10 4.476563-10 10v189c0 5.519531 4.476562 10 10 10 5.523437 0 10-4.480469 10-10v-189c0-5.523437-4.476563-10-10-10zm0 0"></path><path d="m28.398438 127.121094v246.378906c0 14.5625 5.339843 28.238281 14.667968 38.050781 9.285156 9.839844 22.207032 15.425781 35.730469 15.449219h189.203125c13.527344-.023438 26.449219-5.609375 35.730469-15.449219 9.328125-9.8125 14.667969-23.488281 14.667969-38.050781v-246.378906c18.542968-4.921875 30.558593-22.835938 28.078124-41.863282-2.484374-19.023437-18.691406-33.253906-37.878906-33.257812h-51.199218v-12.5c.058593-10.511719-4.097657-20.605469-11.539063-28.03125-7.441406-7.421875-17.550781-11.5546875-28.0625-11.46875h-88.796875c-10.511719-.0859375-20.621094 4.046875-28.0625 11.46875-7.441406 7.425781-11.597656 17.519531-11.539062 28.03125v12.5h-51.199219c-19.1875.003906-35.394531 14.234375-37.878907 33.257812-2.480468 19.027344 9.535157 36.941407 28.078126 41.863282zm239.601562 279.878906h-189.203125c-17.097656 0-30.398437-14.6875-30.398437-33.5v-245.5h250v245.5c0 18.8125-13.300782 33.5-30.398438 33.5zm-158.601562-367.5c-.066407-5.207031 1.980468-10.21875 5.675781-13.894531 3.691406-3.675781 8.714843-5.695313 13.925781-5.605469h88.796875c5.210937-.089844 10.234375 1.929688 13.925781 5.605469 3.695313 3.671875 5.742188 8.6875 5.675782 13.894531v12.5h-128zm-71.199219 32.5h270.398437c9.941406 0 18 8.058594 18 18s-8.058594 18-18 18h-270.398437c-9.941407 0-18-8.058594-18-18s8.058593-18 18-18zm0 0"></path><path d="m173.398438 154.703125c-5.523438 0-10 4.476563-10 10v189c0 5.519531 4.476562 10 10 10 5.523437 0 10-4.480469 10-10v-189c0-5.523437-4.476563-10-10-10zm0 0"></path></svg > Delete?');
        $("#exampleModalCenter")
            .find(".modal-body")
            .html("Are you sure you want to delete?");
        $("#exampleModalCenter")
            .find(".modal-footer")
            .html(
                '<button type="button" class="btn btn-outline-secondary btn-sm" data-dismiss="modal">Close</button><button type="button" class="btn btn-primary" id="delete-question">Ok</button>'
            );
        $("#exampleModalCenter").modal("show");

        $(document).on("click", "#delete-question", function () {
            $("#exampleModalCenter").modal("hide");

            element.parents("div.question-container").remove();
            var question_counter;
            $("div.question-container:visible").each(function (index, elem) {
                question_counter = index + 1;
                $(elem).find("span.question-number").text(question_counter);
                $(elem).attr({ id: "question" + question_counter });
            });
        });
    } else {
        $("#exampleModalCenter")
            .find("#exampleModalLongTitle")
            .html('<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve" class="gt gs mt--4"><g><g><g><path d="M507.113,428.415L287.215,47.541c-6.515-11.285-18.184-18.022-31.215-18.022c-13.031,0-24.7,6.737-31.215,18.022L4.887,428.415c-6.516,11.285-6.516,24.76,0,36.044c6.515,11.285,18.184,18.022,31.215,18.022h439.796c13.031,0,24.7-6.737,31.215-18.022C513.629,453.175,513.629,439.7,507.113,428.415z M481.101,449.441c-0.647,1.122-2.186,3.004-5.202,3.004H36.102c-3.018,0-4.556-1.881-5.202-3.004c-0.647-1.121-1.509-3.394,0-6.007L250.797,62.559c1.509-2.613,3.907-3.004,5.202-3.004c1.296,0,3.694,0.39,5.202,3.004L481.1,443.434C482.61,446.047,481.748,448.32,481.101,449.441z"/><rect x="240.987" y="166.095" width="30.037" height="160.197" /><circle cx="256.005" cy="376.354" r="20.025" /></g></g></g > <g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg > Notice!');
        $("#exampleModalCenter")
            .find(".modal-body")
            .html("For quiz atleast one question is required.");
        $("#exampleModalCenter")
            .find(".modal-footer")
            .html(
                '<button type="button" class="btn btn-outline-secondary btn-sm" data-dismiss="modal">Close</button>'
            );
        $("#exampleModalCenter").modal("show");
    }
});

/* Add Options */
$(document).on("click", ".add-options", function () {
    if (
        $(this)
            .parents("div.container")
            .find("div.option-div > div.input-group > input[type='text']").length >=
        10
    ) {
        alert("Maximum 10 options allowed for a Question");
        return false;
    }
    $(this).parents(".container").find("div.option-div:last").after(opt.clone());
    // $("div.input-group.mb-2.option-div").last().find("input");

    var selector = $(this).parents("div.container");
    $(selector)
        .find('div.option-div > div.input-group > input[type="text"]')
        .each(function (index, elem) {
            var counter = index + 1;
            $(elem).attr({
                placeholder: "Option " + counter,
            });
            $(elem).attr({ id: "option" + counter });
            $(elem)
                .parents(".option-div")
                .find("input.form-check-input")
                .attr({ id: "check" + counter });
        });
});

/* Remove Options */
$(document).on("click", ".remove-option", function (eve) {
    if (
        $(this).parents("div.question-container").find("div.option-div").length > 2
    ) {
        var selector = $(this).closest("div.container");
        $(this).parents("div.option-div").remove();
        $(selector)
            .find('div.option-div > div.input-group > input[type="text"]')
            .each(function (index, elem) {
                var counter = index + 1;
                $(elem).attr({
                    placeholder: "Option " + counter,
                });
                $(elem).attr({ id: "option" + counter });
                $(elem)
                    .parents(".option-div")
                    .find("input.form-check-input")
                    .attr({ id: "check" + counter });
            });
    } else {
        $("#exampleModalCenter")
            .find("#exampleModalLongTitle")
            .html('<img src="images/warning.png"/> Notice!');
        $("#exampleModalCenter")
            .find(".modal-body")
            .html("At least 2 options required for a Question.");
        $("#exampleModalCenter")
            .find(".modal-footer")
            .html(
                '<button type="button" class="btn btn-outline-secondary btn-sm" data-dismiss="modal">Close</button>'
            );
        $("#exampleModalCenter").modal("show");
    }
});

$(document).on("click", ".show-setting", function () {
    $(".section-1").hide();
    $("form #setting").show();
});

$(document).on("click", "#next", function () {
    /* Validate */
    var error_text = "";
    var question_number = 0;

    $("form")
        .find("input[type='text']")
        .each(function () {
            var element = $(this);
            if (element.val() == "") {
                validate = false;
                if (element.attr("id") == "quiz-title") {
                    error_text += "<p>Quiz title is required.</p>";
                } else if (element.attr("id").startsWith("question-title")) {
                    console.log("question_number.length" + question_number.length);
                    if (
                        question_number !=
                        element
                            .parents("div.form-group")
                            .find("span.question-number")
                            .text()
                    ) {
                        question_number = element
                            .parents("div.form-group")
                            .find("span.question-number")
                            .text();
                        error_text += "<h6><u>Question " + question_number + "</u> </h6>";
                    }

                    error_text += "<p>Question is required. </p>";
                } else if (element.attr("id").startsWith("option")) {
                    if (
                        question_number !=
                        element.parents("div.card").find("span.question-number").text()
                    ) {
                        question_number = element
                            .parents("div.card")
                            .find("span.question-number")
                            .text();
                        error_text += "<h6><u>Question " + question_number + "</u> </h6>";
                    }

                    error_text +=
                        "<p>Blank option not allowed for " +
                        element.attr("placeholder") +
                        ".</p>";
                }
            }
        });

    console.log("error_text.length: " + error_text.length);
    if ($.trim(error_text).length <= 0) {
        $(".section-1").hide();
        $("form").append($("#setting").clone());
        $("form #setting").show();
    } else {
        // alert(error_text);
        $("#exampleModalCenter")
            .find("#exampleModalLongTitle")
            .html('<img src="images/error.png"/> Error!');
        $("#exampleModalCenter").find(".modal-body").html(error_text);
        $("#exampleModalCenter")
            .find(".modal-footer")
            .html(
                '<button type="button" class="btn btn-outline-secondary btn-sm" data-dismiss="modal">Close</button>'
            );
        $("#exampleModalCenter").find("#save-changes").hide();
        $("#exampleModalCenter").modal("show");
    }
});

$(document).on("click", "#submit", function () {
    $("#submit").prop('disabled', true);
    submitForm();
});

function submitForm() {
    /* Validate */
    var error_text = "";
    var question_number = 0;
    $("input[type='text']").removeClass("danger");
    $("label.label-alert").remove();
    $("div.card-box-alert").removeClass("card-box-alert").addClass("card-box");


    $("form")
        .find("input[type='text']")
        .each(function () {
            var element = $(this);
            if (element.val() == "") {
                validate = false;

                $(this)
                    .parents("div.card-box")
                    .removeClass("card-box")
                    .addClass("card-box-alert");

                if (element.attr("id") == "quiz-title") {
                    error_text += "<p>Quiz title is required.</p>";
                    $("#quiz-title").addClass("danger");
                    $("#quiz-title").before(
                        '<label class="label-alert d-block"><small>Required</small></label>'
                    );
                } else if (element.attr("id").startsWith("question-title")) {
                    // console.log("question_number.length" + question_number.length);
                    $(this).addClass("danger");
                    $(this)
                        .parents("div.input-group")
                        .before(
                            '<label class="label-alert d-block"><small>Required</small></label>'
                        );

                    error_text += "<p>Question is required. </p>";
                } else if (element.attr("id").startsWith("option")) {
                    $(this).addClass("danger");
                    $(this)
                        .parents("div.input-group")
                        .before(
                            '<label class="label-alert d-block"><small>Required</small></label>'
                        );

                    error_text +=
                        "<p>Blank option not allowed for " +
                        element.attr("placeholder") +
                        ".</p>";
                }
            }
        });

    if ($.trim(error_text).length <= 0) {
        actionSDK
            .executeApi(new actionSDK.GetContext.Request())
            .then(function (response) {
                console.info("GetContext - Response: " + JSON.stringify(response));
                createAction(response.context.actionPackageId);
            })
            .catch(function (error) {
                console.error("GetContext - Error: " + JSON.stringify(error));
            });
    } else {
        $("#submit").prop('disabled', false);
        return;
    }
}

function getQuestionSet() {
    var questionCount = $("form").find("div.container.question-container").length;
    questions = new Array();
    var error = false;
    for (var i = 1; i <= questionCount; i++) {
        var option_type = actionSDK.ActionDataColumnValueType.SingleOption;

        let option = [];
        var is_selected = 0;

        /* Looping for options */
        $("#question" + i)
            .find("div.option-div")
            .each(function (index, elem) {
                var count = index + 1;
                var opt_id = "question" + i + "option" + count;
                var opt_title = $("#question" + i)
                    .find("#option" + count)
                    .val();

                if (
                    $("#question" + i)
                        .find("#check" + count)
                        .is(":checked")
                ) {
                    // if it is checked
                    is_selected++;
                }

                if (
                    $("#question" + i).find("input[type=checkbox]:checked").length > 1
                ) {
                    console.log("multiselect");
                    option_type = actionSDK.ActionDataColumnValueType.MultiOption;
                } else {
                    console.log("singleselect");
                    option_type = actionSDK.ActionDataColumnValueType.SingleOption;
                }
                option.push({ name: opt_id, displayName: opt_title });
            });

        var val = {
            name: i.toString(),
            displayName: $("#question" + i)
                .find("#question-title")
                .val(),
            valueType: option_type,
            allowNullValue: false,
            options: option,
        };

        if (is_selected == 0) {
            validate = false;
            $("#question" + i)
                .find("div.input-group:first")
                .before(
                    '<label class="label-alert d-block"><small>Please select correct choice for the question</small></label>'
                );

            $("#submit").prop('disabled', false);


            $("#question" + i)
                .find("#question-title")
                .addClass("danger");

            $("#question" + i)
                .find("div.card-box")
                .removeClass("card-box")
                .addClass("card-box-alert");

            // console.log("Alert validate: " + validate);
            // alert("Please select correct answer for Question" + i);

            error = true;
        }
        questions.push(val);
    }

    if (error == false) {
        return questions;
    }
}

function getCorrectAnswer() {
    var questionCount = $("form").find("div.container.question-container").length;
    let correct_option = [];

    for (var i = 1; i <= questionCount; i++) {
        var correct = [];

        /* Looping for options */
        $("#question" + i)
            .find("div.option-div")
            .each(function (index, elem) {
                var count = index + 1;

                if (
                    $("#question" + i)
                        .find("#check" + count)
                        .is(":checked")
                ) {
                    var opt_id = "question" + i + "option" + count;

                    // if it is checked
                    correct.push(opt_id);
                }
            });
        correct_option[i - 1] = correct;
    }
    var property = {
        name: "Question Answers",
        type: "LargeText",
        value: JSON.stringify(correct_option),
    };

    return property;
}

function createAction(actionPackageId) {
    var quizTitle = $("#quiz-title").val();
    var quizDescription = $("#quiz-description").val();
    var quizExpireDate = $("#expiry-date").val();
    var quizExpireTime = $("#expiry-time").val();
    var resultVisible = $("input[name='visible_to']:checked").val();
    var showCorrectAnswer = $("#show-correct-answer").is(":checked") ?
        "Yes" :
        "No";
    var questionsSet = getQuestionSet();
    var getcorrectanswers = getCorrectAnswer();

    if (questionsSet.length <= 0) {
        return;
    }

    var properties = [];
    properties.push({
        name: "Quiz Description",
        type: "LargeText",
        value: quizDescription,
    }, {
        name: "Quiz Expire Date Time",
        type: "DateTime",
        value: new Date(quizExpireDate + " " + quizExpireTime),
    }, {
        name: "Result Visible",
        type: "Text",
        value: resultVisible,
    }, {
        name: "Show Correct Answer",
        type: "Text",
        value: showCorrectAnswer,
    });
    properties.push(getcorrectanswers);
    console.log(properties);
    console.log("resultVisible: " + resultVisible);
    var action = {
        id: generateGUID(),
        actionPackageId: actionPackageId,
        version: 1,
        displayName: quizTitle,
        description: quizDescription,
        expiryTime: new Date(quizExpireDate + " " + quizExpireTime).getTime(),
        customProperties: properties,
        dataTables: [{
            name: "TestDataSet",
            itemsVisibility: actionSDK.Visibility.All,
            rowsVisibility: resultVisible == "Everyone" ?
                actionSDK.Visibility.All :
                actionSDK.Visibility.Sender,
            itemsEditable: false,
            canUserAddMultipleItems: false,
            dataColumns: questionsSet,
        },],
    };
    console.log("action: ");
    console.log(JSON.stringify(action));

    var request = new actionSDK.CreateAction.Request(action);
    actionSDK
        .executeApi(request)
        .then(function (response) {
            console.info("CreateAction - Response: " + JSON.stringify(response));
        })
        .catch(function (error) {
            console.error("CreateAction - Error: " + JSON.stringify(error));
        });
}

function generateGUID() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
        var r = (Math.random() * 16) | 0,
            v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}

$(document).ready(function () {
    let request = new actionSDK.GetContext.Request();
    getTheme(request);

    $("#add-questions").click();
    var week_date = new Date(new Date().setDate(new Date().getDate() + 7))
        .toISOString()
        .split("T")[0];
    var today = new Date()
        .toISOString()
        .split("T")[0];
    $("#expiry-date").val(week_date).attr({ min: today });
    $("form").append($("#setting").clone());
});

async function getTheme(request) {
    let response = await actionSDK.executeApi(request);
    let context = response.context;
    console.log("getContext response: ");
    console.log(JSON.stringify(context.theme));
    $("form.section-1").show();
    var theme = context.theme;
    // $("link#theme").attr("href", "css/style-" + theme + ".css");
}

$(document).on("click", "#back", function () {
    $(".section-1").show();
    $("form #setting").hide();
    console.log('setting_text ' + setting_text);
    $('#due').text(setting_text);

});

$(document).on("change", "#expiry-date, #expiry-time, #visible-to", function () {
    var end = new Date($('input[name="expiry_date"]').val() + ' ' + $('input[name="expiry_time"]').val());
    var start = new Date();
    var days = calc_date_diff(start, end);

    if (days == undefined) {

        $("#exampleModalCenter")
            .find("#exampleModalLongTitle")
            .html('<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve" class="gt gs mt--4"><g><g><g><path d="M507.113,428.415L287.215,47.541c-6.515-11.285-18.184-18.022-31.215-18.022c-13.031,0-24.7,6.737-31.215,18.022L4.887,428.415c-6.516,11.285-6.516,24.76,0,36.044c6.515,11.285,18.184,18.022,31.215,18.022h439.796c13.031,0,24.7-6.737,31.215-18.022C513.629,453.175,513.629,439.7,507.113,428.415z M481.101,449.441c-0.647,1.122-2.186,3.004-5.202,3.004H36.102c-3.018,0-4.556-1.881-5.202-3.004c-0.647-1.121-1.509-3.394,0-6.007L250.797,62.559c1.509-2.613,3.907-3.004,5.202-3.004c1.296,0,3.694,0.39,5.202,3.004L481.1,443.434C482.61,446.047,481.748,448.32,481.101,449.441z"/><rect x="240.987" y="166.095" width="30.037" height="160.197" /><circle cx="256.005" cy="376.354" r="20.025" /></g></g></g > <g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg > Notice!');
        $("#exampleModalCenter")
            .find(".modal-body")
            .html("<p><strong>Invalid Date or Time!</strong></p><p>It must be greater than current date and time.</p>");
        $("#exampleModalCenter")
            .find(".modal-footer")
            .html(
                '<button type="button" class="btn btn-outline-secondary btn-sm" data-dismiss="modal">Close</button>'
            );
        $("#exampleModalCenter").modal("show");
    } else {
        var result_visible = $('#visible-to:checked').val() == 'Everyone' ? 'Results visible to everyone' : 'Results visible to only me';
        console.log('due: ' + days + ', ' + result_visible);
        setting_text = ' Due in ' + days + ', ' + result_visible;
    }
});

function calc_date_diff(start, end) {
    var days = (end - start) / (1000 * 60 * 60 * 24);
    console.log('days: ' + days);
    if (days > 6) {
        var weeks = Math.ceil(days) / 7;
        return Math.floor(weeks) + ' week';
    } else {
        if (days < 1) {
            var t1 = start.getTime();
            var t2 = end.getTime();

            var minsDiff = Math.floor((t2 - t1) / 1000 / 60);
            var hourDiff = Math.floor(minsDiff / 60);
            minsDiff = minsDiff % 60;

            if (hourDiff > 1) {
                var hourText = 'hours';
            } else {
                var hourText = 'hour';
            }
            if (hourDiff > 1) {
                var minuteText = 'minutes';
            } else {
                var minuteText = 'minute';
            }
            if (hourDiff > 0 && minsDiff > 0) {
                return hourDiff + ' ' + hourText + ', ' + minsDiff + ' ' + minuteText;
            } else if (hourDiff > 0 && minsDiff <= 0) {
                return hourDiff + ' ' + hourText;
            } else if (hourDiff <= 0 && minsDiff > 0) {
                return minsDiff + ' ' + minuteText;
            }
        } else {
            return Math.ceil(days) + ' days';
        }
    }
}