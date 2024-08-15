/**
 * This file will automatically be loaded by vite and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/tutorial/application-architecture#main-and-renderer-processes
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.ts` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */

import './cssReset.css';
import './style.css';
import { Builder } from './components/Builder/Builder';
import { DynamicScreenMaker } from './components/Screens/DynamicScreenMaker';

const SHOW_MENU = true;

const showTitleScreen = () => {
  document.addEventListener('DOMContentLoaded', () => {
    const titleContainer = document.getElementById('title-container');

    document
      .querySelector('title-screen')
      ?.addEventListener('start-new-game', () => {
        if (titleContainer) {
          titleContainer.remove();
        }

        DynamicScreenMaker.runBuilt_InitialGameSetup(new Builder());
      });
  });
};

const runGameDirectly = () => {
  document.addEventListener('DOMContentLoaded', () => {
    const titleContainer = document.getElementById('title-container');

    if (titleContainer) titleContainer.remove();

    DynamicScreenMaker.runBuilt_InitialGameSetup(new Builder());
  });
};

SHOW_MENU ? showTitleScreen() : runGameDirectly();
