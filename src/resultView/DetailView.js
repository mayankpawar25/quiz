import * as actionSDK from "action-sdk-sunny";

$(document).ready(function () {
    OnPageLoad();
});

let actionContext = null;
let actionInstance = null;
let actionSummary = null;
let actionDataRows = null;
let actionDataRowsLength = 0;
let ResponderDate = [];
let actionNonResponders = [];
let myUserId = "";
var root = document.getElementById("root");

function OnPageLoad() {
    actionSDK
        .executeApi(new actionSDK.GetContext.Request())
        .then(function (response) {
            console.info("GetContext - Response: " + JSON.stringify(response));
            actionContext = response.context;
            getDataRows(response.context.actionId);
        })
        .catch(function (error) {
            console.error("GetContext - Error: " + JSON.stringify(error));
        });
}

function getDataRows(actionId) {
    var getActionRequest = new actionSDK.GetAction.Request(actionId);
    var getSummaryRequest = new actionSDK.GetActionDataRowsSummary.Request(
        actionId,
        true
    );
    var getDataRowsRequest = new actionSDK.GetActionDataRows.Request(actionId);
    var batchRequest = new actionSDK.BaseApi.BatchRequest([
        getActionRequest,
        getSummaryRequest,
        getDataRowsRequest,
    ]);

    actionSDK
        .executeBatchApi(batchRequest)
        .then(function (batchResponse) {
            console.info("BatchResponse: " + JSON.stringify(batchResponse));
            actionInstance = batchResponse.responses[0].action;
            actionSummary = batchResponse.responses[1].summary;
            actionDataRows = batchResponse.responses[2].dataRows;
            actionDataRowsLength = actionDataRows == null ? 0 : actionDataRows.length;
            createBody();
        })
        .catch(function (error) {
            console.log("Console log: Error: " + JSON.stringify(error));
        });
}

async function createBody() {
    let getSubscriptionCount = '';
    $('#root').html('');

    /*  Head Section  */
    head();

    /*  Person Responded X of Y Responses  */
    getSubscriptionCount = new actionSDK.GetSubscriptionMemberCount.Request(
        actionContext.subscription
    );
    let response = (await actionSDK.executeApi(
        getSubscriptionCount
    ));

    var $pcard = $('<div class=""></div>');

    let memberCount = response.memberCount;
    let participationPercentage = 0;

    participationPercentage = Math.round(
        (actionSummary.rowCreatorCount / memberCount) * 100
    );

    var xofy = actionSummary.rowCount + ' of ' + memberCount + ' people responded';


    $pcard.append('<label><strong>Participation ' + participationPercentage + '% </strong></label><div class="progress"><div class="progress-bar bg-primary" role="progressbar" style="width: ' + participationPercentage + '%" aria-valuenow="' + participationPercentage + '" aria-valuemin="0" aria-valuemax="100"></div></div>');
    $pcard.append('<p>' + xofy + '</p>');
    $('#root').append($pcard);

    var $card1 = $('<div class="card-box"></div>');
    var tabs = $(".tabs-content").clone();
    $card1.append(tabs.clone());
    $("#root").append($card1);

    await getUserprofile();

    /*  Add Responders  */
    getResponders();

    /*  Add Non-reponders  */
    getNonresponders();
    return true;
}

function head() {
    var title = actionInstance.displayName;
    var description = actionInstance.customProperties[0]["value"];
    var dueby = new Date(actionInstance.expiryTime).toDateString();

    var $card = $('<div class=""></div>');
    var $title_sec = $('<h4>' + title + '</h4>');
    var $description_sec = $('<p>' + description + '</p>');
    var $date_sec = $('<p><small class="date-color md-0">' + 'Due by ' + dueby + '</small></p>');

    $card.append($title_sec);
    $card.append($description_sec);
    $card.append($date_sec);
    $card.append("<hr>");

    $('#root').append($card);
}

