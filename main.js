define(function (require, exports, module) {

    'use strict';

    // Package-style naming to avoid collisions
    var COMMAND_ID        = 'brackets_html_boilerplate.expandWithTab';

    var ExtensionUtils    = brackets.getModule('utils/ExtensionUtils');
    var CommandManager    = brackets.getModule('command/CommandManager');
    var EditorManager     = brackets.getModule('editor/EditorManager');
    var DocumentManager   = brackets.getModule('document/DocumentManager');

    // It will allows to use "Tab" key but not showing up the keys in the Menu
    var KeyBindingManager = brackets.getModule('command/KeyBindingManager');

    // HTML 5 template
    var template          = require('text!templates/html5.html');


    function replaceSelectionForEmptyLine() {

        var editor = EditorManager.getFocusedEditor();

        try {
            var selection = editor.getSelection();
            editor.document.replaceRange(template, selection.start, selection.end);
        } catch (err) {}
    }

    function replaceSelection(editor) {
        try {
            var selection = editor.getSelection();
            editor.document.replaceRange(template, selection.start, selection.end);
        } catch (err) {}
    }


    function expandWithTab() {
        var document = DocumentManager.getCurrentDocument();

        if (document.getLanguage().getId() === 'html') {
            var editor = EditorManager.getFocusedEditor();

            // True if there's a text selection; false if not
            if (editor.hasSelection()) {
                // Expand abbreviation if there’s a selection
                replaceSelection(editor);
            } else {
                // Get text from line
                var currentCursorPosition = editor.getCursorPos();
                var line = editor.document.getLine(currentCursorPosition.line);
                var line = line.trim();

                // Handle Tab key for known syntaxes only
                if (line === 'html' || line === '<html' || line === 'html>' || line === '<html>') {
                    var beginningOfLine = {line: currentCursorPosition.line, ch: 0};
                    var textBeforeCursor = editor.document.getRange(beginningOfLine, currentCursorPosition);

                    if (textBeforeCursor.trim() === '') {
                        // Do nothing if current cursor position before text
                    } else {
                        try {
                            editor.document.replaceRange(template, beginningOfLine, currentCursorPosition);
                        } catch (err) {}
                    }
                }
            }
        } else {
            window.alert('Document type should be HTML');
        }
    }

    CommandManager.register('HTML Boilerplate', COMMAND_ID, expandWithTab);

    // Menu
    var Menus        = brackets.getModule('command/Menus');
    var editMenu     = Menus.getMenu(Menus.AppMenuBar.EDIT_MENU);
    var contextMenu  = Menus.getContextMenu(Menus.ContextMenuIds.EDITOR_MENU);

    var KEY_BINDINGS = [
        { key: 'Tab', platform: 'win'   },
        { key: 'Tab', platform: 'mac'   },
        { key: 'Tab', platform: 'linux' }];

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
            replaceSelectionForEmptyLine();
        })
        .appendTo($('#main-toolbar .buttons'));
});
