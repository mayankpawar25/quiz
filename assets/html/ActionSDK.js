(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("actionSDK", [], factory);
	else if(typeof exports === 'object')
		exports["actionSDK"] = factory();
	else
		root["actionSDK"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ApiType_1 = __webpack_require__(1);
var ApiError_1 = __webpack_require__(2);
var Utils_1 = __webpack_require__(3);
/**
 * Base API namespace.
 * @internal
 */
var BaseApi;
(function (BaseApi) {
    /**
     * Base class for all kinds of API request body.
     */
    var Request = /** @class */ (function () {
        /**
         * Constructor to create a request object.
         * @internal
         */
        function Request(apiType) {
            /**
             * Unique identifier for the request.
             * This is useful for setting dependencies among requests in a batch.
             * @internal
             */
            this.id = Utils_1.Utils.generateGUID();
            this.apiType = apiType;
        }
        /**
         * Validation.
         * @internal
         */
        Request.prototype.validate = function () {
            if (!this.apiType || !Object.values(ApiType_1.ApiType).includes(this.apiType)) {
                throw ApiError_1.getApiError(ApiError_1.ApiErrorCategory.InvalidRequest, null, "Request - Invalid apiType!");
            }
        };
        /**
         * Utility to make current request dependent on other requests.
         * This is useful to set an order for execution of requests in a batch.
         * @param requests The request objects on which the current one depends
         */
        Request.prototype.setDependentOn = function (requests) {
            var _this = this;
            this.dependsOn = this.dependsOn || [];
            requests.forEach(function (request) { return _this.dependsOn.push(request.id); });
        };
        return Request;
    }());
    BaseApi.Request = Request;
    /**
     * Base class for all kinds of API response body.
     */
    var Response = /** @class */ (function () {
        /**
         * Constructor to create a response object.
         * @internal
         */
        function Response(id, error) {
            this.id = id;
            this.error = error;
        }
        Object.defineProperty(Response.prototype, "success", {
            /**
             * Flag denoting if API was successful or not.
             */
            get: function () {
                return !this.error;
            },
            enumerable: true,
            configurable: true
        });
        return Response;
    }());
    BaseApi.Response = Response;
    /**
     * Container for multiple API requests.
     */
    var BatchRequest = /** @class */ (function () {
        /**
         * Constructor to create a batch request object.
         */
        function BatchRequest(requests) {
            /**
             * Batch API request ID.
             * @internal
             */
            this.id = Utils_1.Utils.generateGUID();
            this.requests = requests || [];
        }
        /**
         * Validation.
         * @internal
         */
        BatchRequest.prototype.validate = function () {
            if (!this.requests || this.requests.length == 0) {
                throw ApiError_1.getApiError(ApiError_1.ApiErrorCategory.InvalidRequest, null, "BatchRequest - There are no request!");
            }
            this.requests.forEach(function (request) { return request.validate(); });
        };
        return BatchRequest;
    }());
    BaseApi.BatchRequest = BatchRequest;
    /**
     * Container for multiple API responses.
     */
    var BatchResponse = /** @class */ (function () {
        /**
         * Constructor to create a batch response object.
         * @internal
         */
        function BatchResponse(requestId, responses) {
            this.id = requestId;
            this.responses = responses;
        }
        return BatchResponse;
    }());
    BaseApi.BatchResponse = BatchResponse;
})(BaseApi = exports.BaseApi || (exports.BaseApi = {}));


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * This enum represents the diffetent types of APIs.
 * @ignore
 */
var ApiType;
(function (ApiType) {
    // Action CRUD APIs
    ApiType["CreateAction"] = "CreateAction";
    ApiType["UpdateAction"] = "UpdateAction";
    ApiType["DeleteAction"] = "DeleteAction";
    ApiType["GetAction"] = "GetAction";
    // Data Row CRUD APIs
    ApiType["AddActionDataRow"] = "AddActionDataRow";
    ApiType["UpdateActionDataRow"] = "UpdateActionDataRow";
    ApiType["DeleteActionDataRow"] = "DeleteActionDataRow";
    ApiType["GetActionDataRow"] = "GetActionDataRow";
    ApiType["GetActionDataRows"] = "GetActionDataRows";
    ApiType["GetActionDataRowsSummary"] = "GetActionDataRowsSummary";
    ApiType["DownloadActionDataRowsResult"] = "DownloadActionDataRowsResult";
    // Action Package APIs
    ApiType["GetLocalizedStrings"] = "GetLocalizedStrings";
    // Subscription APIs
    ApiType["GetSubscriptionMembers"] = "GetSubscriptionMembers";
    ApiType["GetSubscriptionMemberCount"] = "GetSubscriptionMemberCount";
    ApiType["GetActionSubscriptionNonParticipants"] = "GetActionSubscriptionNonParticipants";
    // Misc APIs
    ApiType["GetContext"] = "GetContext";
    ApiType["CloseView"] = "CloseView";
})(ApiType = exports.ApiType || (exports.ApiType = {}));


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * This enum represents the different categories of API errors.
 */
var ApiErrorCategory;
(function (ApiErrorCategory) {
    /**
     * Any unknown error.
     */
    ApiErrorCategory["Unknown"] = "Unknown";
    /**
     * Error when more than allowed APIs are executed in batch.
     */
    ApiErrorCategory["BatchApiCountLimitExceeded"] = "BatchApiCountLimitExceeded";
    /**
     * Error when API type is not supported.
     */
    ApiErrorCategory["UnsupportedApi"] = "UnsupportedApi";
    /**
     * Error when API request contains invalid data.
     */
    ApiErrorCategory["InvalidRequest"] = "InvalidRequest";
    /**
     * Error when API execution fails due to a server error.
     * ErrorCode is useful for finer error types.
     */
    ApiErrorCategory["ServerError"] = "ServerError";
})(ApiErrorCategory = exports.ApiErrorCategory || (exports.ApiErrorCategory = {}));
/**
 * Function to generate ApiError object.
 *
 * @param category Error category
 * @param code Error code
 * @param message Error message
 * @internal
 */
function getApiError(category, code, message) {
    return {
        category: category || ApiErrorCategory.Unknown,
        code: code,
        message: message
    };
}
exports.getApiError = getApiError;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var uuid = __webpack_require__(30);
/**
 * This class contains the utility APIs.
 * @internal
 */
var Utils = /** @class */ (function () {
    function Utils() {
    }
    Utils.generateGUID = function () {
        return uuid.v4();
    };
    Utils.isEmptyString = function (str) {
        return this.isEmptyObject(str);
    };
    Utils.isEmptyObject = function (obj) {
        if (obj == undefined || obj == null) {
            return true;
        }
        var isEmpty = false;
        if (typeof obj === "number" || typeof obj === "boolean") {
            isEmpty = false;
        }
        else if (typeof obj === "string") {
            isEmpty = obj.trim().length == 0;
        }
        else if (Array.isArray(obj)) {
            isEmpty = obj.length == 0;
        }
        else if (typeof obj === "object") {
            if (this.isValidJson(obj)) {
                isEmpty = JSON.stringify(obj) == "{}";
            }
        }
        return isEmpty;
    };
    Utils.isValidJson = function (json) {
        try {
            JSON.parse(JSON.stringify(json));
            return true;
        }
        catch (e) {
            return false;
        }
    };
    return Utils;
}());
exports.Utils = Utils;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
// DataModel Enums
var ActionStatus_1 = __webpack_require__(5);
exports.ActionStatus = ActionStatus_1.ActionStatus;
var Visibility_1 = __webpack_require__(6);
exports.Visibility = Visibility_1.Visibility;
var ActionPropertyValueType_1 = __webpack_require__(7);
exports.ActionPropertyValueType = ActionPropertyValueType_1.ActionPropertyValueType;
var ActionPropertyUpdateType_1 = __webpack_require__(8);
exports.ActionPropertyUpdateType = ActionPropertyUpdateType_1.ActionPropertyUpdateType;
var ActionDataColumnValueType_1 = __webpack_require__(9);
exports.ActionDataColumnValueType = ActionDataColumnValueType_1.ActionDataColumnValueType;
var SubscriptionType_1 = __webpack_require__(10);
exports.SubscriptionType = SubscriptionType_1.SubscriptionType;
// Base API
var BaseApi_1 = __webpack_require__(0);
exports.BaseApi = BaseApi_1.BaseApi;
// Action CRUD APIs
var CreateAction_1 = __webpack_require__(11);
exports.CreateAction = CreateAction_1.CreateAction;
var UpdateAction_1 = __webpack_require__(12);
exports.UpdateAction = UpdateAction_1.UpdateAction;
var DeleteAction_1 = __webpack_require__(13);
exports.DeleteAction = DeleteAction_1.DeleteAction;
var GetAction_1 = __webpack_require__(14);
exports.GetAction = GetAction_1.GetAction;
// Data Row CRUD APIs
var AddActionDataRow_1 = __webpack_require__(15);
exports.AddActionDataRow = AddActionDataRow_1.AddActionDataRow;
var UpdateActionDataRow_1 = __webpack_require__(16);
exports.UpdateActionDataRow = UpdateActionDataRow_1.UpdateActionDataRow;
var DeleteActionDataRow_1 = __webpack_require__(17);
exports.DeleteActionDataRow = DeleteActionDataRow_1.DeleteActionDataRow;
var GetActionDataRow_1 = __webpack_require__(18);
exports.GetActionDataRow = GetActionDataRow_1.GetActionDataRow;
var GetActionDataRows_1 = __webpack_require__(19);
exports.GetActionDataRows = GetActionDataRows_1.GetActionDataRows;
var GetActionDataRowsSummary_1 = __webpack_require__(20);
exports.GetActionDataRowsSummary = GetActionDataRowsSummary_1.GetActionDataRowsSummary;
var DownloadActionDataRowsResult_1 = __webpack_require__(21);
exports.DownloadActionDataRowsResult = DownloadActionDataRowsResult_1.DownloadActionDataRowsResult;
// Action Package APIs
var GetLocalizedStrings_1 = __webpack_require__(22);
exports.GetLocalizedStrings = GetLocalizedStrings_1.GetLocalizedStrings;
// Subscription APIs
var GetSubscriptionMembers_1 = __webpack_require__(23);
exports.GetSubscriptionMembers = GetSubscriptionMembers_1.GetSubscriptionMembers;
var GetSubscriptionMemberCount_1 = __webpack_require__(24);
exports.GetSubscriptionMemberCount = GetSubscriptionMemberCount_1.GetSubscriptionMemberCount;
var GetActionSubscriptionNonParticipants_1 = __webpack_require__(25);
exports.GetActionSubscriptionNonParticipants = GetActionSubscriptionNonParticipants_1.GetActionSubscriptionNonParticipants;
// Misc APIs
var GetContext_1 = __webpack_require__(26);
exports.GetContext = GetContext_1.GetContext;
var CloseView_1 = __webpack_require__(27);
exports.CloseView = CloseView_1.CloseView;
// ApiError
__export(__webpack_require__(2));
// ExecuteApi
__export(__webpack_require__(28));
var ApiType_1 = __webpack_require__(1);
exports.ApiType = ApiType_1.ApiType;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * This enum represents different types of action statuses.
 * @category Data Model
 */
var ActionStatus;
(function (ActionStatus) {
    /**
     * Default action status.
     */
    ActionStatus["Active"] = "Active";
    /**
     * Beyond expiry time an action will automatically be expired.
     * No further data-rows will be allowed after this.
     */
    ActionStatus["Expired"] = "Expired";
    /**
     * An action can be closed manually.
     * No further data-rows will be allowed after this.
     */
    ActionStatus["Closed"] = "Closed";
})(ActionStatus = exports.ActionStatus || (exports.ActionStatus = {}));


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * This enum represents the different types of visibility setting.
 * @category Data Model
 */
var Visibility;
(function (Visibility) {
    /**
     * Only visible to sender/creator of the action.
     */
    Visibility["Sender"] = "Sender";
    /**
     * Visible to every member in every action subscriptions.
     */
    Visibility["All"] = "All";
})(Visibility = exports.Visibility || (exports.Visibility = {}));


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * This enum represents the different types of values contained by an action property.
 * @category Data Model
 */
var ActionPropertyValueType;
(function (ActionPropertyValueType) {
    /**
     * Text type.
     */
    ActionPropertyValueType["Text"] = "Text";
    /**
     * Number type.
     */
    ActionPropertyValueType["Numeric"] = "Numeric";
    /**
     * Location type, with latitude (lt), longitude (lg), name (n).
     */
    ActionPropertyValueType["Location"] = "Location";
    /**
     * Epoch timestamp type.
     */
    ActionPropertyValueType["DateTime"] = "DateTime";
    /**
     * Unique list of texts type.
     */
    ActionPropertyValueType["StringSet"] = "StringSet";
})(ActionPropertyValueType = exports.ActionPropertyValueType || (exports.ActionPropertyValueType = {}));


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * This enum represents the different update types of action properties.
 * @category Data Model
 */
var ActionPropertyUpdateType;
(function (ActionPropertyUpdateType) {
    /**
     * Replace the old property value with a new one.
     */
    ActionPropertyUpdateType["Update"] = "Update";
    /**
     * Add a new property.
     */
    ActionPropertyUpdateType["Add"] = "Add";
    /**
     * Delete a property.
     */
    ActionPropertyUpdateType["Delete"] = "Delete";
    /**
     * Replace an entry in the property value (Array type) with a new one.
     */
    ActionPropertyUpdateType["Replace"] = "Replace";
    /**
     * Add entries in the property value (Array type).
     */
    ActionPropertyUpdateType["Append"] = "Append";
    /**
     * Remove entries from the property value (Array type).
     */
    ActionPropertyUpdateType["Remove"] = "Remove";
})(ActionPropertyUpdateType = exports.ActionPropertyUpdateType || (exports.ActionPropertyUpdateType = {}));


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * This enum represents the different types of data contained by an action data-column.
 * @category Data Model
 */
var ActionDataColumnValueType;
(function (ActionDataColumnValueType) {
    /**
     * Multi-choice type, only one option can be selected.
     */
    ActionDataColumnValueType["SingleOption"] = "SingleOption";
    /**
     * Multi-choice type, any number of options can be selected.
     */
    ActionDataColumnValueType["MultiOption"] = "MultiOption";
    /**
     * Text type, upto 4000 characters.
     */
    ActionDataColumnValueType["Text"] = "Text";
    /**
     * Large text type, for more than 4000 characters.
     */
    ActionDataColumnValueType["LargeText"] = "LargeText";
    /**
     * Number type.
     */
    ActionDataColumnValueType["Numeric"] = "Numeric";
    /**
     * Location type, with latitude (lt), longitude (lg), name (n).
     */
    ActionDataColumnValueType["Location"] = "Location";
    /**
     * Epoch timestamp type.
     */
    ActionDataColumnValueType["DateTime"] = "DateTime";
    /**
     * Date type, with "YYYY-MM-DD" format.
     */
    ActionDataColumnValueType["Date"] = "Date";
    /**
     * User ID type.
     */
    ActionDataColumnValueType["UserId"] = "UserId";
})(ActionDataColumnValueType = exports.ActionDataColumnValueType || (exports.ActionDataColumnValueType = {}));


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * This enum represents different types of subscriptions.
 * @category Data Model
 */
var SubscriptionType;
(function (SubscriptionType) {
    /**
     * A group type subscription represents a set of users/members.
     */
    SubscriptionType["Group"] = "Group";
    /**
     * A user type subscription represents just one user.
     */
    SubscriptionType["User"] = "User";
})(SubscriptionType = exports.SubscriptionType || (exports.SubscriptionType = {}));


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var BaseApi_1 = __webpack_require__(0);
var ApiType_1 = __webpack_require__(1);
var ApiError_1 = __webpack_require__(2);
var Utils_1 = __webpack_require__(3);
/**
 * API to create action.
 *
 * Usage:
 * ```typescript
 * let action: actionSDK.Action;
 * let request = new actionSDK.CreateAction.Request(action);
 * let response = await actionSDK.executeApi(request) as actionSDK.CreateAction.Response;
 * let actionId = response.actionId;
 * ```
 * @category Action CRUD API
 */
var CreateAction;
(function (CreateAction) {
    /**
     * Request body for create action API.
     */
    var Request = /** @class */ (function (_super) {
        __extends(Request, _super);
        /**
         * Constructor to create a request object.
         * @hidden
         */
        function Request(action) {
            var _this = _super.call(this, ApiType_1.ApiType.CreateAction) || this;
            _this.action = action;
            return _this;
        }
        /**
         * Validation.
         * @internal
         */
        Request.prototype.validate = function () {
            if (Utils_1.Utils.isEmptyObject(this.action)) {
                throw ApiError_1.getApiError(ApiError_1.ApiErrorCategory.InvalidRequest, null, "CreateAction - Invalid action!");
            }
        };
        return Request;
    }(BaseApi_1.BaseApi.Request));
    CreateAction.Request = Request;
    /**
     * Response body for create action API.
     */
    var Response = /** @class */ (function (_super) {
        __extends(Response, _super);
        /**
         * Constructor to create a response object.
         * @ignore
         */
        function Response(id, actionId, error) {
            var _this = _super.call(this, id, error) || this;
            _this.actionId = actionId;
            return _this;
        }
        return Response;
    }(BaseApi_1.BaseApi.Response));
    CreateAction.Response = Response;
})(CreateAction = exports.CreateAction || (exports.CreateAction = {}));


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var BaseApi_1 = __webpack_require__(0);
var ApiType_1 = __webpack_require__(1);
var ApiError_1 = __webpack_require__(2);
var Utils_1 = __webpack_require__(3);
/**
 * API to update action.
 *
 * Usage:
 * ```typescript
 * let actionUpdateInfo: actionSDK.ActionUpdateInfo;
 * let request = new actionSDK.UpdateAction.Request(actionUpdateInfo);
 * let response = await actionSDK.executeApi(request) as actionSDK.UpdateAction.Response;
 * let success = response.success;
 * ```
 * @category Action CRUD API
 */
var UpdateAction;
(function (UpdateAction) {
    /**
     * Request body for update action API.
     */
    var Request = /** @class */ (function (_super) {
        __extends(Request, _super);
        /**
         * Constructor to create a request object.
         * @hidden
         */
        function Request(actionUpdateInfo) {
            var _this = _super.call(this, ApiType_1.ApiType.UpdateAction) || this;
            _this.actionUpdateInfo = actionUpdateInfo;
            return _this;
        }
        /**
         * Validation.
         * @internal
         */
        Request.prototype.validate = function () {
            if (Utils_1.Utils.isEmptyObject(this.actionUpdateInfo) || Utils_1.Utils.isEmptyString(this.actionUpdateInfo.id)) {
                throw ApiError_1.getApiError(ApiError_1.ApiErrorCategory.InvalidRequest, null, "UpdateAction - Invalid actionUpdateInfo!");
            }
        };
        return Request;
    }(BaseApi_1.BaseApi.Request));
    UpdateAction.Request = Request;
    /**
     * Response body for update action API.
     */
    var Response = /** @class */ (function (_super) {
        __extends(Response, _super);
        function Response() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Response;
    }(BaseApi_1.BaseApi.Response));
    UpdateAction.Response = Response;
})(UpdateAction = exports.UpdateAction || (exports.UpdateAction = {}));


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var BaseApi_1 = __webpack_require__(0);
var ApiType_1 = __webpack_require__(1);
var ApiError_1 = __webpack_require__(2);
var Utils_1 = __webpack_require__(3);
/**
 * API to delete action.
 *
 * Usage:
 * ```typescript
 * let actionId: string;
 * let request = new actionSDK.DeleteAction.Request(actionId);
 * let response = await actionSDK.executeApi(request) as actionSDK.DeleteAction.Response;
 * let success = response.success;
 * ```
 * @category Action CRUD API
 */
var DeleteAction;
(function (DeleteAction) {
    /**
     * Request body for delete action API.
     */
    var Request = /** @class */ (function (_super) {
        __extends(Request, _super);
        /**
         * Constructor to create a request object.
         * @hidden
         */
        function Request(actionId) {
            var _this = _super.call(this, ApiType_1.ApiType.DeleteAction) || this;
            _this.actionId = actionId;
            return _this;
        }
        /**
         * Validation.
         * @internal
         */
        Request.prototype.validate = function () {
            if (Utils_1.Utils.isEmptyString(this.actionId)) {
                throw ApiError_1.getApiError(ApiError_1.ApiErrorCategory.InvalidRequest, null, "DeleteAction - Invalid actionId!");
            }
        };
        return Request;
    }(BaseApi_1.BaseApi.Request));
    DeleteAction.Request = Request;
    /**
     * Response body for delete action API.
     */
    var Response = /** @class */ (function (_super) {
        __extends(Response, _super);
        function Response() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Response;
    }(BaseApi_1.BaseApi.Response));
    DeleteAction.Response = Response;
})(DeleteAction = exports.DeleteAction || (exports.DeleteAction = {}));


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var BaseApi_1 = __webpack_require__(0);
var ApiType_1 = __webpack_require__(1);
var ApiError_1 = __webpack_require__(2);
var Utils_1 = __webpack_require__(3);
/**
 * API to get action.
 *
 * Usage:
 * ```typescript
 * let actionId: string;
 * let request = new actionSDK.GetAction.Request(actionId);
 * let response = await actionSDK.executeApi(request) as actionSDK.GetAction.Response;
 * let action = response.action;
 * ```
 * @category Action CRUD API
 */
var GetAction;
(function (GetAction) {
    /**
     * Request body for get action API.
     */
    var Request = /** @class */ (function (_super) {
        __extends(Request, _super);
        /**
         * Constructor to create a request object.
         * @hidden
         */
        function Request(actionId) {
            var _this = _super.call(this, ApiType_1.ApiType.GetAction) || this;
            _this.actionId = actionId;
            return _this;
        }
        /**
         * Validation.
         * @internal
         */
        Request.prototype.validate = function () {
            if (Utils_1.Utils.isEmptyString(this.actionId)) {
                throw ApiError_1.getApiError(ApiError_1.ApiErrorCategory.InvalidRequest, null, "GetAction - Invalid actionId!");
            }
        };
        return Request;
    }(BaseApi_1.BaseApi.Request));
    GetAction.Request = Request;
    /**
     * Response body for get action API.
     */
    var Response = /** @class */ (function (_super) {
        __extends(Response, _super);
        /**
         * Constructor to create a response object.
         * @ignore
         */
        function Response(id, action, error) {
            var _this = _super.call(this, id, error) || this;
            _this.action = action;
            return _this;
        }
        return Response;
    }(BaseApi_1.BaseApi.Response));
    GetAction.Response = Response;
})(GetAction = exports.GetAction || (exports.GetAction = {}));


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var BaseApi_1 = __webpack_require__(0);
var ApiType_1 = __webpack_require__(1);
var ApiError_1 = __webpack_require__(2);
var Utils_1 = __webpack_require__(3);
/**
 * API to add an action data-row.
 *
 * Usage:
 * ```typescript
 * let dataRow: actionSDK.ActionDataRow;
 * let request = new actionSDK.AddActionDataRow.Request(dataRow);
 * let response = await actionSDK.executeApi(request) as actionSDK.AddActionDataRow.Response;
 * let dataRowId = response.dataRowId;
 * ```
 * @category Data Row CRUD API
 */
var AddActionDataRow;
(function (AddActionDataRow) {
    /**
     * Request body for add action data-row API.
     */
    var Request = /** @class */ (function (_super) {
        __extends(Request, _super);
        /**
         * Constructor to create a request object.
         * @hidden
         */
        function Request(dataRow) {
            var _this = _super.call(this, ApiType_1.ApiType.AddActionDataRow) || this;
            _this.dataRow = dataRow;
            return _this;
        }
        /**
         * Validation.
         * @internal
         */
        Request.prototype.validate = function () {
            if (Utils_1.Utils.isEmptyObject(this.dataRow) || Utils_1.Utils.isEmptyString(this.dataRow.actionId) || Utils_1.Utils.isEmptyObject(this.dataRow.columnValues)) {
                throw ApiError_1.getApiError(ApiError_1.ApiErrorCategory.InvalidRequest, null, "AddActionDataRow - Invalid dataRow!");
            }
        };
        return Request;
    }(BaseApi_1.BaseApi.Request));
    AddActionDataRow.Request = Request;
    /**
     * Response body for add action data-row API.
     */
    var Response = /** @class */ (function (_super) {
        __extends(Response, _super);
        /**
         * Constructor to create a response object.
         * @ignore
         */
        function Response(id, dataRowId, error) {
            var _this = _super.call(this, id, error) || this;
            _this.dataRowId = dataRowId;
            return _this;
        }
        return Response;
    }(BaseApi_1.BaseApi.Response));
    AddActionDataRow.Response = Response;
})(AddActionDataRow = exports.AddActionDataRow || (exports.AddActionDataRow = {}));


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var BaseApi_1 = __webpack_require__(0);
var ApiType_1 = __webpack_require__(1);
var ApiError_1 = __webpack_require__(2);
var Utils_1 = __webpack_require__(3);
/**
 * API to update action data-row.
 *
 * Usage:
 * ```typescript
 * let dataRow: actionSDK.ActionDataRow;
 * let request = new actionSDK.UpdateActionDataRow.Request(dataRow);
 * let response = await actionSDK.executeApi(request) as actionSDK.UpdateActionDataRow.Response;
 * let success = response.success;
 * ```
 * @category Data Row CRUD API
 */
var UpdateActionDataRow;
(function (UpdateActionDataRow) {
    /**
     * Request body for update action data-row API.
     */
    var Request = /** @class */ (function (_super) {
        __extends(Request, _super);
        /**
         * Constructor to create a request object.
         * @hidden
         */
        function Request(dataRow) {
            var _this = _super.call(this, ApiType_1.ApiType.UpdateActionDataRow) || this;
            _this.dataRow = dataRow;
            return _this;
        }
        /**
         * Validation
         * @internal
         */
        Request.prototype.validate = function () {
            if (Utils_1.Utils.isEmptyObject(this.dataRow) || Utils_1.Utils.isEmptyString(this.dataRow.actionId) || Utils_1.Utils.isEmptyObject(this.dataRow.columnValues)) {
                throw ApiError_1.getApiError(ApiError_1.ApiErrorCategory.InvalidRequest, null, "UpdateActionDataRow - Invalid dataRow!");
            }
        };
        return Request;
    }(BaseApi_1.BaseApi.Request));
    UpdateActionDataRow.Request = Request;
    /**
     * Response body for udpate action data-row API.
     */
    var Response = /** @class */ (function (_super) {
        __extends(Response, _super);
        function Response() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Response;
    }(BaseApi_1.BaseApi.Response));
    UpdateActionDataRow.Response = Response;
})(UpdateActionDataRow = exports.UpdateActionDataRow || (exports.UpdateActionDataRow = {}));


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var BaseApi_1 = __webpack_require__(0);
var ApiType_1 = __webpack_require__(1);
var ApiError_1 = __webpack_require__(2);
var Utils_1 = __webpack_require__(3);
/**
 * API to delete action data-row.
 *
 * Usage:
 * ```typescript
 * let actionId: string;
 * let dataTableName: string; // It can be null, if the action contains only one data-table
 * let dataRowId: string;
 * let request = new actionSDK.DeleteActionDataRow.Request(actionId, dataRowId, dataTableName);
 * let response = await actionSDK.executeApi(request) as actionSDK.DeleteActionDataRow.Response;
 * let success = response.success;
 * ```
 * @category Data Row CRUD API
 */
var DeleteActionDataRow;
(function (DeleteActionDataRow) {
    /**
     * Request body for delete action data-row API.
     */
    var Request = /** @class */ (function (_super) {
        __extends(Request, _super);
        /**
         * Constructor to create a request object.
         * @hidden
         */
        function Request(actionId, dataRowId, dataTableName) {
            var _this = _super.call(this, ApiType_1.ApiType.DeleteActionDataRow) || this;
            _this.actionId = actionId;
            _this.dataTableName = dataTableName;
            _this.dataRowId = dataRowId;
            return _this;
        }
        /**
         * Validation.
         * @internal
         */
        Request.prototype.validate = function () {
            if (Utils_1.Utils.isEmptyString(this.actionId) || Utils_1.Utils.isEmptyString(this.dataRowId)) {
                throw ApiError_1.getApiError(ApiError_1.ApiErrorCategory.InvalidRequest, null, "DeleteActionDataRow - Invalid actionId/dataRowId!");
            }
        };
        return Request;
    }(BaseApi_1.BaseApi.Request));
    DeleteActionDataRow.Request = Request;
    /**
     * Response body for add action data-row API.
     */
    var Response = /** @class */ (function (_super) {
        __extends(Response, _super);
        function Response() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Response;
    }(BaseApi_1.BaseApi.Response));
    DeleteActionDataRow.Response = Response;
})(DeleteActionDataRow = exports.DeleteActionDataRow || (exports.DeleteActionDataRow = {}));


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var BaseApi_1 = __webpack_require__(0);
var ApiType_1 = __webpack_require__(1);
var ApiError_1 = __webpack_require__(2);
var Utils_1 = __webpack_require__(3);
/**
 * API to get action data-row.
 *
 * Usage:
 * ```typescript
 * let actionId: string;
 * let dataTableName: string; // It can be null, if the action contains only one data-table
 * let dataRowId: string;
 * let request = new actionSDK.GetActionDataRow.Request(actionId, dataRowId, dataTableName);
 * let response = await actionSDK.executeApi(request) as actionSDK.GetActionDataRow.Response;
 * let dataRow = response.dataRow;
 * ```
 * @category Data Row CRUD API
 */
var GetActionDataRow;
(function (GetActionDataRow) {
    /**
     * Request body for get action data-row API.
     */
    var Request = /** @class */ (function (_super) {
        __extends(Request, _super);
        /**
         * Constructor to create a request object.
         * @hidden
         */
        function Request(actionId, dataRowId, dataTableName) {
            var _this = _super.call(this, ApiType_1.ApiType.GetActionDataRow) || this;
            _this.actionId = actionId;
            _this.dataTableName = dataTableName;
            _this.dataRowId = dataRowId;
            return _this;
        }
        /**
         * Validation.
         * @internal
         */
        Request.prototype.validate = function () {
            if (Utils_1.Utils.isEmptyString(this.actionId) || Utils_1.Utils.isEmptyString(this.dataRowId)) {
                throw ApiError_1.getApiError(ApiError_1.ApiErrorCategory.InvalidRequest, null, "GetActionDataRow - Invalid actionId/dataRowId!");
            }
        };
        return Request;
    }(BaseApi_1.BaseApi.Request));
    GetActionDataRow.Request = Request;
    /**
     * Response body for get action data-row API.
     */
    var Response = /** @class */ (function (_super) {
        __extends(Response, _super);
        /**
         * Constructor to create a response object.
         * @ignore
         */
        function Response(id, dataRow, error) {
            var _this = _super.call(this, id, error) || this;
            _this.dataRow = dataRow;
            return _this;
        }
        return Response;
    }(BaseApi_1.BaseApi.Response));
    GetActionDataRow.Response = Response;
})(GetActionDataRow = exports.GetActionDataRow || (exports.GetActionDataRow = {}));


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var BaseApi_1 = __webpack_require__(0);
var ApiType_1 = __webpack_require__(1);
var ApiError_1 = __webpack_require__(2);
var Utils_1 = __webpack_require__(3);
/**
 * API to get action data-rows.
 *
 * Usage:
 * ```typescript
 * let actionId: string;
 * let dataTableName: string; // It can be null, if the action contains only one data-table
 * let creatorId: string; // If this is null, no creator filter will be applied
 * let request = new actionSDK.GetActionDataRows.Request(actionId, creatorId, null, 100, dataTableName);
 * let response = await actionSDK.executeApi(request) as actionSDK.GetActionDataRows.Response;
 * let dataRows = response.dataRows;
 * ```
 * @category Data Row CRUD API
 */
var GetActionDataRows;
(function (GetActionDataRows) {
    /**
     * Request body for get action data-rows API.
     */
    var Request = /** @class */ (function (_super) {
        __extends(Request, _super);
        /**
         * Constructor to create a request object.
         * @hidden
         */
        function Request(actionId, creatorId, continuationToken, pageSize, dataTableName) {
            var _this = _super.call(this, ApiType_1.ApiType.GetActionDataRows) || this;
            _this.actionId = actionId;
            _this.dataTableName = dataTableName;
            _this.creatorId = creatorId;
            _this.continuationToken = continuationToken;
            _this.pageSize = pageSize || 30;
            return _this;
        }
        /**
         * Validation.
         * @internal
         */
        Request.prototype.validate = function () {
            if (Utils_1.Utils.isEmptyString(this.actionId)) {
                throw ApiError_1.getApiError(ApiError_1.ApiErrorCategory.InvalidRequest, null, "GetActionDataRows - Invalid actionId!");
            }
        };
        return Request;
    }(BaseApi_1.BaseApi.Request));
    GetActionDataRows.Request = Request;
    /**
     * Response body for get action data-rows API.
     */
    var Response = /** @class */ (function (_super) {
        __extends(Response, _super);
        /**
         * Constructor to create a response object.
         * @ignore
         */
        function Response(id, dataRows, continuationToken, error) {
            var _this = _super.call(this, id, error) || this;
            _this.dataRows = dataRows;
            _this.continuationToken = continuationToken;
            return _this;
        }
        return Response;
    }(BaseApi_1.BaseApi.Response));
    GetActionDataRows.Response = Response;
})(GetActionDataRows = exports.GetActionDataRows || (exports.GetActionDataRows = {}));


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var BaseApi_1 = __webpack_require__(0);
var ApiType_1 = __webpack_require__(1);
var ApiError_1 = __webpack_require__(2);
var Utils_1 = __webpack_require__(3);
/**
 * API to add action data-rows' summary.
 *
 * Usage:
 * ```typescript
 * let actionId: string;
 * let dataTableName: string; // It can be null, if the action contains only one data-table
 * let request = new actionSDK.GetActionDataRowsSummary.Request(actionId, dataTableName);
 * let response = await actionSDK.executeApi(request) as actionSDK.GetActionDataRowsSummary.Response;
 * let summary = response.summary;
 * ```
 * @category Data Row CRUD API
 */
var GetActionDataRowsSummary;
(function (GetActionDataRowsSummary) {
    /**
     * Request body for get action data-rows' summary API.
     */
    var Request = /** @class */ (function (_super) {
        __extends(Request, _super);
        /**
         * Constructor to create a request object
         * @hidden
         */
        function Request(actionId, addDefaultAggregates, dataTableName) {
            var _this = _super.call(this, ApiType_1.ApiType.GetActionDataRowsSummary) || this;
            _this.actionId = actionId;
            _this.dataTableName = dataTableName;
            _this.addDefaultAggregates = addDefaultAggregates || false;
            return _this;
        }
        /**
         * Validation
         * @internal
         */
        Request.prototype.validate = function () {
            if (Utils_1.Utils.isEmptyString(this.actionId)) {
                throw ApiError_1.getApiError(ApiError_1.ApiErrorCategory.InvalidRequest, null, "GetActionDataRowsSummary - Invalid actionId!");
            }
        };
        return Request;
    }(BaseApi_1.BaseApi.Request));
    GetActionDataRowsSummary.Request = Request;
    /**
     * Response body for get action data-rows' summary API.
     */
    var Response = /** @class */ (function (_super) {
        __extends(Response, _super);
        /**
         * Constructor to create a response object.
         * @ignore
         */
        function Response(id, summary, error) {
            var _this = _super.call(this, id, error) || this;
            _this.summary = summary;
            return _this;
        }
        return Response;
    }(BaseApi_1.BaseApi.Response));
    GetActionDataRowsSummary.Response = Response;
})(GetActionDataRowsSummary = exports.GetActionDataRowsSummary || (exports.GetActionDataRowsSummary = {}));


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var BaseApi_1 = __webpack_require__(0);
var ApiType_1 = __webpack_require__(1);
var ApiError_1 = __webpack_require__(2);
var Utils_1 = __webpack_require__(3);
/**
 * API to download action data-rows' result.
 *
 * Usage:
 * ```typescript
 * let actionId: string;
 * let dataTableName: string; // It can be null, if the action contains only one data-table
 * let request = new actionSDK.DownloadActionDataRowsResult.Request(actionId, dataTableName);
 * let response = await actionSDK.executeApi(request) as actionSDK.DownloadActionDataRowsResult.Response;
 * let success = response.success;
 * ```
 * @category Data Row CRUD API
 */
var DownloadActionDataRowsResult;
(function (DownloadActionDataRowsResult) {
    /**
     * Request body for download action data-rows' result API.
     */
    var Request = /** @class */ (function (_super) {
        __extends(Request, _super);
        /**
         * Constructor to create a request object.
         * @hidden
         */
        function Request(actionId, dataTableName) {
            var _this = _super.call(this, ApiType_1.ApiType.DownloadActionDataRowsResult) || this;
            _this.actionId = actionId;
            _this.dataTableName = dataTableName;
            return _this;
        }
        /**
         * Validation.
         * @internal
         */
        Request.prototype.validate = function () {
            if (Utils_1.Utils.isEmptyString(this.actionId)) {
                throw ApiError_1.getApiError(ApiError_1.ApiErrorCategory.InvalidRequest, null, "DownloadActionDataRowsResult - Invalid actionId!");
            }
        };
        return Request;
    }(BaseApi_1.BaseApi.Request));
    DownloadActionDataRowsResult.Request = Request;
    /**
     * Response body for download action data-rows' result API.
     */
    var Response = /** @class */ (function (_super) {
        __extends(Response, _super);
        function Response() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Response;
    }(BaseApi_1.BaseApi.Response));
    DownloadActionDataRowsResult.Response = Response;
})(DownloadActionDataRowsResult = exports.DownloadActionDataRowsResult || (exports.DownloadActionDataRowsResult = {}));


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var BaseApi_1 = __webpack_require__(0);
var ApiType_1 = __webpack_require__(1);
/**
 * API to get localized strings for the current action package.
 *
 * Usage:
 * ```typescript
 * let request = new actionSDK.GetLocalizedStrings.Request();
 * let response = await actionSDK.executeApi(request) as actionSDK.GetLocalizedStrings.Response;
 * let strings = response.strings;
 * ```
 * @category Action Package API
 */
var GetLocalizedStrings;
(function (GetLocalizedStrings) {
    /**
     * Request body for get localized strings API.
     */
    var Request = /** @class */ (function (_super) {
        __extends(Request, _super);
        /**
         * Constructor to create a request object.
         * @hidden
         */
        function Request() {
            return _super.call(this, ApiType_1.ApiType.GetLocalizedStrings) || this;
        }
        return Request;
    }(BaseApi_1.BaseApi.Request));
    GetLocalizedStrings.Request = Request;
    /**
     * Response body for get localized strings API.
     */
    var Response = /** @class */ (function (_super) {
        __extends(Response, _super);
        /**
         * Constructor to create a response object
         * @ignore
         */
        function Response(id, strings, error) {
            var _this = _super.call(this, id, error) || this;
            _this.strings = strings;
            return _this;
        }
        return Response;
    }(BaseApi_1.BaseApi.Response));
    GetLocalizedStrings.Response = Response;
})(GetLocalizedStrings = exports.GetLocalizedStrings || (exports.GetLocalizedStrings = {}));


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var BaseApi_1 = __webpack_require__(0);
var ApiType_1 = __webpack_require__(1);
var ApiError_1 = __webpack_require__(2);
var Utils_1 = __webpack_require__(3);
/**
 * API to get profiles of a subscription members.
 *
 * Usage:
 * ```typescript
 * let subscription: Subscription;
 * let memberIds: string[]; // Member IDs to filter
 * let request = new actionSDK.GetSubscriptionMembers.Request(subscription, memberIds);
 * let response = await actionSDK.executeApi(request) as actionSDK.GetSubscriptionMembers.Response;
 * let members = response.members;
 * ```
 * @category Subscription API
 */
var GetSubscriptionMembers;
(function (GetSubscriptionMembers) {
    /**
     * Request body for get subscription members API.
     */
    var Request = /** @class */ (function (_super) {
        __extends(Request, _super);
        /**
         * Constructor to create a request object.
         * @hidden
         */
        function Request(subscription, memberIds) {
            var _this = _super.call(this, ApiType_1.ApiType.GetSubscriptionMembers) || this;
            _this.subscription = subscription;
            _this.memberIds = memberIds;
            return _this;
        }
        /**
         * Validation.
         * @internal
         */
        Request.prototype.validate = function () {
            if (Utils_1.Utils.isEmptyObject(this.subscription) || Utils_1.Utils.isEmptyObject(this.memberIds)) {
                throw ApiError_1.getApiError(ApiError_1.ApiErrorCategory.InvalidRequest, null, "GetActionSubscriptionMembers - Invalid subscription/memberIds!");
            }
        };
        return Request;
    }(BaseApi_1.BaseApi.Request));
    GetSubscriptionMembers.Request = Request;
    /**
     * Response body for get subscription members API.
     */
    var Response = /** @class */ (function (_super) {
        __extends(Response, _super);
        /**
         * Constructor to create a response object.
         * @ignore
         */
        function Response(id, members, memberIdsNotFound, error) {
            var _this = _super.call(this, id, error) || this;
            _this.members = members;
            _this.memberIdsNotFound = memberIdsNotFound;
            return _this;
        }
        return Response;
    }(BaseApi_1.BaseApi.Response));
    GetSubscriptionMembers.Response = Response;
})(GetSubscriptionMembers = exports.GetSubscriptionMembers || (exports.GetSubscriptionMembers = {}));


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var BaseApi_1 = __webpack_require__(0);
var ApiType_1 = __webpack_require__(1);
var ApiError_1 = __webpack_require__(2);
var Utils_1 = __webpack_require__(3);
/**
 * API to get count of members in a subscription.
 *
 * Usage:
 * ```typescript
 * let subscription: Subscription;
 * let request = new actionSDK.GetSubscriptionMemberCount.Request(subscription);
 * let response = await actionSDK.executeApi(request) as actionSDK.GetSubscriptionMemberCount.Response;
 * let memberCount = response.memberCount;
 * ```
 * @category Subscription API
 */
var GetSubscriptionMemberCount;
(function (GetSubscriptionMemberCount) {
    /**
     * Request body for get subscription members' count API.
     */
    var Request = /** @class */ (function (_super) {
        __extends(Request, _super);
        /**
         * Constructor to create a request object.
         * @hidden
         */
        function Request(subscription) {
            var _this = _super.call(this, ApiType_1.ApiType.GetSubscriptionMemberCount) || this;
            _this.subscription = subscription;
            return _this;
        }
        /**
         * Validation
         * @internal
         */
        Request.prototype.validate = function () {
            if (Utils_1.Utils.isEmptyObject(this.subscription)) {
                throw ApiError_1.getApiError(ApiError_1.ApiErrorCategory.InvalidRequest, null, "GetSubscriptionMemberCount - Invalid subscription!");
            }
        };
        return Request;
    }(BaseApi_1.BaseApi.Request));
    GetSubscriptionMemberCount.Request = Request;
    /**
     * Response body for get subscription members' count API.
     */
    var Response = /** @class */ (function (_super) {
        __extends(Response, _super);
        /**
         * Constructor to create a response object.
         * @ignore
         */
        function Response(id, memberCount, error) {
            var _this = _super.call(this, id, error) || this;
            _this.memberCount = memberCount;
            return _this;
        }
        return Response;
    }(BaseApi_1.BaseApi.Response));
    GetSubscriptionMemberCount.Response = Response;
})(GetSubscriptionMemberCount = exports.GetSubscriptionMemberCount || (exports.GetSubscriptionMemberCount = {}));


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var BaseApi_1 = __webpack_require__(0);
var ApiType_1 = __webpack_require__(1);
var ApiError_1 = __webpack_require__(2);
var Utils_1 = __webpack_require__(3);
/**
 * API to get profiles of the non-participants/non-responders of an action subscription.
 *
 * Usage:
 * ```typescript
 * let actionId: string;
 * let subscriptionId: string; // It can be null, if the action contains only one subscription
 * let request = new actionSDK.GetActionSubscriptionNonParticipants.Request(actionId, subscriptionId);
 * let response = await actionSDK.executeApi(request) as actionSDK.GetActionSubscriptionNonParticipants.Response;
 * let nonParticipants = response.nonParticipants;
 * ```
 * @category Subscription API
 */
var GetActionSubscriptionNonParticipants;
(function (GetActionSubscriptionNonParticipants) {
    /**
     * Request body for get action subscription non-participants API.
     */
    var Request = /** @class */ (function (_super) {
        __extends(Request, _super);
        /**
         * Constructor to create a request object.
         * @hidden
         */
        function Request(actionId, subscriptionId) {
            var _this = _super.call(this, ApiType_1.ApiType.GetActionSubscriptionNonParticipants) || this;
            _this.actionId = actionId;
            _this.subscriptionId = subscriptionId;
            return _this;
        }
        /**
         * Validation.
         * @internal
         */
        Request.prototype.validate = function () {
            if (Utils_1.Utils.isEmptyString(this.actionId)) {
                throw ApiError_1.getApiError(ApiError_1.ApiErrorCategory.InvalidRequest, null, "GetActionSubscriptionNonParticipants - Invalid actionId!");
            }
        };
        return Request;
    }(BaseApi_1.BaseApi.Request));
    GetActionSubscriptionNonParticipants.Request = Request;
    /**
     * Response body for get action subscription non-participants API.
     */
    var Response = /** @class */ (function (_super) {
        __extends(Response, _super);
        /**
         * Constructor to create a response object.
         * @ignore
         */
        function Response(id, nonParticipants, nonParticipantCount, error) {
            var _this = _super.call(this, id, error) || this;
            _this.nonParticipants = nonParticipants;
            _this.nonParticipantCount = nonParticipantCount;
            return _this;
        }
        return Response;
    }(BaseApi_1.BaseApi.Response));
    GetActionSubscriptionNonParticipants.Response = Response;
})(GetActionSubscriptionNonParticipants = exports.GetActionSubscriptionNonParticipants || (exports.GetActionSubscriptionNonParticipants = {}));


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var BaseApi_1 = __webpack_require__(0);
var ApiType_1 = __webpack_require__(1);
/**
 * API to get current context for the action package view.
 *
 * Usage:
 * ```typescript
 * let request = new actionSDK.GetContext.Request();
 * let response = await actionSDK.executeApi(request) as actionSDK.GetContext.Response;
 * let context = response.context;
 * ```
 * @category Misc API
 */
var GetContext;
(function (GetContext) {
    /**
     * Request body for get context API.
     */
    var Request = /** @class */ (function (_super) {
        __extends(Request, _super);
        /**
         * Constructor to create a request object.
         * @hidden
         */
        function Request() {
            return _super.call(this, ApiType_1.ApiType.GetContext) || this;
        }
        return Request;
    }(BaseApi_1.BaseApi.Request));
    GetContext.Request = Request;
    /**
     * Response body for get context API.
     */
    var Response = /** @class */ (function (_super) {
        __extends(Response, _super);
        /**
         * Constructor to create a response object.
         * @ignore
         */
        function Response(id, context, error) {
            var _this = _super.call(this, id, error) || this;
            _this.context = context;
            return _this;
        }
        return Response;
    }(BaseApi_1.BaseApi.Response));
    GetContext.Response = Response;
})(GetContext = exports.GetContext || (exports.GetContext = {}));


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var BaseApi_1 = __webpack_require__(0);
var ApiType_1 = __webpack_require__(1);
/**
 * API to close current action package view.
 *
 * Usage:
 * ```typescript
 * let request = new actionSDK.CloseView.Request();
 * let response = await actionSDK.executeApi(request) as actionSDK.CloseView.Response;
 * let success = response.success;
 * ```
 * @category Misc API
 */
var CloseView;
(function (CloseView) {
    /**
     * Request body for close action package view API.
     */
    var Request = /** @class */ (function (_super) {
        __extends(Request, _super);
        /**
         * Constructor to create a request object.
         * @hidden
         */
        function Request() {
            return _super.call(this, ApiType_1.ApiType.CloseView) || this;
        }
        return Request;
    }(BaseApi_1.BaseApi.Request));
    CloseView.Request = Request;
    /**
     * Response body for close action package view API.
     */
    var Response = /** @class */ (function (_super) {
        __extends(Response, _super);
        function Response() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Response;
    }(BaseApi_1.BaseApi.Response));
    CloseView.Response = Response;
})(CloseView = exports.CloseView || (exports.CloseView = {}));


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var BaseApi_1 = __webpack_require__(0);
var ApiError_1 = __webpack_require__(2);
var ActionSdkHostBridge_1 = __webpack_require__(29);
/**
 * Constant denoting maximum number of requests in a batch.
 * @category API
 */
exports.maxBatchApisCount = 10;
/**
 * Function to execute an API.
 *
 * Usage:
 * ```typescript
 * let action: actionSDK.Action;
 * let request = new actionSDK.CreateAction.Request(action);
 * let response = await actionSDK.executeApi(request) as actionSDK.CreateAction.Response;
 * let actionId = response.actionId;
 * ```
 * @param request API request object
 * @returns Promise containing the API response object
 * @category API
 */
function executeApi(request) {
    return __awaiter(this, void 0, void 0, function () {
        var batchRequest, batchResponse;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    batchRequest = new BaseApi_1.BaseApi.BatchRequest([request]);
                    return [4 /*yield*/, executeBatchApi(batchRequest)];
                case 1:
                    batchResponse = _a.sent();
                    return [2 /*return*/, batchResponse.responses[0]];
            }
        });
    });
}
exports.executeApi = executeApi;
/**
 * Function to execute a list of APIs in batch.
 * There shouldn't be more than 10 APIs in a batch!
 *
 * Usage:
 * ```typescript
 * let action: actionSDK.Action;
 * let createActionRequest = new actionSDK.CreateAction.Request(action);
 * let dataRow: actionSDK.ActionDataRow;
 * let addDataRowRequest = new actionSDK.ActionDataRow.Request(dataRow);
 * addDataRowRequest.setDependentOn([createActionRequest]);
 * let batchRequest = new actionSDK.BaseApi.BatchRequest([createActionRequest, addDataRowRequest]);
 * let batchResponse = await actionSDK.executeBatchApi(batchRequest);
 * let actionId = batchResponse.responses[0].actionId;
 * let dataRowId = batchResponse.responses[1].dataRowId;
 * ```
 * @param batchRequest Batch request object containing the list of individual API request objects
 * @returns Promise containing the batch response
 * @category API
 */
