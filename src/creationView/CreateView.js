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
            .html('<img src="images/trash.png"/> Delete?');
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
            .html('<img src="images/warning.png"/> Notice!');
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
    submitForm();
});

function submitForm() {
    /* Validate */
    var error_text = "";
    var question_number = 0;
    $("input[type='text']").removeClass("danger");
    $("label.leabel-alert").remove();
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
                        '<label class="leabel-alert d-block"><small>Required</small></label>'
                    );
                } else if (element.attr("id").startsWith("question-title")) {
                    // console.log("question_number.length" + question_number.length);
                    $(this).addClass("danger");
                    $(this)
                        .parents("div.input-group")
                        .before(
                            '<label class="leabel-alert d-block"><small>Required</small></label>'
                        );

                    error_text += "<p>Question is required. </p>";
                } else if (element.attr("id").startsWith("option")) {
                    $(this).addClass("danger");
                    $(this)
                        .parents("div.input-group")
                        .before(
                            '<label class="leabel-alert d-block"><small>Required</small></label>'
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
        return;
    }
}

function getQuestionSet() {
    var questionCount = $("form").find("div.container.question-container").length;
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
                    '<label class="leabel-alert d-block"><small>Please select correct choice for the question</small></label>'
                );

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
    var result_visible = $('#visible-to:checked').val() == 'Everyone' ? 'Results visible to everyone' : 'Results visible to only me';
    console.log('due: ' + days + ', ' + result_visible);
    setting_text = ' Due in ' + days + ', ' + result_visible;
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