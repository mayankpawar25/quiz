import * as actionSDK from "action-sdk-sunny";
import { GetContext } from "../../assets/ActionSDK";

// var question_counter = 1
var questionCount = 0;
let questions = new Array();
let validate = true;
let setting_text = ' Due in 1 week, Results visible to everyone';

let question_section = '';
let opt = '';

/* let request = new actionSDK.GetContext.Request();
getTheme(request); */

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
        // alert("Maximum 10 options allowed for a Question");
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

$(document).on("click", ".show-setting", function () {
    $(".section-1").hide();
    $(".section-1-footer").hide();
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


        console.log('#question: #question' + i);


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

                console.log('question set');

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

    console.log(`questionsSet: `);
    console.log(`${questionsSet}`);

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
                actionSDK.Visibility.All : actionSDK.Visibility.Sender,
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
});

async function getTheme(request) {
    let response = await actionSDK.executeApi(request);
    let context = response.context;

    var theme = context.theme;
    $("link#theme").attr("href", "css/style-" + theme + ".css");


    $('form.sec1').append(form_section);
    $('form.sec1').after(modal_section);
    $('form.sec1').after(setting_section);
    $('form.sec1').after(option_section);
    $('form.sec1').after(questions_section);

    question_section = $("#question-section div.container").clone();
    opt = $("div#option-section .option-div").clone();

    var week_date = new Date(new Date().setDate(new Date().getDate() + 7))
        .toISOString()
        .split("T")[0];

    var week_month = new Date(week_date).toLocaleString('default', { month: 'short' });
    var week_d = new Date(week_date).getDate();
    var week_year = new Date(week_date).getFullYear();
    var week_date_format = week_month + " " + week_d + ", " + week_year;

    var current_time = (("0" + new Date().getHours()).substr(-2)) + ":" + (("0" + new Date().getMinutes()).substr(-2));

    var today = new Date()
        .toISOString()
        .split("T")[0];
    // $(".form_date").attr({ "data-date": week_date_format });
    $("form").append($("#setting").clone());
    $("#add-questions").click();

    setTimeout(() => {
        $("form.sec1").show();
    }, 1000);


    $('.form_date input').val(week_date_format);
    $(".form_date").attr({ "data-date": week_date_format });

    /* $('.form_date').datetimepicker({
        language: 'en',
        weekStart: 1,
        todayBtn: 1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        minView: 2,
        forceParse: 0,
    }); */

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


    var date_input = $('input[name="expiry_date"]'); //our date input has the name "date"
    var container = $('.bootstrap-iso form').length > 0 ? $('.bootstrap-iso form').parent() : "body";
    var options = {
        format: 'M dd, yyyy',
        container: container,
        todayHighlight: true,
        autoclose: true,
        orientation: 'top'
    };
    date_input.datepicker(options);

    await actionSDK.executeApi(new actionSDK.HideLoadingIndicator.Request());
}

$(document).on("click", "#back", function () {
    $(".section-1").show();
    $(".section-1-footer").show();

    $("form #setting").hide();
    console.log('setting_text ' + setting_text);
    $('#due').text(setting_text);

});

