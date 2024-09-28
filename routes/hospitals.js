const express = require('express');
const router = express.Router();

const { getHospitals, getHospital, createHospital, updateHospital, deleteHospital } = require('../controllers/hospitals');

router.route('/').get(getHospitals).post(createHospital);
router.route('/:id').get(getHospital).put(updateHospital).delete(deleteHospital);

module.exports = router;

// router.get('/', (req,res) => {
//     res.status(200).json({
    //         success:true,
//         msg:'Show all hospitals'
//     });
// });

// router.get('/:id', (req,res) => {
//     res.status(200).json({
//         success:true,
//         msg:`Show hospital ${req.params.id}`
//     });
// });

// router.post('/', (req,res) => {
//     res.status(200).json({
//         success:true,
//         msg:'Create new hospitals'
//     });
// });

// router.put('/:id', (req,res) => {
//     res.status(200).json({
//         success:true,
//         msg:`Update hospital ${req.params.id}`
//     });
// });
 
// router.delete('/:id', (req,res) => {
//     res.status(200).json({
//         success:true,
//         msg:`Delete hospital ${req.params.id}`
//     });
// });
