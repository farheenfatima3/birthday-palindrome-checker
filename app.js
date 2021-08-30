const dateFromUser = document.querySelector("#inputDate");
const checkButton = document.querySelector("#btn")
const out = document.querySelector("#msg")


checkButton.addEventListener("click", input)


function input(str) {
  let dates = dateFromUser.value
  if (dates !== '') {
    var listDate = dates.split('-')
    // converting date to object as we kept are function to accept date as object
    var date = {
      day: Number(listDate[2]),
      month: Number(listDate[1]),
      year: Number(listDate[0])
    }
    var isPalindrome = findPalindrome(date)
    if (isPalindrome) {
      out.innerText = "Yay! Your birthday is a palindrome."
      out.style.color = "#6D28D9"
    } else {
      var [count, nextDate] = getNextPalindrome(date)
      var [count1, prev] = findPrevPalindrome(date)

      if (count > count1) {
        out.innerText = `Its not a palindrome date☹️. Nearest palindrome date is ${prev.day}/${prev.month}/${prev.year} which is ${count1} days before your birthday.🎉`
        out.style.color = "red"
      } else {
        out.innerText = `Its not a palindrome date☹️. Nearest palindrome date is ${nextDate.day}/${nextDate.month}/${nextDate.year} which is ${count} days after your birthday.🎉`
        out.style.color = "red"
      }
    }
  }
}

// takes string split it in order to reverse a string and then join return true if passed string is equal to reversed string
function reverseStr(str) {
  let a = str.split('').reverse('').join('')

  return str == a
}

// convert date which is number to string so that we can join them and check for palindrome
function convertToString(date) {
  let newDate = {
    day: '',
    month: '',
    year: ''
  }
  // we are adding 0 because 02022020 is a palindrome now if we keep date and month without adding 0 in start it becomes 
  // 222020 reverse 020222 which do not match and we will not get dates lyk this palindrome
  if (date.day < 10) {
    newDate.day = '0' + date.day
  } else {
    newDate.day = date.day.toString()
  }
  if (date.month < 10) {
    newDate.month = '0' + date.month
  } else {
    newDate.month = date.month.toString()
  }
  newDate.year = date.year.toString()


  return newDate
}

function format(date) {
  // date converted into string is stored in formatDate variable and concatinated with different formats
  var formatDate = convertToString(date)

  var yyyyddmm = formatDate.year + formatDate.day + formatDate.month
  var ddmmyyyy = formatDate.day + formatDate.month + formatDate.year
  var mmddyyyy = formatDate.month + formatDate.day + formatDate.year
  var ddmmyy = formatDate.day + formatDate.month + formatDate.year.slice(-2)
  var mmddyy = formatDate.month + formatDate.day + formatDate.year.slice(-2)
  var yymmdd = formatDate.year.slice(-2) + formatDate.month + formatDate.day

  return [yyyyddmm, ddmmyyyy, mmddyyyy, ddmmyy, mmddyy, yymmdd]
}

function findPalindrome(date) {
  // output of format(date) which is array is stored in dates variable
  var dates = format(date)

  let bol = false
// now we will send the date of each format to check if it is palindrome or not to reverseStr() function
  for (let i = 0; i < dates.length; i++) {

    if (reverseStr(dates[i])) {

      bol = true

    }
  }

  return bol
}

// handle leap year 
function leap(year) {
  if (year % 400 == 0) {
    return true
  }
  if (year % 4 === 0) {
    return true
  }
  return false;
}


function nextPalindrome(date) {
// this function is to increase date by 1 till next palindrome date is met
  var day = date.day + 1;
  var month = date.month;
  var year = date.year;
  // each months last date
  var limitDate = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

  // as in leap year feb have 29 days,  pass year to function by leap(year) function call
  // so we say only if its a leap year then after 29 day =1 or in feb after 28 day becomes 1
  if (month == 2) {
    if (leap(year)) {
      if (day > 29) {
        day = 1;
        month++
      }
    } else {
      if (day > 28) {
        day = 1;
        month++
      }
    }
  }

// here we say if day is greater than limitDate[month-1] as the index of array starts from 0
// like if month is march and day is now 32 this if statement checkes 32>limitDate[3-1]==>32>31 so it makes day=1
  if (day > limitDate[month - 1]) {
    day = 1;
    month++
  }
  
  if (month > 12) {
    month = 1;
    year++
  }
  return {
    day: day,
    month: month,
    year: year
  }

}


// this function is to check next palindrome date
function getNextPalindrome(date) {
  // increased date stored in variable nextDate
  var nextDate = nextPalindrome(date);
  var count = 0
  while (true) {
    // every time count increase when date enters while loop
    count++
    // send this increased date to main function to check for palindrome
    var pal = findPalindrome(nextDate)
    // if the any date found to be true then returning count and that date
    if (pal) {
      return [count, nextDate]


    }
    // else part if palindrome not found it is again send to increase the date and comes to this function and repeats above steps till found
    nextDate = nextPalindrome(nextDate)
  }

}


// this function is to decrease date by 1
function previousPalindrome(date) {

  var day = date.day - 1;
  var month = date.month;
  var year = date.year

  var limitDate = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

  if (day == 0) {
    month--


    if (month == 0) {
      month = 12;
      day = 31;
      year--
    } else if (month == 2) {
      if (leap(year)) {
        day = 29;
      } else {
        day = 28;
      }
    } else {
      day = limitDate[month - 1]
    }
  }
  return {
    day: day,
    month: month,
    year: year
  }

}


// function to find previous palindrome date
function findPrevPalindrome(date) {
  var prev = previousPalindrome(date)
  let count1 = 0;
  while (true) {
    count1++;
    var nextP = findPalindrome(prev)

    if (nextP) {

      return [count1, prev]
    }

    prev = previousPalindrome(prev)

  }
}