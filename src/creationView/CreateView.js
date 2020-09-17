import * as actionSDK from "@microsoft/m365-action-sdk";
import { Localizer } from '../common/ActionSdkHelper';

let request;
let questionCount = 0;
let questions = new Array();
let validate = true;
let setting_text = '';
let question_section = '';
let opt = '';
let lastSession = '';

let optionKey = '';
let addMoreOptionsKey = '';
let choicesKey = '';
let questionTitleKey = '';
let checkMeKey = '';
let nextKey = '';
let backKey = '';
let requiredKey = '';
let dueByKey = '';
let resultVisibleToKey = '';
let resultEveryoneKey = '';
let resultMeKey = '';
let correctAnswerKey = '';
let everyoneKey = '';
let onlyMeKey = '';
let showCorrectAnswerKey = '';
let answerCannotChangeKey = '';

/* Click Event for add the Question */
$(document).on("click", "#add-questions", function() {
    let question_counter;
    $(this).parents("div.container").before(question_section.clone());

    $("div.container").each(function(ind, el) {
        $(el).find('div.option-div > div.input-group > input[type="text"]')
            .each(function(index, elem) {
                let counter = index + 1;
                Localizer.getString('option', counter).then(function(result) {
                    $(elem).attr({
                        placeholder: result,
                    });
                    $(elem).attr({ id: "option" + counter });
                    $(elem)
                        .parents(".option-div")
                        .find("input.form-check-input")
                        .attr({ id: "check" + counter });
                });
            });
    });

    Localizer.getString('enterTheQuestion').then(function(result) {
        $("div.container").find('#question-title').attr({ 'placeholder': result });
    });

    $("div.question-container:visible").each(function(index, elem) {
        question_counter = index + 1;
        $(elem)
            .find("span.question-number")
            .text(question_counter + ".");
        $(elem).attr({ id: "question" + question_counter });
    });
    questionCount++;
    $('.choice-label').text(choicesKey);
    $('.check-me').text(checkMeKey);
    $('.check-me-title').attr({ "title": checkMeKey });
    $('.add-options').html(` <svg role="presentation" focusable="false" viewBox="8 8 16 16" class="cc gs gt tc gv">
        <path class="ui-icon__outline cc" d="M23.352 16.117c.098.1.148.217.148.352 0 .136-.05.253-.148.351a.48.48 0 0 1-.352.149h-6v6c0 .136-.05.253-.148.351a.48.48 0 0 1-.352.149.477.477 0 0 1-.352-.149.477.477 0 0 1-.148-.351v-6h-6a.477.477 0 0 1-.352-.149.48.48 0 0 1-.148-.351c0-.135.05-.252.148-.352A.481.481 0 0 1 10 15.97h6v-6c0-.135.049-.253.148-.352a.48.48 0 0 1 .352-.148c.135 0 .252.05.352.148.098.1.148.216.148.352v6h6c.135 0 .252.05.352.148z">
        </path>
        <path class="ui-icon__filled gr" d="M23.5 15.969a1.01 1.01 0 0 1-.613.922.971.971 0 0 1-.387.078H17v5.5a1.01 1.01 0 0 1-.613.922.971.971 0 0 1-.387.078.965.965 0 0 1-.387-.079.983.983 0 0 1-.535-.535.97.97 0 0 1-.078-.386v-5.5H9.5a.965.965 0 0 1-.387-.078.983.983 0 0 1-.535-.535.972.972 0 0 1-.078-.387 1.002 1.002 0 0 1 1-1H15v-5.5a1.002 1.002 0 0 1 1.387-.922c.122.052.228.124.32.215a.986.986 0 0 1 .293.707v5.5h5.5a.989.989 0 0 1 .707.293c.09.091.162.198.215.32a.984.984 0 0 1 .078.387z">
        </path>
    </svg> ${addMoreOptionsKey}`);

});

