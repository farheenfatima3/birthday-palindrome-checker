const dateFromUser=document.querySelector("#inputDate");
const checkButton=document.querySelector("#btn")
const out=document.querySelector("#msg")


checkButton.addEventListener("click", input)


function input(str){
    let dates=dateFromUser.value
    if(dates!==''){
        var listDate=dates.split('-')
        var date={
            day:Number(listDate[2]),
            month:Number(listDate[1]),
            year:Number(listDate[0])
            }
            var isPalindrome=findPalindrome(date)
            if(isPalindrome){
                out.innerText="Yay! Your birthday is a palindrome."
                out.style.color="#6D28D9"
            }else{
                var [count,nextDate]=getNextPalindrome(date)
                var [count1,prev]=findPrevPalindrome(date)

                if(count>count1){
                    out.innerText=`Its not a palindrome date☹️. Nearest palindrome date is ${prev.day}/${prev.month}/${prev.year} which is ${count1} days before your birthday.🎉`
                    out.style.color="red"
                }else{
                out.innerText=`Its not a palindrome date☹️. Nearest palindrome date is ${nextDate.day}/${nextDate.month}/${nextDate.year} which is ${count} days after your birthday.🎉`
                out.style.color="red"
            }
        }
        }
    }

    function reverseStr(str){
        let a=str.split('').reverse('').join('')
        
        return str==a
      }


      function convertToString(date){
        let newDate={day:'',month:'',year:''}
        if(date.day<10){
          newDate.day='0'+date.day
        }else{
          newDate.day=date.day.toString()
        }
        if(date.month<10){
          newDate.month='0'+date.month
        }else{
          newDate.month=date.month.toString()
        }
      newDate.year=date.year.toString()
      
      
        return newDate
      }

      function format(date){
        var formatDate=convertToString(date)
        var yyyyddmm=formatDate.year+formatDate.day+formatDate.month
        var ddmmyyyy=formatDate.day+formatDate.month+formatDate.year
        var mmddyyyy=formatDate.month+formatDate.day+formatDate.year
        var ddmmyy=formatDate.day+formatDate.month+formatDate.year.slice(-2)
      var mmddyy=formatDate.month+formatDate.day+formatDate.year.slice(-2)
      var yymmdd=formatDate.year.slice(-2)+formatDate.month+formatDate.day
      
         return [yyyyddmm,ddmmyyyy,mmddyyyy,ddmmyy,mmddyy,yymmdd]
      }
      function findPalindrome(date){
        var dates=format(date)
      
        let bol=false
      
        for(let i=0;i<dates.length;i++){
            
          if(reverseStr(dates[i])){
             
            bol=true
           
          }
        }  
          
        return bol
      }

      function leap(year){
        if(year%400==0){
          return true
        }
        if(year%4===0){
          return true
        }return false;
      }
      
      
      function nextPalindrome(date){
       
        var day=date.day+1;
        var month=date.month;
        var year=date.year;
        var limitDate=[31,28,31,30,31,30,31,31,30,31,30,31]
        
      if(month==2){
      if(leap(year)){
      if(day>29){
        day=1;
        month++
      }
      }else{
        if(day>28){
          day=1;
          month++
        }
      }
      }
      if(day>limitDate[month-1]){
      day=1;
      month++
      }
      if(month>12){
        month=1;
        year++
      }
      return {day:day,month:month,year:year}
        
      }
      
      function getNextPalindrome(date){
        var nextDate= nextPalindrome(date);
        var count=0
        while(true){
          count++
          var pal=findPalindrome(nextDate)
            
              if(pal){
                return [count,nextDate]
            
            
          }
          
          nextDate=nextPalindrome(nextDate)
        }
        
      }
      
      function previousPalindrome(date){
        
       var day=date.day-1;
       var month=date.month;
       var year=date.year
      
        var limitDate=[31,28,31,30,31,30,31,31,30,31,30,31]
        
      if(day==0){      
      month--
      
      
      if(month==0){
        month=12;
        day=31;
        year--
      }else if(month==2){
          if(leap(year)){
              day=29;
          }else{
              day=28;
          }
      }else{
          day=limitDate[month-1]
      }
    }
      return {day:day,month:month,year:year}
      
      }
      
      
      function findPrevPalindrome(date){
        var prev=previousPalindrome(date)
        let count1=0;
        while(true){
          count1++;
          var nextP=findPalindrome(prev)
          
            if(nextP){
               
              return [count1,prev]
            }
          
          prev=previousPalindrome(prev)
            
          }
        }
      