function executeBatchApi(batchRequest) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (batchRequest.requests.length > exports.maxBatchApisCount) {
                        throw ApiError_1.getApiError(ApiError_1.ApiErrorCategory.BatchApiCountLimitExceeded, null, "Cannot execute more than " + exports.maxBatchApisCount + " APIs in a batch!");
                    }
                    return [4 /*yield*/, ActionSdkHostBridge_1.ActionSdkHostBridge.executeBatchApiRequest(batchRequest)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.executeBatchApi = executeBatchApi;


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Bridge between ActionSDK and ActionHost.
 * @internal
 */
var ActionSdkHostBridge = /** @class */ (function () {
    function ActionSdkHostBridge() {
    }
    /**
     * This will ensure the above properties are initialized properly.
     */
    ActionSdkHostBridge.ensureInitialized = function () {
        this.currentWindow = this.currentWindow || window;
        this.actionSdkHost = this.actionSdkHost || window["actionSdkHost"];
    };
    /**
     * ActionSdkHost when action views are hosted within ActionHost.
     */
    ActionSdkHostBridge.executeBatchApiRequest = function (batchRequest) {
        return __awaiter(this, void 0, void 0, function () {
            var batchResponse;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.ensureInitialized();
                        batchRequest.validate();
                        if (!this.actionSdkHost) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.actionSdkHost.executeBatchApiRequest(batchRequest)];
                    case 1:
                        batchResponse = _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.executeIFramedBatchApiRequest(batchRequest)];
                    case 3:
                        batchResponse = _a.sent();
                        _a.label = 4;
                    case 4: 
                    // Uncomment below line to debug
                    // console.log(`ActionSdkHostBridge.executeBatchApiRequest - batchRequest:${JSON.stringify(batchRequest)}, batchResponse:${JSON.stringify(batchResponse)}`);
                    return [2 /*return*/, batchResponse];
                }
            });
        });
    };
    ActionSdkHostBridge.executeIFramedBatchApiRequest = function (batchRequest) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        _this.apiResolves[batchRequest.id] = resolve;
                        _this.sendMessageToActionHost(batchRequest);
                        _this.receiveMessageFromActionHost();
                    })];
            });
        });
    };
    /**
     * Communication from ActionSDK to ActionHost.
     */
    ActionSdkHostBridge.sendMessageToActionHost = function (batchRequest) {
        this.currentWindow.parent.postMessage(batchRequest, "*");
    };
    ActionSdkHostBridge.receiveMessageFromActionHost = function () {
        if (!this.receivingMessageFromActionHost && this.currentWindow) {
            var self_1 = this;
            this.currentWindow.addEventListener("message", function (message) {
                var batchResponse = message.data;
                if (batchResponse.id && self_1.apiResolves[batchResponse.id]) {
                    var resolve = self_1.apiResolves[batchResponse.id];
                    resolve(batchResponse);
                }
            });
            this.receivingMessageFromActionHost = true;
        }
    };
    /**
     * ActionSdkHost when action views are hosted within an iFrame in ActionHost.
     */
    ActionSdkHostBridge.apiResolves = {};
    /**
     * Communication from ActionHost to ActionSDK.
     */
    ActionSdkHostBridge.receivingMessageFromActionHost = false;
    return ActionSdkHostBridge;
}());
exports.ActionSdkHostBridge = ActionSdkHostBridge;


