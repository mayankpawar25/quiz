import * as actionSDK from "@microsoft/m365-action-sdk";

export class Localizer {
    private static jsonObject = {};

    /**
     * Get localized value of the given string id.
     * If any id is not found the same will be returned.
     * @param stringId id of the string to be localized
     * @param args any arguments which needs to passed
     */
    /**
     * Method to get Local string and check contains argument to append or not
     * @param id string identfier
     * @param args additional string that want to append on response string to a position
     */
    public static async getString(id: string, ...args: any[]) {
        let request = new actionSDK.GetLocalizedStrings.Request();
        let response = (await actionSDK.executeApi(request)) as actionSDK.GetLocalizedStrings.Response;
        let strings = response.strings;
        this.jsonObject = strings;

        if (this.jsonObject && this.jsonObject[id]) {
            return this.getStringInternal(this.jsonObject[id], ...args);
        }
        return this.getStringInternal(id, ...args);
    }

    /**
     * Method to get Local string from local file
     * @param id string identfier
     * @param args additional string that want to append on response string to a position
     */
    public static getStringInternal(main: string, ...args: any[]) {

        let formatted = main;
        for (let i = 0; i < args.length; i++) {
            let regexp = new RegExp("\\{" + i + "\\}", "gi");
            formatted = formatted.replace(regexp, args[i]);
        }
        return formatted;
    }
}