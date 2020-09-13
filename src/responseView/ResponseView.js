import * as actionSDK from "action-sdk-sunny";
import { Localizer } from '../common/ActionSdkHelper';

// ActionSDK.APIs.actionViewDidLoad(true /*success*/ );

// Fetching HTML Elements in Variables by ID.
let request;
var $root = "";
let row = {};
let actionInstance = null;
let max_question_count = 0;
let current_page = 0;
let summary_answer_resp = [];
let questionKey = '';
let questionsKey = '';
let startKey = '';
let noteKey = '';
let choiceAnyChoiceKey = '';
let continueKey = '';
let answerResponseKey = '';
let correctKey = '';
let yourAnswerKey = '';
let incorrectKey = '';
let correctAnswerKey = '';
let yourAnswerRightKey = '';
let yourAnswerIsKey = ''
let rightAnswerIsKey = '';
let submitKey = '';
let quizSummaryKey = '';
let nextKey = '';
let backKey = '';
let quizExpiredKey = '';
let actionDataRows = null;
let actionDataRowsLength = 0;
let memberIds = [];
let myUserId = [];
let contextActionId;

async function getStringKeys() {
    Localizer.getString('question').then(function(result) {
        questionKey = result;
        $('.question-key').text(questionKey);
    });

    Localizer.getString('questions').then(function(result) {
        questionsKey = result;
        $('.question-key').text(questionsKey);
    });

    Localizer.getString('start').then(function(result) {
        startKey = result;
        $('#start').text(startKey);
    });

    Localizer.getString('note').then(function(result) {
        noteKey = result;
        $('.note-key').text(noteKey);
    });

    Localizer.getString('choose_any_choice').then(function(result) {
        choiceAnyChoiceKey = result;
    });

    Localizer.getString('continue').then(function(result) {
        continueKey = result;
    });

    Localizer.getString('answer_response').then(function(result) {
        answerResponseKey = result;
    });

    Localizer.getString('correct').then(function(result) {
        correctKey = result;
    });

    Localizer.getString('your_answer').then(function(result) {
        yourAnswerKey = result;
    });

    Localizer.getString('incorrect').then(function(result) {
        incorrectKey = result;
    });

    Localizer.getString('correct_answer').then(function(result) {
        correctAnswerKey = result;
    });

    Localizer.getString('your_answer_is').then(function(result) {
        yourAnswerIsKey = result;
    });

    Localizer.getString('right_answer_is').then(function(result) {
        rightAnswerIsKey = result;
    });

    Localizer.getString('submit').then(function(result) {
        submitKey = result;
        $('.submit-key').text(submitKey);
    });

    Localizer.getString('quiz_summary').then(function(result) {
        quizSummaryKey = result;
    });

    Localizer.getString('next').then(function(result) {
        nextKey = result;
        $('.next-key').text(nextKey);
    });

    Localizer.getString('back').then(function(result) {
        backKey = result;
        $('.back-key').text(backKey);
    });

    Localizer.getString('quiz_expired').then(function(result) {
        quizExpiredKey = result;
        $('#quiz-expired-key').text(backKey);
    });

}

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
    // $('div.section-1').after(modal_section1);
    $('div.section-1').after(modal_section2);

    $root = $("#root")

    setTimeout(() => {
        $('div.section-1').show();
        $('div.footer').show();
    }, 1000);

    await actionSDK.executeApi(new actionSDK.HideLoadingIndicator.Request());

    OnPageLoad();
}



// *********************************************** HTML ELEMENT***********************************************
$(document).ready(function() {
    request = new actionSDK.GetContext.Request();
    getTheme(request);
});

function OnPageLoad() {
    actionSDK
        .executeApi(request)
        .then(function(response) {
            console.info("GetContext - Response: " + JSON.stringify(response));
            myUserId = response.context.userId;
            contextActionId = response.context.actionId
            getResponderIds(contextActionId);
            getActionInstance(contextActionId);
        })
        .catch(function(error) {
            console.error("GetContext - Error: " + JSON.stringify(error));
        });
}

