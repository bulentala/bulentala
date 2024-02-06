export const GA_TRACKING_ID: string = process.env.NEXT_PUBLIC_GA_ID as string;

/**
 * Send a pageview event to Google Analytics.
 * @param {string} url - The URL path of the page.
 */
declare global {
  interface Window {
    gtag: (command: string, id: string, config: { page_path: string }) => void;
  }
}
export const pageview = (url: string): void => {
  window.gtag("config", GA_TRACKING_ID, {
    page_path: url,
  });
};

/**
 * Triggers a Google Analytics event.
 * @param {object} data - The event data.
 * @param {string} data.action - The action being tracked.
 * @param {string} data.category - The category of the event.
 * @param {string} data.label - The label for the event.
 * @param {number} data.value - The value associated with the event.
 * @returns {void}
 */
export const event = (data: {
  action: string;
  category: string;
  label: string;
  value: number;
}): void => {
  window.gtag("event", data.action, {
    event_category: data.category,
    event_label: data.label,
    value: data.value,
  });
};
