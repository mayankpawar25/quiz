import * as actionSDK from "action-sdk-sunny";

// var question_counter = 1
var questionCount = 0;
let questions = new Array();
let validate = true;

var question_section = $("#question-section div.container").clone();
var opt = $("div#option-section .option-div").clone();

/* Add Questions */
$(document).on("click", "#add-questions", function() {
    var question_counter;
    $(this).parents("div.container").before(question_section.clone());

    $("div.question-container:visible").each(function(index, elem) {
        question_counter = index + 1;
        $(elem).find("span.question-number").text(question_counter);
        $(elem).attr({ id: "question" + question_counter });
    });
    questionCount++;
});

/* Remove Questions */
$(document).on("click", ".remove-question", function() {
    if ($('div.question-container:visible').length > 1) {
        var res = confirm("Are you sure you want to remove this Questions");
        if (res) {
            $(this).parents("div.question-container").remove();
            var question_counter;
            $("div.question-container:visible").each(function(index, elem) {
                question_counter = index + 1;
                $(elem).find("span.question-number").text(question_counter);
                $(elem).attr({ id: "question" + question_counter });
            });
        }
    } else {
        alert('For quiz atleast one question is required.');
    }
});

/* Add Options */
$(document).on("click", ".add-options", function() {
    if (
        $(this).parents("div.container").find("div.input-group.mb-2").length > 10
    ) {
        alert("Maximum 10 options allowed for a Question");
        return false;
    }
    $(this).parents(".container").find("div#options").append(opt.clone());
    $("div.input-group.mb-2.option-div").last().find("input");

    var selector = $(this).parents("div.container");
    $(selector)
        .find('div.input-group.mb-2 input[type="text"]')
        .each(function(index, elem) {
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
$(document).on("click", ".remove-option", function(eve) {
    if (
        $(this).parents("div.question-container").find("div.option-div").length > 2
    ) {
        var selector = $(this).closest("div.container");
        $(this).parents("div.option-div").remove();
        $(selector)
            .find('div.input-group.mb-2 input[type="text"]')
            .each(function(index, elem) {
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
        alert("At least 2 options required for a Question");
    }
});

$(document).on("click", "#submit", function() {
    /* Validate */
    var error_text = '';
    $("form").find("input[type='text']").each(function() {
        var element = $(this);
        if (element.val() == "") {
            validate = false;
            if (element.attr('id') == 'quiz-title') {
                error_text += ('Quiz title is required. \n');
            } else if (element.attr('id') == 'question-title') {
                error_text += ('Question is required. \n');
            } else if (element.attr('id').startsWith('option')) {
                error_text += ("Blank option not allowed. \n");
            }
        }
    });

    console.log('validate: ' + validate);

    if (validate == true) {
        submitForm();
    } else {
        alert(error_text);
    }

});

function submitForm() {
    actionSDK
        .executeApi(new actionSDK.GetContext.Request())
        .then(function(response) {
            console.info("GetContext - Response: " + JSON.stringify(response));
            createAction(response.context.actionPackageId);
        })
        .catch(function(error) {
            console.error("GetContext - Error: " + JSON.stringify(error));
        });
}

function getQuestionSet() {
    var questionCount = $("div.container.question-container:visible").length;
    var error = false;
    for (var i = 1; i <= questionCount; i++) {
        var option_type = actionSDK.ActionDataColumnValueType.SingleOption;

        let option = [];
        var is_selected = 0;

        /* Looping for options */
        $("#question" + i)
            .find("div.option-div")
            .each(function(index, elem) {
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
            console.log('Alert validate: ' + validate);
            alert("Please select correct answer for Question" + i);
            error = true;
        }
        questions.push(val);
    }

    if (error == false) {
        return questions;
    }
}

function getCorrectAnswer() {
    var questionCount = $("div.container.question-container:visible").length;
    let correct_option = [];

    for (var i = 1; i <= questionCount; i++) {
        var correct = [];

        /* Looping for options */
        $("#question" + i)
            .find("div.option-div")
            .each(function(index, elem) {
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
        type: "Text",
        value: JSON.stringify(correct_option),
    };

    return property;
}

function createAction(actionPackageId) {
    var quizTitle = $("#quiz-title").val();
    var quizDescription = $("#quiz-description").val();
    var questionsSet = getQuestionSet();
    var getcorrectanswers = getCorrectAnswer();
    var properties = [];
    properties.push({
        name: "Quiz Description",
        type: "Text",
        value: quizDescription,
    });
    properties.push(getcorrectanswers);
    console.log(properties);
    var action = {
        id: generateGUID(),
        actionPackageId: actionPackageId,
        version: 1,
        displayName: quizTitle,
        description: quizDescription,
        expiryTime: new Date().getTime() + 7 * 24 * 60 * 60 * 1000,
        customProperties: properties,
        dataTables: [{
            name: "TestDataSet",
            itemsVisibility: actionSDK.Visibility.All,
            itemsEditable: false,
            canUserAddMultipleItems: true,
            dataColumns: questionsSet,
        }, ],
    };
    console.log("action: ");
    console.log(JSON.stringify(action));
    var request = new actionSDK.CreateAction.Request(action);
    actionSDK
        .executeApi(request)
        .then(function(response) {
            console.info("CreateAction - Response: " + JSON.stringify(response));
        })
        .catch(function(error) {
            console.error("CreateAction - Error: " + JSON.stringify(error));
        });
}

function generateGUID() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
        var r = (Math.random() * 16) | 0,
            v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}

$(document).ready(function() {
    $("#add-questions").click();
});