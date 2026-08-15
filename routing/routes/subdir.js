const express = require('express');
const path = require('path');
const router = express.Router();

router.get((['/index.html','/index']) , (req,res) => {
    res.sendFile(path.join(__dirname , '..' , 'views','subdir' , 'index.html'))
});
router.get((['/test.html','/test']) , (req,res) => {
    res.sendFile(path.join(__dirname , '..' , 'views','subdir' , 'test.html'))
});

module.exports = router;