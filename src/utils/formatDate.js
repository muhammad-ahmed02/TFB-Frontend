
  // eslint-disable-next-line
  const addZeroBeforeNum = (num) => {
    // eslint-disable-next-line
    return `${parseInt(num) < 10 ? '0' + num : num}`;
  };

  export const convertDateTimeObject = (date) => {
    const datetime = `${new Date(date).toDateString()} ${addZeroBeforeNum(
      new Date(date).getHours()
    )}:${addZeroBeforeNum(new Date(date).getMinutes())}:${addZeroBeforeNum(new Date(date).getSeconds())}`;
    return datetime;
  };