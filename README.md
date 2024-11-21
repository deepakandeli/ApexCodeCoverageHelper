# Apex Code Coverage Helper - Visual Studio Code Extension

The **Apex Code Coverage Helper** extension for Visual Studio Code provides a streamlined way for Salesforce developers to automatically find and run Apex test classes, view code coverage results, and retrieve relevant Apex code coverage data directly within the editor.

## Features

- **Run Related Test Classes:** Automatically query and run test classes associated with an Apex class.
- **View Code Coverage Results:** Retrieves and displays the code coverage of Apex classes, showing test class names related to the class.
- **Run Tests in Integrated Terminal:** Execute Apex tests directly from the integrated terminal in Visual Studio Code.
- **Works with Non-Test Apex Classes:** This extension only operates on non-test Apex classes, ensuring that only necessary tests are executed.

## Prerequisites

Before using this extension, make sure the following are in place:

- **Salesforce CLI (sfdx):** You need to have the Salesforce CLI installed on your machine. Download it from the [Salesforce CLI page](https://developer.salesforce.com/tools/sfdxcli).
- **Salesforce Org Authentication:** Ensure that you have authenticated your Salesforce org. You can authenticate using the command:
  ```bash
  sfdx auth:web:login --setdefaultusername

## Usage

### Running the Extension

1. **Open an Apex Class (.cls file):** The extension works when an Apex class is open in the editor. Ensure the file is **not a test class**.
2. **Execute the Command:**
   - Open the Command Palette (`Ctrl+Shift+P`).
   - Type **RunApexCodeCoverage : Find Test Classes for Code Coverage**, then press **Enter**.

### What Happens When the Command is Executed?

1. **Check if the File is an Apex Class:**
   - The extension first verifies that the file is an Apex class file (`.cls`).
   - It ensures that the file is **not a test class** by checking for the `@isTest` or `testMethod` annotations.
   
2. **Query Salesforce for the Class ID:**
   - The extension queries Salesforce to retrieve the `ApexClassId` for the class.

3. **Find Related Test Classes:**
   - It then runs a query to find test classes related to the Apex class and displays their names.

4. **Run Test Classes in Terminal:**
   - If test classes are found, the extension will run them using the `sfdx force:apex:test:run` command in the integrated terminal.
   - The test results are saved to a directory (`./test-results`), and the code coverage is displayed.

5. **Code Coverage Display:**
   - After executing the tests, the extension provides information about the code coverage, such as the test class names, number of lines covered, and the total coverage percentage.

### Example

For an Apex class `MyApexClass`, the extension will:

1. Check for related test classes (e.g., `TestMyApexClass1` and `TestMyApexClass2`).
2. Run the tests using the `sfdx` CLI.
3. Output the code coverage details, e.g.,:
