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
    "jsontoclass.helloWorld",
    () => {
      // showInformationMessage 给用户提示一条消息
      vscode.window.showInformationMessage("Welcome to use Json To Class!");
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
