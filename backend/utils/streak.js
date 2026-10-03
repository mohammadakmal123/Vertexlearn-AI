// Computes a real day-based learning streak, based on when the user was
// last active. This is genuine data derived from login activity, not a
// placeholder number.
function startOfDay(date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

function updateStreak(user) {
  const today = startOfDay(new Date());
  if (!user.lastActiveAt) {
    user.streakDays = 1;
  } else {
    const last = startOfDay(user.lastActiveAt);
    const diffDays = Math.round((today - last) / (1000 * 60 * 60 * 24));
    if (diffDays === 0) {
      // already counted today, no change
    } else if (diffDays === 1) {
      user.streakDays = (user.streakDays || 0) + 1;
    } else {
      user.streakDays = 1; // streak broken, restart
    }
  }
  user.lastActiveAt = new Date();
  return user;
}

module.exports = { updateStreak };
