// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import * as path from "path";
import { jsonToClass } from "./logic/jsonToClass";
import { createTsClassFile } from "./fileHandle/createTsClassFile";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "jsontoclass.checkJsonOrObjectStr",
    () => {
      // showInformationMessage 给用户提示一条消息
      vscode.window.showInformationMessage("Welcome to use Json To Class!");
      const editor = vscode.window.activeTextEditor;

      if (editor) {
        // 获取当前编辑的文件的 URI
        const uri = editor.document.uri;

        // 获取文件名
        const fileName = vscode.workspace.asRelativePath(uri);

        // 获取用户选中的文本范围
        const selection = editor.selection;

        // 获取选中的文本
        const selectedText = editor.document.getText(selection);

        const classFileContent = jsonToClass(fileName, selectedText);

        if(!classFileContent) {return;}

        // 创建一个 TextEdit 对象，表示要插入的文本
        const edit = new vscode.TextEdit(
            new vscode.Range(selection.end, selection.end),
            `\n${classFileContent.classStr}`
        );

        // 创建一个 WorkspaceEdit 对象，表示一组编辑操作
        const editBuilder = new vscode.WorkspaceEdit();

        // 将 TextEdit 添加到 WorkspaceEdit 中
        editBuilder.set(editor.document.uri, [edit]);

        // 应用编辑操作到文档中
        vscode.workspace.applyEdit(editBuilder);

        // 更新光标位置，将光标移到插入的文本后面
        editor.selection = new vscode.Selection(selection.end.translate(1), selection.end.translate(1));

        // 在输出窗口中显示选中的文本
        vscode.window.showInformationMessage(`Selected Text: ${selectedText}`);
      }
    }
  );

  let checkJsonFileDisposable = vscode.commands.registerCommand(
    "jsontoclass.checkJsonFile",
    async () => {
      // 在这里执行你的逻辑，例如右键点击后的处理

      // 这里获取当前活动的编辑器
      const editor: vscode.TextEditor | undefined =
        vscode.window.activeTextEditor;
      if (editor && editor.document.languageId === "json") {
        // 获取当前编辑的文件的 URI
        const uri = editor.document.uri;

        // 获取文件名
        const fileName = vscode.workspace.asRelativePath(uri);

        // 获取文档对象
        const document = editor.document;

        // 获取文档内容
        const content = document.getText();

        const classFileContent = jsonToClass(fileName, content);

        if(!classFileContent) {return;}

        // 获取当前编辑文件的 URI
        const currentFileUri = editor.document.uri;

        // 解析当前编辑文件的路径
        const currentFilePath = currentFileUri.fsPath;

        // 获取当前编辑文件的目录
        const currentFileDir = path.dirname(currentFilePath);

        createTsClassFile(
          classFileContent.className,
          classFileContent.classStr,
          currentFileDir
        );
      }

      vscode.window.showInformationMessage("Welcome to use Json To Class!");
    }
  );

  // 添加到插件的上下文中，确保在插件禁用时清理资源
  context.subscriptions.push(disposable, checkJsonFileDisposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
