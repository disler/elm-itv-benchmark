const OllamaCompletionOptionKeys = new Set([
    'num_predict',
    'top_k',
    'top_p',
    'tfs_z',
    'seed',
    'useNUMA',
    'num_ctx',
    'num_keep',
    'num_batch',
    'num_gqa',
    'num_gpu',
    'main_gpu',
    'low_vram',
    'f16_kv',
    'logits_all',
    'vocab_only',
    'use_mmap',
    'use_mlock',
    'embedding_only',
    'rope_frequency_base',
    'rope_frequency_scale',
    'typical_p',
    'repeat_last_n',
    'temperature',
    'repeat_penalty',
    'presence_penalty',
    'frequency_penalty',
    'mirostat',
    'mirostat_tau',
    'mirostat_eta',
    'penalize_newline',
    'stop',
    'num_thread',
]);

class OllamaChatProvider {
    constructor(options) {

      const { id, config, modelName } = options;
      this.modelName = config.modelName;
      this.config = config || {};
      this.options = options
    }
  
    id() {
      return `ollama:chat:${this.modelName}`;
    }
  
    toString() {
      return `[Ollama Chat Provider ${this.modelName}]`;
    }
  
    async callApi(prompt) {
      const messages = [{ role: 'user', content: prompt }]

      const params = {
        model: this.config.modelName,
        messages,
        stream: false,
        options: Object.keys(this.config).reduce((options, key) => {
          if (OllamaCompletionOptionKeys.has(key)) {
            options[key] = this.config[key];
          }
          return options;
        }, {}),
      };
  
      let response;
      try {
        response = await fetch(
          `${process.env.OLLAMA_BASE_URL || 'http://localhost:11434'}/api/chat`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(params),
          },
        );
      } catch (err) {
        console.log(`err`, err)
        return {
          error: `API call error: ${String(err)}. Output:\n${response?.data}`,
        };
      }


      if (response.status !== 200) {
        return {
          error: `Ollama error: ${response.statusText}`,
        };
      }
      /**
       {
        "model": "llama3",
        "created_at": "2024-04-27T19:26:40.21726Z",
        "message": {
            "role": "assistant",
            "content": "Here is the text converted into bullet points:\n\n- Here's a simple yet powerful idea that can help you take a large step toward useful and valuable agentic "
        },
        "done": true,
        "total_duration": 2610576500,
        "load_duration": 748167,
        "prompt_eval_count": 165,
        "prompt_eval_duration": 300519000,
        "eval_count": 131,
        "eval_duration": 2307267000
        }
       */
      const jsonResponse = await response.json()

    //   console.log(`---------- RES Ollama generate API response: ${JSON.stringify(jsonResponse, null, 2)}`);
  
      try {

        const output = jsonResponse.message.content

        const tokenUsage = {
            total: jsonResponse.prompt_eval_count + jsonResponse.eval_count,
            prompt: jsonResponse.prompt_eval_count,
            completion: jsonResponse.eval_count,
        }

        return {
          output,
          tokenUsage,
        };
      } catch (err) {
        return {
          error: `Ollama API response error: ${String(err)}: ${JSON.stringify(response.data)}`,
        };
      }
    }
  }
  
  module.exports = OllamaChatProvider;

