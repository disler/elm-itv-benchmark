/**
 * Use this to quickly generate a new promptfoo test suite.
 */
import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';


interface FileAndContents {
    fileName: string
    contents: string
}

const PROMPT_TXT: FileAndContents = {
    fileName: "prompt.txt",
    contents: `convert the following natural language query into SQL: {{nlq}}

SQL:`
}

const PROMPTFOO_CONFIG_YAML: FileAndContents = {
    fileName: "promptfooconfig.yaml",
    contents: `description: "<your prompt description>"
providers: 
  - id: openai:gpt-3.5-turbo-1106
evaluateOptions:
  repeat: 1
`
}

const PROMPT_TESTS: FileAndContents = {
    fileName: "tests.yaml",
    contents: `- description: "NLQ to SQL"
  vars:
    nlq: select all users
    id: 1
  assert:
    - type: icontains-all
      value: ["select", "*", "from", "users"]  
`
}

function buildPackageScriptsCall(scriptName: string, testName: string) {
    return `promptfoo eval -c ./${testName}/promptfooconfig.yaml -t ./${testName}/tests.yaml -p ./${testName}/prompt.txt --no-cache`
}

function updateScripts(scriptName: string, testName: string) {
    const packageJsonPath = path.join(__dirname, '..', 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    packageJson.scripts[scriptName] = buildPackageScriptsCall(scriptName, testName);
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
}

async function userInput(prompt: string): Promise<string> {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    const answer = await new Promise<string>((resolve) => {
        rl.question(prompt, (input) => {
            resolve(input);
        });
    });

    rl.close();
    return answer;
}

async function main() {

    let testName = await userInput('Please enter the test name: ');

    const ensureAlphaNumericAndUnderscore = (str: string) => {
        return str.replace(/[^a-zA-Z0-9_]/g, '');
    }

    testName = ensureAlphaNumericAndUnderscore(testName);

    console.log(`Generating test suite for: ${testName}`);

    // prefix testName with BENCH__
    testName = `BENCH__${testName}`;

    const testDirectory = path.join(__dirname, '..', testName);
    if (!fs.existsSync(testDirectory)) {
        fs.mkdirSync(testDirectory, { recursive: true });
    }

    const files: FileAndContents[] = [PROMPT_TXT, PROMPTFOO_CONFIG_YAML, PROMPT_TESTS];

    files.forEach(file => {
        const filePath = path.join(testDirectory, file.fileName);
        fs.writeFileSync(filePath, file.contents);
        console.log(`Created file: ${filePath}`);
    });

    console.log(`Test suite '${testName}' created successfully. Update the test files to test your unique prompt`);

    let scriptName = await userInput('Please enter a name for the package.json script that will run the tests: ');
    scriptName = ensureAlphaNumericAndUnderscore(scriptName);
    updateScripts(scriptName, testName);
    console.log(`Script '${scriptName}' for test suite '${testName}' added to package.json successfully.`);
}


main()