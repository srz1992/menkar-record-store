console.log('js');


let myApp = angular.module('myApp', [])

myApp.controller('LaunchpadController', ['$http', function($http){
    let vm = this;
    vm.records = [];
    console.log('LaunchpadController is created');

    vm.testClick = function(){
        console.log('testClick');
    }

    vm.getRecord = function(){
        console.log('in getRecord');
        
        let newRecord = {
            artist: vm.artistIn,
            albumName: vm.albumIn,
            year: vm.yearIn,
            genreList: vm.genreIn 
        }
        $http({
            method: 'POST',
            url: '/record',
            data: newRecord
        }).then(function(response){
            console.log('send record to the server');
            vm.requestRecords();
            vm.artistIn = '';
            vm.albumIn = '';
            vm.yearIn = '';
            vm.genreIn = '';
        }).catch(function(error){
            console.log('error adding a record:', error);
            
        })
    }

    vm.requestRecords = function (){
        $http({
            method: 'GET',
            url: '/record'
        }).then(function(response){
            console.log('go the response from the server:', response);
            vm.records = response.data;
            console.log('your records:', vm.records);
        }).catch(function(error){
            console.log('error on getting records:', error);
        })
    }

    vm.removeMe = function(index){
        console.log('in removeMe');
        
        let recordToDelete = vm.records[index];
        $http({
            method: 'DELETE',
            url: `/record?_id=${recordToDelete._id}`
        }).then(function(){
            console.log('deleted record:', recordToDelete);
            vm.requestRecords();
        }).catch(function(){
            console.log('got error:', error);
            
        })
    }

    vm.requestRecords();

}])

// $(document).ready(readyNow)

// function readyNow(){
//     console.log('jq');
//     $('#add-record').on('click', function(event){
//         event.preventDefault();
//         addRecord(getNewRecord())
//     })
//    getAllRecords(); 
// }

// function getNewRecord(){
//     let record = {
//         artist: $("#in-artist").val(),
//         album: $("#in-album").val(),
//         year: $("#in-year").val(),
//         genre: $("#in-genre").val(),
//     }
//     return record
// }

// function getAllRecords(){
//     $.ajax({
//         method: 'GET',
//         url: '/record'
//     }).then( function (response) {
//         displayAllRecords(response);
//     })
// }

// //add some records
// function addRecord(record){
//     $.ajax({
//         method: 'POST',
//         url: '/record',
//         data: record,
//     }).then( function (response) {
//         getAllRecords();
//     }).catch( function (response){
//         console.log("Something bad happened:", status);
//     });
// }

// //see all records
// function displayAllRecords(recordArray){
//     let $recordsTarget = $('#records')
//     $recordsTarget.empty();
//     for (const record of recordArray) {
//         $('#records').append(makeRowFor(record));
//     }
//     function makeRowFor(record) {
//         let rowHtml = `<tr>
//         <td>${record.artist}</td>
//         <td>${record.albumName}</td>
//         <td>${record.year}</td>
//         <td>${record.genreList.join(', ')}</td>`;
//         return rowHtml;
//     }
// }