async function getResponderIds(actionId) {
    console.log('getResponderIds');
    actionSDK
        .executeApi(new actionSDK.GetActionDataRows.Request(actionId))
        .then(function(batchResponse) {
            actionDataRows = batchResponse.dataRows;
            actionDataRowsLength = actionDataRows == null ? 0 : actionDataRows.length;

            if (actionDataRowsLength > 0) {
                for (let i = 0; i < actionDataRowsLength; i++) {
                    memberIds.push(actionDataRows[i].creatorId);
                }
                console.log("memberIds" + JSON.stringify(memberIds));
                console.log("myUserId" + JSON.stringify(myUserId));
            }
        })
        .catch(function(error) {
            console.log("Console log: Error: " + JSON.stringify(error));
        });
}

function getActionInstance(actionId) {
    actionSDK
        .executeApi(new actionSDK.GetAction.Request(actionId))
        .then(function(response) {
            console.info("Response: " + JSON.stringify(response));
            actionInstance = response.action;
            createBody();
        })
        .catch(function(error) {
            console.log("Error: " + JSON.stringify(error));
        });
}

function createBody() {

    /*  Check Expiry date time  */
    var current_time = new Date().getTime();
    if (actionInstance.expiryTime <= current_time) {
        var $card = $('<div class="card"></div>');
        var $spDiv = $('<div class="col-sm-12"></div>');
        var $sDiv = $(`<div class="form-group" id="quiz-expired-key">${quizExpiredKey}</div>`);
        $card.append($spDiv);
        $spDiv.append($sDiv);
        $root.append($card);
        getStringKeys();

    } else {
        getStringKeys();

        var $card = $('<div class=""></div>');
        var $title = $("<h4>" + actionInstance.displayName + "</h4>");
        var $hr = $("<hr>");
        var $description = $('<p class="">' + actionInstance.customProperties[0].value + '</p>');
        console.log(actionInstance);
        $card.append($title);
        $card.append($description);
        $root.append($card);
        $root.append('<hr>');

        var counter = actionInstance.dataTables[0].dataColumns.length
        $root.append(text_section1);

        if (counter > 1) {
            Localizer.getString('questions').then(function(result) {
                $('div.card-box:last').find('span.training-type').text(result);
                Localizer.getString('totalQuestionQuiz', counter, result).then(function(res) {
                    $('div.card-box:last').find('.text-description').text(res);
                });
            });
        } else {
            Localizer.getString('question').then(function(result) {
                $('div.card-box:last').find('span.training-type').text(result);
                Localizer.getString('totalQuestionQuiz', counter, result).then(function(res) {
                    $('div.card-box:last').find('.text-description').text(res);
                });
            });
        }

        console.log(myUserId);
        console.log(memberIds);
        if ($.inArray(myUserId, memberIds) > -1) {
            $root.append('<hr>');

            Localizer.getString('alreadyTired').then(function(result) {
                $root.append(`<div><b> ${result} </b></div>`);
            });
            Localizer.getString('notConsideredFinalScore').then(function(result) {
                $root.append(`<div><small>${result}</small></div>`);
            });
        }

        $root.after(footer_section1);

        getStringKeys();

        // createQuestionView();
        // $root.append($hr);

        /* var $spDiv = $('<div class="col-sm-12"></div>');
        var $sDiv = $('<div class="form-group"></div>');
        var $submit = $('<button class="btn btn-primary btn-sm float-right submit-form" >Submit</button>'); // Create a <button> element
        $sDiv.append($submit);
        $spDiv.append($sDiv);
        $root.append($spDiv); */
        return;
    }
}

$(document).on('click', '#start', function() {
    $root.html('');
    max_question_count = actionInstance.dataTables[0].dataColumns.length;
    getStringKeys();

    createQuestionView();
})

$(document).on('click', '.submit-form', function() {
    summarySection();
});

function createQuestionView() {
    $('.footer.section-1-footer').remove();
    $root.after(pagination_footer_section);

    console.log('create Question' + current_page);
    if (current_page > 0) {
        $('#previous').prop('disabled', false);
    } else {
        $('#previous').prop('disabled', true);
    }

    $('#previous').attr('data-prev-id', (parseInt(current_page) - 1));
    $('#next').attr('data-next-id', (parseInt(current_page) + 1));

    Localizer.getString('xofy', parseInt(current_page) + 1, max_question_count).then(function(result) {
        $('#xofy').text(result);
        nextButtonName();
    });

    actionInstance.dataTables.forEach((dataTable) => {
        var question = dataTable.dataColumns[current_page];
        var count = parseInt(current_page) + 1;
        $root.append(question_section);
        $('#root div.card-box:visible .question-title').text(`${count}. ${question.displayName}`);

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
                $('div.card-box:visible > .indent-20').append($radioOption);
            });
        } else {
            //add checkbox button
            question.options.forEach((option) => {
                var $radioOption = getRadioButton(
                    option.displayName,
                    question.name,
                    option.name
                );
                $('div.card-box:visible > .indent-20').append($radioOption);
            });
        }
    });



    /*  */

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

