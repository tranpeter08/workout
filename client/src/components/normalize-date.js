export default function normalizeDate (date) {
  const day = date.getDay();
  const month = date.getMonth();
  const year = date.getFullYear();

  return `${month}/${day}/${year}`
}