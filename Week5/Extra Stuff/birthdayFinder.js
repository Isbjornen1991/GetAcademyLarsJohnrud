/**
 * Calculates the time remaining until a target birthday.
 * @param {number} month - Birthday month (1 - 12)
 * @param {number} day - Birthday day of the month (1 - 31)
 * @returns {object} Object containing days, hours, minutes, seconds, or a status string.
 */
function getTimeUntilBirthday(month, day) {
  const now = new Date();
  
  // Create a Date object for this year's birthday at midnight
  const currentYear = now.getFullYear();
  let nextBirthday = new Date(currentYear, month - 1, day);

  // If the birthday has already passed this year, set it for next year
  if (now > nextBirthday) {
    nextBirthday.setFullYear(currentYear + 1);
  }

  // Difference in milliseconds
  const diffMs = nextBirthday - now;

  // Is today their birthday? (Less than 24h left and same calendar day)
  const isToday = now.getMonth() === month - 1 && now.getDate() === day;
  if (isToday) {
    return { isToday: true, message: "It's today! 🎉" };
  }

  // Convert milliseconds into days, hours, minutes, and seconds
  const seconds = Math.floor((diffMs / 1000) % 60);
  const minutes = Math.floor((diffMs / (1000 * 60)) % 60);
  const hours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  return { isToday: false, days, hours, minutes, seconds };
}

// --- Example Usage ---
// Example: Birthday on October 15th
const countdown = getTimeUntilBirthday(10, 15);

if (countdown.isToday) {
  console.log(countdown.message);
} else {
  console.log(
    `Time left: ${countdown.days}d ${countdown.hours}h ${countdown.minutes}m ${countdown.seconds}s`
  );
}