function nextButtonName() {
    /* var current_p = 0;
    $('.card-box.card-blank').each(function() {
        current_p++;
        if ($(this).is('visible'))
            return;
    }); */
    if (parseInt(current_page) + 1 >= max_question_count) {
        setTimeout(function() {
            $('.section-1-footer').find('#next').text('Done');
        }, 100);
    } else {
        setTimeout(function() {
            $('.section-1-footer').find('#next').text('Next');
        }, 100);
    }
}

$(document).on('click', 'div.radio-section', function() {
    radiobuttonclick($(this).id, $(this).attr('columnId'));
})

$(document).on("click", '#next', function() {
    var answerKeys = JSON.parse(actionInstance.customProperties[4].value);
    var correct_ans_arr = [];
    var selected_answer = [];
    var check_counter = 0;
    var correct_answer = false;
    var attr_name = '';
    var pagenumber = $(this).attr('data-next-id');
    current_page = pagenumber;

    getStringKeys();

    /* Check if radio or checkbox is checked */
    var is_checked = false;


    $('div.card-box:visible').find("input[type='checkbox']:checked").each(function(ind, ele) {
        if ($(ele).is(':checked')) {
            check_counter++;
            selected_answer.push($.trim($(ele).attr('id')));
            attr_name = $(ele).attr('name');

            is_checked = true;
        }
    });

    $('div.card-box:visible').find("input[type='radio']:checked").each(function(ind, ele) {
        if ($(ele).is(':checked')) {
            check_counter++;
            selected_answer.push($.trim($(ele).attr('id')));
            attr_name = $(ele).attr('name');

            is_checked = true;
        }
    });

    if (is_checked == true) {

        var is_checked = false;

        var ans_res = [];
        $.each(selected_answer, function(i, selected_subarray) {
            if ($.inArray(selected_subarray, answerKeys[(attr_name - 1)]) !== -1) {
                ans_res.push("true");
            } else {
                ans_res.push("false");
            }
        });

        console.log(ans_res);
        console.log(answerKeys[(attr_name - 1)].length);
        console.log(ans_res.length);
        console.log($.inArray("false", ans_res));
        if ((answerKeys[(attr_name - 1)].length == ans_res.length) && ($.inArray("false", ans_res) == -1)) {
            correct_answer = true
        } else {
            correct_answer = false;
        }

        summary_answer_resp.push(correct_answer);

        console.log('summary_answer_resp: ');
        console.log(summary_answer_resp);
        console.log(correct_answer);
        // return false;

        /* console.log(attr_name - 1);
        console.log(answerKeys[(attr_name - 1)].toString()); */
        $.each(answerKeys[(attr_name - 1)], function(ii, subarr) {
            correct_ans_arr.push($.trim($('#' + subarr).text()));
        });


        var correct_value = correct_ans_arr.join();
        // console.log('correct_value: ' + correct_value);
        if (actionInstance.customProperties[3].value == 'Yes' && $('div.card-box:visible').find("label.custom-radio").hasClass('disabled') !== "disabled") {

            if (correct_answer == true) {
                $('#exampleModalCenter').find('#exampleModalLongTitle').html(answerResponseKey);
                $('#exampleModalCenter').find('.modal-body').html(`<label class="text-success"><i class="fa fa-check" aria-hidden="true"></i> <strong>${correctKey}</strong></label><p><label>${yourAnswerKey}</label><br>${correct_value}</p>`);
                $('#exampleModalCenter').find('.modal-footer').html(`<button type="button" class="btn btn-primary btn-sm" data-dismiss="modal">${continueKey}</button>`);
                $('#exampleModalCenter').find('#save-changes').hide();
                $('#exampleModalCenter').modal('show');
            } else {
                $('#exampleModalCenter').find('#exampleModalLongTitle').html('Answer response');
                $('#exampleModalCenter').find('.modal-body').html(`<label class="text-danger"><i class="fa fa-remove" aria-hidden="true"></i> <strong>${incorrectKey}</strong></label><p><label>${correctAnswerKey}</label><br>${correct_value}</p>`);
                $('#exampleModalCenter').find('.modal-footer').html(`<button type="button" class="btn btn-primary btn-sm" data-dismiss="modal">${continueKey}</button>`);
                $('#exampleModalCenter').find('#save-changes').hide();
                $('#exampleModalCenter').modal('show');
            }

            if ($('#modal-close').length <= 0) {

                $("#exampleModalCenter").on("hidden.bs.modal", function() {
                    getStringKeys();

                    $root.after('<span id="modal-close"></span>');

                    $root.find('div.card-box:visible').find("input").each(function(ind, ele) {
                        $(ele).parents('label').prop('disabled', true);
                        if ($(ele).parents('div.custom-radio-outer').length > 0)
                            $(ele).parents('div.custom-radio-outer').addClass('disabled');
                        else
                            $(ele).parents('div.custom-check-outer').addClass('disabled');
                    });

                    $root.find('.card-box').hide();

                    console.log(`${parseInt(current_page)} == ${$root.find('div.card-box').length} && (${parseInt(current_page)}) < ${max_question_count}`);
                    if ((parseInt(current_page) == $root.find('div.card-box').length) && (parseInt(current_page)) < max_question_count) {
                        createQuestionView();
                    } else if (parseInt(current_page) == max_question_count) {
                        /*  Submit your question  */
                        var addDataRowRequest = new actionSDK.AddActionDataRow.Request(
                            getDataRow(contextActionId)
                        );
                        actionSDK
                            .executeApi(addDataRowRequest)
                            .then(function(batchResponse) {
                                console.info("BatchResponse: " + JSON.stringify(batchResponse));
                                summarySection();
                            })
                            .catch(function(error) {
                                console.error("Error: " + JSON.stringify(error));
                            });

                    } else {
                        // $root.find('div.card-box.card-blank:nth-child(' + current_page + ')').show();
                        $('#previous').attr('data-prev-id', (parseInt(current_page) - 1));
                        Localizer.getString('xofy', parseInt(current_page) + 1, max_question_count).then(function(result) {
                            $('#xofy').text(result);
                            nextButtonName();
                        });
                        $('#next').attr('data-next-id', (parseInt(current_page) + 1));
                        $root.find('div.card-box.card-blank:nth-child(' + (parseInt(current_page) + 1) + ')').show();

                        $('#previous').attr('disabled', false);
                    }

                    if (current_page >= max_question_count) {
                        $('#next').attr('disabled', false)
                    }
                });
            }


        } else {
            /* $root.find('div.card-box:visible').find("input").each(function(ind, ele) {
                $(ele).parents('label').prop('disabled', true);
                $(ele).parents('div.custom-radio-outer').addClass('disabled');
            }); */

            $root.find('.card-box').hide();

            if ((parseInt(current_page) == $root.find('div.card-box').length) && (parseInt(current_page)) < max_question_count) {
                createQuestionView();
            } else if (parseInt(current_page) == max_question_count) {
                /*  Submit your question  */
                var addDataRowRequest = new actionSDK.AddActionDataRow.Request(
                    getDataRow(contextActionId)
                );
                actionSDK
                    .executeApi(addDataRowRequest)
                    .then(function(batchResponse) {
                        console.info("BatchResponse: " + JSON.stringify(batchResponse));
                        summarySection();
                    })
                    .catch(function(error) {
                        console.error("Error: " + JSON.stringify(error));
                    });
            } else {
                // $root.find('root < div.card-box.card-blank:nth-child(' + current_page + ')').show();
                $root.find('.card-box:nth-child(' + (parseInt(current_page) + 1) + ')').show();
                $('#previous').attr('data-prev-id', (parseInt(current_page) - 1));
                Localizer.getString('xofy', parseInt(current_page) + 1, max_question_count).then(function(result) {
                    $('#xofy').text(result);
                    nextButtonName();
                });
                // $('#xofy').text(`${parseInt(current_page)} of ${max_question_count}`);
                $('#next').attr('data-next-id', (parseInt(current_page) + 1));
                $('#previous').attr('disabled', false);
            }

            if (current_page >= max_question_count) {
                $('#next').attr('disabled', false)
            }
        }

        console.log(` Prev: ${parseInt(pagenumber) - 1} Current: ${parseInt(pagenumber)} Next: ${parseInt(pagenumber) + 1}`);
        console.log(` current_page: ${parseInt(current_page)} max_question_count: ${parseInt(max_question_count)} `);

    } else {
        $('#exampleModalCenter2').find('#exampleModalLongTitle').html(`<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve" class="gt gs mt--4"><g><g><g><path d="M507.113,428.415L287.215,47.541c-6.515-11.285-18.184-18.022-31.215-18.022c-13.031,0-24.7,6.737-31.215,18.022L4.887,428.415c-6.516,11.285-6.516,24.76,0,36.044c6.515,11.285,18.184,18.022,31.215,18.022h439.796c13.031,0,24.7-6.737,31.215-18.022C513.629,453.175,513.629,439.7,507.113,428.415z M481.101,449.441c-0.647,1.122-2.186,3.004-5.202,3.004H36.102c-3.018,0-4.556-1.881-5.202-3.004c-0.647-1.121-1.509-3.394,0-6.007L250.797,62.559c1.509-2.613,3.907-3.004,5.202-3.004c1.296,0,3.694,0.39,5.202,3.004L481.1,443.434C482.61,446.047,481.748,448.32,481.101,449.441z"/><rect x="240.987" y="166.095" width="30.037" height="160.197" /><circle cx="256.005" cy="376.354" r="20.025" /></g></g></g > <g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg > <span class="note-key">${noteKey}</span>`);
        $('#exampleModalCenter2').find('.modal-body').html(`<label>${choiceAnyChoiceKey}<label>`);
        $('#exampleModalCenter2').find('.modal-footer').html(`<button type="button" class="btn btn-primary btn-sm" data-dismiss="modal">${continueKey}</button>`);
        $('#exampleModalCenter2').find('#save-changes').hide();
        $('#exampleModalCenter2').modal('show');

        $("#exampleModalCenter2").on("hidden.bs.modal", function() {
            $('#next').attr('disabled', false);
        });
    }

    /* var current_p = 0;
    $('.card-box.card-blank').each(function() {
        current_p++;
        if ($(this).is('visible'))
            return;
    });

    if (parseInt(current_page) >= (max_question_count - 1) && current_p >= max_question_count) {
        setTimeout(function() {
            $('.section-1-footer').find('#next').text('Done');
        }, 1000);
    } else {
        $('.section-1-footer').find('#next').text('Next');
    } */
});

