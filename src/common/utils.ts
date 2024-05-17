export function generateUniqueId() {
  const timestamp = new Date().getTime().toString().slice(-6);
  const randomNum = Math.floor(Math.random() * 90) + 10;
  return parseInt(timestamp + randomNum);
}

export function getCurrentTimeAndDate({
  isSecond = false,
}: { isSecond?: boolean } = {}) {
  const currentDate = new Date();

  let hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const seconds = currentDate.getSeconds();

  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;

  const paddedMinutes = minutes < 10 ? '0' + minutes : minutes;
  const paddedSeconds = seconds < 10 ? '0' + seconds : seconds;

  const date = currentDate.getDate();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();

  const formattedDate = `${date < 10 ? '0' + date : date}.${month < 10 ? '0' + month : month}.${year}`;

  let formattedTimeAndDate = `${hours}:${paddedMinutes} ${ampm} ${formattedDate}`;

  if (isSecond) {
    formattedTimeAndDate = `${hours}:${paddedMinutes}:${paddedSeconds} ${ampm} ${formattedDate}`;
  }

  return formattedTimeAndDate;
}
