# README.md

# Browser Image Blur Extension

Esta extensão de navegador identifica imagens em páginas da web e aplica um efeito de desfoque utilizando um modelo de linguagem local (LLM). 

## Estrutura do Projeto

- **src/background.ts**: Ponto de entrada da extensão, gerencia eventos de fundo e comunicação entre partes da extensão.
- **src/content/imageProcessor.ts**: Contém a classe `ImageProcessor` para identificar e aplicar desfoque nas imagens.
- **src/content/index.ts**: Injeta o script de conteúdo na página e inicializa o `ImageProcessor`.
- **src/models/llmHandler.ts**: Gerencia a interação com o modelo de linguagem local.
- **src/utils/helpers.ts**: Funções utilitárias para manipulação de imagens e formatação de dados.

## Instalação

1. Clone o repositório:
   ```
   git clone <URL do repositório>
   ```
2. Navegue até o diretório do projeto:
   ```
   cd browser-image-blur
   ```
3. Instale as dependências:
   ```
   npm install
   ```

## Uso

1. Carregue a extensão no seu navegador (Chrome/Firefox) através das configurações de extensões.
2. Acesse uma página com imagens e a extensão aplicará automaticamente o desfoque.

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir um pull request ou relatar problemas.

## Licença

Este projeto está licenciado sob a MIT License.