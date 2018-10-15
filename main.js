define(function (require, exports, module) {

    'use strict';

    // Package-style naming to avoid collisions
    var COMMAND_ID = 'brackets_html_boilerplate.expandWithTab';

    var ExtensionUtils    = brackets.getModule('utils/ExtensionUtils');
    var CommandManager    = brackets.getModule('command/CommandManager');
    var EditorManager     = brackets.getModule('editor/EditorManager');
    var DocumentManager   = brackets.getModule('document/DocumentManager');

    // It will allows to use "Tab" key but not showing up the keys in the Menu
    var KeyBindingManager = brackets.getModule('command/KeyBindingManager');

    // HTML 5 template
    var htmlTemplate = require('text!templates/html5.html');

    function expandWithMainButton() {
        // Will return an editor that currently have focus
        var editor = EditorManager.getFocusedEditor();

        insertTemplate(editor, htmlTemplate);
    }

    // Function will keep the text on the line if exist
    // and will insert some template or replace selection
    function insertTemplate(editor, replacement) {
        try {
            var selection = editor.getSelection();
            editor.document.replaceRange(replacement, selection.start, selection.end);
        } catch (err) {
            // do nothing
        }
    }

    // Function will replace text on the line if exist
    // and will insert some template
    function replaceLine(editor, replacement) {
        try {
            var currentCursorPosition = editor.getCursorPos();
            var beginningOfLine = {line: currentCursorPosition.line, ch: 0};
            editor.document.replaceRange(replacement, beginningOfLine, currentCursorPosition);
        } catch (err) {
            // do nothing
        }
    }

    // Will used when hit the 'Tab' key
    function expandWithTab() {
        // Returns the Document that is currently open in the editor UI. May be null.
        var document = DocumentManager.getCurrentDocument();

        // Will only return editors that currently have focus
        var editor = EditorManager.getFocusedEditor();

        if (document.getLanguage().getId() === 'html') {

            // True if there's a text selection; false if not
            if (editor.hasSelection()) {
                KeyBindingManager.removeBinding(KEY_BINDINGS);
            } else {
                var currentCursorPosition = editor.getCursorPos();
                var beginningOfLine = {line: currentCursorPosition.line, ch: 0};
                var getTextBeforeCursor = editor.document.getRange(beginningOfLine, currentCursorPosition);

                switch (getTextBeforeCursor) {
                    case 'html':
                    case '<html':
                    case 'html>':
                    case '<html>':
                        replaceLine(editor, htmlTemplate);
                        break;
                    default:
                        KeyBindingManager.removeBinding(KEY_BINDINGS);
                }
            }
        } else {
            // If document type not an HTML
            KeyBindingManager.removeBinding(KEY_BINDINGS);
        }
    }

    CommandManager.register('HTML Boilerplate', COMMAND_ID, expandWithTab);

    // Menu
    var Menus = brackets.getModule('command/Menus');
    var editMenu = Menus.getMenu(Menus.AppMenuBar.EDIT_MENU);
    var contextMenu = Menus.getContextMenu(Menus.ContextMenuIds.EDITOR_MENU);

    var KEY_BINDINGS = [
        {key: 'Tab', platform: 'win'},
        {key: 'Cmd + ]', platform: 'mac'},
        {key: 'Tab', platform: 'linux'}];

    // It will allow to use "Tab" key but not showing up the keys in the Menu
    KeyBindingManager.addBinding(COMMAND_ID, KEY_BINDINGS);

    // Main Menu
    editMenu.addMenuItem(COMMAND_ID, KEY_BINDINGS);
    editMenu.addMenuDivider();

    // Context Menu
    contextMenu.addMenuItem(COMMAND_ID, KEY_BINDINGS);
    contextMenu.addMenuDivider();

    // Toolbar Button
    ExtensionUtils.loadStyleSheet(module, 'styles/styles.css');

    $(document.createElement('a'))
        .attr('id', 'html-boilerplate-toolbar-icon')
        .attr('href', '#')
        .attr('title', 'HTML Boilerplate')
        .on('click', function () {
            expandWithMainButton();
        })
        .appendTo($('#main-toolbar .buttons'));
});
