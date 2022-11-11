var express = require('express');
const User = require('../model/user');
var router = express.Router();

/* POST user data */
router.post('/createUser', async function(req, res) {
  try {
    const { name, email, phoneNumber, amount, color, size} = req.body;
    let product = []
    size.forEach(sizeElement => {
      color.map(colorElement => {
        let data = {}
        data['color'] = colorElement
        data['size'] = sizeElement
        product.push(data)
      });
    });
    let createUser = await new User({name, email, phoneNumber, amount, product}).save() 
    res.status(200).send({ status: 200, data: createUser, msg:'User Created Success'});
  } catch (error) {
    console.log("error", error)
    res.status(500).send({ status: 200, msg:'Server Error'});
  }
  
});

/* GET users listing. */
router.get('/getDetail/:id', async function(req, res) {
  try {
    let details = await User.findOne({_id: req.params.id})
    res.status(200).send({ status: 200, data: details, msg:'Get Details Success'});
  } catch (error) {
    console.log("error", error)
    res.status(500).send({ status: 200, msg:'Server Error'});
  }
});

/* PUT users detail update. */
router.put('/updateDetail/:id', async function(req, res) {
  try {
      await User.updateOne({ "_id": req.params.id, "product._id": req.body._id }, { "$set": { "product.$.color": req.body.color, "product.$.size": req.body.size } })
      return res.status(200).send({ status: 200, success: true, message: "Successfully Updated Details" })
  } catch (error) {
    console.log("error", error)
    res.status(500).send({ status: 200, msg:'Server Error'});
  }
});

/* DELETE users detail delete. */
router.delete('/deleteDetail/:id', async function(req, res) {
  try {
    await User.updateOne({ _id: req.params.id }, { $pull: { product: { _id: req.body._id } } });
    res.status(200).send({ status: 200, success: true, msg:'Details deleted success'});
  } catch (error) {
    console.log("error", error)
    res.status(500).send({ status: 200, msg:'Server Error'});
  }
});

module.exports = router;
