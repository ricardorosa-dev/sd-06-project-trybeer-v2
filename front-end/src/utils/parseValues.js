const parseCartPrice = (cartPrice) => {
  // console.log(cartPrice)
  const roundedNumber = (Math.round(cartPrice * 100) / 100).toFixed(2);
  const parsedNumber = roundedNumber.toString().replace('.', ',');
  const numberWith$ = `R$ ${parsedNumber}`;
  return numberWith$;
};

const correctDate = (date) => {
  // const eight = 8;
  // const fourteen = 14;
  // const five = 5;
  // const seventeen = 17;
  // const day = date.slice(eight, -fourteen);
  // const month = date.slice(five, -seventeen);
  // const data = `${day}/${month}`;
  // return data;
  return date.toISOString();
};

module.exports = {
  parseCartPrice,
  correctDate,
};
