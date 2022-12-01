/* Start WebP Supported */
const browserSupportsWebP = () => {
  return new Promise((resolve, reject) => {
    const webpTestImages = {
      lossy: "UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",
      lossless: "UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==",
      alpha: "UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAARBxAR/Q9ERP8DAABWUDggGAAAABQBAJ0BKgEAAQAAAP4AAA3AAP7mtQAAAA==",
      animation: "UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA"
    };

    for (const key in webpTestImages) {
      if (webpTestImages.hasOwnProperty(key)) {
        const img = new Image();
        img.onerror = () => {
          reject();
        };
        img.src = "data:image/webp;base64," + webpTestImages[key];
      }
    }
  });
};

browserSupportsWebP().catch(() => {
  document.getElementsByTagName('body')[0].classList.add('no-webp');
});
/* End WebP Supported */
