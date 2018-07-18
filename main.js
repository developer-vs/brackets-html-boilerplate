define(function (require, exports, module) {

    // package-style naming to avoid collisions
    var COMMAND_ID = "brackets_html_boilerplate.developer-vs";
    
    var commandManager = brackets.getModule("command/CommandManager");
    var editorManager = brackets.getModule("editor/EditorManager");
    var keyBindingManager = brackets.getModule("command/KeyBindingManager");
    
    // Menu
    var menus = brackets.getModule("command/Menus");

    var menu = menus.getMenu(menus.AppMenuBar.EDIT_MENU); 
    menu.addMenuDivider();
    menu.addMenuItem(COMMAND_ID);
    menu.addMenuDivider();

    // var contextMenu  = Menus.getContextMenu(Menus.ContextMenuIds.EDITOR_MENU);
    // contextMenu.addMenuItem(COMMAND_ID);
  
    function htmlTemplate() {

        var editor = editorManager.getFocusedEditor();

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
     
    commandManager.register("HTML Boilerplate", COMMAND_ID, htmlTemplate);

    // (Note: "Ctrl" is automatically mapped to "Cmd" on Mac)
    keyBindingManager.addBinding(COMMAND_ID, "Ctrl-Alt-I", "mac");
    keyBindingManager.addBinding(COMMAND_ID, "Ctrl-Alt-I", "win"); 
    keyBindingManager.addBinding(COMMAND_ID, "Ctrl-Alt-I", "linux");
    
});
