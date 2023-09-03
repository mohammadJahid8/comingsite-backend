const pick = (obj, keys) => {
  const finalObj = {};

  // console.log(obj);
  for (const key of keys) {
    if (obj && Object.hasOwnProperty.call(obj, key)) {
      finalObj[key] = obj[key];
    }
  }

  return finalObj;
};

export default pick;
