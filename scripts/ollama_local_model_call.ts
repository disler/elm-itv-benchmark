/**
 * Use to test a local ollama model.
 */
async function prompt() {

    const readline = require('readline');
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    const inPrompt = await new Promise((resolve) => {
        rl.question('Enter your prompt > ', (userInput) => {
            rl.close();
            resolve(userInput);
        });
    });

    let response;
    try {
        response = await fetch(
            `${process.env.OLLAMA_BASE_URL || 'http://localhost:11434'}/api/chat`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model: "llama3",
                    messages: [{ role: 'user', content: inPrompt }],
                    stream: false
                }),
            },
        );
    } catch (err) {
        console.error(`API call error: ${err}`);
    }
    console.log(`response`, response)

    const asJson = await response.json()
    console.log(`asJson`, asJson)
}

async function main() {
    prompt()
}

main()