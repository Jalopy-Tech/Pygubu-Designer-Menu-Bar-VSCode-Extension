// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "pygubu-designer-menu-bar" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json

	const disposableOpenFile = vscode.commands.registerCommand('pygubu-designer-menu-bar.PygubuDesignerOpenFile', function () {

		let fError = false;
		let fileExt = undefined;
		let file = undefined;

		// Get the curent file patha and extension from the active editor.

		try {
			file = vscode.window.activeTextEditor.document.fileName;
			fileExt = file.split('.').pop();
		}
		catch(err) {
			fError = true;
		}

		// Set the error flag if the current file is not a .ui file

		if (!fError) {
			fError = (fileExt.toLowerCase() != 'ui')
		}

		// Display an error message if error flag is true

		if (fError) {
			vscode.window.showErrorMessage('Pygubu Designer error: to open a file, a .ui file must be selected first.');
		}
		else {

			// Execute pygubu-designer with the file argument

			const cp = require('child_process')
			cp.exec('pygubu-designer "' + file + '"', (err, stdout, stderr) => {
				console.log('stdout: ' + stdout);
				console.log('stderr: ' + stderr);
				if (err) {
					console.log('error: ' + err);
					vscode.window.showErrorMessage("Pygubu Designer error: " + err.message);
				}
			
			});
		}
	});
	context.subscriptions.push(disposableOpenFile);

	const disposableNewFile = vscode.commands.registerCommand('pygubu-designer-menu-bar.PygubuDesignerNewFile', function () {

		// Execute pygubu-designer (no arguments).

		const cp = require('child_process')
		cp.exec('pygubu-designer', (err, stdout, stderr) => {
    		console.log('stdout: ' + stdout);
    		console.log('stderr: ' + stderr);
    		if (err) {
     	   		console.log('error: ' + err);
				vscode.window.showErrorMessage("Pygubu Designer error: " + err.message);
   			}	
		});
	});
	context.subscriptions.push(disposableNewFile);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