/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/uuid/dist/esm-browser/rng.js
// Unique ID creation requires a high quality random # generator. In the browser we therefore
// require the crypto API and do not support built-in fallback to lower quality random number
// generators (like Math.random()).
// getRandomValues needs to be invoked in a context where "this" is a Crypto implementation. Also,
// find the complete implementation of crypto (msCrypto) on IE11.
var getRandomValues = typeof crypto != 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto != 'undefined' && typeof msCrypto.getRandomValues == 'function' && msCrypto.getRandomValues.bind(msCrypto);
var rnds8 = new Uint8Array(16); // eslint-disable-line no-undef

function rng() {
  if (!getRandomValues) {
    throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
  }

  return getRandomValues(rnds8);
}
// CONCATENATED MODULE: ./node_modules/uuid/dist/esm-browser/bytesToUuid.js
/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */
var byteToHex = [];

for (var bytesToUuid_i = 0; bytesToUuid_i < 256; ++bytesToUuid_i) {
  byteToHex[bytesToUuid_i] = (bytesToUuid_i + 0x100).toString(16).substr(1);
}

function bytesToUuid(buf, offset) {
  var i = offset || 0;
  var bth = byteToHex; // join used to fix memory issue caused by concatenation: https://bugs.chromium.org/p/v8/issues/detail?id=3175#c4

  return [bth[buf[i++]], bth[buf[i++]], bth[buf[i++]], bth[buf[i++]], '-', bth[buf[i++]], bth[buf[i++]], '-', bth[buf[i++]], bth[buf[i++]], '-', bth[buf[i++]], bth[buf[i++]], '-', bth[buf[i++]], bth[buf[i++]], bth[buf[i++]], bth[buf[i++]], bth[buf[i++]], bth[buf[i++]]].join('');
}

