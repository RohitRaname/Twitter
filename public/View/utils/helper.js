export const try_catch =
  (fn) =>
  async (...args) => {
    try {
      return await fn(...args);
    } catch (err) {
      throw err;
    }
  };

export const readable_time = (date) => {
  const date_rec = new Date(date);

  const no_of_days = new Date().getDate() - date_rec.getDate();
  if (no_of_days === 0) {
    const ms = new Date() - date_rec;
    const hour = Math.floor(ms / (1000 * 60 * 60));
    if (hour > 0) return `${hour}h`;
    const min = Math.floor((ms % (1000 * 60 * 60)) / (60 * 1000));
    return `${min}m`;
  }

  // no_of_days === 0
  // ? new Intl.DateTimeFormat('en-US', {
  //     weekday: 'short',
  //     hour: 'numeric',
  //     minute: 'numeric',
  //     timeZoneName: 'short',
  //   })
  //     .format(new Date(date_rec))
  //     .split(' ')
  //     .slice(0, 3)
  //     .join(' ')

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
  }).format(new Date(date_rec));
};
