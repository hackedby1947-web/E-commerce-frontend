/**
 * Cloudinary image optimization utility
 * Automatically converts images to WebP and resizes them
 */

/**
 * @param {string} url - Cloudinary image URL
 * @param {object} options
 * @param {number} options.width - desired width (default: 400)
 * @param {string} options.quality - image quality: auto/eco/good/best (default: auto)
 */
export function optimizeImage(url, { width = 400, quality = 'auto' } = {}) {
  if (!url || !url.includes('cloudinary.com')) return url;
  return url.replace('/upload/', `/upload/f_auto,q_${quality},w_${width},c_limit/`);
}

// Product list/grid এ use করুন (ছোট, দ্রুত)
export function thumbImage(url) {
  return optimizeImage(url, { width: 400, quality: 'auto' });
}

// Product detail page এ use করুন (বড়, ভালো quality)
export function detailImage(url) {
  return optimizeImage(url, { width: 800, quality: 'best' });
}
