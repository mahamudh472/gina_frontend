const EXTENSION_ATTRS = [
  "bis_skin_checked",
  "cz-shortcut-listen",
  "data-gr-ext-installed",
  "data-new-gr-c-s-check-loaded",
];

function removeExtensionAttrs() {
  if (typeof window === "undefined" || !document) return;

  for (const attr of EXTENSION_ATTRS) {
    try {
      document.querySelectorAll(`[${attr}]`).forEach((element) => {
        element.removeAttribute(attr);
      });
    } catch {
      // Ignore query selector or permission errors
    }
  }
}

if (typeof window !== "undefined") {
  // Run immediately on module load
  removeExtensionAttrs();

  // Run on DOMContentLoaded just in case
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", removeExtensionAttrs);
  }

  // Run on load event
  window.addEventListener("load", removeExtensionAttrs);
}

