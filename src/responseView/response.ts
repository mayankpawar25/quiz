import * as actionSDK from 'action-sdk-sunny';
import { Utils } from '../common/Utils';

var root = document.getElementById("root");
let row = {};
let actionInstance = null;

OnPageLoad();

function createBody() {
    var title = document.createElement('h3');
    var submit = document.createElement("BUTTON");
    title.innerHTML = actionInstance.displayName;
    submit.innerHTML = "Submit";
    submit.style.float = "right";
    submit.addEventListener("click", function () {
        submitForm();
    });
    root.appendChild(title);
    createQuestionView();
    root.appendChild(submit);
}

function radiobuttonClick(optionId, colomnId) {
    row[colomnId] = optionId;
}

function submitForm() {
    actionSDK.executeApi(new actionSDK.GetContext.Request())
        .then(function (response: actionSDK.GetContext.Response) {
            console.info("GetContext - Response: " + JSON.stringify(response));
            addDataRows(response.context.actionId);
        })
        .catch(function (error) {
            console.error("GetContext - Error: " + JSON.stringify(error));
        });
}

function getDataRow(actionId) {
    return {
        id: Utils.generateGUID(),
        actionId: actionId,
        dataTableId: "TestDataSet",
        columnValues: row
    };
}

function addDataRows(actionId) {
    var addDataRowRequest = new actionSDK.AddActionDataRow.Request(getDataRow(actionId));
    var closeViewRequest = new actionSDK.CloseView.Request();
    var batchRequest = new actionSDK.BaseApi.BatchRequest([addDataRowRequest, closeViewRequest]);
    actionSDK.executeBatchApi(batchRequest)
        .then(function (batchResponse) {
            console.info("BatchResponse: " + JSON.stringify(batchResponse));
        })
        .catch(function (error) {
            console.error("Error: " + JSON.stringify(error));
        })
}

function OnPageLoad() {
    actionSDK.executeApi(new actionSDK.GetContext.Request())
        .then(function (response: actionSDK.GetContext.Response) {
            console.info("GetContext - Response: " + JSON.stringify(response));
            getActionInstance(response.context.actionId);
        })
        .catch(function (error) {
            console.error("GetContext - Error: " + JSON.stringify(error));
        });
}

function getActionInstance(actionId) {
    actionSDK.executeApi(new actionSDK.GetAction.Request(actionId))
        .then(function (response: actionSDK.GetAction.Response) {
            console.info("Response: " + JSON.stringify(response));
            actionInstance = response.action;
            createBody();
        })
        .catch(function (error) {
            console.log("Error: " + JSON.stringify(error));
        });
}

// *********************************************** HTML ELEMENT***********************************************

function createQuestionView() {
    var count = 1;
    actionInstance.dataTables[0].dataColumns.forEach((column) => {
        var qDiv = document.createElement("div");
        var linebreak = document.createElement('br');
        qDiv.appendChild(linebreak);
        var questionHeading = document.createElement('h4'); // Heading of For
        questionHeading.innerHTML = count + "." + column.displayName;
        qDiv.appendChild(questionHeading);
        if (column.valueType == "SingleOption") {
            //add radio button
            column.options.forEach((option) => {
                var radioOption = getRadioButton(option.displayName, column.name, option.name);
                qDiv.appendChild(radioOption);

            });
        }
        else if (column.valueType == "Text") {
            var radioOption = addInputElement("Enter Text", column.name, "text");
            qDiv.appendChild(radioOption);
        }
        else if (column.valueType == "Numeric") {
            var radioOption = addInputElement("Enter Number", column.name, "number");
            qDiv.appendChild(radioOption);
        }
        root.appendChild(qDiv);
        count++;
    });
}

function addInputElement(ph: string, id: string, type: string) {
    var inputelement = document.createElement('input');
    inputelement.setAttribute("columnId", id);
    inputelement.setAttribute("type", type);
    inputelement.setAttribute("id", id);
    inputelement.placeholder = ph;
    inputelement.className = 'responseInputElement';
    inputelement.addEventListener("change", function () {
        radiobuttonClick(this.value, this.getAttribute("columnId"));
    });
    return inputelement;
}

function getRadioButton(text, name, id) {
    var oDiv = document.createElement("div");
    oDiv.id = id;
    oDiv.setAttribute("columnId", name);
    oDiv.addEventListener("click", function () {
        radiobuttonClick(this.id, this.getAttribute("columnId"));
    });
    var radiobox = document.createElement('input');
    radiobox.type = 'radio';
    radiobox.name = name;
    radiobox.id = id;
    radiobox.attributes
    oDiv.appendChild(radiobox);
    oDiv.appendChild(document.createTextNode(text));
    var newline = document.createElement('br');
    oDiv.appendChild(newline);

    return oDiv;
} 