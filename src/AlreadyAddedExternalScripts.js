const alreadyAddedExternalScripts = {};

export const isScriptAlreadyAdded = src => alreadyAddedExternalScripts.hasOwnProperty(src);
export const markScriptAsAdded = src => (alreadyAddedExternalScripts[src] = true);
