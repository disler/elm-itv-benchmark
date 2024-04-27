
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

    const template = `<|begin_of_text|><|start_header_id|>system<|end_header_id|>
    {{inPrompt}}<|eot_id|>{{history}}<|start_header_id|>{{char}}<|end_header_id|>`;

    let response = await fetch("http://127.0.0.1:8080/completion", {
        method: 'POST',
        body: JSON.stringify({
            prompt: inPrompt,
            "stream": false,
            "n_predict": 400,
            "temperature": 0.19,
            "stop": [
                "</s>",
                "Llama:",
                "User:"
            ],
            "repeat_last_n": 256,
            "repeat_penalty": 1.18,
            "top_k": 40,
            "top_p": 0.5,
            "tfs_z": 1,
            "typical_p": 1,
            "presence_penalty": 0,
            "frequency_penalty": 0,
            "mirostat": 0,
            "mirostat_tau": 5,
            "mirostat_eta": 0.1,
            "grammar": "",
            "n_probs": 0,
            "image_data": [],
            "cache_prompt": true,
            "slot_id": -1,
        })
    })
    console.log((await response.json()).content)
}

async function health() {
    let response = await fetch("http://127.0.0.1:8080/health", {
        method: 'GET',
    })
    if (response.status !== 200) throw new Error(`Health check failed with status: ${response.status}`);
}

async function main() {
    health()
    prompt()
}

main()