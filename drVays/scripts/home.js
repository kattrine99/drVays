import { initializeHeader } from './header.js';
import { initializeFooter } from './footer.js';

document.addEventListener("DOMContentLoaded", async () => {
    await includeHTML("[data-include]");

    initializeHeader();
    initializeFooter();});