/* harmony default export */ var esm_browser_bytesToUuid = (bytesToUuid);
// CONCATENATED MODULE: ./node_modules/uuid/dist/esm-browser/v1.js

 // **`v1()` - Generate time-based UUID**
//
// Inspired by https://github.com/LiosK/UUID.js
// and http://docs.python.org/library/uuid.html

var _nodeId;

var _clockseq; // Previous uuid creation time


var _lastMSecs = 0;
var _lastNSecs = 0; // See https://github.com/uuidjs/uuid for API details

function v1(options, buf, offset) {
  var i = buf && offset || 0;
  var b = buf || [];
  options = options || {};
  var node = options.node || _nodeId;
  var clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq; // node and clockseq need to be initialized to random values if they're not
  // specified.  We do this lazily to minimize issues related to insufficient
  // system entropy.  See #189

  if (node == null || clockseq == null) {
    var seedBytes = options.random || (options.rng || rng)();

    if (node == null) {
      // Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
      node = _nodeId = [seedBytes[0] | 0x01, seedBytes[1], seedBytes[2], seedBytes[3], seedBytes[4], seedBytes[5]];
    }

    if (clockseq == null) {
      // Per 4.2.2, randomize (14 bit) clockseq
      clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 0x3fff;
    }
  } // UUID timestamps are 100 nano-second units since the Gregorian epoch,
  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
  // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.


  var msecs = options.msecs !== undefined ? options.msecs : new Date().getTime(); // Per 4.2.1.2, use count of uuid's generated during the current clock
  // cycle to simulate higher resolution clock

  var nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1; // Time since last uuid creation (in msecs)

  var dt = msecs - _lastMSecs + (nsecs - _lastNSecs) / 10000; // Per 4.2.1.2, Bump clockseq on clock regression

  if (dt < 0 && options.clockseq === undefined) {
    clockseq = clockseq + 1 & 0x3fff;
  } // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
  // time interval


  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
    nsecs = 0;
  } // Per 4.2.1.2 Throw error if too many uuids are requested


  if (nsecs >= 10000) {
    throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
  }

  _lastMSecs = msecs;
  _lastNSecs = nsecs;
  _clockseq = clockseq; // Per 4.1.4 - Convert from unix epoch to Gregorian epoch

  msecs += 12219292800000; // `time_low`

  var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
  b[i++] = tl >>> 24 & 0xff;
  b[i++] = tl >>> 16 & 0xff;
  b[i++] = tl >>> 8 & 0xff;
  b[i++] = tl & 0xff; // `time_mid`

  var tmh = msecs / 0x100000000 * 10000 & 0xfffffff;
  b[i++] = tmh >>> 8 & 0xff;
  b[i++] = tmh & 0xff; // `time_high_and_version`

  b[i++] = tmh >>> 24 & 0xf | 0x10; // include version

  b[i++] = tmh >>> 16 & 0xff; // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)

  b[i++] = clockseq >>> 8 | 0x80; // `clock_seq_low`

  b[i++] = clockseq & 0xff; // `node`

  for (var n = 0; n < 6; ++n) {
    b[i + n] = node[n];
  }

  return buf ? buf : esm_browser_bytesToUuid(b);
}

