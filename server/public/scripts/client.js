console.log('js');

$(document).ready(readyNow)

function readyNow(){
    console.log('jq');
    $('#add-record').on('click', function(event){
        event.preventDefault();
        addRecord(getNewRecord())
    })
   getAllRecords(); 
}

function getNewRecord(){
    let record = {
        artist: $("#in-artist").val(),
        album: $("#in-album").val(),
        year: $("#in-year").val(),
        genre: $("#in-genre").val(),
    }
    return record
}

function getAllRecords(){
    $.ajax({
        method: 'GET',
        url: '/record'
    }).then( function (response) {
        displayAllRecords(response);
    })
}

//add some records
function addRecord(record){
    $.ajax({
        method: 'POST',
        url: '/record',
        data: record,
    }).then( function (response) {
        getAllRecords();
    }).catch( function (response){
        console.log("Something bad happened:", status);
    });
}

//see all records
function displayAllRecords(recordArray){
    let $recordsTarget = $('#records')
    $recordsTarget.empty();
    for (const record of recordArray) {
        $('#records').append(makeRowFor(record));
    }
    function makeRowFor(record) {
        let rowHtml = `<tr>
        <td>${record.artist}</td>
        <td>${record.albumName}</td>
        <td>${record.year}</td>
        <td>${record.genreList.join(', ')}</td>`;
        return rowHtml;
    }
}
