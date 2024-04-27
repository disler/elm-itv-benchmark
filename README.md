# Efficient Language Model Personal Viability Benchmarking
> Simple, Opinionated benchmark for testing the viability of Efficient Language Models (ELMs) for personal use cases.
>
> Utilizes promptfoo & ollama for prompt testing & benchmarking.

## Setup
- [Install Bun](https://bun.sh/docs/installation#macos-and-linux)
- Install dependencies: `bun i`
- Run ELM tests: `bun elm`
- Open test viewer: `bun view`

## Folder Structure
- `/BENCH__<name of test suite>`
  - `/prompt.txt` - the prompt(s) to test
  - `/test.yaml` - variables and assertions
  - `/promptfooconfig.yaml` - llm config

## Resources
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

