const sleep = t => {
  if (!t) return false;
  t = Number(t)
  return new Promise(rs => {
    setTimeout(rs, Math.abs(t));
  });
};

module.exports = sleep;
