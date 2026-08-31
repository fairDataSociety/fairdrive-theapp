// fdp-storage assigns to globalThis.crypto at module-load time.
// In Node 20+, globalThis.crypto is a read-only getter — make it writable first.
// Loaded via NODE_OPTIONS=--require so it runs in every child process, including
// Next.js page-data collection workers. Remove once fdp-storage is replaced.
if (typeof globalThis.crypto !== 'undefined') {
  try {
    Object.defineProperty(globalThis, 'crypto', {
      value: globalThis.crypto,
      writable: true,
      configurable: true,
    });
  } catch (_) {}
}
