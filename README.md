# Efficient Language Model Personal Viability Benchmarking
> Simple, Opinionated benchmark for testing the viability of Efficient Language Models (ELMs) for personal use cases.
>
> Uses [bun](https://bun.sh/), [promptfoo](https://promptfoo.dev/), and [ollama](https://ollama.com/) for a minimalist, cross-platform, local LLM prompt testing & benchmarking experience.

![Zero Cost Prompts](./imgs/zero-cost-prompts.png)

## Setup
- [Install Bun](https://bun.sh/docs/installation#macos-and-linux)
- [Install Ollama](https://ollama.com/download)
  - [Install llama3](https://ollama.com/library/llama3) `ollama run llama3`
  - [Install phi3](https://ollama.com/library/phi3) `ollama run phi3`
  - [Install gemma](https://ollama.com/library/gemma) `ollama run gemma`
- Setup .env variables
  - `cp .env.sample .env`
  - Add your OpenAI API key to the .env file
- Install dependencies: `bun i`
- Run the minimal tests: `bun minimal`
- Open test viewer: `bun view`
- Run the ELM-ITV tests: `bun elm`

## Guide
- First, [watch the video](https://youtu.be/sb9wSWeOPI4) where we walk through ELMs and this codebase.
- To get started take a look at `BENCH__minimal_test_suite/` to get an idea of how to structure a basic test suite.
- Next take a look at the `BENCH__efficient_language_models/` test suite to get an idea of how you can setup tests for your own viability tests for ELMs.
- Explore other [ollama based models](https://promptfoo.dev/docs/providers/ollama) you can test
  - Or [OpenAI models](https://promptfoo.dev/docs/providers/openai)
  - Or [Anthropic models](https://promptfoo.dev/docs/providers/anthropic)
  - Or [Groq models](https://promptfoo.dev/docs/providers/groq)
- Modify the `BENCH__minimal_test_suite/` or `BENCH__efficient_language_models/` to suit your needs
- Create a new test with the [Create a new test suite](#scripts) script

## Folder Structure
- `/BENCH__<name of test suite>`
  - `/prompt.txt` - the prompt(s) to test
  - `/test.yaml` - variables and assertions
  - `/promptfooconfig.yaml` - llm model config

## Scripts
- Create a new test suite: `bun run ./scripts/new_prompt_test`
- Run a test prompt against a running ollama server `bun run ./scripts/ollama_local_model_call`

## Resources
- Ollama model library
  - https://ollama.com/library
- LMSYS Chatbot Arena Leaderboard
  - https://huggingface.co/spaces/lmsys/chatbot-arena-leaderboard
- Ollama api.md docs
  - https://github.com/ollama/ollama/blob/main/docs/api.md#generate-a-chat-completion
- Promptfoo Ollama Provider
  - https://promptfoo.dev/docs/providers/ollama
- Promptfoo LLM Providers
  - https://www.promptfoo.dev/docs/providers
- Promptfoo Assertions
  - https://www.promptfoo.dev/docs/configuration/expected-outputs/