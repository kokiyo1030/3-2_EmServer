// const express = require('express');
// const Sensor = require('../models/zone');
const mysql = require('mysql');

module.exports = function (app, pool) {

    app.get("/", function (req, res) {
        var result = {};
        // db에 연결하여 sql 수행
        pool.getConnection(function (err, conn) {
            var sql = "SELECT * from zones;";
            conn.query(sql, function (err, rows) {
                var result = returnResult(err, res);
                if (rows) {
                    result.message = rows;
                }
                conn.release();
                result.status = res.statusCode;
                JSON.stringify(result);
                res.render('index', {
                    info: rows
                });
            });
        });
    });

    // >> POST
    app.post("/postinfo", function (req, res) {
        var result = {};
        var sensor1 = null;
        var sensor2 = null;
        var sensor3 = null;
        var sensor4 = null;
        var sensor5 = null;
        var sonsor6 = null;
        async.waterfall([
                function (callback) {
                    sensor1 = mysql.escape(req.body.sensor1);
                    sensor2 = mysql.escape(req.body.sensor2);
                    sensor3 = mysql.escape(req.body.sensor3);
                    sensor4 = mysql.escape(req.body.sensor4);
                    sensor5 = mysql.escape(req.body.sensor5);
                    sensor6 = mysql.escape(req.body.sensor6);
                    callback();
                },
                function (callback) {
                    if (sensor1 == undefined) {
                        callback(new Error("Sensor1 is empty."));
                    } else if (sensor2 == undefined) {
                        callback(new Error("Sensor2 is empty"));
                    } else if (sensor3 == undefined) {
                        callback(new Error('Sensor3 is empty'));
                    } else if (sensor4 == undefined) {
                        callback(new Error('Sensor4 is empty'));
                    } else if (sensor5 == undefined) {
                        callback(new Error('Sensor5 is empty'));
                    } else if (sensor6 == undefined) {
                        callback(new Error('Sensor6 is empty'));
                    } else {
                        // db에 연결하여 sql 수행
                        pool.getConnection(function (err, conn) {
                            // title 정보를 DB에 넣기 위한 SQL문 준비
                            var sql = "INSERT INTO zones (sensor1, sensor2, sensor3, sensor4, sensor5, sensor6) VALUES (" + sensor1 + ", " + sensor2 + ", " + sensor3 + ", " + sensor4 + ", " + sensor5 + ", " + sensor6 + ");";
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

    // >> GET
    app.get("/getinfo", function (req, res) {
        var result = {};
        // db에 연결하여 sql 수행
        pool.getConnection(function (err, conn) {
            var sql = "SELECT * from zones;";
            conn.query(sql, function (err, rows) {
                var result = returnResult(err, res);
                if (rows) {
                    result.message = rows;
                }
                conn.release();
                result.status = res.statusCode;
                res.send(result);
            });
        });
    });

    app.post("/postinfo", function (req, res) {
        var result = {};
        var i = 0;
        async.waterfall([
                function (callback) {
                    if (i < 0) {
                        callback(new Error("wrong i value"));
                    } else {
                        pool.getConnection(function (err, conn) {
                            var sql = "CREATE table 'zones" + i + "(id int(11) not null auto_increment,"
                            console.log("SQL: " + sql);
                            conn.query(sql, function (err) {
                                if (err) {
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