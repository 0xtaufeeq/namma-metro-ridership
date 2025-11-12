
export async function handle({ event, resolve }) {
  const analyticsId = "blr-metro-ridership";
  // Get base URL from environment or use empty string for root
  const baseUrl = import.meta.env.VERCEL_URL 
    ? `https://${import.meta.env.VERCEL_URL}` 
    : '';
  
  if (import.meta.env.PROD && analyticsId) {
    event.locals.analyticsID = analyticsId;
    event.locals.baseUrl = baseUrl;
  }

  return resolve(event, {
    transformPageChunk: ({ html }) => {
      return html
        .replace('%baseURL%', event.locals.baseUrl || '')
        .replace('%analyticsID%', event.locals.analyticsID || '');
    }
  });
}