// add i and shortMessage to log object
const formatLog = (log, i) => {
  const newLog = {
    ...log,
    i,
  };

  const shortMessage = log.message.slice(0, 150);
  if (shortMessage === log.message) {
    newLog.shortMessage = log.message;
  } else {
    newLog.shortMessage = `${shortMessage} ...`;
  }

  return newLog;
};

module.exports = { formatLog };
