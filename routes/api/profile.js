const express=require('express');
const router=express.Router();
const auth=require('../../middleware/auth');

const Profile = require('../../models/Profile');
//@route GET api/profile/me
//@desc get current users profile
//@access  private
router.get('/me',auth,async (req,res)=>{
    try{
        const profile=await Profile.findOne({user:req.user.id})
        .populate('user',['name','avatar']);
        if(!profile){
            res.status(500).send('there is no profile for this user');
        }
        res.json(profile);
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports=router;