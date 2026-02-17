/**
 * Format bytes to human-readable file size
 * @param {number} bytes - File size in bytes
 * @returns {string} Formatted file size (e.g., "2.5 MB")
 */
export function formatFileSize(bytes) {
  if (!bytes || bytes === 0) return "0 B";

  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
}

/**
 * Get file format icon emoji
 * @param {string} format - File format (e.g., "CSV", "JSON", "PDF")
 * @returns {string} Icon emoji or empty string
 */
export function getFormatIcon(format) {
  if (!format) return "";

  const formatMap = {
    CSV: "📊",
    JSON: "{}",
    PDF: "📄",
    XLS: "📈",
    XLSX: "📈",
    XML: "🏷️",
    ZIP: "📦",
    TXT: "📝",
    HTML: "🌐",
    API: "🔌",
  };

  return formatMap[format?.toUpperCase()] || "";
}

/**
 * Check if file is previewable
 * @param {string} format - File format
 * @returns {boolean}
 */
export function isPreviewable(format) {
  return ["CSV", "JSON", "TXT", "PDF", "HTML", "XML", "DOCX"].includes(
    format?.toUpperCase(),
  );
}
