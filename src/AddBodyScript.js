export const addBodyScript = src => {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    script.type = 'text/javascript';
    script.async = true;
    script.addEventListener("load", () => {
      resolve();
    });
    script.addEventListener("error", (e) => {
      reject(e);
    });
    document.body.appendChild(script);
  });
};