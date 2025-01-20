export const formatDate = function (dateString: string) {
  // Split the date string and construct a UTC date
  const [year, month, day] = dateString.split('-').map(Number);
  const date = new Date(Date.UTC(year, month - 1, day)); // Explicit UTC
  console.log({ dateString, date });
  return new Intl.DateTimeFormat('en-US', { month: 'short', year: 'numeric', timeZone: 'UTC' }).format(date);
};
