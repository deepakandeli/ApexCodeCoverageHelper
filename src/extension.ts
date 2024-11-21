// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { Org } from '@salesforce/core';
import * as path from 'path';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "RunApexCodeCoverage" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	/*const disposable = vscode.commands.registerCommand('RunApexCodeCoverage.findTests', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from ApexCodeCoverageHelper!');
	});*/

  // Command registration
  const command = vscode.commands.registerCommand('RunApexCodeCoverage.findTests', async () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      vscode.window.showErrorMessage('No active editor found!');
      return;
    }

    const fileName = editor.document.fileName;
    // Check if it's an Apex class (.cls file)
    if (!fileName.endsWith('.cls')) {
      vscode.window.showWarningMessage('This command only works with Apex class files.');
      return;
    }

    // Check if the file contains @isTest or testMethod
    const fileContent = editor.document.getText();
    const isTestClass = /@isTest|testMethod/.test(fileContent);
	

	// The code you place here will be executed every time your command is executed
	// Display a message box to the user
	vscode.window.showInformationMessage('Hello World from ApexCodeCoverageHelper!');

    if (isTestClass) {
      vscode.window.showInformationMessage('This is a Test class. No test class lookup required.');
      return;
    }

    // Retrieve ApexClassOrTriggerId from Salesforce
    try {
      //const org = await Org.create({ aliasOrUsername: 'your-default-org-alias' }); // Use your default org
	  const org = await Org.create({});
      const conn = org.getConnection();

      // Query to find the class ID
      //const apexClassName = fileName.split('/').pop()?.replace('.cls', '');
	  const apexClassName = path.basename(fileName, '.cls'); // Extract class name
	  vscode.window.showInformationMessage(`Reading this class ${apexClassName}.`);
      const classQuery = `SELECT Id FROM ApexClass WHERE Name = '${apexClassName}' LIMIT 1`;
	  vscode.window.showInformationMessage(`Reading this class ${classQuery}.`);
      const classResult = await conn.tooling.query<{ Id: string }>(classQuery);

      if (!classResult.records.length) {
        vscode.window.showErrorMessage(`Apex class ${apexClassName} not found in the org.`);
        return;
      }

      const apexClassId = classResult.records[0].Id;

      // Query test classes for coverage
      const coverageQuery = `SELECT ApexTestClass.Name, ApexTestClassId, Coverage FROM ApexCodeCoverage WHERE ApexClassOrTriggerId = '${apexClassId}'`;
      const coverageResult = await conn.tooling.query<{ ApexTestClass: { Name: string } }>(coverageQuery);

      if (!coverageResult.records.length) {
        vscode.window.showInformationMessage(`No test classes found for Apex class ${apexClassName}.`);
        return;
      }

      const uniqueTestClasses = Array.from(new Set(coverageResult.records.map(r => r.ApexTestClass.Name)));
      vscode.window.showInformationMessage(`Test Classes for ${apexClassName}: ${uniqueTestClasses.join(', ')}`);
      if (uniqueTestClasses.length > 0) {
        const testClassNames = uniqueTestClasses.join(',');
        const terminal = vscode.window.createTerminal('Run Apex Tests');
        terminal.show();
        terminal.sendText(`sfdx force:apex:test:run --classnames ${testClassNames} --resultformat human --outputdir ./test-results`);
      } else {
        vscode.window.showInformationMessage('No unique test classes found to run.');
      }
    } catch (error) {
		vscode.window.showErrorMessage(`Error querying Salesforce: ${(error as Error).message}`);
    }
  });	

	context.subscriptions.push(command);
}

// This method is called when your extension is deactivated
export function deactivate() {}
