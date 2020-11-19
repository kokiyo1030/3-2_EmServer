const express = require('express');
const Sensor = require('../models/zone');
const User = require('../models/user');
const { isLoggedIn } = require('./middlewares');
const mysql = require('mysql');

module.exports = function (app, pool) {
    // >> POST
    app.post("/postinfo", function (req, res) {
        var result = {};
        var VRL = null;
        var ppm = null;
        var Mppm = null;
        async.waterfall([
                function (callback) {
                    VRL = mysql.escape(req.body.VRL);
                    ppm = mysql.escape(req.body.ppm);
                    Mppm = mysql.escape(req.body.Mppm);
                    callback();
                },
                function (callback) {
                    if (VRL == undefined) {
                        callback(new Error("VRL is empty."));
                    } else if (ppm == undefined) {
                        callback(new Error("ppm is empty"));
                    } else if (Mppm == undefined) {
                        callback(new Error("Mppm is empty"));
                    } else {
                        // db에 연결하여 sql 수행
                        pool.getConnection(function (err, conn) {
                            // title 정보를 DB에 넣기 위한 SQL문 준비d
                            var sql = "INSERT INTO connecttable (VRL, ppm, Mppm) VALUES (" + VRL + ", " + ppm + ", " + Mppm + ");";
                            console.log("SQL: " + sql);
                            conn.query(sql, function (err) {
                                if (err) {
                                    // err가 떠도 conn은 release() 꼭 해주어야한다.
                                    conn.release();
                                    callback(err);
                                } else {
                                    conn.release();
                                    callback();
                                }
                            });
                        });
                    }
                }
            ],
            function (err) {
                result = returnResult(err, res)
                result.status = res.statusCode;
                res.send(result);
            });
    });
}

var returnResult = function (err, res) {
    // 결과를 눈으로 보기 쉽게하기 위해 result 객체 생성
    var result = {};
    if (err) {
        res.status(400);
        result.message = err.stack;
    } else {
        res.status(200);
        result.message = "Success";
    }
    return result;
}


// router.get('/:id/farminfo', isLoggedIn, async(req, res, next) => {
//     try {
//         const user = await User.findOne({ where: {id: req.user.id } });
//         const sensor = await Sensor.findAll({});
//         var result = returnResult(err, res);
//         if (user) {
//             result.message = sensor;
//             res.render('map1', {
//                 title: '내 축사',
//                 info: rows
//             });
//         } else {
//             res.status(404).send('no user');
//         }
//     } catch (error) {
//         console.error(error);
//         next(error);
//     }
// });

// var returnResult = function (err, res) {
//     // 결과를 눈으로 보기 쉽게하기 위해 result 객체 생성
//     var result = {};
//     if (err) {
//         res.status(400);
//         result.message = err.stack;
//     } else {
//         res.status(200);
//         result.message = "Success";
//     }
//     return result;
// }

// module.exports = router;