/* harmony default export */ var esm_browser_v1 = (v1);
// CONCATENATED MODULE: ./node_modules/uuid/dist/esm-browser/v35.js


function uuidToBytes(uuid) {
  // Note: We assume we're being passed a valid uuid string
  var bytes = [];
  uuid.replace(/[a-fA-F0-9]{2}/g, function (hex) {
    bytes.push(parseInt(hex, 16));
  });
  return bytes;
}

function stringToBytes(str) {
  str = unescape(encodeURIComponent(str)); // UTF8 escape

  var bytes = new Array(str.length);

  for (var i = 0; i < str.length; i++) {
    bytes[i] = str.charCodeAt(i);
  }

  return bytes;
}

var DNS = '6ba7b810-9dad-11d1-80b4-00c04fd430c8';
var URL = '6ba7b811-9dad-11d1-80b4-00c04fd430c8';
/* harmony default export */ var v35 = (function (name, version, hashfunc) {
  var generateUUID = function generateUUID(value, namespace, buf, offset) {
    var off = buf && offset || 0;
    if (typeof value == 'string') value = stringToBytes(value);
    if (typeof namespace == 'string') namespace = uuidToBytes(namespace);
    if (!Array.isArray(value)) throw TypeError('value must be an array of bytes');
    if (!Array.isArray(namespace) || namespace.length !== 16) throw TypeError('namespace must be uuid string or an Array of 16 byte values'); // Per 4.3

    var bytes = hashfunc(namespace.concat(value));
    bytes[6] = bytes[6] & 0x0f | version;
    bytes[8] = bytes[8] & 0x3f | 0x80;

    if (buf) {
      for (var idx = 0; idx < 16; ++idx) {
        buf[off + idx] = bytes[idx];
      }
    }

    return buf || esm_browser_bytesToUuid(bytes);
  }; // Function#name is not settable on some platforms (#270)


  try {
    generateUUID.name = name;
  } catch (err) {} // For CommonJS default export support


  generateUUID.DNS = DNS;
  generateUUID.URL = URL;
  return generateUUID;
});
// CONCATENATED MODULE: ./node_modules/uuid/dist/esm-browser/md5.js
/*
 * Browser-compatible JavaScript MD5
 *
 * Modification of JavaScript MD5
 * https://github.com/blueimp/JavaScript-MD5
 *
 * Copyright 2011, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * https://opensource.org/licenses/MIT
 *
 * Based on
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.2 Copyright (C) Paul Johnston 1999 - 2009
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 */
function md5(bytes) {
  if (typeof bytes == 'string') {
    var msg = unescape(encodeURIComponent(bytes)); // UTF8 escape

    bytes = new Array(msg.length);

    for (var i = 0; i < msg.length; i++) {
      bytes[i] = msg.charCodeAt(i);
    }
  }

  return md5ToHexEncodedArray(wordsToMd5(bytesToWords(bytes), bytes.length * 8));
}
/*
 * Convert an array of little-endian words to an array of bytes
 */


