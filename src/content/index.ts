import { ImageProcessor } from "./imageProcessor";

const imageProcessor = new ImageProcessor();
let observer: MutationObserver | null = null;

// Função para processar todas as mídias
const processAllMedia = () => {
  console.log("Processando todas as mídias...");
  imageProcessor.blurImages();
};

// Função para inicializar o observer com segurança
const setupObserver = () => {
  // Verifica se document.body existe
  if (!document.body) {
    console.log("document.body ainda não está disponível, aguardando...");
    // Tenta novamente em 50ms
    setTimeout(setupObserver, 50);
    return;
  }

  // Se o observer já foi criado, não crie outro
  if (observer) return;

  console.log("Configurando observer no document.body");

  // Cria o observer
  observer = new MutationObserver(() => {
    // Usa setTimeout para evitar chamadas muito frequentes
    if (!processingTimeout) {
      processingTimeout = setTimeout(() => {
        processAllMedia();
        processingTimeout = null;
      }, 200);
    }
  });

  // Inicia a observação
  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: false, // Reduzimos as notificações para melhorar performance
  });
};

// Controle para evitar processamentos redundantes
let processingTimeout: ReturnType<typeof setTimeout> | null = null;

// Chama quando o DOM começa a ser carregado
document.addEventListener("DOMContentLoaded", () => {
  processAllMedia();
  setupObserver();
});

// Chama quando a página termina de carregar completamente
window.addEventListener("load", () => {
  processAllMedia();
  setupObserver();
});

// Escuta mensagens do background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "applyBlur") {
    processAllMedia();
    sendResponse({ status: "success" });
  }
});

// Tenta configurar o observer imediatamente
// mas só se o documento já estiver em um estado avançado de carregamento
if (document.readyState !== "loading") {
  console.log("Documento já em carregamento, tentando configurar observer");
  setupObserver();
}

// Processa elementos já presentes se possível
if (document.documentElement) {
  console.log("Processando elementos iniciais");
  processAllMedia();
}
