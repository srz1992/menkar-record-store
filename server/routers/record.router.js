const express = require('express');

// Have express make me a new router
const router = express.Router();
const Record = require('../modules/models/record.schema')

router.get('/', (req, res) => {
  Record.find()
  .then((data)=>{
      console.log('got stuff back from mongo:', data);
      res.send(data);
  })
  .catch((error) => {
      console.log('error from mongo: ', error);
      res.sendStatus(500);
  })
})

router.post('/', (req, res) => {
    console.log('handling my POST for /record');
    let sentRecord = req.body;
    //I could make 100% sure the objects are 
    //exactly the same on the client and server
    // or I could just assume they may not be
    // and set all the values again. Nice if you
    // aren't the one writing the code on
    //both sides.
    let record = new Record(sentRecord);
    console.log('new record is', record);
    
    record.save()
    .then(()=>{
        console.log();
        
        res.sendStatus(201);
    })
    .catch((error)=>{
        console.log('Error adding record:', error);
        sendStatus(500)
    })
});

router.delete('/', (req, res)=>{
    let recordID = req.query._id;
    console.log('id for request is:', recordID)
    Record.findByIdAndRemove(req.query._id)
    .then(()=>{
        console.log('removed book:', req.query);
        res.sendStatus(200);
    })
    .catch((error) =>{
        console.log('error removing book: ', error);
        res.sendStatus(500);
        
    })
});

router.put('/', (req, res)=>{
let recordData = req.body;
Record.findByIdAndUpdate(recordData._id, recordData)
.then(()=>{
console.log('updated book with id:', recordData._id);
res.sendStatus(200);

})
.catch((error)=>{
    console.log('error updating book with id:', recordData, ':', error);
    res.sendStatus(500)
})
})

module.exports= router;