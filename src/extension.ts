// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as fs from 'fs';
import { ProgressLocation, window, ExtensionContext, commands } from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "jasmine-boilerplate" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = commands.registerCommand('jasmine-boilerplate.generateBoilerplate', (uri:vscode.Uri) => {
		// The code you place here will be executed every time your command is executed
		const path = uri.fsPath.split('.ts').shift()+'.spec.ts';
		const fileName = path.split('\\').pop();
		let msg1 = "Create " + fileName + " file ";
		if (fs.existsSync(path)) {
			// File exists in path
			msg1 = "File " + fileName + " already exists."
		}

		window.withProgress({
			location: ProgressLocation.Notification,
			title: "Jasmine Boilerplate Generation",
			cancellable: false
		}, (progress, token) => {
			token.onCancellationRequested(() => {
				console.log("User canceled the long running operation");
			});

			progress.report({ increment: 0 });
			setTimeout(() => {
				progress.report({ increment: 40, message: msg1 });
			}, 1000);

			setTimeout(() => {
				progress.report({ increment: 10, message: "I am long running! - still going even more..." });
			}, 7000);

			setTimeout(() => {
				progress.report({ increment: 50, message: "I am long running! - almost there..." });
			}, 10000);

			const p = new Promise(resolve => {
				setTimeout(() => {
					resolve();
				}, 12000);
			});

			return p;
		});

	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
