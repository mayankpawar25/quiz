// var question_counter = 1
var questionCount = 0;
let questions = new Array();

$question_section = $('#question-section div.container').clone();
$opt = $('div#option-section .option-div').clone();

/* Add Questions */
$(document).on("click", "#add-questions", function() {
    var question_counter;
    $(this).parents('div.container').before($question_section.clone());

    $('div.question-container:visible').each(function(index, elem) {
        question_counter = index + 1;
        $(elem).find('span.question-number').text(question_counter);
        $(elem).attr({ 'id': 'question' + question_counter });
    });
    questionCount++;
});

/* Remove Questions */
$(document).on("click", '.remove-question', function() {
    $(this).parents('div.question-container').remove();
    var question_counter;
    $('div.question-container:visible').each(function(index, elem) {
        question_counter = index + 1;
        $(elem).find('span.question-number').text(question_counter);
        $(elem).attr({ 'id': 'question' + question_counter });
    });
})

/* Add Options */
$(document).on("click", ".add-options", function() {
    if ($(this).parents("div.container").find("div.input-group.mb-3").length > 10) {
        alert('Maximum 10 options allowed for a Question')
        return false;
    }
    $(this).parents('.container').find('div#options').append($opt.clone())
    $('div.input-group.mb-3.option-div').last().find('input');

    var selector = $(this).parents('div.container');
    $(selector).find('div.input-group.mb-3 input[type="text"]').each(function(index, elem) {
        var counter = index + 1;
        $(elem).attr({
            "placeholder": "Option " + counter
        });
        $(elem).attr({ 'id': 'option' + counter });
        $(elem).parents('.option-div').find('input.form-check-input').attr({ 'id': 'check' + counter });
    });
});

/* Remove Options */
$(document).on("click", ".remove-option", function(eve) {
    if ($(this).parents('div.question-container').find("div.option-div").length > 2) {
        var selector = $(this).closest('div.container');
        $(this).parents('div.option-div').remove();
        $(selector).find('div.input-group.mb-3 input[type="text"]').each(function(index, elem) {
            var counter = index + 1;
            $(elem).attr({
                "placeholder": "Option " + counter
            });
            $(elem).attr({ 'id': 'option' + counter });
            $(elem).parents('.option-div').find('input.form-check-input').attr({ 'id': 'check' + counter });
        });
    } else {
        alert('At least 2 options required for a Question')
    }
});

$(document).on('click', '#submit', function() {
    submitForm();
});

function submitForm() {
    actionSDK.executeApi(new actionSDK.GetContext.Request())
        .then(function(response) {
            console.info("GetContext - Response: " + JSON.stringify(response));
            createAction(response.context.actionPackageId);
        })
        /* .catch(function(error) {
            console.error("GetContext - Error: " + JSON.stringify(error));
        }) */
    ;
}

function getQuestionSet() {
    var questionCount = $('div.container.question-container:visible').length;
    var error = false;
    for (var i = 1; i <= questionCount; i++) {
        var option_type = actionSDK.ActionDataColumnValueType.SingleOption;

        let option = [];
        var is_selected = 0;
        var multiselect_check = 0;
        /* Looping for options */
        $('#question' + i).find('div.option-div').each(function(index, elem) {

            var count = index + 1;
            var opt_id = 'question' + i + 'option' + count;
            var opt_title = $('#question' + i).find('#option' + count).val();


            if ($('#question' + i).find('#check' + count).is(":checked")) {
                // if it is checked
                is_selected++;
                multiselect_check++;
            }

            if (multiselect_check > 1) {
                option_type = actionSDK.ActionDataColumnValueType.MultiOption;
            } else {
                option_type = actionSDK.ActionDataColumnValueType.SingleOption;
            }
            option.push({ id: opt_id, title: opt_title });
        });
        var val = {
            id: i.toString(),
            title: $('#question' + i).find('#question-title').val(),
            type: option_type,
            allowNullValue: false,
            options: option
        }

        if (is_selected == 0) {
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
    var questionCount = $('div.container.question-container:visible').length;
    let correct_option = [];

    for (var i = 1; i <= questionCount; i++) {
        var correct = []

        /* Looping for options */
        $('#question' + i).find('div.option-div').each(function(index, elem) {
            var count = index + 1;

            if ($('#question' + i).find('#check' + count).is(":checked")) {
                var opt_id = 'question' + i + 'option' + count;

                // if it is checked
                correct.push(opt_id);
            }
        });
        correct_option[i - 1] = correct;
    }
    var property = {
        "name": "Question Answers",
        "type": "Text",
        "value": JSON.stringify(correct_option)
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
        "name": "Quiz Description",
        "type": "Text",
        "value": quizDescription
    });
    properties.push(getcorrectanswers);
    console.log(properties);
    var action = {
        id: generateGUID(),
        actionPackageId: actionPackageId,
        version: 1,
        title: quizTitle,
        description: quizDescription,
        expiryTime: new Date().getTime() + (7 * 24 * 60 * 60 * 1000),
        customProperties: properties,
        dataTables: [{
            name: "TestDataSet",
            itemsVisibility: actionSDK.Visibility.All,
            itemsEditable: false,
            canUserAddMultipleItems: true,
            dataColumns: questionsSet
        }]
    };
    console.log('action: ');
    console.log(JSON.stringify(action));
    var request = new actionSDK.CreateAction.Request(action);
    actionSDK.executeApi(request)
        .then(function(response) {
            console.info("CreateAction - Response: " + JSON.stringify(response));
        })
        .catch(function(error) {
            console.error("CreateAction - Error: " + JSON.stringify(error));
        });
}

function generateGUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}