async function getUserprofile() {
    let memberIds = [];
    ResponderDate = [];
    actionNonResponders = [];
    if (actionDataRowsLength > 0) {
        for (let i = 0; i < actionDataRowsLength; i++) {
            memberIds.push(actionDataRows[i].creatorId);
            console.log("memberIds" + JSON.stringify(memberIds));

            let requestResponders = new actionSDK.GetSubscriptionMembers.Request(
                actionContext.subscription, [actionDataRows[i].creatorId]
            ); // ids of responders

            let responseResponders = await actionSDK.executeApi(requestResponders);

            // console.log("requestResponders: " + JSON.stringify(requestResponders));
            // console.log("responseResponders: " + JSON.stringify(responseResponders));
            // return true;

            let perUserProfile = responseResponders.members;
            // console.log("perUserProfile: " + perUserProfile);
            ResponderDate.push({
                label: perUserProfile[0].displayName,
                value: new Date(actionDataRows[i].updateTime).toDateString(),
                value2: perUserProfile[0].id,
            });
        }
    }

    myUserId = actionContext.userId;
    // console.log(myUserId);
    let requestNonResponders = new actionSDK.GetActionSubscriptionNonParticipants.Request(
        actionContext.actionId,
        actionContext.subscription.id
    );
    let responseNonResponders = await actionSDK.executeApi(requestNonResponders);
    let tempresponse = responseNonResponders.nonParticipants;
    console.log(
        "responseNonResponders: " + JSON.stringify(responseNonResponders)
    );
    console.log("tempresponse: " + JSON.stringify(tempresponse));
    if (tempresponse != null) {
        for (let i = 0; i < tempresponse.length; i++) {
            actionNonResponders.push({
                label: tempresponse[i].displayName,
                value2: tempresponse[i].id,
            });
        }
    }
    console.log("actionNonResponders:" + JSON.stringify(actionNonResponders));
}

function getResponders() {

    $("table#responder-table tbody").html('');

    for (let itr = 0; itr < ResponderDate.length; itr++) {
        var id = ResponderDate[itr].value2;
        var name = "";
        if (ResponderDate[itr].value2 == myUserId) {
            name = "You";
        } else {
            name = ResponderDate[itr].label;
        }
        var date = ResponderDate[itr].value;

        $(".tabs-content:first").find("table#responder-table tbody").append('<tr id="' + ResponderDate[itr].value2 + '" class="getresult"><td><span>' + name + '</span></td><td  class="text-right">' + date + '</td></tr>');
    }
}

function getNonresponders() {

    $("table#non-responder-table tbody").html('');

    for (let itr = 0; itr < actionNonResponders.length; itr++) {
        var id = actionNonResponders[itr].value2;
        var name = "";
        if (actionNonResponders[itr].value2 == myUserId) {
            name = "You";
        } else {
            name = actionNonResponders[itr].label;
        }
        var date = actionNonResponders[itr].value;
        $(".tabs-content:first").find("table#non-responder-table tbody").append("<tr><td>" + name + "</td></tr>");
    }
}

$(document).on('click', '.getresult', function () {

    var userId = $(this).attr('id');
    console.log(userId);

    console.log('actionInstance: ' + JSON.stringify(actionInstance));
    console.log('actionSummary: ' + JSON.stringify(actionSummary));
    console.log('actionDataRows: ' + JSON.stringify(actionDataRows));

    $('#root').html('');
    head();
    // var question_content = $('.question-content').clone();
    $('#root').append($('.question-content').clone());
    createQuestionView(userId);

    footer();
});


