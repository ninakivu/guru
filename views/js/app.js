console.log('JavaScript app.js is working')


var $searchBtn = $('#searchBtn')
var $searchField = $('#searchField')
var $activitycardDIV = $('.activity-card')
var $allActivitiesBtn = $('#allActivitiesBtn')

$searchField.keydown(function (e) {
    if (e.which == 13) {
        runSearch()
    }
  })

  $searchBtn.on('click' , function(){
    runSearch()
})

function runSearch(){
    
    var searchText = $searchField.val()
    $searchField.val('')
    var options = {
        url:'/activities/search/'+ searchText,
        method: 'get',
        contentType:'application/json',  //tells server whats coming
        data: JSON.stringify({body: searchText})   //converts data to JSON:: must be formated as JSON to submit :: "data" is the whole record
        }

 $.ajax(options).done(function(dataThatCameBack){  //data that came back
    //console.log('IN AJAX!!!!!!!', dataThatCameBack[0].type)
    
    console.log('my data:  ', dataThatCameBack)   //comes back as a JavaScript Array
    //alert('IN AJAX!!!!!!!', dataThatCameBack[0].type.toString)
    
    makeDIV(dataThatCameBack)  //send to function

 }) //end ajax
} //END SUBMIT 

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
                   
                $('#results').append(`<div id="${myDataObj[x]._id}" class="card activity-card newCard" style="width: 18rem; " >` +
                '<div class="card-body">'+
                `<h5 class="card-title">${myDataObj[x].type}</h5>`+   //TICK Marks !
                '</div></div>')
                //$activitycardDIV.attr('id', myDataObj[x]._id)
                console.log('building card  :' , myDataObj[x]._id)

                $('.activity-card').on('click', function(){

                    var id = $(this).attr("id")
                    console.log('selecting: '+ id)
            
                    window.location.href = `/activities/` + id
                }) //end CLICK
                
            }  //end FOR LOOP

        }//end else
}  //END build results
//---===== END BUILD RESULTS ======------

//ACTIVITY LINKS ----------- 

    $activitycardDIV.on('click', function(){

        var id = $(this).attr("id")
        console.log('selecting: '+ id)

        window.location.href = `/activities/` + id
    }) //end CLICK
// End  ACTIVITY LINKS



// SEE ALL ACTIVITY LINKS ----------- 

$allActivitiesBtn.on('click', function(){
    $('#errorSpan').text("")
    $('.newCard').remove()
    $('.card').show()
    

}) //end CLICK
// END SEE ALL ACTIVITY LINKS ----------- 

//----------------------------------------------------------------
//----------------------------------------------------------------
//------------------ACTIVITY/GURU SHOW----------------------------
var $searchActivityField = $('#searchActivityField')
var $searchActivityBtn = $('#searchActivityBtn')
var $allGurusBtn = $('#allGurusBtn')
var $activitiesGuruCard = $('.activities-guru-card')

$searchActivityField.keydown(function (e) {
    if (e.which == 13) {
        runSearch()
    }
  })

  $searchActivityBtn.on('click' , function(){
    runActivityGuruSearch()
})

$allGurusBtn.on('click' , function(){
    makeAllGuruList(user.zip)
})


function runActivityGuruSearch(){
   
    
    var searchText = $searchActivityField.val()
    $searchActivityField.val('')
    
    var options = {
        url:'/activities/search/guru/'+ searchText,
        method: 'get',
        contentType:'application/json',  //tells server whats coming
        data: JSON.stringify({body: searchText})   //converts data to JSON:: must be formated as JSON to submit :: "data" is the whole record
        }

 $.ajax(options).done(function(dataThatCameBack){  //data that came back
    
    
    console.log('my data:  ', dataThatCameBack)   //comes back as a JavaScript Array
    
    makeActivityDIV(dataThatCameBack)  //send to function

 }) //end ajax
} //END SUBMIT 



//---===== BUILD RESULTS ======------
function makeActivityDIV(myDataObj){
    console.log('TRIGGERED GURU FUNCTION   :', myDataObj)
   
    //$('.guru-card').hide()
   

    if ( myDataObj.length === 0 ){
        $('#errorSpan').text("Sorry that Guru does not exist.")
        console.log('no search  :' , myDataObj)
    }else{
        $('#errorSpan').text("")
            for (x = 0; x < myDataObj.length; x++){  
                   
                $('#results').append(`<div id="${myDataObj[x]._id}" class="guru-card newCard" style="width: 30rem; " >` +
                `<h5 class="card-title">${myDataObj[x].type}</h5>`+   //TICK Marks !
                '</div>')
                //$activitycardDIV.attr('id', myDataObj[x]._id)
                console.log('building div  :' , myDataObj[x]._id , '  ', myDataObj[x].name)

                $('.guru-card').on('click', function(){

                    var id = $(this).attr("id")
                    console.log('selecting: '+ id)
            
                    window.location.href = `/guru/` + id
                }) //end CLICK
                
            }  //end FOR LOOP

        }//end else
}  //END build results
//---===== END BUILD RESULTS ======------

//=========-------BUILD GENERAL GURU LIST   -------===========

function runActivityAllGurus(incomingData){

    var searchText = incomingData
    $searchActivityField.val('')
    var options = {
        url:'/activities/search/guru/'+ searchText,
        method: 'get',
        contentType:'application/json',  //tells server whats coming
        data: JSON.stringify({body: searchText})   //converts data to JSON:: must be formated as JSON to submit :: "data" is the whole record
        }

 $.ajax(options).done(function(dataThatCameBack){  //data that came back
    
    
    console.log('my data:  ', dataThatCameBack)   //comes back as a JavaScript Array
    
    makeAllGuruList(dataThatCameBack)  //send to function

 }) //end ajax
} //END SUBMIT 

function makeAllGuruList(myData){


    for (i = 0; i < myData.length; i++ ){
        $('#results').append(`<div id="${myData[i]._id}" class="guru-card newCard" style="width: 30rem; " >` +
        `<h5 class="card-title">${myData[x].name}</h5>`+   //TICK Marks !
        `<h5 class="card-title">${myData[x].zip}</h5>`+
        '</div>')
        //$activitycardDIV.attr('id', myDataObj[x]._id)
        console.log('building div  :' , myDataObj[x]._id , '  ', myDataObj[x].name)

        $('.guru-card').on('click', function(){

            var id = $(this).attr("id")
            console.log('selecting: '+ id)
    
            window.location.href = `/guru/` + id
        }) //end CLICK
    }
} //end function


//=========-------END BUILD GENERAL GURU LIST   -------===========


//ACTIVITY-GURU LINKS ----------- 

$activitiesGuruCard.on('click', function(){

    var id = $(this).attr("id")
    console.log('selecting: '+ id)

    window.location.href = `/gurus/` + id
}) //end CLICK
// End  ACTIVITY-GURU LINKS








//----------------------------------------------------------------
//------------------END ACTIVITY/GURU SHOW----------------------------
//----------------------------------------------------------------
//----------------------------------------------------------------