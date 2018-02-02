console.log('JavaScript app.js is working')


var $searchBtn = $('#searchBtn')
var $searchField = $('#searchField')
var $activitycardDIV = $('#activity-card')


$searchBtn.on('click' , function(){
    var searchText = $searchField.val()
    
    var options = {
        url:'/activities/search/'+ searchText,
        method: 'get',
        contentType:'application/json',  //tells server whats coming
        data: JSON.stringify({body: searchText})   //converts data to JSON:: must be formated as JSON to submit :: "data" is the whole record
        }

    // function makeDIV(myDataObj){
    //     console.log('TRIGGERED FUNCTION   :', myDataObj)
    //     //alert(myDataObj)
    //     for (x = 0; x < myDataObj.length; x++){
    //         console.log(myDataObj[x])
    //         $activitycardDIV.innerHTML = 
    //         ' <div class="card-body">'+
    //         '<h5 class="card-title"><%= myDataObj[x].type %></h5>'+
    //         '</div>'
    
    //     } 
        
    // } 

 $.ajax(options).done(function(dataThatCameBack){  //data that came back
    //console.log('IN AJAX!!!!!!!', dataThatCameBack[0].type)
    
    console.log('my data:  ', dataThatCameBack)   //comes back as a JavaScript Array
    //alert('IN AJAX!!!!!!!', dataThatCameBack[0].type.toString)
    makeDIV(dataThatCameBack)  //send to function

 }) //end ajax
}) //END SUBMIT 

//---===== BUILD RESULTS ======------
function makeDIV(myDataObj){
    console.log('TRIGGERED FUNCTION   :', myDataObj)
    //alert(myDataObj)
    $('.card').hide()
    if ( myDataObj.length === 0 ){
        $('#errorSpan').text("Sorry that Activity is not avaiable at this time.")
        console.log('no search  :' , myDataObj)
    }else{
        $('#errorSpan').text("")
            for (x = 0; x < myDataObj.length; x++){       
                $('#results').append('<div id="activity-card" class="card" style="width: 18rem; " >' +
                '<div class="card-body">'+
                `<h5 class="card-title">${myDataObj[x].type}</h5>`+   //TICK Marks !
                '</div></div>')
            }  //end for
        }//end else
}  //END build results
//---===== END BUILD RESULTS ======------




