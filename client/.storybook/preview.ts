// .storybook/preview.ts
import "../src/index.css";

declare global {
  interface Window {
    global: any;
  }
}

import type { Preview } from "@storybook/react";

window.global = window.global || {};
window.global.API_ENDPOINT = "http://localhost:5000";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
