
//a//urthor : farrukh askari
//help was taaken from blog at codeforgeek.com
//code taken and modified from github account : codeforgeek
//twitter : @codeforgeek

var mysql       = require("mysql");
var express     = require('express');
var app         = express();
var multer      = require("multer");
var fs          = require('fs');
// var url = require('url');


function REST_ROUTER(router, connection, md5)
{
    var self = this;
    self.handleRoutes(router, connection, md5);
}

REST_ROUTER.prototype.handleRoutes = function(router, connection, md5)
{
    var self = this;

    
    /* FILE UPLOAD */
    router.use(multer({ dest: __dirname + '/public/uploads' }));
    router.post('/upload', function(req, res)
    {

        res.json({"filename": req.files.file});
    
    });



    /* SELECT ALL */
    //router.post('/SELECT2/:TableName', function(req, res)
    //{
    //    var table_name = [req.params.TableName];
    //    if(table_name == "es_house")
    //    {
    //        var query = "SELECT * FROM es_house HOUSEALIAS left join es_colony COLONYALIAS on COLONYALIAS.es_colony_id = HOUSEALIAS.es_colony_id" +
    //            " left join es_city CITYALIAS on CITYALIAS.es_city_id = HOUSEALIAS.es_city_id";
    //    }
    //    else if(table_name == "es_officers")
    //    {
    //        var query = " SELECT * FROM es_officers INNER JOIN es_bps on es_officers.es_bps_id = es_bps.es_bps_id " +
    //            " INNER JOIN es_department on es_officers.es_department_id = es_department.es_department_id " +
    //            " INNER JOIN es_designation on es_officers.es_designation_id = es_designation.es_designation_id " +
    //            " INNER JOIN es_employment_type on es_officers.es_employment_type_id = es_employment_type.es_employment_type_id ";
    //        // " INNER JOIN es_service_type on es_officers.es_service_type_id = es_service_type.es_service_type_id ";
    //    }
    //    else
    //    {
    //        var query = "SELECT * FROM ??";
    //    }
    //    query = mysql.format(query, table_name);
    //    connection.query(query, function(err, rows)
    //    {
    //        if(err)
    //        {
    //            res.json({"Error" : true, "Message" : "Error executing MySQL query"});
    //        }
    //        else
    //        {
    //            res.json({"Error" : false, "Message" : "Success", [req.params.TableName] : rows});
    //        }
    //    });
    //});


    
    /* SELECT ALL */
    router.get('/SELECT/:TableName', function(req, res)
    {
        var table_name = [req.params.TableName];
        if(table_name == "es_house")
        {
            var query = "SELECT * FROM es_house HOUSEALIAS left join es_colony COLONYALIAS on COLONYALIAS.es_colony_id = HOUSEALIAS.es_colony_id" +
                        " left join es_city CITYALIAS on CITYALIAS.es_city_id = HOUSEALIAS.es_city_id";
        }
        else if(table_name == "es_officers")
        {
            var query = " SELECT * FROM es_officers INNER JOIN es_bps on es_officers.es_bps_id = es_bps.es_bps_id " + 
                        " INNER JOIN es_department on es_officers.es_department_id = es_department.es_department_id " +
                        " INNER JOIN es_designation on es_officers.es_designation_id = es_designation.es_designation_id " + 
                        " INNER JOIN es_employment_type on es_officers.es_employment_type_id = es_employment_type.es_employment_type_id ";
                        // " INNER JOIN es_service_type on es_officers.es_service_type_id = es_service_type.es_service_type_id ";
        }
        else
        {
            var query = "SELECT * FROM ??";
        }
        query = mysql.format(query, table_name);
        connection.query(query, function(err, rows)
        {
            if(err)
            {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            }
            else
            {
                res.json({"Error" : false, "Message" : "Success", [req.params.TableName] : rows});
            }
        });
    });



    /* SELECT BY ID */
    router.get('/SELECTBYID/:Trigger/:TableName/:FieldName/:id', function(req, res)
    {        
        if(req.params.Trigger == "joinselect") // leftjoinselect // innerjoinselect // simpleselect
        {
            if(req.params.TableName == "es_officers")
            {   
                // Used when Allotment Notification Shows up.
                var query = "SELECT * FROM " + req.params.TableName +
                            " INNER JOIN es_bps on es_officers.es_bps_id = es_bps.es_bps_id " + 
                            " INNER JOIN es_department on es_officers.es_department_id = es_department.es_department_id " +
                            " INNER JOIN es_designation on es_officers.es_designation_id = es_designation.es_designation_id " +
                            " WHERE es_officers.es_officer_id = '" + req.params.id + "' ";
                // var query = "SELECT a.* " +
                //             " FROM "+req.params.TableName+" as a " +
                //             " LEFT JOIN es_gender on a.es_gender_id = es_gender.es_gender_id " +
                //             " LEFT JOIN es_marital_status on a.es_marital_status_id = es_marital_status.es_marital_status_id " +
                //             " LEFT JOIN es_bps on a.es_bps_id = es_bps.es_bps_id " +
                //             " LEFT JOIN es_designation on a.es_designation_id = es_designation.es_designation_id " +
                //             " LEFT JOIN es_department on a.es_department_id = es_department.es_department_id " +
                //             " LEFT JOIN es_division on a.es_division_id = es_division.es_division_id " +
                //             " LEFT JOIN es_district on a.es_district_id = es_district.es_district_id " +
                //             " WHERE a.es_officer_id = '" + req.params.id + "' ";
            }
            else if(req.params.TableName == "es_house")
            {
                var query = "SELECT * FROM " + req.params.TableName +
                            " INNER JOIN es_city on es_house.es_city_id = es_city.es_city_id " +
                            " WHERE " + req.params.FieldName + " = " + req.params.id +
                            " AND es_house_status = '1'" +
                            " AND es_house_occupied_status = '0'";
            }
        }
        else if(req.params.Trigger == "simpleselect")
        {   
            // used almost in every controller
            var query = "SELECT * FROM " + req.params.TableName + " WHERE "+ req.params.FieldName + " = " + req.params.id;
        }

        
        query = mysql.format(query);
        connection.query(query, function(err, rows)
        {
            if(err)
            {
                res.json({"Error" : true, "Message" : err.toString() });
            }
            else
            {
                res.json({"Error" : false, "Message" : "Success", [req.params.TableName] : rows});
            }
        });
    });



    /* SELECT SPECIFIC FIELD BY ID */
    router.get('/SELECTFIELDBYID/:FieldToBeSelected/:TableName/:ByFieldName/:ID', function(req, res)
    {
        var table_name = [req.params.FieldToBeSelected, req.params.TableName, req.params.ByFieldName, req.params.ID];
        var query = "SELECT ?? FROM ?? WHERE ?? = ?";
        query = mysql.format(query, table_name);
        connection.query(query, function(err, rows)
        {
            if(err)
            {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            }
            else
            {
                res.json({"Error" : false, "Message" : "Success", [req.params.TableName] : rows});
            }
        });
    });



    /* SELECT TWO SPECIFIC FIELDS BY ID */
    router.get('/SelectTwoFieldsByID/:FieldToBeSelected1/:FieldToBeSelected2/:TableName/:ByFieldName/:ID', function(req, res)
    {
        var table_name = [req.params.FieldToBeSelected1, req.params.FieldToBeSelected2, req.params.TableName, req.params.ByFieldName, req.params.ID];
        var query = "SELECT ??, ?? FROM ?? WHERE ?? = ?";
        query = mysql.format(query, table_name);
        connection.query(query, function(err, rows)
        {
            if(err)
            {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            }
            else
            {
                res.json({"Error" : false, "Message" : "Success", [req.params.TableName] : rows});
            }
        });
    });




    /* SELECT QUERY FOR WAITING LISTS */
    // Format:                       es_officers/BPS-17/BPS-19
    router.post('/WaitingList/:TableName/:BPSFrom/:BPSTo/:Employment_Type_ID_1/:Employment_Type_ID_2/:Service_Type_ID', function(req, res)
    {
        var table_name = [req.params.TableName, req.params.BPSFrom, req.params.BPSTo, req.params.Employment_Type_ID_1, req.params.Employment_Type_ID_2, req.params.Service_Type_ID];

        var TblName = req.params.TableName;
        var BPSFrom = req.params.BPSFrom;
        var BPSTo = req.params.BPSTo;
        var ET1 = req.params.Employment_Type_ID_1;
        var ET2 = req.params.Employment_Type_ID_2;
        var ST = req.params.Service_Type_ID;

        if(BPSFrom >= '1' && BPSTo <= '14' && (ET1 >= '1' && ET1 <= '3') && ET2 == 'null' && ST == '4')
        {
            // Query for (BPS 12-14) Secretraiate         | Query = ('12', '14', "1", 'null', '4')
            // Query for (BPS 12-14) Attached Departments | Query = ('12', '14', "2", 'null', '4')
            // Query for (BPS 1-11) Secretraiate          | Query = ('1', '11', "1", 'null', '4')
            // Query for (BPS 1-11) Attached Departments  | Query = ('1', '11', "2", 'null', '4')
            // Query for (BPS 1-11) Class-IV              | Query = ('1', '11', "3", 'null', '4')
            var query = "SELECT * FROM " +TblName+
                " INNER JOIN es_officers on es_waiting_list.es_officer_id = es_officers.es_officer_id" +
                " INNER JOIN es_application on es_officers.es_officer_id = es_application.es_officer_id" +
                " INNER JOIN es_bps on es_officers.es_bps_id = es_bps.es_bps_id" +
                " INNER JOIN es_designation on es_officers.es_designation_id = es_designation.es_designation_id" +
                " INNER JOIN es_department on es_officers.es_department_id = es_department.es_department_id" +
                " INNER JOIN es_employment_type on es_officers.es_employment_type_id = es_employment_type.es_employment_type_id" +
                " INNER JOIN es_service_type on es_officers.es_service_type_id = es_service_type.es_service_type_id" +
                " INNER JOIN es_etgs on es_officers.es_officer_id = es_etgs.es_officer_id" +
                " WHERE es_bps.es_bps_id >= '" + BPSFrom + "'" +
                " AND es_bps.es_bps_id <= '" + BPSTo + "'" +
                " AND es_employment_type.es_employment_type_id = '" + ET1 + "'" +
                " AND es_service_type.es_service_type_id = '" + ST + "'" +
                " AND es_waiting_list.es_wl_status = '1'" +
                " AND es_officers.es_officer_apply_status = '0'" +
                " ORDER BY es_wl_id ASC";
        }
        else if(BPSFrom >= '15' && BPSTo <= '16' && (ET1 == '1' || ET1 == '2') && ET2 == 'null' && ST == '4')
        {
            // Query for (BPS 1-11) Secretariat ONLY
            var query = "SELECT * FROM " +TblName+
                " INNER JOIN es_officers on es_waiting_list.es_officer_id = es_officers.es_officer_id" +
                " INNER JOIN es_application on es_officers.es_officer_id = es_application.es_officer_id" +
                " INNER JOIN es_bps on es_officers.es_bps_id = es_bps.es_bps_id" +
                " INNER JOIN es_designation on es_officers.es_designation_id = es_designation.es_designation_id" +
                " INNER JOIN es_department on es_officers.es_department_id = es_department.es_department_id" +
                " INNER JOIN es_employment_type on es_officers.es_employment_type_id = es_employment_type.es_employment_type_id" +
                " INNER JOIN es_service_type on es_officers.es_service_type_id = es_service_type.es_service_type_id" +
                " INNER JOIN es_etgs on es_officers.es_officer_id = es_etgs.es_officer_id" +
                " WHERE es_bps.es_bps_id >= '" + BPSFrom + "'" +
                " AND es_bps.es_bps_id <= '" + BPSTo + "'" +
                " AND es_employment_type.es_employment_type_id = '" + ET1 + "'" +
                " AND es_service_type.es_service_type_id = '" + ST + "'" +
                " AND es_waiting_list.es_wl_status = '1'" +
                " AND es_officers.es_officer_apply_status = '0'" +
                " ORDER BY es_wl_id ASC";
        }
        // else if(BPSFrom >= '1' && BPSTo <= '11' && ET1 == '2' && ET2 == 'null' && ST == '4')
        // {
        //     // Query for (BPS 1-11) Secretariat ONLY
        //     var query = "SELECT * FROM " +TblName+
        //         " INNER JOIN es_officers on es_waiting_list.es_officer_id = es_officers.es_officer_id" +
        //         " INNER JOIN es_application on es_officers.es_officer_id = es_application.es_officer_id" +
        //         " INNER JOIN es_bps on es_officers.es_bps_id = es_bps.es_bps_id" +
        //         " INNER JOIN es_designation on es_officers.es_designation_id = es_designation.es_designation_id" +
        //         " INNER JOIN es_department on es_officers.es_department_id = es_department.es_department_id" +
        //         " INNER JOIN es_employment_type on es_officers.es_employment_type_id = es_employment_type.es_employment_type_id" +
        //         " INNER JOIN es_service_type on es_officers.es_service_type_id = es_service_type.es_service_type_id" +
        //         " INNER JOIN es_etgs on es_officers.es_officer_id = es_etgs.es_officer_id" +
        //         " WHERE es_bps.es_bps_id >= '" + BPSFrom + "'" +
        //         " AND es_bps.es_bps_id <= '" + BPSTo + "'" +
        //         " AND es_employment_type.es_employment_type_id = '" + ET1 + "'" +
        //         " AND es_service_type.es_service_type_id = '" + ST + "'" +
        //         " AND es_waiting_list.es_wl_status = '1'" +
        //         " AND es_officers.es_officer_apply_status = '0'" +
        //         " ORDER BY es_wl_id ASC";
        // }
        else
        {
            // Query for WL3
            res.send("Wrong Trigger");
            // var query = "SELECT * FROM " +req.params.TableName+
            //     " INNER JOIN es_officers on es_waiting_list.es_officer_id = es_officers.es_officer_id" +
            //     " INNER JOIN es_application on es_officers.es_officer_id = es_application.es_officer_id" +
            //     " INNER JOIN es_bps on es_officers.es_bps_id = es_bps.es_bps_id" +
            //     " INNER JOIN es_designation on es_officers.es_designation_id = es_designation.es_designation_id" +
            //     " INNER JOIN es_department on es_officers.es_department_id = es_department.es_department_id" +
            //     " INNER JOIN es_employment_type on es_officers.es_employment_type_id = es_employment_type.es_employment_type_id" +
            //     " INNER JOIN es_service_type on es_officers.es_service_type_id = es_service_type.es_service_type_id" +
            //     " INNER JOIN es_etgs on es_officers.es_officer_id = es_etgs.es_officer_id" +
            //     " WHERE es_bps.es_bps_id >= '" + req.params.BPSFrom + "'" +
            //     " AND es_bps.es_bps_id <= '" + req.params.BPSTo + "'" +
            //     //" AND es_employment_type.es_employment_type_id = '" + req.params.Employment_Type_ID_1 + "' || '" + req.params.Employment_Type_ID_2 + "'" +
            //     //" AND es_service_type.es_service_type_id = '" + req.params.Service_Type_ID + "'" +
            //     " AND es_waiting_list.es_wl_status = '1'" +
            //     //" AND es_officers.es_officer_apply_status = '0'" +
            //     " ORDER BY es_wl_id ASC";
        }

        query = mysql.format(query, table_name);
        connection.query(query, function(err, rows)
        {
            if(err)
            {
                res.json({"Error" : true, "Message" : err.toString() });
            }
            else
            {
                res.json({"Error" : false, "Message" : "Success", [req.params.TableName] : rows});
            }
        });
    });

    

    
    router.post('/INSERT/:TableName', function(req, res)
    {
        var query_var = req.body;

        var table_query = "INSERT INTO " + req.params.TableName + " (";
        var table_var = " VALUES ( ";

        for(var n in query_var) 
        {
            table_query +=  "es_" + n + ", ";
            table_var += "'" + query_var[n] + "', ";
        }
        
        table_query = table_query.substring(0, table_query.length - 2) + " )";
        table_var = table_var.substring(0, table_var.length - 2) + " )";

        var query = table_query + table_var;

        connection.query(query, function(err, rows)
        {
            if(err)
            {
                //res.json({"Error" : true, "Message" : err.toString() });
                res.json({"Error" : true, "Message" : err.toString() });
            }
            else
            {
                res.json({"Error" : false, "Message" : "Inserted", "LastID" : rows.insertId });
            }
        });
    });




    // router.post('/MultiInsert/:TableName', function(req, res)
    // {
    //     var query_var = req.body;

    //     var result = [];
    //     var error = [];
    //     var result = [];

    //     for(var item in query_var)
    //     {
    //         var table_query = "INSERT INTO " + req.params.TableName + " (";
    //         var table_var = " VALUES ( ";

    //         for(var n in query_var[item]) 
    //         {
    //             table_query +=  "es_" + n + ", ";
    //             table_var += "'" + query_var[item][n] + "', ";
    //         }

    //         table_query = table_query.substring(0, table_query.length - 2) + " )";
    //         table_var = table_var.substring(0, table_var.length - 2) + " )";

    //         var query = table_query + table_var;

    //         connection.query(query, function(err, rows)
    //         {
    //             if(err)
    //             {
    //                 //res.json({"Error" : true, "Message" : err.toString() });
    //                 error.push({"Error" : true, "Message" : err.toString() });
    //             }
    //             else
    //             {
    //                 result.push({"Error" : false, "Message" : "Inserted", "LastID" : rows.insertId });

    //             }
    //         });
    //     }

    //     if(error == null)
    //     {
    //          res.send(error);
    //     }
    //     else
    //     {
    //         res.send(result);
    //     }
    //     // res.send(query);
    // });




    /* UPDATE */
    /* CF = Clause Field - WHERE clause field for instance es_house_id */
    router.put('/UPDATE/:TableName/:UpdateByFieldName/:ID', function(req, res) 
    {
        var query_var = req.body;

        var table_query = "UPDATE " + req.params.TableName + " SET ";
        var table_var = " WHERE " + req.params.UpdateByFieldName + "=" + req.params.ID;

        for(var n in query_var) 
        {
            table_query += n + "=" + '"' + query_var[n] + '"' + ", ";
        }

        table_query = table_query.substring(0, table_query.length - 2);
        var query = table_query + table_var;

        connection.query(query, function(err, rows)
        {
            if(err)
            {
                res.json({"Error" : true, "Message" : err.toString() });
            }
            else
            {
                res.json({"Error" : false, "Message" : "Updated"});
            }
        });
    });

    
    
    router.delete('/unlinkFile/:filename', function(req, res)
    {
        var filePath = "./public/uploads/"+req.params.filename; 

        fs.unlink(filePath, function(err)
        {
            if(err)
            {
                res.json({"Error" : true, "Message" : "File Cannot be Deleted"});
            }
            else
            {
                res.json({"Error" : false, "Message": "Deleted Successfully"});
            }
        });
    });



    /* SINGLE DELETE */
    router.delete('/DELETE/:TableName/:FieldName/:id', function(req, res)
    {
        var table = [req.params.TableName, req.params.FieldName, req.params.id];
        var query = "DELETE from ?? WHERE ?? = ?";
        query = mysql.format(query, table);
        connection.query(query, function(err, rows)
        {
            if(err)
            {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            }
            else
            {
                res.json({"Error" : false, "Message" : "Deleted"+req.params.id });
            }
        });
    });



    /*
    router.put('/UPDATE/:TableName/:F1/:V1/:F2/:V2/:F3/:V3/:F4/:V4/:F5/:V5/:F6/:V6/:F7/:V7/:F8/:V8/:F9/:V9/:CF/:id', function(req, res) /* CF = Clause Field - WHERE clause field for instance es_house_id
    {
     var table_name = [req.params.TableName, req.params.F1, req.params.V1, req.params.F2, req.params.V2, req.params.F3, req.params.V3, req.params.F4, req.params.V4,
                       req.params.F5, req.params.V5, req.params.F6, req.params.V6, req.params.F7, req.params.V7, req.params.F8, req.params.V8, req.params.F9, req.params.V9,
                       req.params.CF, req.params.id];

     var query = "UPDATE ?? SET ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ? WHERE ?? = ?";
     query = mysql.format(query, table_name);
     connection.query(query, function(err, rows)
     {
         if(err)
         {
            res.json({"Error" : true, "Message" : "Error executing MySQL query"});
         }
         else
         {
            res.json({"Error" : false, "Message" : "Updated"});
         }
     });
    });
    */

    /*
    router.put("/users",function(req,res)
    {
        var query = "UPDATE ?? SET ?? = ? WHERE ?? = ?";
        var table = ["table1","password",md5(req.body.password),"user",req.body.user];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows)
        {
            if(err)
            {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            }
            else
            {
                res.json({"Error" : false, "Message" : "Updated the password for email "+req.body.email});
            }
        });
    });
    */

    /*
    router.get("/users",function(req, res)
    {
        var query = "SELECT * FROM ??";
        var table = ["es_house"];
        query = mysql.format(query, table);
        connection.query(query,function(err,rows)
        {
            if(err)
            {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            }
            else
            {
                res.json({"Error" : false, "Message" : "Success", "Users" : rows});
            }
        });
    });
    */


    /*
    router.delete("/users/:email",function(req,res)
    {
        var query = "DELETE from ?? WHERE ??=?";
        var table = ["user_login","user_email",req.params.email];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows)
        {
            if(err)
            {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            }
            else
            {
                res.json({"Error" : false, "Message" : "Deleted the user with email "+req.params.email});
            }
        });
    });
     */


}

module.exports = REST_ROUTER;
