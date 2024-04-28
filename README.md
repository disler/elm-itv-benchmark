# Efficient Language Model Personal Viability Benchmarking
> Simple, Opinionated benchmark for testing the viability of Efficient Language Models (ELMs) for personal use cases.
>
> Uses [bun](https://bun.sh/), [promptfoo](https://promptfoo.dev/), and [ollama](https://ollama.com/) for a minimalist, cross-platform, local LLM prompt testing & benchmarking experience.

## Setup
- [Install Bun](https://bun.sh/docs/installation#macos-and-linux)
- [Install Ollama](https://ollama.com/download)
  - [Install llama3](https://ollama.com/library/llama3) `ollama run llama3`
  - [Install phi3](https://ollama.com/library/phi3) `ollama run phi3`
  - [Install gemma](https://ollama.com/library/gemma) `ollama run gemma`
- Install dependencies: `bun i`
- Run ELM tests: `bun elm`
- Open test viewer: `bun view`

## Folder Structure
- `/BENCH__<name of test suite>`
  - `/prompt.txt` - the prompt(s) to test
  - `/test.yaml` - variables and assertions
  - `/promptfooconfig.yaml` - llm model config

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