$(document).on("click", '#previous', function() {
    var pagenumber = $(this).attr('data-prev-id');
    current_page = pagenumber;
    console.log(` Prev: ${parseInt(current_page)} Current: ${parseInt(current_page) + 1} Next: ${parseInt(current_page) + 2}`)
    console.log(` current_page: ${parseInt(current_page)} max_question_count: ${parseInt(max_question_count)} `);
    getStringKeys();

    $root.find('.card-box').hide();
    $root.find('.card-box:nth-child(' + (parseInt(current_page) + 1) + ')').show();
    $('#previous').attr('data-prev-id', (parseInt(current_page) - 1));
    $('#next').attr('data-next-id', (parseInt(current_page) + 1));
    Localizer.getString('xofy', parseInt(current_page) + 1, max_question_count).then(function(result) {
        $('#xofy').text(result);
        nextButtonName();
    });
    // $('#xofy').text(`${(parseInt(current_page) + 1)} of ${max_question_count}`);

    if (current_page <= 0) {
        $('#previous').attr('disabled', true);
    }

});

// *********************************************** HTML ELEMENT END***********************************************

// *********************************************** SUBMIT ACTION***********************************************

function summarySection() {
    getStringKeys();

    $root.find('.card-box').hide();

    $('#root').append(summary_section);
    $('div.section-1').after(summary_footer);

    /*  Check Show Correct Answer  */
    if (Object.keys(row).length > 0) {
        // if (actionInstance.customProperties[3].value == 'Yes') {
        var correct_answer = $.parseJSON(actionInstance.customProperties[4].value);
        console.log('correct_answer: ');
        console.log(correct_answer);
        var count = 0;

        var ans_rsp = '';
        var score = 0;

        $('#root').find('div.card-box').each(function(i, val) {

            var searchIDs = $(val).find('input:checked').map(function() {
                return $(this).attr('id');
            });

            var correct_ans = '';
            var your_ans = '';

            if (JSON.stringify(correct_answer[count]) == JSON.stringify(searchIDs.get())) {
                /*  Answer is correct  */
                score = score + 1;
                var $summary_card = $('<div class="card-box card-blank bt"></div>');
                var $summary_dtable = $('<div class="d-table"></div>');
                var question = $(val).find('.question-title').text();
                $summary_card.append($summary_dtable);
                Localizer.getString('correct').then(function(result) {
                    $summary_dtable.append(`<label>
                                <strong>${question}</strong>
                            </label>
                            <label class="float-right" id="status-${i}">
                                <span class="text-success">${result}</span>
                            </label>
                        `);
                });

                $(val).find('label.custom-radio, label.custom-check').each(function(opt_ind, opt_val) {
                    var opt_id = $(opt_val).find('input').attr('id');
                    if ($.inArray(opt_id, correct_answer[count]) !== -1) {
                        $summary_card.append(`<div class="form-group">
                                        <div class="form-group alert alert-success">
                                            <p class="mb0">
                                                ${$(opt_val).text()}
                                                <i class="fa  pull-right fa-check"></i>
                                            </p>
                                        </div>
                                    </div>`);
                    } else {
                        $summary_card.append(`<div class="form-group">
                                        <div class="form-group alert alert-normal">
                                            <p class="mb0">
                                                ${$(opt_val).text()}
                                            </p>
                                        </div>
                                    </div>`);
                    }
                });

            } else {
                /*  Answer is incorrect  */
                var $summary_card = $('<div class="card-box card-blank bt"></div>');
                var $summary_dtable = $('<div class="d-table"></div>');
                var question = $(val).find('.question-title').text();
                $summary_card.append($summary_dtable);
                Localizer.getString('incorrect').then(function(result) {
                    $summary_dtable.append(`<label>
                                        <strong>${question}</strong>
                                    </label>
                                    <label class="float-right" id="status-${i}">
                                        <span class="text-danger">${result}</span>
                                    </label>
                                `);
                });

                $(val).find('label.custom-radio, label.custom-check').each(function(opt_ind, opt_val) {
                    var opt_id = $(opt_val).find('input').attr('id');
                    if ($.inArray(opt_id, correct_answer[count]) !== -1) {
                        if ($(opt_val).find('input').prop('checked') == true) {
                            $summary_card.append(`<div class="form-group">
                                            <div class="form-group alert alert-danger">
                                                <p class="mb0">
                                                    ${$(opt_val).text()}
                                                    <i class="fa fa-pull-right text-danger fa-check"></i>
                                                </p>
                                            </div>
                                        </div>`);
                        } else {
                            $summary_card.append(`<div class="form-group">
                                            <div class="form-group alert alert-normal">
                                                <p class="mb0">
                                                    ${$(opt_val).text()}
                                                    <i class="fa fa-pull-right text-success fa-check"></i>
                                                </p>
                                            </div>
                                        </div>`);
                        }
                    } else {
                        if ($(opt_val).find('input').prop('checked') == true) {
                            $summary_card.append(`<div class="form-group">
                                            <div class="form-group alert alert-danger">
                                                <p class="mb0">
                                                    ${$(opt_val).text()}
                                                    <i class="fa fa-pull-right fa-close"></i>
                                                </p>
                                            </div>
                                        </div>`);
                        } else {
                            $summary_card.append(`<div class="form-group">
                                            <div class="form-group alert alert-normal">
                                                <p class="mb0">
                                                    ${$(opt_val).text()}
                                                </p>
                                            </div>
                                        </div>`);
                        }
                    }
                });

            }
            $('.summary-section').append($summary_card);
            count++;
        });
        $('.summary-section').append('<div class="ht-100"></div>');

        console.log('total score: ');
        console.log(score);
        var score_is = Math.round((score / correct_answer.length) * 100);
        $('.summary-section').prepend(`<div class="">
                        <label>
                            <strong>Score: </strong>${score_is}%
                        </label>
                    </div>`);
        Localizer.getString('quiz_summary').then(function(result) {
            $('.summary-section').prepend(`<div><h4>${result}</h4></div><hr>`);
        });

        /* } else {
            $('.submit-key').click();
        } */
    }

}

