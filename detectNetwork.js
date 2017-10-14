// Given a credit card number, this function should return a string with the 
// name of a network, like 'MasterCard' or 'American Express'
// Example: detectNetwork('343456789012345') should return 'American Express'

// How can you tell one card network from another? Easy! 
// There are two indicators:
//   1. The first few numbers (called the prefix)
//   2. The number of digits in the number (called the length)
//Returns a list of numbers based on min/max of each argument
function list() {
  var arr = [];
  for (var i = 0; i < arguments.length; i++) {
    for (var j = arguments[i][0]; j <= arguments[i][arguments[i].length-1]; j++) {
      arr.push(j.toString());
    }
  }
  return arr;
}
//listCriteria([12, 16]);

//Returns true if cardNumber prefix matches any on list
function checkPrefix(cardNumber, list) {
  for (var i = 0; i < list.length; i++) {
    var prefix = cardNumber.split('');
    prefix = prefix.splice(0, list[i].length);
    prefix = prefix.join('');
    if (prefix === list[i]) {
      return true;
    }
  }
  return false;
}
//checkPrefix('101111111111',listCriteria([10,19],[35]));

//Returns true if cardNumber length matches any on list
function checkLength(cardNumber, list) {
  for (var i = 0; i < list.length; i++) {
    if (cardNumber.length === Number(list[i])) {
      return true;
    }
  }
  return false;
}
//checkLength('101111111111', listCriteria([12, 16]));

//Compares cardNumber to prefix/length lists for each network
function detectNetwork(cardNumber) {
  //Diner's Club prefix 38,39 length 14
  if (checkPrefix(cardNumber, list([38,39])) && checkLength(cardNumber, list([14]))) {
    return 'Diner\'s Club';
  //American Express prefix 34, 37 length 15
  } else if (checkPrefix(cardNumber, list([34],[37])) && checkLength(cardNumber, list([15]))) {
    return 'American Express';
  //Visa prefix 4, length 13, 16, 19
  } else if (checkPrefix(cardNumber, list([4903],[4905],[4911],[4936],[564182],[633110],[6333],[6759])) && checkLength(cardNumber, list([16],[18],[19]))) {
    return 'Switch';
  //MasterCard 51-55, 16
  } else if (checkPrefix(cardNumber, list([51, 55])) && checkLength(cardNumber, list([16]))) {
    return 'MasterCard';
  //Discover: prefix 6011, 644-649, 65 length 16, 19
  } else if (checkPrefix(cardNumber, list([6011],[644,649],[65])) && checkLength(cardNumber, list([16],[19]))) {
    return 'Discover';
  //Maestro: prefix: 5018, 5020, 5038, 6304 length: 12-19
  } else if (checkPrefix(cardNumber, list([5018],[5020],[5038],[6304])) && checkLength(cardNumber, list([12,19]))) {
    return 'Maestro';
  //China UnionPay prefix: 622126-622925, 624-626, or 6282-6288
  //China length: 16-19
  } else if (checkPrefix(cardNumber, list([622126,622925],[624,626],[6282,6288])) && checkLength(cardNumber, list([16,19]))) {
    return 'China UnionPay';
  //Switch prefix of 4903, 4905, 4911, 4936, 564182, 633110, 6333, or 6759
  //Switch length 16, 18, or 19.
  } else if (checkPrefix(cardNumber, list([4])) && checkLength(cardNumber, list([13],[16],[19]))) {
    return 'Visa';
  } else {
    return 'Card not covered';
  }
}

// The Diner's Club network always starts with a 38 or 39 and is 14 digits long
// The American Express network always starts with a 34 or 37 and is 15 digits long
// Vis network always starts with a 4 and is 13, 16, or 19 digits long
// MasterCard network always starts with a 51, 52, 53, 54, or 55 and is 16 digits long
// Discover always has a prefix of 6011, 644-649, or 65, and a length of 16 or 19
// Maestro always has a prefix of 5018, 5020, 5038, or 6304, and a length of 12-19
