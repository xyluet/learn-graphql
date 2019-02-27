module.exports = {
  now: db => db.fn.now(),
  nowAndUpdateNow: db => db.raw(`CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`),
};
