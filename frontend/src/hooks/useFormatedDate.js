function formatTimeAgo(emailTimestamp) {
  const now = new Date();
  const emailDate = new Date(emailTimestamp);

  const timeDiff = now - emailDate;
  const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

  const sameDayFormatter = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric",
  });

  const fullDateFormatter = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  if (daysDiff === 0) {
    return sameDayFormatter.format(emailDate);
  } else if (daysDiff === 1) {
    return "Yesterday";
  } else if (daysDiff < 7) {
    return `${daysDiff} days ago`;
  } else {
    return fullDateFormatter.format(emailDate);
  }
}

export default formatTimeAgo;