$(document).on('click', '.submit-key', function() {
    /* var addDataRowRequest = new actionSDK.AddActionDataRow.Request(
        getDataRow(contextActionId)
    ); */
    var closeViewRequest = new actionSDK.CloseView.Request();

    actionSDK
        .executeApi(closeViewRequest)
        .then(function(batchResponse) {
            console.info("BatchResponse: " + JSON.stringify(batchResponse));
        })
        .catch(function(error) {
            console.error("Error: " + JSON.stringify(error));
        });

    // addDataRows(contextActionId);
    /* actionSDK
        .executeApi(request)
        .then(function(response) {
            console.info("GetContext - Response: " + JSON.stringify(response));
            addDataRows(response.context.actionId);
        })
        .catch(function(error) {
            console.error("GetContext - Error: " + JSON.stringify(error));
        }); */

});

function radiobuttonclick(questionResponse, colomnId) {
    var data = [];
    row = {};
    $.each($("input[type='checkbox']:checked"), function(ind, v) {
        var col = $(this).parents("div.form-group").attr("columnid");
        data.push($(this).attr("id"));

        if (!row[col]) row[col] = [];
        row[col] = JSON.stringify(data);
    });

    $.each($("input[type='radio']:checked"), function() {
        var col = $(this).parents("div.form-group").attr("columnid");

        if (!row[col]) row[col] = [];
        row[col] = $(this).attr("id");
    });

    console.log(row);
}

