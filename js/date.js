const getDate = (date) => {
  if (date == 1 || date == 21 || date == 31) {

    return `${date}st`;

  } else if (date == 2 || date == 22) {

    return `${date}nd`;

  } else if (date == 3 || date == 23) {

    return `${date}rd`;

  } else if (date >= 4 && date <= 20) {

    return `${date}th`;

  } else if (date >= 24) {

    return `${date}th`;

  }

}
const getMonth = (month) => {
  let monthNames = ["January", "Febuary", "March", 'April', "May", "June", "July", "August", "September", "October", "November", "December"];
  return monthNames[month - 1];
}

console.log(getMonth(5));