function md5ToHexEncodedArray(input) {
  var i;
  var x;
  var output = [];
  var length32 = input.length * 32;
  var hexTab = '0123456789abcdef';
  var hex;

  for (i = 0; i < length32; i += 8) {
    x = input[i >> 5] >>> i % 32 & 0xff;
    hex = parseInt(hexTab.charAt(x >>> 4 & 0x0f) + hexTab.charAt(x & 0x0f), 16);
    output.push(hex);
  }

  return output;
}
/*
 * Calculate the MD5 of an array of little-endian words, and a bit length.
 */


function wordsToMd5(x, len) {
  /* append padding */
  x[len >> 5] |= 0x80 << len % 32;
  x[(len + 64 >>> 9 << 4) + 14] = len;
  var i;
  var olda;
  var oldb;
  var oldc;
  var oldd;
  var a = 1732584193;
  var b = -271733879;
  var c = -1732584194;
  var d = 271733878;

  for (i = 0; i < x.length; i += 16) {
    olda = a;
    oldb = b;
    oldc = c;
    oldd = d;
    a = md5ff(a, b, c, d, x[i], 7, -680876936);
    d = md5ff(d, a, b, c, x[i + 1], 12, -389564586);
    c = md5ff(c, d, a, b, x[i + 2], 17, 606105819);
    b = md5ff(b, c, d, a, x[i + 3], 22, -1044525330);
    a = md5ff(a, b, c, d, x[i + 4], 7, -176418897);
    d = md5ff(d, a, b, c, x[i + 5], 12, 1200080426);
    c = md5ff(c, d, a, b, x[i + 6], 17, -1473231341);
    b = md5ff(b, c, d, a, x[i + 7], 22, -45705983);
    a = md5ff(a, b, c, d, x[i + 8], 7, 1770035416);
    d = md5ff(d, a, b, c, x[i + 9], 12, -1958414417);
    c = md5ff(c, d, a, b, x[i + 10], 17, -42063);
    b = md5ff(b, c, d, a, x[i + 11], 22, -1990404162);
    a = md5ff(a, b, c, d, x[i + 12], 7, 1804603682);
    d = md5ff(d, a, b, c, x[i + 13], 12, -40341101);
    c = md5ff(c, d, a, b, x[i + 14], 17, -1502002290);
    b = md5ff(b, c, d, a, x[i + 15], 22, 1236535329);
    a = md5gg(a, b, c, d, x[i + 1], 5, -165796510);
    d = md5gg(d, a, b, c, x[i + 6], 9, -1069501632);
    c = md5gg(c, d, a, b, x[i + 11], 14, 643717713);
    b = md5gg(b, c, d, a, x[i], 20, -373897302);
    a = md5gg(a, b, c, d, x[i + 5], 5, -701558691);
    d = md5gg(d, a, b, c, x[i + 10], 9, 38016083);
    c = md5gg(c, d, a, b, x[i + 15], 14, -660478335);
    b = md5gg(b, c, d, a, x[i + 4], 20, -405537848);
    a = md5gg(a, b, c, d, x[i + 9], 5, 568446438);
    d = md5gg(d, a, b, c, x[i + 14], 9, -1019803690);
    c = md5gg(c, d, a, b, x[i + 3], 14, -187363961);
    b = md5gg(b, c, d, a, x[i + 8], 20, 1163531501);
    a = md5gg(a, b, c, d, x[i + 13], 5, -1444681467);
    d = md5gg(d, a, b, c, x[i + 2], 9, -51403784);
    c = md5gg(c, d, a, b, x[i + 7], 14, 1735328473);
    b = md5gg(b, c, d, a, x[i + 12], 20, -1926607734);
    a = md5hh(a, b, c, d, x[i + 5], 4, -378558);
    d = md5hh(d, a, b, c, x[i + 8], 11, -2022574463);
    c = md5hh(c, d, a, b, x[i + 11], 16, 1839030562);
    b = md5hh(b, c, d, a, x[i + 14], 23, -35309556);
    a = md5hh(a, b, c, d, x[i + 1], 4, -1530992060);
    d = md5hh(d, a, b, c, x[i + 4], 11, 1272893353);
    c = md5hh(c, d, a, b, x[i + 7], 16, -155497632);
    b = md5hh(b, c, d, a, x[i + 10], 23, -1094730640);
    a = md5hh(a, b, c, d, x[i + 13], 4, 681279174);
    d = md5hh(d, a, b, c, x[i], 11, -358537222);
    c = md5hh(c, d, a, b, x[i + 3], 16, -722521979);
    b = md5hh(b, c, d, a, x[i + 6], 23, 76029189);
    a = md5hh(a, b, c, d, x[i + 9], 4, -640364487);
    d = md5hh(d, a, b, c, x[i + 12], 11, -421815835);
    c = md5hh(c, d, a, b, x[i + 15], 16, 530742520);
    b = md5hh(b, c, d, a, x[i + 2], 23, -995338651);
    a = md5ii(a, b, c, d, x[i], 6, -198630844);
    d = md5ii(d, a, b, c, x[i + 7], 10, 1126891415);
    c = md5ii(c, d, a, b, x[i + 14], 15, -1416354905);
    b = md5ii(b, c, d, a, x[i + 5], 21, -57434055);
    a = md5ii(a, b, c, d, x[i + 12], 6, 1700485571);
    d = md5ii(d, a, b, c, x[i + 3], 10, -1894986606);
    c = md5ii(c, d, a, b, x[i + 10], 15, -1051523);
    b = md5ii(b, c, d, a, x[i + 1], 21, -2054922799);
    a = md5ii(a, b, c, d, x[i + 8], 6, 1873313359);
    d = md5ii(d, a, b, c, x[i + 15], 10, -30611744);
    c = md5ii(c, d, a, b, x[i + 6], 15, -1560198380);
    b = md5ii(b, c, d, a, x[i + 13], 21, 1309151649);
    a = md5ii(a, b, c, d, x[i + 4], 6, -145523070);
    d = md5ii(d, a, b, c, x[i + 11], 10, -1120210379);
    c = md5ii(c, d, a, b, x[i + 2], 15, 718787259);
    b = md5ii(b, c, d, a, x[i + 9], 21, -343485551);
    a = safeAdd(a, olda);
    b = safeAdd(b, oldb);
    c = safeAdd(c, oldc);
    d = safeAdd(d, oldd);
  }

  return [a, b, c, d];
}
/*
 * Convert an array bytes to an array of little-endian words
 * Characters >255 have their high-byte silently ignored.
 */


