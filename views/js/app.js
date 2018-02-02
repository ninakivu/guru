console.log('JavaScript app-user.js is working')



var $searchBtn = $('#searchBtn')
var $searchField = $('#searchField')


$searchBtn.on('click' , function(){
    var searchText = $searchField.val()

    
    console.log('search  :', searchText)
    
    var options = {
        url:'/activities/search/'+ searchText,
        method: 'get',
        contentType:'application/json',  //tells server whats coming
        data: JSON.stringify({body: searchText})   //converts data to JSON:: must be formated as JSON to submit :: "data" is the whole record
        }
 $.ajax(options).done(function(dataThatCameBack){  //data that came back
    console.log('IN AJAX!!!!!!!')
    console.log('my data:  ', dataThatCameBack)   //comes back as a JavaScript Array
                      //^^^^^ can't concatenate with '+' and object/array:::must use comma
    
   // makeDIV(dataThatCameBack.todo)  //send to function

 }) //end ajax
}) //END SUBMIT 










