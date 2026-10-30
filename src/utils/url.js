/**
 * Sanitizes and formats a marketplace URL.
 * Prepends 'https://' if missing, and returns an empty string for invalid/undefined/placeholder-empty URLs.
 * 
 * @param {string} url - The URL to format
 * @returns {string} The formatted URL or empty string
 */
export const formatMarketplaceUrl = (url) => {
  if (!url) return '';

  const trimmed = String(url).trim();
  if (
    !trimmed ||
    trimmed.toLowerCase() === 'undefined' ||
    trimmed.toLowerCase() === 'null' ||
    trimmed === '#'
  ) {
    return '';
  }

  // If it's already a complete URL with protocol, return it
  let formatted = trimmed;
  if (/^https?:\/\//i.test(trimmed)) {
    formatted = trimmed;
  } else if (trimmed.startsWith('//')) {
    // If it starts with '//', prepend 'https:'
    formatted = `https:${trimmed}`;
  } else {
    // Otherwise, prepend 'https://'
    formatted = `https://${trimmed}`;
  }

  // Check if it's a base homepage placeholder
  try {
    const urlObj = new URL(formatted);
    const host = urlObj.hostname.toLowerCase();
    const path = urlObj.pathname;
    
    // A bare homepage or a "/cezliar" path is a placeholder, not a product listing.
    const isPlaceholderPath = path === '/' || path === '' || /^\/cezliar\/?$/i.test(path);
    const isAmazonBase = (host === 'amazon.in' || host === 'www.amazon.in') && isPlaceholderPath;
    const isFlipkartBase = (host === 'flipkart.com' || host === 'www.flipkart.com') && isPlaceholderPath;
    
    if (isAmazonBase || isFlipkartBase) {
      return '';
    }
  } catch (e) {
    // ignore
  }

  return formatted;
};