$(document).on("change", ".form_time input, .form_date input, .visible-to", function () {
    var end = new Date($('input[name="expiry_date"]').val() + ' ' + $('input[name="expiry_time"]').val());
    var start = new Date();
    var days = calc_date_diff(start, end);

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
        var result_visible = $('.visible-to:checked').val() == 'Everyone' ? 'Results visible to everyone' : 'Results visible to only me';
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


/*  HTML Sections  */
// form
var form_section = `<div class="section-1">
            <div class="container pt-4">
                <div id="root" class="">
                    <div class="form-group">
                        <input type="Text" placeholder="Quiz Title" class="in-t input-lg form-control"
                            id="quiz-title" />
                    </div>

                    <div class="form-group">
                        <input type="Text" placeholder="Quiz Description" class="in-t form-control"
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
                        </svg> Add Questions</button>
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
                                <span id="due"> Due in 1 week, Results visible to everyone</span>
                            </a>

                        </div>
                        <div class="col-3 text-right"> <button type="button" class="btn btn-primary btn-sm pull-right"
                                id="submit"> Submit</button></div>
                    </div>
                </div>
            </div>
        </div>`;

// Question
var questions_section = `<div style="display: none;" id="question-section">
        <div class="container question-container" id="question1">
            <div class="card-box card-border card-bg">
                <div class="form-group">
                    <div class="hover-btn mb-2 h-32">
                        <button type="button" class="close remove-question" data-dismiss="alert">
                            <span aria-hidden="true">
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
                            <span class="sr-only">Close</span>
                        </button>
                    </div>
                    <div class="clearfix"></div>
                    <div class="input-group mb-2 ">
                        <div class="input-group-append">
                            <span class="question-number input-group-text input-tpt pl-0 strong"
                                style="cursor: pointer;">1.</span>
                        </div>
                        <input type="text" class="form-control in-t" placeholder="Enter the question"
                            aria-label="Enter the question" aria-describedby="basic-addon2" id="question-title">
                    </div>
                </div>
                <div class="d-flex">
                    <div class="ext-flex"></div>
                    <div class="form-group" id="options">
                        <label><strong>Choices</strong></label>
                        <div class="option-div">
                            <div class="input-group input-group-tpt mb-2 ">
                                <input type="text" class="form-control in-t" placeholder="Option 1"
                                    aria-label="Option 1" aria-describedby="basic-addon2" id="option1">
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
                            </div>

                            <div class="input-group mb-2  form-check custom-check-outer">
                                <label class="form-check-label custom-check"><input type="checkbox"
                                        class="form-check-input" id="check1" value="yes"> <span
                                        class="checkmark"></span> Check me if correct</label>
                            </div>

                        </div>
                        <div class="option-div">
                            <div class="input-group input-group-tpt mb-2">
                                <input type="text" class="form-control in-t" placeholder="Option 2"
                                    aria-label="Option 2" aria-describedby="basic-addon2" id="option2">
                                <div class="input-group-append">
                                    <span class="input-group-text remove-option input-tpt" style="cursor: pointer;"><svg
                                            viewBox="-40 0 427 427.00131"
                                            xmlns="http://www.w3.org/2000/svg" class="gt gs">
                                            <path
                                                d="m232.398438 154.703125c-5.523438 0-10 4.476563-10 10v189c0 5.519531 4.476562 10 10 10 5.523437 0 10-4.480469 10-10v-189c0-5.523437-4.476563-10-10-10zm0 0" />
                                            <path
                                                d="m114.398438 154.703125c-5.523438 0-10 4.476563-10 10v189c0 5.519531 4.476562 10 10 10 5.523437 0 10-4.480469 10-10v-189c0-5.523437-4.476563-10-10-10zm0 0" />
                                            <path
                                                d="m28.398438 127.121094v246.378906c0 14.5625 5.339843 28.238281 14.667968 38.050781 9.285156 9.839844 22.207032 15.425781 35.730469 15.449219h189.203125c13.527344-.023438 26.449219-5.609375 35.730469-15.449219 9.328125-9.8125 14.667969-23.488281 14.667969-38.050781v-246.378906c18.542968-4.921875 30.558593-22.835938 28.078124-41.863282-2.484374-19.023437-18.691406-33.253906-37.878906-33.257812h-51.199218v-12.5c.058593-10.511719-4.097657-20.605469-11.539063-28.03125-7.441406-7.421875-17.550781-11.5546875-28.0625-11.46875h-88.796875c-10.511719-.0859375-20.621094 4.046875-28.0625 11.46875-7.441406 7.425781-11.597656 17.519531-11.539062 28.03125v12.5h-51.199219c-19.1875.003906-35.394531 14.234375-37.878907 33.257812-2.480468 19.027344 9.535157 36.941407 28.078126 41.863282zm239.601562 279.878906h-189.203125c-17.097656 0-30.398437-14.6875-30.398437-33.5v-245.5h250v245.5c0 18.8125-13.300782 33.5-30.398438 33.5zm-158.601562-367.5c-.066407-5.207031 1.980468-10.21875 5.675781-13.894531 3.691406-3.675781 8.714843-5.695313 13.925781-5.605469h88.796875c5.210937-.089844 10.234375 1.929688 13.925781 5.605469 3.695313 3.671875 5.742188 8.6875 5.675782 13.894531v12.5h-128zm-71.199219 32.5h270.398437c9.941406 0 18 8.058594 18 18s-8.058594 18-18 18h-270.398437c-9.941407 0-18-8.058594-18-18s8.058593-18 18-18zm0 0" />
                                            <path
                                                d="m173.398438 154.703125c-5.523438 0-10 4.476563-10 10v189c0 5.519531 4.476562 10 10 10 5.523437 0 10-4.480469 10-10v-189c0-5.523437-4.476563-10-10-10zm0 0" />
                                        </svg></span>
                                </div>
                            </div>
                            <div class="input-group mb-2 form-check custom-check-outer">
                                <label class="form-check-label custom-check"><input type="checkbox"
                                        class="form-check-input" value="yes" id="check2"> <span
                                        class="checkmark"></span> Check me if correct</label>
                            </div>

                        </div>
                        <div class="">
                            <button type="button" class="teams-link add-options"> <svg role="presentation"
                                    focusable="false" viewBox="8 8 16 16" class="cc gs gt ha gv">
                                    <path class="ui-icon__outline cc"
                                        d="M23.352 16.117c.098.1.148.217.148.352 0 .136-.05.253-.148.351a.48.48 0 0 1-.352.149h-6v6c0 .136-.05.253-.148.351a.48.48 0 0 1-.352.149.477.477 0 0 1-.352-.149.477.477 0 0 1-.148-.351v-6h-6a.477.477 0 0 1-.352-.149.48.48 0 0 1-.148-.351c0-.135.05-.252.148-.352A.481.481 0 0 1 10 15.97h6v-6c0-.135.049-.253.148-.352a.48.48 0 0 1 .352-.148c.135 0 .252.05.352.148.098.1.148.216.148.352v6h6c.135 0 .252.05.352.148z">
                                    </path>
                                    <path class="ui-icon__filled gr"
                                        d="M23.5 15.969a1.01 1.01 0 0 1-.613.922.971.971 0 0 1-.387.078H17v5.5a1.01 1.01 0 0 1-.613.922.971.971 0 0 1-.387.078.965.965 0 0 1-.387-.079.983.983 0 0 1-.535-.535.97.97 0 0 1-.078-.386v-5.5H9.5a.965.965 0 0 1-.387-.078.983.983 0 0 1-.535-.535.972.972 0 0 1-.078-.387 1.002 1.002 0 0 1 1-1H15v-5.5a1.002 1.002 0 0 1 1.387-.922c.122.052.228.124.32.215a.986.986 0 0 1 .293.707v5.5h5.5a.989.989 0 0 1 .707.293c.09.091.162.198.215.32a.984.984 0 0 1 .078.387z">
                                    </path>
                                </svg> Add more options</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>`;

// Option
var option_section = `<div style="display: none;" id="option-section">
        <div class="option-div">
            <div class="input-group input-group-tpt mb-2">
                <input type="text" class="form-control in-t" placeholder="Option" aria-label="Recipient's username"
                    aria-describedby="basic-addon2" id="option-1">
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
            </div>
            <div class="input-group mb-2  form-check custom-check-outer">
                <label class="custom-check form-check-label">
                    <input type="checkbox" class="form-check-input" value="yes">
                    <span class="checkmark"></span> Check me if correct
                </label>
            </div>
        </div>
    </div>`;

// Setting 
var setting_section = `<div style="display:none" id="setting">
        <div class="container pt-4 setting-section">
            <div class="row">
                <div class="col-sm-12">
                    <label><strong>Due by</strong></label>
                </div>
                <div class="clearfix"></div>
                <div class="col-1"></div>
                <div class="col-5">
                    <!-- <div class="input-group input-group-tpt mb-2">
                        <input type="text" name="expiry_date" class="form-control in-t" placeholder="Date"
                            aria-label="Expiry Date" aria-describedby="basic-addon2" id="expiry-date">
                    </div> -->

                    <div class="input-group date form_date col-md-5" data-date="1979-09-16T05:25:07Z" data-date-format="M dd, yyyy" data-link-field="dtp_input1">
                        <input class="form-control in-t" size="16" name="expiry_date" type="text" value="" readonly>
                        
                    </div>
                </div>
                <div class="col-5">
                    <!-- <div class="input-group input-group-tpt mb-2">
                        <input type="time" name="expiry_time" class="form-control in-t" placeholder="Time"
                            aria-label="Time" aria-describedby="basic-addon2" id="expiry-time" value="23:59">
                    </div> -->

                    <div class="input-group date form_time col-md-5" data-date="" data-date-format="hh:ii" data-link-field="dtp_input3" data-link-format="hh:ii">
                        <input class="form-control in-t" name="expiry_time" size="16" type="text" value="" readonly>
                        <span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>
                        <span class="input-group-addon"><span class="glyphicon glyphicon-time"></span></span>
                    </div>
                </div>
                <div class="clearfix"></div>
                <div class="col-12">
                    <label><strong>Results visible to</strong></label>
                </div>
                <div class="clearfix"></div>
                <div class="col-1"></div>
                <div class="col-11">
                    <div class="custom-radio-outer">
                        <label class="custom-radio">
                            <input type="radio" name="visible_to" class="visible-to" value="Everyone" checked>
                            <span class="radio-block"></span> Everyone
                        </label>
                    </div>
                    <div class="custom-radio-outer">
                        <label class="custom-radio">
                            <input type="radio" name="visible_to" class="visible-to" value="Only me"><span
                                class="radio-block"></span> Only Me
                        </label>
                    </div>
                </div>
                <div class="clearfix"></div>
                <div class="col-12">
                    <label><strong>Show correct answer after each question</strong></label>
                </div>
                <div class="clearfix"></div>
                <div class="col-1"></div>
                <div class="col-11">
                    <div class="row">
                        <div class="col-12">
                            <div class="input-group mb-2 form-check custom-check-outer">
                                <label class="custom-check form-check-label">
                                    <input type="checkbox" name="show_correct_answer" id="show-correct-answer" value="Yes" checked/>
                                    <span class="checkmark"></span>
                                    Answer cannot be changed if this option is selected
                                </label>
                            </div>
                        </div>
                    </div>
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
                                    </svg> Back
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

//  modal
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