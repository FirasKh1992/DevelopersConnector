const express=require('express');
const router=express.Router();
const auth=require('../../middleware/auth');
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const config=require('config');
const bcrypt=require('bcryptjs');

//@route GET api/auth
//@desc get authenticate user
//@access  private 
router.get('/',auth, async (req,res)=>{
try{
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
}catch(err){
    console.error(err.message);
    res.status(500).send('Server Error');
}
}
);

//@route post api/auth
//@desc authenticate a user & get token 
//@access  public
router.post(
    '/',
    [
      check('email', 'please include a valid email').isEmail(),
      check(
        'password',
        'Password is required'
      ).exists(),
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });
      const {  email, password } = req.body;
      try {
        //see if user exists
        let user = await User.findOne({ email });
  
        if (!user) {
          return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
        }
        
        const isMatch=await bcrypt.compare(password,user.password);

        if(!isMatch){
            return res
            .status(400)
            .json({ errors: [{ msg: 'Invalid Credentials' }] });
        }

        const payload={
            user:{
                id:user.id
            }
        }
        jwt.sign(
            payload,
            config.get('jwtSecret'),
            {expiresIn:3600},
            (err,token)=>{
                if(err) throw err;
                res.json({token});
            })
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
      }
    }
  );
module.exports=router;