function bytesToWords(input) {
  var i;
  var output = [];
  output[(input.length >> 2) - 1] = undefined;

  for (i = 0; i < output.length; i += 1) {
    output[i] = 0;
  }

  var length8 = input.length * 8;

  for (i = 0; i < length8; i += 8) {
    output[i >> 5] |= (input[i / 8] & 0xff) << i % 32;
  }

  return output;
}
/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
 * to work around bugs in some JS interpreters.
 */


function safeAdd(x, y) {
  var lsw = (x & 0xffff) + (y & 0xffff);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return msw << 16 | lsw & 0xffff;
}
/*
 * Bitwise rotate a 32-bit number to the left.
 */


function bitRotateLeft(num, cnt) {
  return num << cnt | num >>> 32 - cnt;
}
/*
 * These functions implement the four basic operations the algorithm uses.
 */


function md5cmn(q, a, b, x, s, t) {
  return safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b);
}

function md5ff(a, b, c, d, x, s, t) {
  return md5cmn(b & c | ~b & d, a, b, x, s, t);
}

function md5gg(a, b, c, d, x, s, t) {
  return md5cmn(b & d | c & ~d, a, b, x, s, t);
}

function md5hh(a, b, c, d, x, s, t) {
  return md5cmn(b ^ c ^ d, a, b, x, s, t);
}

