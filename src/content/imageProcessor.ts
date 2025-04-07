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
      "canvas.sl-safe-watermark",
      "div.sl-safe-glass",
      ".video-js",
      'div[style*="background-url"]',
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
    } else if (element.classList.contains("last-videos-link")) {
      element.setAttribute(
        "style",
        element.getAttribute("style") + ";" + blurStyle
      );
    } else if (element.classList.contains("sl-safe-glass")) {
      element.setAttribute("style", blurStyle);
    } else {
      element.setAttribute(
        "style",
        element.getAttribute("style") + ";" + blurStyle
      );
    }
  }

  blurImages() {
    const mediaElements = this.identifyMedia();
    console.log(`Encontrados ${mediaElements.length} elementos de mídia`);

    mediaElements.forEach((element) => {
      this.applyBlur(element);
    });

    // Observer para elementos dinâmicos
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof Element) {
            if (node.matches(this.getSelectors())) {
              this.applyBlur(node);
            }
            node.querySelectorAll(this.getSelectors()).forEach((el) => {
              this.applyBlur(el);
            });
          }
        });
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["src", "style", "class"],
    });
  }

  private getSelectors(): string {
    return 'img, video, div[style*="background-image"], div.last-videos-link, canvas.sl-safe-watermark, div.sl-safe-glass, .video-js, div[style*="background-url"]';
  }
}
