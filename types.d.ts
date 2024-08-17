export interface IElectronAPI {
  quitApp: () => Promise<void>;
}

declare global {
  module '*.webp';
  interface Window {
    electronAPI: IElectronAPI;
  }
}
