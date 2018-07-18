define(function (require, exports, module) {

    // package-style naming to avoid collisions
    var COMMAND_ID = "brackets_html_boilerplate.developer-vs";
    
    var CommandManager = brackets.getModule("command/CommandManager");
    var EditorManager = brackets.getModule("editor/EditorManager");
    var KeyBindingManager = brackets.getModule("command/KeyBindingManager");
    
    // Menu
    var Menus = brackets.getModule("command/Menus");
    var menu = Menus.getMenu(Menus.AppMenuBar.EDIT_MENU); 
    var contextMenu  = Menus.getContextMenu(Menus.ContextMenuIds.EDITOR_MENU);    
  
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

            editor.document.replaceRange(template, editor.getCursorPos());
        }
    };
     
    CommandManager.register("HTML Boilerplate", COMMAND_ID, htmlTemplate);
    menu.addMenuDivider();
    menu.addMenuItem(COMMAND_ID);
    contextMenu.addMenuItem(COMMAND_ID);

    // (Note: "Ctrl" is automatically mapped to "Cmd" on Mac)
    KeyBindingManager.addBinding(COMMAND_ID, "Ctrl-Alt-I", "mac");
    KeyBindingManager.addBinding(COMMAND_ID, "Ctrl-Alt-I", "win"); 
    KeyBindingManager.addBinding(COMMAND_ID, "Ctrl-Alt-I", "linux");
    
});
