define(function (require, exports, module) {

    'use strict';   

    // package-style naming to avoid collisions
    var COMMAND_ID = "brackets_html_boilerplate.developer-vs";
    
    var ExtensionUtils    = brackets.getModule('utils/ExtensionUtils');
    var CommandManager    = brackets.getModule("command/CommandManager");
    var EditorManager     = brackets.getModule("editor/EditorManager");
    

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

            try {
                editor.document.replaceRange(template, editor.getCursorPos());
            } catch (err) {}
        }
    };
     
    CommandManager.register("HTML Boilerplate", COMMAND_ID, htmlTemplate);

    // Menu
    var Menus       = brackets.getModule("command/Menus");
    var editMenu    = Menus.getMenu(Menus.AppMenuBar.EDIT_MENU); 
    var contextMenu = Menus.getContextMenu(Menus.ContextMenuIds.EDITOR_MENU);    

    var KEY_BINDINGS = [
        {
            key: 'Ctrl-Alt-I',
            platform: 'win'
        }, {
            key: 'Cmd-Alt-I',
            platform: 'mac'
        }, {
            key: 'Ctrl-Alt-I',
            platform: 'linux'
        }
    ];  

    // Main Menu
    editMenu.addMenuDivider();
    editMenu.addMenuItem(COMMAND_ID, KEY_BINDINGS);
    editMenu.addMenuDivider();

    // Context Menu
    contextMenu.addMenuDivider();
    contextMenu.addMenuItem(COMMAND_ID);
    contextMenu.addMenuDivider();

    // Toolbar Button
    ExtensionUtils.loadStyleSheet(module, 'styles/styles.css');
    $(document.createElement('a'))
        .attr('id', 'html-boilerplate-toolbar-icon')
        .attr('href', '#')
        .attr('title', 'HTML Boilerplate')
        .on('click', function () {
            htmlTemplate();
        })
        .appendTo($('#main-toolbar .buttons'));
    
});