function createQuestionView(userId) {
    $('div#root > div.question-content').html('');
    var count = 1;
    // console.log(JSON.stringify(actionInstance));
    actionInstance.dataTables.forEach((dataTable) => {

        // var $linebreak = $("<br>");
        // $qDiv.append($linebreak);

        dataTable.dataColumns.forEach((question, ind) => {
            var $cardDiv = $('<div class="card-box"></div>');
            var $rowdDiv = $('<div class="row"></div>');
            var $qDiv = $('<div class="col-sm-12"></div>');
            $cardDiv.append($rowdDiv);
            $rowdDiv.append($qDiv);

            var count = ind + 1;
            var $questionHeading = $('<label></label>');
            $questionHeading.append("<strong>" + count + ". " + question.displayName + "</strong>");
            $cardDiv.append($questionHeading);

            question.options.forEach((option) => {

                /* User Responded */
                var userResponse = [];
                var userResponseAnswer = '';
                for (let i = 0; i < actionDataRowsLength; i++) {
                    if (actionDataRows[i].creatorId == userId) {
                        userResponse = actionDataRows[i].columnValues;
                        var userResponseLength = Object.keys(userResponse).length;

                        for (var j = 1; j <= userResponseLength; j++) {
                            // console.log('isJson(userResponse[' + j + '])' + isJson(userResponse[j]));
                            if (isJson(userResponse[j])) {
                                var userResponseAns = JSON.parse(userResponse[j]);
                                var userResponseAnsLen = userResponseAns.length;
                                // console.log('userResponseAns: ' + JSON.stringify(userResponseAns));
                                // console.log('userResponseAnsLen: ' + userResponseAnsLen);
                                if (userResponseAnsLen > 1) {
                                    console.log('here if block');
                                    for (var k = 0; k < userResponseAnsLen; k++) {
                                        console.log('userResponseAns[k]' + userResponseAns[k]);
                                        if (userResponseAns[k] == option.name) {
                                            userResponseAnswer = userResponseAns[k];
                                            // console.log('if userResponseAnswer' + k + ': ' + JSON.stringify(userResponseAnswer));
                                        } else {
                                            continue;
                                        }
                                    }
                                } else {
                                    userResponseAnswer = userResponseAns;
                                    // console.log('userResponseAnswer: ' + userResponseAnswer);
                                }
                            } else {
                                console.log('Else: userResponseAns - ' + JSON.stringify(userResponse));
                                if (userResponse[j] == option.name) {
                                    userResponseAnswer = userResponse[j];
                                    // console.log('userResponseAnswer: ' + userResponseAnswer);
                                }
                            }


                        }

                    }
                }

                /* Correct Answer */
                var correctResponse = JSON.parse(actionInstance.customProperties[4].value);
                var correctResponseLength = Object.keys(correctResponse).length;
                var correctAnswer = '';
                for (let j = 0; j < correctResponseLength; j++) {
                    console.log('correctResponse: ' + JSON.stringify(correctResponse[j]));

                    var correctResponseAns = correctResponse[j];
                    console.log('correctResponseAns: ' + JSON.stringify(correctResponseAns));
                    var correctResponseAnsLen = correctResponseAns.length;
                    for (let k = 0; k < correctResponseAnsLen; k++) {
                        if (correctResponseAns[k] == option.name) {
                            console.log('correctAnswer: ' + JSON.stringify(correctAnswer));
                            correctAnswer = correctResponseAns[k];
                        }
                    }

                }


                var $radioOption = getOptions(
                    option.displayName,
                    question.name,
                    option.name,
                    userResponseAnswer,
                    correctAnswer
                );
                console.log($radioOption);
                $cardDiv.append($radioOption);
            });
            $('div.question-content:first').append($cardDiv);
        });
        count++;
    });
}


function getOptions(text, name, id, userResponse, correctAnswer) {

    console.log(text + ', ' + name + ', ' + id + ', ' + userResponse + ', ' + correctAnswer);
    var $oDiv = $('<div class="form-group"></div>');
    /*  If answer is correct  and answered */
    if (userResponse == id && correctAnswer == id) {
        $oDiv.append('<div class="form-group alert alert-success"><p class="mb0">' + text + ' <i class="fa  pull-right fa-check"></i> </p></div>');
    } else if (userResponse != id && correctAnswer == id) {
        /* If User Response is incorrect and not answered */
        $oDiv.append('<div class="form-group"><p class="mb0">' + text + ' <i class="fa fa-pull-right text-success fa-check"></p></div>');
    } else if (userResponse == id && correctAnswer != id) {
        /* If User Response is incorrect and answered */
        $oDiv.append('<div class="form-group alert alert-danger"><p class="mb0">' + text + '<i class="fa fa-pull-right fa-close"></i></p></div>');
    } else {
        $oDiv.append('<div class="form-group"><p class="mb0">' + text + '</p></div>');
    }

    return $oDiv;
}

function isJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

function footer() {
    $('div.question-content').append('<div class="footer"><div class="footer-padd bt"><div class="container "><div class="row"><div class="col-9"><a class="cursur-pointer back" id="hide2"><svg role="presentation" focusable="false" viewBox="8 8 16 16" class="gt ki gs"><path class="ui-icon__outline gr" d="M16.38 20.85l7-7a.485.485 0 0 0 0-.7.485.485 0 0 0-.7 0l-6.65 6.64-6.65-6.64a.485.485 0 0 0-.7 0 .485.485 0 0 0 0 .7l7 7c.1.1.21.15.35.15.14 0 .25-.05.35-.15z"></path><path class="ui-icon__filled" d="M16.74 21.21l7-7c.19-.19.29-.43.29-.71 0-.14-.03-.26-.08-.38-.06-.12-.13-.23-.22-.32s-.2-.17-.32-.22a.995.995 0 0 0-.38-.08c-.13 0-.26.02-.39.07a.85.85 0 0 0-.32.21l-6.29 6.3-6.29-6.3a.988.988 0 0 0-.32-.21 1.036 1.036 0 0 0-.77.01c-.12.06-.23.13-.32.22s-.17.2-.22.32c-.05.12-.08.24-.08.38 0 .28.1.52.29.71l7 7c.19.19.43.29.71.29.28 0 .52-.1.71-.29z"></path></svg> Back</a></div><div class="col-3"><button class="btn btn-tpt">&nbsp;</button></div></div></div></div></div>');
}

$(document).on('click', '.back', function () {
    createBody();
});