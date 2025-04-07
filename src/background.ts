import { ImageProcessor } from "./content/imageProcessor";

// Cria uma instância do processador de imagens
const imageProcessor = new ImageProcessor();

// Escuta mensagens do background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "applyBlur") {
    imageProcessor.blurImages(); // Corrigido de blurImage para blurImages
  }
});
