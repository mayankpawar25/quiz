import * as uuid from "uuid";

export class Utils {
    public static generateGUID(): string {
        return uuid.v4();
    }

    public static isEmptyString(str: string): boolean {
        return this.isEmptyObject(str);
    }

    public static isEmptyObject(obj: any): boolean {
        if (obj == undefined || obj == null) {
            return true;
        }

        var isEmpty = false;

        if (typeof obj === "number" || typeof obj === "boolean") {
            isEmpty = false;
        } else if (typeof obj === "string") {
            isEmpty = obj.trim().length == 0;
        } else if (Array.isArray(obj)) {
            isEmpty = obj.length == 0;
        } else if (typeof obj === "object") {
            if (this.isValidJson(obj)) {
                isEmpty = JSON.stringify(obj) == "{}";
            }
        }
        return isEmpty;
    }

    public static isValidJson(json: any): boolean {
        try {
            JSON.parse(JSON.stringify(json));
            return true;
        } catch (e) {
            return false;
        }
    }
}