function md5ii(a, b, c, d, x, s, t) {
  return md5cmn(c ^ (b | ~d), a, b, x, s, t);
}

/* harmony default export */ var esm_browser_md5 = (md5);
// CONCATENATED MODULE: ./node_modules/uuid/dist/esm-browser/v3.js


var v3 = v35('v3', 0x30, esm_browser_md5);
/* harmony default export */ var esm_browser_v3 = (v3);
// CONCATENATED MODULE: ./node_modules/uuid/dist/esm-browser/v4.js



function v4(options, buf, offset) {
  var i = buf && offset || 0;

  if (typeof options == 'string') {
    buf = options === 'binary' ? new Array(16) : null;
    options = null;
  }

  options = options || {};
  var rnds = options.random || (options.rng || rng)(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`

  rnds[6] = rnds[6] & 0x0f | 0x40;
  rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

  if (buf) {
    for (var ii = 0; ii < 16; ++ii) {
      buf[i + ii] = rnds[ii];
    }
  }

  return buf || esm_browser_bytesToUuid(rnds);
}

/* harmony default export */ var esm_browser_v4 = (v4);
// CONCATENATED MODULE: ./node_modules/uuid/dist/esm-browser/sha1.js
// Adapted from Chris Veness' SHA1 code at
// http://www.movable-type.co.uk/scripts/sha1.html
function f(s, x, y, z) {
  switch (s) {
    case 0:
      return x & y ^ ~x & z;

    case 1:
      return x ^ y ^ z;

    case 2:
      return x & y ^ x & z ^ y & z;

    case 3:
      return x ^ y ^ z;
  }
}

function ROTL(x, n) {
  return x << n | x >>> 32 - n;
}

function sha1(bytes) {
  var K = [0x5a827999, 0x6ed9eba1, 0x8f1bbcdc, 0xca62c1d6];
  var H = [0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476, 0xc3d2e1f0];

  if (typeof bytes == 'string') {
    var msg = unescape(encodeURIComponent(bytes)); // UTF8 escape

    bytes = new Array(msg.length);

    for (var i = 0; i < msg.length; i++) {
      bytes[i] = msg.charCodeAt(i);
    }
  }

  bytes.push(0x80);
  var l = bytes.length / 4 + 2;
  var N = Math.ceil(l / 16);
  var M = new Array(N);

  for (var i = 0; i < N; i++) {
    M[i] = new Array(16);

    for (var j = 0; j < 16; j++) {
      M[i][j] = bytes[i * 64 + j * 4] << 24 | bytes[i * 64 + j * 4 + 1] << 16 | bytes[i * 64 + j * 4 + 2] << 8 | bytes[i * 64 + j * 4 + 3];
    }
  }

  M[N - 1][14] = (bytes.length - 1) * 8 / Math.pow(2, 32);
  M[N - 1][14] = Math.floor(M[N - 1][14]);
  M[N - 1][15] = (bytes.length - 1) * 8 & 0xffffffff;

  for (var i = 0; i < N; i++) {
    var W = new Array(80);

    for (var t = 0; t < 16; t++) {
      W[t] = M[i][t];
    }

    for (var t = 16; t < 80; t++) {
      W[t] = ROTL(W[t - 3] ^ W[t - 8] ^ W[t - 14] ^ W[t - 16], 1);
    }

    var a = H[0];
    var b = H[1];
    var c = H[2];
    var d = H[3];
    var e = H[4];

    for (var t = 0; t < 80; t++) {
      var s = Math.floor(t / 20);
      var T = ROTL(a, 5) + f(s, b, c, d) + e + K[s] + W[t] >>> 0;
      e = d;
      d = c;
      c = ROTL(b, 30) >>> 0;
      b = a;
      a = T;
    }

    H[0] = H[0] + a >>> 0;
    H[1] = H[1] + b >>> 0;
    H[2] = H[2] + c >>> 0;
    H[3] = H[3] + d >>> 0;
    H[4] = H[4] + e >>> 0;
  }

  return [H[0] >> 24 & 0xff, H[0] >> 16 & 0xff, H[0] >> 8 & 0xff, H[0] & 0xff, H[1] >> 24 & 0xff, H[1] >> 16 & 0xff, H[1] >> 8 & 0xff, H[1] & 0xff, H[2] >> 24 & 0xff, H[2] >> 16 & 0xff, H[2] >> 8 & 0xff, H[2] & 0xff, H[3] >> 24 & 0xff, H[3] >> 16 & 0xff, H[3] >> 8 & 0xff, H[3] & 0xff, H[4] >> 24 & 0xff, H[4] >> 16 & 0xff, H[4] >> 8 & 0xff, H[4] & 0xff];
}

/* harmony default export */ var esm_browser_sha1 = (sha1);
// CONCATENATED MODULE: ./node_modules/uuid/dist/esm-browser/v5.js


var v5 = v35('v5', 0x50, esm_browser_sha1);
/* harmony default export */ var esm_browser_v5 = (v5);
// CONCATENATED MODULE: ./node_modules/uuid/dist/esm-browser/index.js
/* concated harmony reexport v1 */__webpack_require__.d(__webpack_exports__, "v1", function() { return esm_browser_v1; });
/* concated harmony reexport v3 */__webpack_require__.d(__webpack_exports__, "v3", function() { return esm_browser_v3; });
/* concated harmony reexport v4 */__webpack_require__.d(__webpack_exports__, "v4", function() { return esm_browser_v4; });
/* concated harmony reexport v5 */__webpack_require__.d(__webpack_exports__, "v5", function() { return esm_browser_v5; });





/***/ })
/******/ ]);
});
//# sourceMappingURL=ActionSDK.js.map