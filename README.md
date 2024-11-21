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
