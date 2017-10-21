const express =require('express');
const router =express.Router();
const contact =require("../models/contacts")

//Fetching the contacts
router.get('/contacts',(req, res, next)=>{
    contact.find(function(err,contact){
        res.json(contact);
    })
    
});

//Adding the contacts
router.post('/contacts',(req, res, next)=>{
   //logic to add
   let newContact=new contact({
       first_name:req.body.first_name,
       last_name:req.body.last_name,
       phone:req.body.phone
   });

   newContact.save((err,contact)=>{
       if(err){
           res.json("Error in saving")
       }
       else{
           res.json("Contacts added successfully");
       }
   });
});

//Deleting the contacts
router.delete('/contacts/:id',(req, res, next)=>{
    //logic to delete
    contact.remove({_id: req.params.id},function(err,result){
        if(err){
            res.json(err);
        }
        else{
            res.json(result);
        }

    });
});

module.exports = router;