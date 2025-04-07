import { ImageProcessor } from "./imageProcessor";

const imageProcessor = new ImageProcessor();

// Função para processar todas as mídias
const processAllMedia = () => {
  console.log("Processando todas as mídias...");
  imageProcessor.blurImages();
};

// Executa quando o DOM é carregado
document.addEventListener("DOMContentLoaded", processAllMedia);

// Executa quando a página terminar de carregar completamente
window.addEventListener("load", processAllMedia);

// Observer para mudanças dinâmicas no DOM
const observer = new MutationObserver((mutations) => {
  mutations.forEach(() => {
    processAllMedia();
  });
});

// Inicia o observer
observer.observe(document.body, {
  childList: true,
  subtree: true,
  attributes: true,
  attributeFilter: ["src", "style", "class"],
});

// Escuta mensagens do background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "applyBlur") {
    processAllMedia();
    sendResponse({ status: "success" });
  }
});

// Executa imediatamente para pegar elementos já presentes
processAllMedia();
