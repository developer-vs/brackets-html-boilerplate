define(function (require, exports, module) {
    "use strict";
    var CommandManager = brackets.getModule("command/CommandManager"),
        EditorManager = brackets.getModule("editor/EditorManager"),
        KeyBindingManager = brackets.getModule("command/KeyBindingManager"),
        Menus = brackets.getModule("command/Menus");

    function htmlTemplate() {
        var editor = EditorManager.getFocusedEditor();
        if (editor) {
            var template = "<!DOCTYPE html>\n" +
                "<html>\n" +
                "<head>\n" +
                "\t<title></title>\n" +
                "</head>\n" +
                "<body>\n\n" +
                "</body>\n" +
                "</html>";
            var inPos = editor.getCursorPos();
            editor.document.replaceRange(template, inPos);
        }
    };
    var COMMAND_ID = "brackets_html_boilerplate.developer-vs"; // package-style naming to avoid collisions
    CommandManager.register("HTML Boilerplate", COMMAND_ID, htmlTemplate);
    var menu = Menus.getMenu(Menus.AppMenuBar.EDIT_MENU);
    menu.addMenuDivider();
    menu.addMenuItem(COMMAND_ID);
   KeyBindingManager.addBinding(COMMAND_ID, "Ctrl-Alt-I", "mac");
   KeyBindingManager.addBinding(COMMAND_ID, "Ctrl-Alt-I", "win");
});
