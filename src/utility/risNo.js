
exports.getRISNoYearAndMonth = function() {
   const date = new Date();
   const yearLastDigits = ((date.getFullYear()).toString()).substring(2);
   let monthNo = date.getMonth();
   const monthNoString = monthNo < 10 ? '0' +  (++monthNo).toString(): (++monthNo).toString();
   
   return `${yearLastDigits}-${monthNoString}-`
}