/* Click Event for remove the Question */
$(document).on("click", ".remove-question", function() {
    let element = $(this);
    if ($("div.question-container:visible").length > 1) {
        $("#exampleModalCenter")
            .find("#exampleModalLongTitle")
            .html('<svg viewBox="-40 0 427 427.00131" xmlns="http://www.w3.org/2000/svg" class="gt gs mt--4">< path d = "m232.398438 154.703125c-5.523438 0-10 4.476563-10 10v189c0 5.519531 4.476562 10 10 10 5.523437 0 10-4.480469 10-10v-189c0-5.523437-4.476563-10-10-10zm0 0" ></path ><path d="m114.398438 154.703125c-5.523438 0-10 4.476563-10 10v189c0 5.519531 4.476562 10 10 10 5.523437 0 10-4.480469 10-10v-189c0-5.523437-4.476563-10-10-10zm0 0"></path><path d="m28.398438 127.121094v246.378906c0 14.5625 5.339843 28.238281 14.667968 38.050781 9.285156 9.839844 22.207032 15.425781 35.730469 15.449219h189.203125c13.527344-.023438 26.449219-5.609375 35.730469-15.449219 9.328125-9.8125 14.667969-23.488281 14.667969-38.050781v-246.378906c18.542968-4.921875 30.558593-22.835938 28.078124-41.863282-2.484374-19.023437-18.691406-33.253906-37.878906-33.257812h-51.199218v-12.5c.058593-10.511719-4.097657-20.605469-11.539063-28.03125-7.441406-7.421875-17.550781-11.5546875-28.0625-11.46875h-88.796875c-10.511719-.0859375-20.621094 4.046875-28.0625 11.46875-7.441406 7.425781-11.597656 17.519531-11.539062 28.03125v12.5h-51.199219c-19.1875.003906-35.394531 14.234375-37.878907 33.257812-2.480468 19.027344 9.535157 36.941407 28.078126 41.863282zm239.601562 279.878906h-189.203125c-17.097656 0-30.398437-14.6875-30.398437-33.5v-245.5h250v245.5c0 18.8125-13.300782 33.5-30.398438 33.5zm-158.601562-367.5c-.066407-5.207031 1.980468-10.21875 5.675781-13.894531 3.691406-3.675781 8.714843-5.695313 13.925781-5.605469h88.796875c5.210937-.089844 10.234375 1.929688 13.925781 5.605469 3.695313 3.671875 5.742188 8.6875 5.675782 13.894531v12.5h-128zm-71.199219 32.5h270.398437c9.941406 0 18 8.058594 18 18s-8.058594 18-18 18h-270.398437c-9.941407 0-18-8.058594-18-18s8.058593-18 18-18zm0 0"></path><path d="m173.398438 154.703125c-5.523438 0-10 4.476563-10 10v189c0 5.519531 4.476562 10 10 10 5.523437 0 10-4.480469 10-10v-189c0-5.523437-4.476563-10-10-10zm0 0"></path></svg > Delete?');
        $("#exampleModalCenter")
            .find(".modal-body")
            .html("Are you sure you want to delete?");
        $("#exampleModalCenter")
            .find(".modal-footer")
            .html(
                '<button type="button" class="btn btn-outline-secondary btn-sm" data-dismiss="modal">Close</button><button type="button" class="btn btn-primary" id="delete-question">Ok</button>'
            );
        $("#exampleModalCenter").modal("show");

        $(document).on("click", "#delete-question", function() {
            $("#exampleModalCenter").modal("hide");

            element.parents("div.question-container").remove();
            let question_counter;
            $("div.question-container:visible").each(function(index, elem) {
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

/* Click Event for add the Option */
$(document).on("click", ".add-options", function() {
    if ($(this).parents("div.container").find("div.option-div > div.input-group > input[type='text']").length >= 10) {
        $("#exampleModalCenter")
            .find("#exampleModalLongTitle")
            .html(`<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve" class="gt gs mt--4">
                <g>
                    <g>
                        <g>
                            <path d="M507.113,428.415L287.215,47.541c-6.515-11.285-18.184-18.022-31.215-18.022c-13.031,0-24.7,6.737-31.215,18.022
                                L4.887,428.415c-6.516,11.285-6.516,24.76,0,36.044c6.515,11.285,18.184,18.022,31.215,18.022h439.796
                                c13.031,0,24.7-6.737,31.215-18.022C513.629,453.175,513.629,439.7,507.113,428.415z M481.101,449.441
                                c-0.647,1.122-2.186,3.004-5.202,3.004H36.102c-3.018,0-4.556-1.881-5.202-3.004c-0.647-1.121-1.509-3.394,0-6.007
                                L250.797,62.559c1.509-2.613,3.907-3.004,5.202-3.004c1.296,0,3.694,0.39,5.202,3.004L481.1,443.434
                                C482.61,446.047,481.748,448.32,481.101,449.441z"/>
                            <rect x="240.987" y="166.095" width="30.037" height="160.197"/>
                            <circle cx="256.005" cy="376.354" r="20.025"/>
                        </g>
                    </g>
                </g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg> Notice!`);
        $("#exampleModalCenter")
            .find(".modal-body")
            .html("Maximum 10 options allowed for a Question");
        $("#exampleModalCenter")
            .find(".modal-footer")
            .html(
                '<button type="button" class="btn btn-outline-secondary btn-sm" data-dismiss="modal">Close</button>'
            );
        $("#exampleModalCenter").modal("show");
        return false;
    }
    $(this).parents(".container").find("div.option-div:last").after(opt.clone());

    let selector = $(this).parents("div.container");
    $(selector)
        .find('div.option-div div.input-group input[type="text"]')
        .each(function(index, elem) {
            let counter = index + 1;
            Localizer.getString('option', counter).then(function(result) {

                $(elem).attr({
                    placeholder: result,
                });
                $(elem).attr({ id: "option" + counter });
                $(elem)
                    .parents(".option-div")
                    .find("input.form-check-input")
                    .attr({ id: "check" + counter });
            });
        });
    $('.check-me').text(checkMeKey);
    $('.check-me-title').attr({ "title": checkMeKey });

});

/* Click Event for remove the Option */
$(document).on("click", ".remove-option", function(eve) {
    if ($(this).parents("div.question-container").find("div.option-div").length > 2) {
        let selector = $(this).closest("div.container");
        $(this).parents("div.option-div").remove();

        $(selector)
            .find('div.option-div div.input-group input[type="text"]')
            .each(function(index, elem) {
                let counter = index + 1;
                Localizer.getString('option', counter).then(function(result) {
                    $(elem).attr({
                        placeholder: result,
                    });
                    $(elem).attr({ id: "option" + counter });
                    $(elem)
                        .parents(".option-div")
                        .find("input.form-check-input")
                        .attr({ id: "check" + counter });
                });
            });

    } else {
        $("#exampleModalCenter")
            .find("#exampleModalLongTitle")
            .html(`<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve" class="gt gs mt--4">
<g>
	<g>
		<g>
			<path d="M507.113,428.415L287.215,47.541c-6.515-11.285-18.184-18.022-31.215-18.022c-13.031,0-24.7,6.737-31.215,18.022
				L4.887,428.415c-6.516,11.285-6.516,24.76,0,36.044c6.515,11.285,18.184,18.022,31.215,18.022h439.796
				c13.031,0,24.7-6.737,31.215-18.022C513.629,453.175,513.629,439.7,507.113,428.415z M481.101,449.441
				c-0.647,1.122-2.186,3.004-5.202,3.004H36.102c-3.018,0-4.556-1.881-5.202-3.004c-0.647-1.121-1.509-3.394,0-6.007
				L250.797,62.559c1.509-2.613,3.907-3.004,5.202-3.004c1.296,0,3.694,0.39,5.202,3.004L481.1,443.434
				C482.61,446.047,481.748,448.32,481.101,449.441z"/>
			<rect x="240.987" y="166.095" width="30.037" height="160.197"/>
			<circle cx="256.005" cy="376.354" r="20.025"/>
		</g>
	</g>
</g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg> Notice!`);
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

/* Click Event for show setting page */
$(document).on("click", ".show-setting", function() {
    $(".section-1").hide();
    $(".section-1-footer").hide();
    $("form #setting").show();
});

/* Click Event for Submit Quiz */
$(document).on("click", "#submit", function() {
    $("#submit").prop('disabled', true);
    submitForm();
});

/* Method for quiz data and submit the datas */
function submitForm() {
    /* Validate */
    let error_text = "";
    let question_number = 0;
    $("input[type='text']").removeClass("danger");
    $("label.label-alert").remove();
    $("div.card-box-alert").removeClass("card-box-alert").addClass("card-box");

    $("form")
        .find("input[type='text']")
        .each(function() {
            let element = $(this);
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
                        '<label class="label-alert d-block"><small class="required-key">${requiredKey}</small></label>'
                    );
                } else if (element.attr("id").startsWith("question-title")) {
                    $(this).addClass("danger");
                    $(this)
                        .parents("div.input-group")
                        .before(
                            '<label class="label-alert d-block"><small class="required-key">${requiredKey}</small></label>'
                        );

                    error_text += "<p>Question is required. </p>";
                } else if (element.attr("id").startsWith("option")) {
                    $(this).addClass("danger");
                    $(this)
                        .parents("div.input-group")
                        .before(
                            '<label class="label-alert d-block"><small class="required-key">${requiredKey}</small></label>'
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
            .executeApi(request)
            .then(function(response) {
                console.info("GetContext - Response: " + JSON.stringify(response));
                createAction(response.context.actionPackageId);
            })
            .catch(function(error) {
                console.error("GetContext - Error: " + JSON.stringify(error));
            });
    } else {
        $('.required-key').text(requiredKey);
        $("#submit").prop('disabled', false);
        return;
    }
}

/* Method to get questions and return question object */
function getQuestionSet() {
    let questionCount = $("form").find("div.container.question-container").length;
    questions = new Array();
    let error = false;
    for (let i = 1; i <= questionCount; i++) {
        let option_type = actionSDK.ActionDataColumnValueType.SingleOption;
        let option = [];
        let is_selected = 0;

        /* Looping for options */
        $("#question" + i)
            .find("div.option-div")
            .each(function(index, elem) {
                let count = index + 1;
                let opt_id = "question" + i + "option" + count;
                let opt_title = $("#question" + i).find("#option" + count).val();

                if ($("#question" + i).find("#check" + count).is(":checked")) {
                    // if it is checked
                    is_selected++;
                }

                if ($("#question" + i).find("input[type=checkbox]:checked").length > 1) {
                    option_type = actionSDK.ActionDataColumnValueType.MultiOption;
                } else {
                    option_type = actionSDK.ActionDataColumnValueType.SingleOption;
                }
                option.push({ name: opt_id, displayName: opt_title });
            });

        let val = {
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
            error = true;
        }
        questions.push(val);
    }

    if (error == false) {
        return questions;
    }
}

/* Method to get correct answers and retrun property object */
function getCorrectAnswer() {
    let questionCount = $("form").find("div.container.question-container").length;
    let correct_option = [];

    for (let i = 1; i <= questionCount; i++) {
        let correct = [];

        /* Looping for options */
        $("#question" + i)
            .find("div.option-div")
            .each(function(index, elem) {
                let count = index + 1;

                if ($("#question" + i).find("#check" + count).is(":checked")) {
                    let opt_id = "question" + i + "option" + count;

                    // if it is checked
                    correct.push(opt_id);
                }
            });
        correct_option[i - 1] = correct;
    }
    let property = {
        name: "Question Answers",
        type: "LargeText",
        value: JSON.stringify(correct_option),
    };

    return property;
}

/* 
 * @desc Method to create Action Request and submit data to server  
 * @param action package id
 */
function createAction(actionPackageId) {
    let quizTitle = $("#quiz-title").val();
    let quizDescription = $("#quiz-description").val();
    let quizExpireDate = $("input[name='expiry_date']").val();
    let quizExpireTime = $("input[name='expiry_time']").val();

    let resultVisible = $("input[name='visible_to']:checked").val();
    let showCorrectAnswer = $("#show-correct-answer").is(":checked") ?
        "Yes" :
        "No";
    let questionsSet = getQuestionSet();
    let getcorrectanswers = getCorrectAnswer();

    if (questionsSet.length <= 0) {
        return;
    }

    let properties = [];
    properties.push({
        name: "Quiz Description",
        type: "LargeText",
        value: quizDescription,
    }, {
        name: "Quiz Expire Date Time",
        type: "DateTime",
        value: new Date(quizExpireDate + " " + $("input[name='expiry_time']").val()),
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
    let action = {
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
            rowsVisibility: actionSDK.Visibility.All,
            itemsEditable: false,
            canUserAddMultipleItems: false,
            dataColumns: questionsSet,
        }, ],
    };

    let request = new actionSDK.CreateAction.Request(action);
    actionSDK
        .executeApi(request)
        .then(function(response) {
            console.info("CreateAction - Response: " + JSON.stringify(response));
        })
        .catch(function(error) {
            console.error("CreateAction - Error: " + JSON.stringify(error));
        });
}

/* Method to generate GUID */
function generateGUID() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
        let r = (Math.random() * 16) | 0,
            v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}

/* Initiate Method */
$(document).ready(function() {
    request = new actionSDK.GetContext.Request();
    getStringKeys();
    getTheme(request);
});

/* Asyn method for fetching localization strings */
async function getStringKeys() {
    Localizer.getString('quizTitle').then(function(result) {
        $('#quiz-title').attr({ 'placeholder': result });
    });

    Localizer.getString('quizDescription').then(function(result) {
        $('#quiz-description').attr({ 'placeholder': result });
    });

    Localizer.getString('enterTheQuestion').then(function(result) {
        $('#question-title').attr({ 'placeholder': result });
        questionTitleKey = result;
    });

    Localizer.getString('option', '').then(function(result) {
        optionKey = result;
    });
    Localizer.getString('dueIn', ' 1 week', ', Results visible to everyone', ', Correct answer shown after every question').then(function(result) {
        setting_text = result;
        $('#due').text(setting_text);
    });

    Localizer.getString('addMoreOptions').then(function(result) {
        $('.add-options').html(`<svg role="presentation" focusable="false" viewBox="8 8 16 16" class="cc gs gt tc gv">
        <path class="ui-icon__outline cc" d="M23.352 16.117c.098.1.148.217.148.352 0 .136-.05.253-.148.351a.48.48 0 0 1-.352.149h-6v6c0 .136-.05.253-.148.351a.48.48 0 0 1-.352.149.477.477 0 0 1-.352-.149.477.477 0 0 1-.148-.351v-6h-6a.477.477 0 0 1-.352-.149.48.48 0 0 1-.148-.351c0-.135.05-.252.148-.352A.481.481 0 0 1 10 15.97h6v-6c0-.135.049-.253.148-.352a.48.48 0 0 1 .352-.148c.135 0 .252.05.352.148.098.1.148.216.148.352v6h6c.135 0 .252.05.352.148z">
        </path>
        <path class="ui-icon__filled gr" d="M23.5 15.969a1.01 1.01 0 0 1-.613.922.971.971 0 0 1-.387.078H17v5.5a1.01 1.01 0 0 1-.613.922.971.971 0 0 1-.387.078.965.965 0 0 1-.387-.079.983.983 0 0 1-.535-.535.97.97 0 0 1-.078-.386v-5.5H9.5a.965.965 0 0 1-.387-.078.983.983 0 0 1-.535-.535.972.972 0 0 1-.078-.387 1.002 1.002 0 0 1 1-1H15v-5.5a1.002 1.002 0 0 1 1.387-.922c.122.052.228.124.32.215a.986.986 0 0 1 .293.707v5.5h5.5a.989.989 0 0 1 .707.293c.09.091.162.198.215.32a.984.984 0 0 1 .078.387z">
        </path>
    </svg> ${result}`);
    });

    Localizer.getString('choices').then(function(result) {
        choicesKey = result;
        $('.choice-label').text(choicesKey);
    });

    Localizer.getString('checkMe').then(function(result) {
        checkMeKey = result;
        $('.check-me').text(checkMeKey);
        $('.check-me-title').attr({ "title": checkMeKey });
    });

    Localizer.getString('next').then(function(result) {
        nextKey = result;
        $('.next-key').text(nextKey);
    });

    Localizer.getString('back').then(function(result) {
        backKey = result;
        $('.back-key').text(backKey);
    });

    Localizer.getString('required').then(function(result) {
        requiredKey = result;
        $('.required-key').text(requiredKey);
    });

    Localizer.getString('dueBy').then(function(result) {
        dueByKey = result;
        $('.due-by-key').text(dueByKey);
    });

    Localizer.getString('resultVisibleTo').then(function(result) {
        resultVisibleToKey = result;
        $('.result-visible-key').text(resultVisibleToKey);
    });

    Localizer.getString('resultEveryone').then(function(result) {
        resultEveryoneKey = result;
    });

    Localizer.getString('resultMe').then(function(result) {
        resultMeKey = result;
    });

    Localizer.getString('correctAnswer', ', ').then(function(result) {
        correctAnswerKey = result;
    });

    Localizer.getString('everyone', ', ').then(function(result) {
        everyoneKey = result;
        $('.everyone-key').text(everyoneKey);
    });

    Localizer.getString('onlyMe', ', ').then(function(result) {
        onlyMeKey = result;
        $('.onlyme-key').text(onlyMeKey);
    });

    Localizer.getString('showCorrectAnswer').then(function(result) {
        showCorrectAnswerKey = result;
        $('.show-correct-key').text(showCorrectAnswerKey);
    });

    Localizer.getString('answerCannotChange').then(function(result) {
        answerCannotChangeKey = result;
        $('.answer-cannot-change-key').text(answerCannotChangeKey);
    });

}

/* 
 * @desc Method to select theme based on the teams theme  
 * @param request context request
 */
async function getTheme(request) {

    let response = await actionSDK.executeApi(request);

    let context = response.context;

    lastSession = context.lastSessionData;

    let theme = context.theme;
    $("link#theme").attr("href", "css/style-" + theme + ".css");
    $('form.sec1').append(form_section);
    $('form.sec1').after(modal_section);
    $('form.sec1').after(setting_section);
    $('form.sec1').after(option_section);
    $('form.sec1').after(questions_section);

    getStringKeys();

    question_section = $("#question-section div.container").clone();
    opt = $("div#option-section .option-div").clone();

    /* If Edit back the quiz */
    if (lastSession != null) {
        let ddtt = ((lastSession.action.customProperties[1].value).split('T'));
        let dt = ddtt[0].split('-');
        let week_date_format = new Date(dt[1]).toLocaleString('default', { month: 'short' }) + " " + dt[2] + ", " + dt[0];
        let tt_time = (ddtt[1].split('Z')[0]).split(':');
        let current_time = `${tt_time[0]}:${tt_time[1]}`;

        if (lastSession.action.customProperties[2].value == 'Everyone') {
            $('input[name="visible_to"][value="Everyone"]').prop("checked", true);
        } else {
            $('input[name="visible_to"][value="Only me"]').prop("checked", true);
        }

        if (lastSession.action.customProperties[3].value == 'Yes') {
            $('#show-correct-answer').prop("checked", true);
        } else {
            $('#show-correct-answer').prop("checked", false);
        }

        /* Quiz Section */
        $('#quiz-title').val(lastSession.action.displayName);
        $('#quiz-description').val(lastSession.action.customProperties[0].value);


        /* Due Setting String */
        let end = new Date(week_date_format + ' ' + current_time);
        let start = new Date();
        let days = calc_date_diff(start, end);

        let result_visible = lastSession.action.customProperties[2].value == 'Everyone' ? resultEveryoneKey : resultMeKey;
        let correct_answer = lastSession.action.customProperties[3].value == 'Yes' ? correctAnswerKey : '';

        Localizer.getString('dueIn', days, ', ' + result_visible, correct_answer).then(function(result) {
            setting_text = result;
            $('#due').text(setting_text);
        });

    } else {
        let week_date = new Date(new Date().setDate(new Date().getDate() + 7))
            .toISOString()
            .split("T")[0];

        let week_month = new Date(week_date).toLocaleString('default', { month: 'short' });
        let week_d = new Date(week_date).getDate();
        let week_year = new Date(week_date).getFullYear();
        let week_date_format = week_month + " " + week_d + ", " + week_year;

        let current_time = (("0" + new Date().getHours()).substr(-2)) + ":" + (("0" + new Date().getMinutes()).substr(-2));
    }

    let today = new Date()
        .toISOString()
        .split("T")[0];
    $("form").append($("#setting").clone());
    $("#add-questions").click();

    setTimeout(() => {
        $("form.sec1").show();
    }, 1000);


    $('.form_date input').val(week_date_format);
    $(".form_date").attr({ "data-date": week_date_format });

    $('.form_time').datetimepicker({
        language: 'en',
        weekStart: 1,
        todayBtn: 1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 1,
        minView: 0,
        maxView: 1,
        forceParse: 0
    });

    $('.form_time input').val(current_time);


    let date_input = $('input[name="expiry_date"]');
    let container = $('.bootstrap-iso form').length > 0 ? $('.bootstrap-iso form').parent() : "body";
    let options = {
        format: 'M dd, yyyy',
        container: container,
        todayHighlight: true,
        autoclose: true,
        orientation: 'top'
    };
    date_input.datepicker(options);
    await actionSDK.executeApi(new actionSDK.HideLoadingIndicator.Request());

    if (lastSession != null) {
        setTimeout(() => {
            let option = $("div#option-section .option-div").clone();

            lastSession.action.dataTables[0].dataColumns.forEach((e, ind) => {
                let correct_ans_arr = JSON.parse(lastSession.action.customProperties[4].value);

                if (ind == 0) {
                    $('#question1').find('#question-title').val(e.displayName);
                    e.options.forEach((opt, i) => {
                        let counter = i + 1;
                        if (i <= 1) {
                            $('#question1').find('#option' + counter).val(opt.displayName);
                        } else {
                            $('#question1').find("div.option-div:last").after(option.clone());

                            Localizer.getString('option', counter).then(function(result) {

                                $('#question1').find("div.option-div:last input[type='text']").attr({
                                    placeholder: result,
                                });
                                $('#question1').find("div.option-div:last input[type='text']").attr({ id: "option" + counter }).val(opt.displayName);
                                $('#question1').find("div.option-div:last input[type='text']")
                                    .parents(".option-div")
                                    .find("input.form-check-input")
                                    .attr({ id: "check" + counter });
                            });
                        }
                        $.each(correct_ans_arr, function(cindex, c_ans) {
                            if ($.inArray("question1option" + counter, c_ans) != -1) {
                                $('#question1').find('#check' + counter).prop('checked', true);
                                $('#question1').find('#option' + counter).parents('div.input-group.input-group-tpt.mb-2').find('.check-opt span.input-group-text.input-tpt').addClass('text-success');
                                $('#question1').find('#option' + counter).parents('div.input-group.input-group-tpt.mb-2').find(' .checked-status').text('Correct Answer');
                            }
                        });
                    });
                } else {
                    let qcounter = ind + 1;
                    let ocounter = 0;
                    $('#add-questions').parents("div.container").before(question_section.clone());

                    $("div.container.question-container:visible:last").attr('id', 'question' + qcounter);
                    $("#question" + qcounter).find("span.question-number").text(qcounter + ".");
                    $('#question' + qcounter).find('#question-title').val(e.displayName);

                    Localizer.getString('enterTheQuestion').then(function(result) {
                        $("div.container.question-container:visible:last").find('input[type="text"]').attr({
                            placeholder: result,
                        });
                    });
                    e.options.forEach((opt, i) => {
                        ocounter = i + 1;
                        if (i <= 1) {
                            $('#question' + qcounter).find('#option' + ocounter).val(opt.displayName);
                        } else {
                            $('#question' + qcounter).find("div.option-div:last").after(option.clone());

                            Localizer.getString('option', ocounter).then(function(result) {

                                $('#question' + qcounter).find("div.option-div:visible:last input[type='text']").attr({
                                    placeholder: result,
                                });
                                $('#question' + qcounter).find("div.option-div:last input[type='text']").attr({ id: "option" + ocounter }).val(opt.displayName);
                                $('#question' + qcounter).find("div.option-div:last input[type='text']")
                                    .parents(".option-div")
                                    .find("input.form-check-input")
                                    .attr({ id: "check" + ocounter });
                            });
                        }
                        $.each(correct_ans_arr, (cindex, c_ans) => {
                            if ($.inArray("question" + qcounter + "option" + ocounter, c_ans) != -1) {
                                $('#question' + qcounter).find('#check' + ocounter).prop('checked', true);
                                $('#question' + qcounter).find('#option' + ocounter).parents('div.input-group.input-group-tpt.mb-2').find('.check-opt span.input-group-text.input-tpt').addClass('text-success');
                                $('#question' + qcounter).find('#option' + ocounter).parents('div.input-group.input-group-tpt.mb-2').find(' .checked-status').text('Correct Answer');
                            }
                        });
                    });
                }
            });
        }, 1000);
    }
}

/* Click event for back button */
$(document).on("click", "#back", function() {
    $(".section-1").show();
    $(".section-1-footer").show();

    $("form #setting").hide();
    $('#due').text(setting_text);

});

/* Change event for setting inputs */
$(document).on("change", ".form_time input, .form_date input, .visible-to, #show-correct-answer", function() {
    let end = new Date($('input[name="expiry_date"]').val() + ' ' + $('input[name="expiry_time"]').val());
    let start = new Date();
    let days = calc_date_diff(start, end);

    if (days == undefined || days == NaN) {
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
        let result_visible = $('.visible-to:checked').val() == 'Everyone' ? resultEveryoneKey : resultMeKey;
        let correct_answer = $('#show-correct-answer:eq(0)').is(":checked") == true ? correctAnswerKey : '';

        Localizer.getString('dueIn', days, ', ' + result_visible, correct_answer).then(function(result) {
            setting_text = result;
        });
    }
});

/* Click event for correct answer inputs */
$(document).on('click', '.check-me-title', function() {
    if ($(this).parents('div.col-12').find('input[type="checkbox"]').prop('checked') == false) {
        $(this).parents('div.col-12').find('input[type="checkbox"]').prop("checked", true);
        $(this).parents('div.col-12').find('p.checked-status').text("Correct Answer");
        $(this).parents('span.input-group-text').addClass('text-success');
    } else {
        $(this).parents('div.col-12').find('input[type="checkbox"]').prop("checked", false);
        $(this).parents('div.col-12').find('p.checked-status').text("");
        $(this).parents('span.input-group-text').removeClass('text-success');
    }
})

/* Method for calculating date diff from current date in weeks, days, hours, minutes */
function calc_date_diff(start, end) {
    let days = (end - start) / (1000 * 60 * 60 * 24);
    if (days > 6) {
        let weeks = Math.ceil(days) / 7;
        return Math.floor(weeks) + ' week';
    } else {
        if (days < 1) {
            let t1 = start.getTime();
            let t2 = end.getTime();

            let minsDiff = Math.floor((t2 - t1) / 1000 / 60);
            let hourDiff = Math.floor(minsDiff / 60);
            minsDiff = minsDiff % 60;

            if (hourDiff > 1) {
                let hourText = 'hours';
            } else {
                let hourText = 'hour';
            }
            if (hourDiff > 1) {
                let minuteText = 'minutes';
            } else {
                let minuteText = 'minute';
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


/*  HTML Sections  */
// form: first section when page init
let form_section = `<div class="section-1">
            <div class="container pt-4">
                <div id="root" class="">
                    <div class="form-group">
                        <input type="Text" placeholder="" class="in-t input-lg form-control"
                            id="quiz-title" />
                    </div>

                    <div class="form-group">
                        <input type="Text" placeholder="" class="in-t form-control"
                            id="quiz-description" />
                    </div>
                </div>
            </div>

            <div class="container pb-5">
                <div class="form-group pb-5">
                    <button type="button" class="btn btn-primary btn-sm" id="add-questions"> <svg role="presentation"
                            focusable="false" viewBox="8 8 16 16" class="cc gs gt wh gv">
                            <path class="ui-icon__outline cc"
                                d="M23.352 16.117c.098.1.148.217.148.352 0 .136-.05.253-.148.351a.48.48 0 0 1-.352.149h-6v6c0 .136-.05.253-.148.351a.48.48 0 0 1-.352.149.477.477 0 0 1-.352-.149.477.477 0 0 1-.148-.351v-6h-6a.477.477 0 0 1-.352-.149.48.48 0 0 1-.148-.351c0-.135.05-.252.148-.352A.481.481 0 0 1 10 15.97h6v-6c0-.135.049-.253.148-.352a.48.48 0 0 1 .352-.148c.135 0 .252.05.352.148.098.1.148.216.148.352v6h6c.135 0 .252.05.352.148z">
                            </path>
                            <path class="ui-icon__filled gr"
                                d="M23.5 15.969a1.01 1.01 0 0 1-.613.922.971.971 0 0 1-.387.078H17v5.5a1.01 1.01 0 0 1-.613.922.971.971 0 0 1-.387.078.965.965 0 0 1-.387-.079.983.983 0 0 1-.535-.535.97.97 0 0 1-.078-.386v-5.5H9.5a.965.965 0 0 1-.387-.078.983.983 0 0 1-.535-.535.972.972 0 0 1-.078-.387 1.002 1.002 0 0 1 1-1H15v-5.5a1.002 1.002 0 0 1 1.387-.922c.122.052.228.124.32.215a.986.986 0 0 1 .293.707v5.5h5.5a.989.989 0 0 1 .707.293c.09.091.162.198.215.32a.984.984 0 0 1 .078.387z">
                            </path>
                        </svg> Add Question</button>
                </div>
            </div>
        </div>

        <div class="footer section-1-footer">
            <div class="footer-padd bt">
                <div class="container ">
                    <div class="row">
                        <div class="col-9">
                            <a class="theme-color cursur-pointer show-setting" id="hide1">
                                <svg role="presentation" focusable="false" viewBox="8 8 16 16" class="cc gs gt ha gv"><path class="ui-icon__outline cc" d="M13.82,8.07a.735.735,0,0,1,.5.188l1.438,1.3c.2-.008.4,0,.594.007l1.21-1.25a.724.724,0,0,1,.532-.226,3.117,3.117,0,0,1,.867.226c.469.172,1.3.438,1.328,1.032l.094,1.929a5.5,5.5,0,0,1,.414.422c.594-.007,1.187-.023,1.781-.023a.658.658,0,0,1,.352.117,4.122,4.122,0,0,1,1,2.031.735.735,0,0,1-.188.5l-1.3,1.438c.008.2,0,.4-.007.594l1.25,1.21a.724.724,0,0,1,.226.532,3.117,3.117,0,0,1-.226.867c-.172.461-.438,1.3-1.024,1.328l-1.937.094a5.5,5.5,0,0,1-.422.414c.007.594.023,1.187.023,1.781a.611.611,0,0,1-.117.344A4.1,4.1,0,0,1,18.18,23.93a.735.735,0,0,1-.5-.188l-1.438-1.3c-.2.008-.4,0-.594-.007l-1.21,1.25a.724.724,0,0,1-.532.226,3.117,3.117,0,0,1-.867-.226c-.469-.172-1.3-.438-1.328-1.032l-.094-1.929a5.5,5.5,0,0,1-.414-.422c-.594.007-1.187.023-1.781.023a.611.611,0,0,1-.344-.117A4.1,4.1,0,0,1,8.07,18.18a.735.735,0,0,1,.188-.5l1.3-1.438c-.008-.2,0-.4.007-.594l-1.25-1.21a.724.724,0,0,1-.226-.532,3.117,3.117,0,0,1,.226-.867c.172-.461.446-1.3,1.024-1.328l1.937-.094A5.5,5.5,0,0,1,11.7,11.2c-.007-.594-.023-1.187-.023-1.781a.658.658,0,0,1,.117-.352A4.122,4.122,0,0,1,13.82,8.07ZM12.672,9.617l.023,1.8c.008.312-.859,1.164-1.164,1.18l-1.976.1-.422,1.133,1.289,1.258c.2.2.164.562.164.82a1.781,1.781,0,0,1-.148.844L9.117,18.227l.5,1.1c.6-.008,1.211-.023,1.813-.023.312,0,1.156.859,1.172,1.164l.1,1.976,1.133.422,1.258-1.289c.2-.2.562-.164.82-.164a1.7,1.7,0,0,1,.844.148l1.469,1.321,1.1-.5-.023-1.8c-.008-.312.859-1.164,1.164-1.18l1.976-.1.422-1.133-1.289-1.258c-.2-.2-.164-.562-.164-.82a1.781,1.781,0,0,1,.148-.844l1.321-1.469-.5-1.1c-.6.008-1.211.023-1.813.023-.312,0-1.156-.859-1.172-1.164l-.1-1.976-1.133-.422-1.258,1.289c-.2.2-.562.164-.82.164a1.781,1.781,0,0,1-.844-.148L13.773,9.117ZM16.008,13.5A2.5,2.5,0,1,1,13.5,16,2.531,2.531,0,0,1,16.008,13.5ZM16,14.5a1.5,1.5,0,1,0,1.5,1.461A1.513,1.513,0,0,0,16,14.5Z"></path></svg>    
                                <span id="due"> ${setting_text}</span>
                            </a>

                        </div>
                        <div class="col-3 text-right"> <button type="button" class="btn btn-primary btn-sm pull-right"
                                id="submit"> <span class="next-key">${nextKey}</span></button></div>
                    </div>
                </div>
            </div>
        </div>`;

// Question Section
let questions_section = `<div style="display: none;" id="question-section">
        <div class="container question-container" id="question1">
            <div class="card-box card-border card-bg">
                <div class="form-group">
                    <div class="input-group mb-2">
                        <div class="input-group-append">
                            <span class="question-number input-group-text input-tpt pl-0 strong" style="cursor: pointer;">1.</span>
                        </div>
                        <input type="text" class="form-control in-t pr-35" placeholder="${questionTitleKey}" aria-label="${questionTitleKey}" aria-describedby="basic-addon2" id="question-title">
                        <div class="input-group-append">
                            <span class="input-group-text remove-question remove-option-q input-tpt" style="cursor: pointer;" aria-hidden="true">
                                <svg viewBox="-40 0 427 427.00131" xmlns="http://www.w3.org/2000/svg" class="gt gs">
                                    <path d="m232.398438 154.703125c-5.523438 0-10 4.476563-10 10v189c0 5.519531 4.476562 10 10 10 5.523437 0 10-4.480469 10-10v-189c0-5.523437-4.476563-10-10-10zm0 0" />
                                    <path d="m114.398438 154.703125c-5.523438 0-10 4.476563-10 10v189c0 5.519531 4.476562 10 10 10 5.523437 0 10-4.480469 10-10v-189c0-5.523437-4.476563-10-10-10zm0 0" />
                                    <path d="m28.398438 127.121094v246.378906c0 14.5625 5.339843 28.238281 14.667968 38.050781 9.285156 9.839844 22.207032 15.425781 35.730469 15.449219h189.203125c13.527344-.023438 26.449219-5.609375 35.730469-15.449219 9.328125-9.8125 14.667969-23.488281 14.667969-38.050781v-246.378906c18.542968-4.921875 30.558593-22.835938 28.078124-41.863282-2.484374-19.023437-18.691406-33.253906-37.878906-33.257812h-51.199218v-12.5c.058593-10.511719-4.097657-20.605469-11.539063-28.03125-7.441406-7.421875-17.550781-11.5546875-28.0625-11.46875h-88.796875c-10.511719-.0859375-20.621094 4.046875-28.0625 11.46875-7.441406 7.425781-11.597656 17.519531-11.539062 28.03125v12.5h-51.199219c-19.1875.003906-35.394531 14.234375-37.878907 33.257812-2.480468 19.027344 9.535157 36.941407 28.078126 41.863282zm239.601562 279.878906h-189.203125c-17.097656 0-30.398437-14.6875-30.398437-33.5v-245.5h250v245.5c0 18.8125-13.300782 33.5-30.398438 33.5zm-158.601562-367.5c-.066407-5.207031 1.980468-10.21875 5.675781-13.894531 3.691406-3.675781 8.714843-5.695313 13.925781-5.605469h88.796875c5.210937-.089844 10.234375 1.929688 13.925781 5.605469 3.695313 3.671875 5.742188 8.6875 5.675782 13.894531v12.5h-128zm-71.199219 32.5h270.398437c9.941406 0 18 8.058594 18 18s-8.058594 18-18 18h-270.398437c-9.941407 0-18-8.058594-18-18s8.058593-18 18-18zm0 0" />
                                    <path d="m173.398438 154.703125c-5.523438 0-10 4.476563-10 10v189c0 5.519531 4.476562 10 10 10 5.523437 0 10-4.480469 10-10v-189c0-5.523437-4.476563-10-10-10zm0 0" />
                                </svg>
                            </span>
                        </div>
                    </div>
                </div>
                <div class="d-flex">
                    <div class="ext-flex"></div>
                    <div class="form-group" id="options">
                        <label><strong class="choice-label">${choicesKey}</strong></label>
                        <div class="option-div">
                            <div class="row">
                                <div class="col-12">
                                    <div class="input-group input-group-tpt mb-2 ">
                                        <div class="input-group-append">

                                        </div>
                                        <input type="text" class="form-control in-t" placeholder="Option 1" aria-label="Option 1" aria-describedby="basic-addon2" id="option1">        
                                        <div class="input-group-append check-opt">
                                            <span class="input-group-text input-tpt" style="cursor: pointer;">
                                                <i class="fa fa-check check-me-title"  data-toggle="tooltip" data-placement="bottom" title="${checkMeKey}" aria-hidden="true"></i>
                                            </span>
                                        </div>
                                        <div class="input-group-append">
                                            <span class="input-group-text remove-option input-tpt" style="cursor: pointer;">
                                                <svg viewBox="-40 0 427 427.00131" xmlns="http://www.w3.org/2000/svg" class="gt gs">
                                                    <path
                                                        d="m232.398438 154.703125c-5.523438 0-10 4.476563-10 10v189c0 5.519531 4.476562 10 10 10 5.523437 0 10-4.480469 10-10v-189c0-5.523437-4.476563-10-10-10zm0 0" />
                                                    <path
                                                        d="m114.398438 154.703125c-5.523438 0-10 4.476563-10 10v189c0 5.519531 4.476562 10 10 10 5.523437 0 10-4.480469 10-10v-189c0-5.523437-4.476563-10-10-10zm0 0" />
                                                    <path
                                                        d="m28.398438 127.121094v246.378906c0 14.5625 5.339843 28.238281 14.667968 38.050781 9.285156 9.839844 22.207032 15.425781 35.730469 15.449219h189.203125c13.527344-.023438 26.449219-5.609375 35.730469-15.449219 9.328125-9.8125 14.667969-23.488281 14.667969-38.050781v-246.378906c18.542968-4.921875 30.558593-22.835938 28.078124-41.863282-2.484374-19.023437-18.691406-33.253906-37.878906-33.257812h-51.199218v-12.5c.058593-10.511719-4.097657-20.605469-11.539063-28.03125-7.441406-7.421875-17.550781-11.5546875-28.0625-11.46875h-88.796875c-10.511719-.0859375-20.621094 4.046875-28.0625 11.46875-7.441406 7.425781-11.597656 17.519531-11.539062 28.03125v12.5h-51.199219c-19.1875.003906-35.394531 14.234375-37.878907 33.257812-2.480468 19.027344 9.535157 36.941407 28.078126 41.863282zm239.601562 279.878906h-189.203125c-17.097656 0-30.398437-14.6875-30.398437-33.5v-245.5h250v245.5c0 18.8125-13.300782 33.5-30.398438 33.5zm-158.601562-367.5c-.066407-5.207031 1.980468-10.21875 5.675781-13.894531 3.691406-3.675781 8.714843-5.695313 13.925781-5.605469h88.796875c5.210937-.089844 10.234375 1.929688 13.925781 5.605469 3.695313 3.671875 5.742188 8.6875 5.675782 13.894531v12.5h-128zm-71.199219 32.5h270.398437c9.941406 0 18 8.058594 18 18s-8.058594 18-18 18h-270.398437c-9.941407 0-18-8.058594-18-18s8.058593-18 18-18zm0 0" />
                                                    <path
                                                        d="m173.398438 154.703125c-5.523438 0-10 4.476563-10 10v189c0 5.519531 4.476562 10 10 10 5.523437 0 10-4.480469 10-10v-189c0-5.523437-4.476563-10-10-10zm0 0" />
                                                </svg>
                                            </span>
                                        </div>
                                        <div class="text-right text-success">
                                            <p class="checked-status"> </p>
                                            <input type="checkbox" class="form-check-input" id="check1" value="yes" style="display:none">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="option-div">
                            <div class="row">
                                <div class="col-12">
                                    <div class="input-group input-group-tpt mb-2">
                                        <div class="input-group-append">

                                        </div>
                                        <input type="text" class="form-control in-t" placeholder="Option 2" aria-label="Option 2" aria-describedby="basic-addon2" id="option2">
                                        <div class="input-group-append check-opt">
                                            <span class="input-group-text input-tpt" style="cursor: pointer;">
                                                <i class="fa fa-check check-me-title"  data-toggle="tooltip" data-placement="bottom" title="${checkMeKey}" aria-hidden="true"></i>
                                            </span>
                                        </div>
                                        <div class="input-group-append">
                                            <span class="input-group-text remove-option input-tpt" style="cursor: pointer;">
                                                <svg viewBox="-40 0 427 427.00131"
                                                    xmlns="http://www.w3.org/2000/svg" class="gt gs">
                                                    <path
                                                        d="m232.398438 154.703125c-5.523438 0-10 4.476563-10 10v189c0 5.519531 4.476562 10 10 10 5.523437 0 10-4.480469 10-10v-189c0-5.523437-4.476563-10-10-10zm0 0" />
                                                    <path
                                                        d="m114.398438 154.703125c-5.523438 0-10 4.476563-10 10v189c0 5.519531 4.476562 10 10 10 5.523437 0 10-4.480469 10-10v-189c0-5.523437-4.476563-10-10-10zm0 0" />
                                                    <path
                                                        d="m28.398438 127.121094v246.378906c0 14.5625 5.339843 28.238281 14.667968 38.050781 9.285156 9.839844 22.207032 15.425781 35.730469 15.449219h189.203125c13.527344-.023438 26.449219-5.609375 35.730469-15.449219 9.328125-9.8125 14.667969-23.488281 14.667969-38.050781v-246.378906c18.542968-4.921875 30.558593-22.835938 28.078124-41.863282-2.484374-19.023437-18.691406-33.253906-37.878906-33.257812h-51.199218v-12.5c.058593-10.511719-4.097657-20.605469-11.539063-28.03125-7.441406-7.421875-17.550781-11.5546875-28.0625-11.46875h-88.796875c-10.511719-.0859375-20.621094 4.046875-28.0625 11.46875-7.441406 7.425781-11.597656 17.519531-11.539062 28.03125v12.5h-51.199219c-19.1875.003906-35.394531 14.234375-37.878907 33.257812-2.480468 19.027344 9.535157 36.941407 28.078126 41.863282zm239.601562 279.878906h-189.203125c-17.097656 0-30.398437-14.6875-30.398437-33.5v-245.5h250v245.5c0 18.8125-13.300782 33.5-30.398438 33.5zm-158.601562-367.5c-.066407-5.207031 1.980468-10.21875 5.675781-13.894531 3.691406-3.675781 8.714843-5.695313 13.925781-5.605469h88.796875c5.210937-.089844 10.234375 1.929688 13.925781 5.605469 3.695313 3.671875 5.742188 8.6875 5.675782 13.894531v12.5h-128zm-71.199219 32.5h270.398437c9.941406 0 18 8.058594 18 18s-8.058594 18-18 18h-270.398437c-9.941407 0-18-8.058594-18-18s8.058593-18 18-18zm0 0" />
                                                    <path
                                                        d="m173.398438 154.703125c-5.523438 0-10 4.476563-10 10v189c0 5.519531 4.476562 10 10 10 5.523437 0 10-4.480469 10-10v-189c0-5.523437-4.476563-10-10-10zm0 0" />
                                                </svg>
                                            </span>
                                        </div>
                                        <div class="text-right text-success">
                                            <p class="checked-status"> </p>
                                            <input type="checkbox" class="form-check-input" value="yes" id="check2" style="display:none"> 
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="">
                            <button type="button" class="teams-link add-options"> 
                                <svg role="presentation" focusable="false" viewBox="8 8 16 16" class="cc gs gt tc gv">
                                    <path class="ui-icon__outline cc" d="M23.352 16.117c.098.1.148.217.148.352 0 .136-.05.253-.148.351a.48.48 0 0 1-.352.149h-6v6c0 .136-.05.253-.148.351a.48.48 0 0 1-.352.149.477.477 0 0 1-.352-.149.477.477 0 0 1-.148-.351v-6h-6a.477.477 0 0 1-.352-.149.48.48 0 0 1-.148-.351c0-.135.05-.252.148-.352A.481.481 0 0 1 10 15.97h6v-6c0-.135.049-.253.148-.352a.48.48 0 0 1 .352-.148c.135 0 .252.05.352.148.098.1.148.216.148.352v6h6c.135 0 .252.05.352.148z">
                                    </path>
                                    <path class="ui-icon__filled gr" d="M23.5 15.969a1.01 1.01 0 0 1-.613.922.971.971 0 0 1-.387.078H17v5.5a1.01 1.01 0 0 1-.613.922.971.971 0 0 1-.387.078.965.965 0 0 1-.387-.079.983.983 0 0 1-.535-.535.97.97 0 0 1-.078-.386v-5.5H9.5a.965.965 0 0 1-.387-.078.983.983 0 0 1-.535-.535.972.972 0 0 1-.078-.387 1.002 1.002 0 0 1 1-1H15v-5.5a1.002 1.002 0 0 1 1.387-.922c.122.052.228.124.32.215a.986.986 0 0 1 .293.707v5.5h5.5a.989.989 0 0 1 .707.293c.09.091.162.198.215.32a.984.984 0 0 1 .078.387z">
                                    </path>
                                </svg>  
                                ${addMoreOptionsKey}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>`;

// Option Section
let option_section = `<div style="display: none;" id="option-section">
        <div class="option-div">
            <div class="row">
                <div class="col-12">
                    <div class="input-group input-group-tpt mb-2">
                        <div class="input-group-append">
                        </div>
                        <input type="text" class="form-control in-t" placeholder="Option" aria-label="Recipient's username" aria-describedby="basic-addon2" id="option-1">
                        <div class="input-group-append check-opt">
                            <span class="input-group-text input-tpt" style="cursor: pointer;">
                                <i class="fa fa-check check-me-title"  data-toggle="tooltip" data-placement="bottom" title="${checkMeKey}" aria-hidden="true"></i>
                            </span>
                        </div>
                        <div class="input-group-append">
                            <span class="input-group-text remove-option input-tpt" style="cursor: pointer;">
                                <svg viewBox="-40 0 427 427.00131" xmlns="http://www.w3.org/2000/svg" class="gt gs">
                                    <path
                                        d="m232.398438 154.703125c-5.523438 0-10 4.476563-10 10v189c0 5.519531 4.476562 10 10 10 5.523437 0 10-4.480469 10-10v-189c0-5.523437-4.476563-10-10-10zm0 0" />
                                    <path
                                        d="m114.398438 154.703125c-5.523438 0-10 4.476563-10 10v189c0 5.519531 4.476562 10 10 10 5.523437 0 10-4.480469 10-10v-189c0-5.523437-4.476563-10-10-10zm0 0" />
                                    <path
                                        d="m28.398438 127.121094v246.378906c0 14.5625 5.339843 28.238281 14.667968 38.050781 9.285156 9.839844 22.207032 15.425781 35.730469 15.449219h189.203125c13.527344-.023438 26.449219-5.609375 35.730469-15.449219 9.328125-9.8125 14.667969-23.488281 14.667969-38.050781v-246.378906c18.542968-4.921875 30.558593-22.835938 28.078124-41.863282-2.484374-19.023437-18.691406-33.253906-37.878906-33.257812h-51.199218v-12.5c.058593-10.511719-4.097657-20.605469-11.539063-28.03125-7.441406-7.421875-17.550781-11.5546875-28.0625-11.46875h-88.796875c-10.511719-.0859375-20.621094 4.046875-28.0625 11.46875-7.441406 7.425781-11.597656 17.519531-11.539062 28.03125v12.5h-51.199219c-19.1875.003906-35.394531 14.234375-37.878907 33.257812-2.480468 19.027344 9.535157 36.941407 28.078126 41.863282zm239.601562 279.878906h-189.203125c-17.097656 0-30.398437-14.6875-30.398437-33.5v-245.5h250v245.5c0 18.8125-13.300782 33.5-30.398438 33.5zm-158.601562-367.5c-.066407-5.207031 1.980468-10.21875 5.675781-13.894531 3.691406-3.675781 8.714843-5.695313 13.925781-5.605469h88.796875c5.210937-.089844 10.234375 1.929688 13.925781 5.605469 3.695313 3.671875 5.742188 8.6875 5.675782 13.894531v12.5h-128zm-71.199219 32.5h270.398437c9.941406 0 18 8.058594 18 18s-8.058594 18-18 18h-270.398437c-9.941407 0-18-8.058594-18-18s8.058593-18 18-18zm0 0" />
                                    <path
                                        d="m173.398438 154.703125c-5.523438 0-10 4.476563-10 10v189c0 5.519531 4.476562 10 10 10 5.523437 0 10-4.480469 10-10v-189c0-5.523437-4.476563-10-10-10zm0 0" />
                                </svg>
                            </span>
                        </div>
                        <div class="text-right text-success">
                            <p class="checked-status"> </p>
                            <input type="checkbox" class="form-check-input" value="yes" id="check2" style="display:none"> 
                        </div>        
                    </div>
                </div>
            </div>
        </div>
    </div>`;

// Setting Section
let setting_section = `<div style="display:none" id="setting">
        <div class="container pt-4 setting-section">
            <div class="row">
                <div class="col-sm-12">
                    <label><strong class="due-by-key">${dueByKey}</strong></label>
                </div>
                <div class="clearfix"></div>
                <div class="col-1"></div>
                <div class="col-5">
                    <div class="input-group date form_date" data-date="1979-09-16T05:25:07Z" data-date-format="M dd, yyyy" data-link-field="dtp_input1">
                        <input class="form-control in-t" size="16" name="expiry_date" type="text" value="" readonly>
                    </div>
                </div>
                <div class="col-5">
                    <div class="input-group date form_time" data-date="" data-date-format="hh:ii" data-link-field="dtp_input3" data-link-format="hh:ii">
                        <input class="form-control in-t" name="expiry_time" size="16" type="text" value="" readonly>
                        <span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>
                        <span class="input-group-addon"><span class="glyphicon glyphicon-time"></span></span>
                    </div>
                </div>
                <div class="clearfix"></div>
                <div class="col-12">
                    <label><strong class="result-visible-key">${resultVisibleToKey}</strong></label>
                </div>
                <div class="clearfix"></div>
                <div class="col-1"></div>
                <div class="col-11">
                    <div class="custom-radio-outer">
                        <label class="custom-radio">
                            <input type="radio" name="visible_to" class="visible-to" value="Everyone" checked>
                            <span class="radio-block"></span> <span class="everyone-key">${everyoneKey}</span>
                        </label>
                    </div>
                    <div class="custom-radio-outer">
                        <label class="custom-radio">
                            <input type="radio" name="visible_to" class="visible-to" value="Only me"><span
                                class="radio-block"></span> <span class="onlyme-key">${onlyMeKey}</span>
                        </label>
                    </div>
                </div>
                <div class="clearfix"></div>
                <div class="col-12">
                    <div class="input-group mb-2 form-check custom-check-outer">
                        <label class="custom-check form-check-label">
                            <input type="checkbox" name="show_correct_answer" id="show-correct-answer" value="Yes" checked/>
                            <span class="checkmark"></span>
                        </label>
                        <label><strong class="show-correct-key">${showCorrectAnswerKey}</strong></label>
                    </div>
                </div>
                <div class="clearfix"></div>
                <div class="col-1"></div>
                <div class="col-11">
                    <label>
                        <span class="answer-cannot-change-key">${answerCannotChangeKey}</span>
                    </label>
                </div>
            </div>
            <div class="footer">
                <div class="footer-padd bt">
                    <div class="container ">
                        <div class="row">
                            <div class="col-9">
                                <a class=" cursur-pointer" id="back">
                                    <svg role="presentation" focusable="false" viewBox="8 8 16 16" class="back-btn">
                                        <path class="ui-icon__outline gr" d="M16.38 20.85l7-7a.485.485 0 0 0 0-.7.485.485 0 0 0-.7 0l-6.65 6.64-6.65-6.64a.485.485 0 0 0-.7 0 .485.485 0 0 0 0 .7l7 7c.1.1.21.15.35.15.14 0 .25-.05.35-.15z">
                                        </path>
                                        <path class="ui-icon__filled" d="M16.74 21.21l7-7c.19-.19.29-.43.29-.71 0-.14-.03-.26-.08-.38-.06-.12-.13-.23-.22-.32s-.2-.17-.32-.22a.995.995 0 0 0-.38-.08c-.13 0-.26.02-.39.07a.85.85 0 0 0-.32.21l-6.29 6.3-6.29-6.3a.988.988 0 0 0-.32-.21 1.036 1.036 0 0 0-.77.01c-.12.06-.23.13-.32.22s-.17.2-.22.32c-.05.12-.08.24-.08.38 0 .28.1.52.29.71l7 7c.19.19.43.29.71.29.28 0 .52-.1.71-.29z">
                                        </path>
                                    </svg> <span class="back-key">${backKey}</span>
                                </a>
                            </div>
                            <div class="col-3">
                                <button class="btn btn-tpt">&nbsp;</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>`;

//  Modal Section for alerts and confirmations
let modal_section = `<div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog"
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
                    <button type="button" class="btn btn-outline-secondary btn-sm" data-dismiss="modal"><span class="back-key">${backKey}</span></button>
                    <button type="button" class="btn btn-primary btn-sm" id="save-changes">Save changes</button>
                </div>
            </div>
        </div>
    </div>`;