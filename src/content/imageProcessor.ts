export class ImageProcessor {
  constructor() {
    console.log("ImageProcessor iniciado");
  }

  identifyMedia() {
    // Seletores específicos para o site
    const selectors = [
      "img",
      "video",
      'div[style*="background-image"]',
      "div.last-videos-link",
      "div.kvfysmfp",
      "canvas.sl-safe-watermark",
      "div.sl-safe-glass",
      ".video-js",
      'div[style*="background-url"]',
      // Novos seletores para posts
      "canvas.ufhsfnkm",
      "canvas.sc-ktPPKK",
      "canvas.izXBxH",
      '[data-testid="post-display-imagePostDiv"] canvas',
      ".sc-eqUAAy canvas",
      ".sc-YysOf canvas",
    ];

    return document.querySelectorAll(selectors.join(","));
  }

  applyBlur(element: Element) {
    console.log("Aplicando blur em:", element);

    // Aplica blur com CSS mais agressivo
    const blurStyle = `
      filter: blur(20px) !important;
      -webkit-filter: blur(20px) !important;
      transform: scale(1.05);
      transition: none !important;
    `;

    if (element instanceof HTMLCanvasElement) {
      const wrapper = document.createElement("div");
      wrapper.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        ${blurStyle}
        z-index: 9999;
      `;
      element.parentElement?.appendChild(wrapper);
    } else if (
      element.classList &&
      element.classList.contains("last-videos-link")
    ) {
      element.setAttribute(
        "style",
        (element.getAttribute("style") || "") + ";" + blurStyle
      );
    } else if (
      element.classList &&
      element.classList.contains("sl-safe-glass")
    ) {
      element.setAttribute("style", blurStyle);
    } else if (element instanceof HTMLElement) {
      element.style.cssText += blurStyle;
    }
  }

  blurImages() {
    const mediaElements = this.identifyMedia();
    console.log(`Encontrados ${mediaElements.length} elementos de mídia`);

    mediaElements.forEach((element) => {
      this.applyBlur(element);
    });

    // Removemos o MutationObserver daqui para evitar conflitos
    // O observer agora está apenas no index.ts
  }

  getSelectors(): string {
    return 'img, video, div[style*="background-image"], div.last-videos-link, canvas.sl-safe-watermark, div.sl-safe-glass, .video-js, div[style*="background-url"]';
  }
}
