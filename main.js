define(function (require, exports, module) {

    'use strict';

    // Package-style naming to avoid collisions
    var COMMAND_ID = 'brackets_html_boilerplate.expandWithTab';

    var ExtensionUtils = brackets.getModule('utils/ExtensionUtils');
    var CommandManager = brackets.getModule('command/CommandManager');
    var EditorManager = brackets.getModule('editor/EditorManager');
    var DocumentManager = brackets.getModule('document/DocumentManager');

    // It will allows to use "Tab" key but not showing up the keys in the Menu
    var KeyBindingManager = brackets.getModule('command/KeyBindingManager');

    // HTML 5 template
    var htmlTemplate = require('text!templates/html5.html');
    var spaces = '    ';


    // Will insert spaces where the document type is not HTML or where 'Tab' key not active
    // or will replace selection on the HTML template
    function insertTemplate(editor, replacement) {
        try {

            var selection = editor.getSelection();
            editor.document.replaceRange(replacement, selection.start, selection.end);
        } catch (err) {
            // do nothing
        }
    }


    function expandWithTab() {

        // Returns the Document that is currently open in the editor UI. May be null.
        var document = DocumentManager.getCurrentDocument();

        // Will only return editors that currently have focus
        var editor = EditorManager.getFocusedEditor();

        if (document.getLanguage().getId() === 'html') {

            // True if there's a text selection; false if not
            if (editor.hasSelection()) {

                // Expand abbreviation if there’s a selection
                insertTemplate(editor, htmlTemplate);

            } else {

                var currentCursorPosition = editor.getCursorPos();

                // Get text from line
                var line = (editor.document.getLine(currentCursorPosition.line)).trim();

                // Handle Tab key for known syntaxes only
                if (line === 'html' || line === '<html' || line === 'html>' || line === '<html>') {

                    var beginningOfLine = {line: currentCursorPosition.line, ch: 0};
                    var textBeforeCursor = editor.document.getRange(beginningOfLine, currentCursorPosition);

                    if (textBeforeCursor.trim() === '') {

                        insertTemplate(editor, spaces);

                    } else {

                        try {

                            editor.document.replaceRange(htmlTemplate, beginningOfLine, currentCursorPosition);

                        } catch (err) {
                            // do nothing
                        }
                    }
                } else {

                    // If document type not an HTML
                    insertTemplate(editor, spaces);
                }
            }
        } else {

            // If document type not an HTML
            insertTemplate(editor, spaces);
        }
    }

    CommandManager.register('HTML Boilerplate', COMMAND_ID, expandWithTab);

    // Menu
    var Menus = brackets.getModule('command/Menus');
    var editMenu = Menus.getMenu(Menus.AppMenuBar.EDIT_MENU);
    var contextMenu = Menus.getContextMenu(Menus.ContextMenuIds.EDITOR_MENU);

    var KEY_BINDINGS = [
        {key: 'Tab', platform: 'win'},
        {key: 'Tab', platform: 'mac'},
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
            expandWithTab();
        })
        .appendTo($('#main-toolbar .buttons'));
});