function generateGUID() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
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
        .then(function(batchResponse) {
            console.info("BatchResponse: " + JSON.stringify(batchResponse));
        })
        .catch(function(error) {
            console.error("Error: " + JSON.stringify(error));
        });
}

// *********************************************** SUBMIT ACTION END***********************************************

var footer_section = `<div class="footer" style="display:none;">
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

var modal_section1 = `<div class="modal fade" id="exampleModalCenter1" tabindex="-1" role="dialog"
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

var modal_section2 = `<div class="modal fade" id="exampleModalCenter2" tabindex="-1" role="dialog"
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



var text_section1 = `<div class="card-box card-blank">
                        <div class="form-group">
                            <div class="hover-btn ">
                                <label><strong><span class="training-type question-key">${questionKey}</span></strong> </label><span class="float-right result"></span>
                            </div>
                            <div class="clearfix"></div>
                            <hr>
                        </div>
                        <p class="mb0 text-description">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type
                            specimen book.</p>
                    </div>`;

var footer_section1 = `<div class="footer section-1-footer">
                            <div class="footer-padd bt">
                                <div class="container ">
                                    <div class="row">
                                        <div class="col-4"> </div>
                                        <div class="col-4 text-center"> </div>
                                        <div class="col-4 text-right"> <button type="button" class="btn btn-primary btn-sm pull-right" id="start"> ${startKey}</button></div>
                                    </div>
                                </div>
                            </div>
                        </div>`;

var question_section = `<div class="card-box card-blank"><label><strong class="question-title">1. ksklaskdl</strong></label>
                            <div class="indent-20">
                                
                            </div>
                        </div>`;

var pagination_footer_section = `<div class="footer section-1-footer">
            <div class="footer-padd bt">
                <div class="container ">
                    <div class="row">
                        <div class="col-4"> <button type="button" class="btn btn-primary-outline btn-sm back-key" id="previous" disabled> ${backKey}</button></div>
                        <div class="col-4 text-center" id="xofy"> 1 of 4</div>
                        <div class="col-4 text-right"> <button type="button" class="btn btn-primary btn-sm pull-right next-key" id="next"> ${nextKey}</button></div>
                    </div>
                </div>
            </div>
        </div>`;

var summary_section = `<div class="summary-section"></div>`;
var summary_footer = `<div class="footer section-1-footer">
                            <div class="footer-padd bt">
                                <div class="container ">
                                    <div class="row">
                                        <div class="col-4"> </div>
                                        <div class="col-4 text-center"> </div>
                                        <div class="col-4 text-right"> <button type="button" class="btn btn-primary btn-sm pull-right submit-key" id="submit"> ${submitKey}</button></div>
                                    </div>
                                </div>
                            </div>
                        </div>`;