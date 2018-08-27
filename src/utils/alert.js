import * as dialogsModule from "ui/dialogs";

export default function alert(message) {
    return dialogsModule.alert({
        title: "Recipes",
        okButtonText: "OK",
        message: message
    });
}
