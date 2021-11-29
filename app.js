const bdate = document.querySelector("#birthday")
const submit = document.querySelector("#submit")
const result = document.querySelector("#result")
console.log(bdate, submit, result);

function palindrome(val) {
    var rev = "";
    for (let index = (val.length) - 1; index >= 0; index--) {
        rev += val.charAt(index);
    }
    return val == rev ? true : false;
}

function formatDate(date) {
    //Formatting date object into this format:
    //{day: '05', month: '11', year: '2021'}
    var formattedDate = {
        day: '',
        month: '',
        year: ''
    }
    formattedDate.day = date.getDate(); //Getting the day from 1-31

    formattedDate.month = date.getMonth() + 1; //+1 because this function returns from 0 - 11 months

    formattedDate.year = date.getFullYear(); //Getting the full year
    //Converting date into string as we need to check for palindrome
    if (formattedDate.day < 10) {
        formattedDate.day = "0" + formattedDate.day;
    } else {
        formattedDate.day = formattedDate.day.toString();
    }
    if (formattedDate.month < 10) {
        formattedDate.month = "0" + formattedDate.month;
    } else {
        formattedDate.month = formattedDate.month.toString();
    }
    formattedDate.year = formattedDate.year.toString();
    return formattedDate;
}

function getVariations(dateStr) {
    //Return all variations of a date
    // DD-MM-YYYY
    // MM-DD-YYYY
    // YYYY-MM-DD
    // DD-MM-YY
    // MM-DD-YY
    // YY-MM-DD

    var variations = [];
    var day = dateStr.day;
    var month = dateStr.month;
    var year = dateStr.year;

    variations.push(day + month + year);
    variations.push(month + day + year);
    variations.push(year + month + day);
    variations.push(day + month + year.substring(2));
    variations.push(month + day + year.substring(2));
    variations.push(year.substring(2) + month + day);
    return variations;
}

function checkPalindromeForDate(dateStr) {
    //Format date to str:
    // var dateStr = formatDate(date);
    console.log("Datestr: "+dateStr)
    //Getting variations
    var variations = getVariations(dateStr);
    //Checking palindrome for all date formats
    //Break loop even if one format is a palindrome
    var flag = false
    for (let index = 0; index < variations.length; index++) {
        if (palindrome(variations[index])) {
            flag = true;
            break;
        }
    }
    return flag;
}

function isLeapYear(year) {
    //checking if year is leap year
    if (year % 400 == 0) {
        return true;
    }
    if (year % 100 == 0) {
        return false;
    }
    if (year % 4 == 0) {
        return true;
    }
    return false;
}


function getNextDate(date) {
    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    var day = date.getDate();
    var month = date.getMonth()+1; // because of 0 indexing 
    var year = date.getFullYear();
    var isleap = isLeapYear(year)
    if (month == 2) { //ie current month is Feb, then check for leap year
        if (isleap) {
            daysInMonth[1] = 29;
        }
    }
    if (day > 27) {
        nextDay = (day % daysInMonth[month - 1] )+1;
        if(nextDay==1)
        {
            month++;
            {
                if (month > 12) {
                    month = month % 12;
                    year = year + 1;
                }
            }
        }
    }
    else{
        nextDay = day + 1;
    }
  
    // return{
    //     day: nextDay,
    //     month: month,
    //     year: year
    // }
    dd = new Date(year=year,month=month-1,day=nextDay)
    console.log(dd)
    return dd
}

function getNextPalindrome(date) {
    var ctr=0;
    var nextDate = getNextDate(date);
    while(!checkPalindromeForDate(formatDate(nextDate)))
    {
        nextDate = getNextDate(nextDate);
        ctr++;
    }
    return [nextDate, ctr+1];
}

function checkBirthday() {
    //Converting input date into date object through Date() API
    var date = new Date(bdate.value);

    //Formatting date object to get this format: 
    //{day: '05', month: '11', year: '2021'}
    var dateStr = formatDate(date);
    isPalindrome = checkPalindromeForDate(dateStr);
    result.innerHTML = isPalindrome ? "Your birthday is a palindrome!! 🎉" : "You birthday is not a palindrome. :(";
    if(!isPalindrome){
        var ans = getNextPalindrome(date);
        nextDate = formatDate(ans[0]);
        nextDate = nextDate.day + "-" + nextDate.month + "-" + nextDate.year;
        var text = "Your birthday is not a palindrome. Next Palindrome date is = " + nextDate+ " and you missed it by " + ans[1];
        result.innerHTML = ans[1]==1?text + " day. 😟": text + " days. 😟";
    }
    
}

submit.addEventListener("click", checkBirthday)