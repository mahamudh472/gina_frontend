const EXTENSION_ATTRS = ["bis_skin_checked"];

function removeExtensionAttrs(root: ParentNode = document) {
  for (const attr of EXTENSION_ATTRS) {
    root.querySelectorAll(`[${attr}]`).forEach((element) => {
      element.removeAttribute(attr);
    });
  }
}

try {
  removeExtensionAttrs();
} catch {
  // Browser extensions can mutate markup before React hydrates. If cleanup fails,
  // hydration should still continue with Next's normal error handling.
}
