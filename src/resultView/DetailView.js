import * as actionSDK from "action-sdk-sunny";

$(document).ready(function() {
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

/* console.log(JSON.stringify(actionSDK.GetContext.Request()));
console.log(JSON.stringify(actionSDK.GetContext.Response)); */

function OnPageLoad() {
    console.log("onload");
    console.log(JSON.stringify(actionSDK.GetContext.Request()));
    actionSDK
        .executeApi(new actionSDK.GetContext.Request())
        .then(function(response) {
            console.log("here");
            console.info("GetContext - Response: " + JSON.stringify(response));
            actionContext = response.context;
            getDataRows(response.context.actionId);
            console.log("actionContext: " + JSON.stringify(actionContext));
        })
        .catch(function(error) {
            console.error("GetContext - Error: " + JSON.stringify(error));
        });
    console.log("onload end");
}

function getDataRows(actionId) {
    console.log("getDataRows load");
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
        .then(function(batchResponse) {
            console.info("BatchResponse: " + JSON.stringify(batchResponse));
            actionInstance = batchResponse.responses[0].action;
            actionSummary = batchResponse.responses[1].summary;
            actionDataRows = batchResponse.responses[2].dataRows;
            actionDataRowsLength = actionDataRows == null ? 0 : actionDataRows.length;

            console.log("actionInstance " + JSON.stringify(actionInstance));
            console.log("actionSummary " + JSON.stringify(actionSummary));
            console.log("actionDataRows " + JSON.stringify(actionDataRows));
            console.log(
                "actionDataRowsLength " + JSON.stringify(actionDataRowsLength)
            );

            createBody();
        })
        .catch(function(error) {
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

    let memberCount = response.memberCount;
    let participationPercentage = 0;

    participationPercentage = Math.round(
        (actionSummary.rowCreatorCount / memberCount) * 100
    );

    var xofy = actionSummary.rowCount + ' of ' + memberCount + ' people responded';

    $('#root').append('<h5>Participation ' + participationPercentage + '% </h5><div class="progress"><div class="progress-bar bg-info" role="progressbar" style="width: ' + participationPercentage + '%" aria-valuenow="' + participationPercentage + '" aria-valuemin="0" aria-valuemax="100"></div></div>');
    $("#root").append(xofy);

    var tabs = $(".tabs-content").clone();
    $("#root").append(tabs.clone());

    await getUserprofile();

    /*  Add Responders  */
    getResponders();

    /*  Add Non-reponders  */
    getNonresponders();
    return true;
}

function head() {
    var title = actionInstance.displayName;
    var description = actionInstance.properties[0]["value"];
    var dueby = new Date(actionInstance.expiryTime).toDateString();

    var title_sec = document.createElement("h5");
    var hr_sec = document.createElement("hr");
    var description_sec = document.createElement("small");
    var dueby_sec = document.createElement("p");
    title_sec.innerHTML = title;
    description_sec.innerHTML = description;
    dueby_sec.innerHTML = "Due by " + dueby;
    console.log(title + " " + description + " " + dueby);
    root.appendChild(title_sec);
    root.appendChild(description_sec);
    root.appendChild(dueby_sec);
    root.appendChild(hr_sec);
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

        $(".tabs-content:first").find("table#responder-table tbody").append('<tr id="' + ResponderDate[itr].value2 + '" class="getresult"><td>' + name + '</td><td  class="text-right">' + date + '</td></tr>');
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

$(document).on('click', '.getresult', function() {
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
    var count = 1;
    // console.log(JSON.stringify(actionInstance));
    actionInstance.dataTables.forEach((dataTable) => {
        // var qDiv = document.createElement("div");
        var $qDiv = $('<div class="col-sm-12"></div>');

        var $linebreak = $("<br>");
        $qDiv.append($linebreak);

        dataTable.dataColumns.forEach((question, ind) => {
            var count = ind + 1;
            var $questionHeading = $('<h5></h5>');
            $questionHeading.html("Question" + count + ". " + question.displayName);
            $qDiv.append($questionHeading);
            // qDiv.appendChild(questionHeading);

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
                var correctResponse = JSON.parse(actionInstance.properties[1].value);
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
                $qDiv.append($radioOption);
            });

        });

        $('div.question-content:first').append($qDiv);
        count++;
    });
}


function getOptions(text, name, id, userResponse, correctAnswer) {

    console.log(text + ', ' + name + ', ' + id + ', ' + userResponse + ', ' + correctAnswer);
    var $oDiv = $('<div class="form-group"></div>');
    /*  If answer is correct  */
    if (userResponse == id && correctAnswer == id) {
        $oDiv.append('<div class="border border-danger">' + text + ' <i class="fa fa-pull-right fa-check-square"></i> </div>');
    } else if (userResponse != id && correctAnswer == id) {
        /* If User Response is incorrect */
        $oDiv.append('<div class="">' + text + ' <i class="fa fa-pull-right fa-check-square"></i> </div>');
    } else if (userResponse == id && correctAnswer != id) {
        /* If User Response is incorrect */
        $oDiv.append('<div class="border border-danger">' + text + ' <i class="fa fa-pull-right fa-window-close"></div>');
    } else {
        $oDiv.append('<div class="">' + text + ' </div>');
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
    $('#root').append('<button class="btn btn-primary back">Back</button>');
}

$(document).on('click', '.back', function() {
    createBody();
});