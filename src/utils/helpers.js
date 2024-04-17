export function formatDate(dateStr) {
  return new Intl.DateTimeFormat('en', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(dateStr));
}

export function formatDateShort(dateStr) {
  return new Intl.DateTimeFormat('en', {
    year : "numeric",
    day: '2-digit',
    month: 'numeric',

  }).format(new Date(dateStr));
}
