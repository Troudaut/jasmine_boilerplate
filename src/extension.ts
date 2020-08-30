import * as fs from 'fs';
import { ExtensionContext, commands, window, Uri } from 'vscode';
import { TemplateManager, Template } from './config/template-manager';
import { ConfigManager } from './config/config-manager';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: ExtensionContext) {

  const jasmineBoilerplate = window.createOutputChannel("Jasmine Boilerplate");
  const templateManager = new TemplateManager();
	
	let disposable = commands.registerCommand('jasmine-boilerplate.generateBoilerplate', (uri:Uri) => {
    const path = uri.fsPath.split('.ts').shift() + '.' + ConfigManager.getTestFileExtension();
		const fileName = path.split('\\').pop();
    
		if (fs.existsSync(path)) {
			// File exists in path
			jasmineBoilerplate.appendLine(`File ${fileName} already exists.`);
		} else {
			// Create the file
			fs.writeFile(path, templateManager.getTemplate(Template.DEFAULT, 'Component', './component'), function (err) {
				if (err) {
					jasmineBoilerplate.appendLine(err.message);
				}
				jasmineBoilerplate.appendLine(`${fileName} created.`);

			  });
		}

	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
