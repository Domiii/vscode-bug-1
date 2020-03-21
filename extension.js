// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const fs = require('fs');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "code-test-ext" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('extension.helloWorld', async function () {
		// The code you place here will be executed every time your command is executed

		try {
			// Display a message box to the user
			vscode.window.showInformationMessage('Hello World!');

			// make sure to have two files
			const file1 = __dirname + '/a.txt';
			const file2 = __dirname + '/b.txt';
			fs.writeFileSync(file1, 'a', { flag: 'w+' });  // touch
			fs.writeFileSync(file2, 'b', { flag: 'w+' });  // touch

			// open file1 **without pinning**
			await vscode.window.showTextDocument(vscode.Uri.file(file1));

			// try to open file2 twice in a row in quick succession and see it fail!
			vscode.window.showTextDocument(vscode.Uri.file(file2));
			vscode.window.showTextDocument(vscode.Uri.file(file2));
		}
		catch (err) {
			console.error('err:', err);
			vscode.window.showErrorMessage('err: ' + err.stack);
		}
	});

	context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() { }

module.exports = {
	activate,
	deactivate
}
