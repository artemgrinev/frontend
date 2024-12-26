export const clientLogger = {
  log: (message) => console.log(`[CLIENT] ${message}`),
  info: (message) => console.info(`[CLIENT] ${message}`),
  warn: (message) => console.warn(`[CLIENT] ${message}`),
  error: (message) => console.error(`[CLIENT] ${message}`),
};
