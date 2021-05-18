var Database_Name = 'DBPTNSHOP';  
var Version = 1.0;  
var Text_Description = 'DB PTNSHOP';  
var Database_Size = 2 * 1024 * 1024;  
var dbObj = openDatabase(Database_Name, Version, Text_Description, Database_Size);  

dbObj.transaction(function (tx) {  
  tx.executeSql('CREATE TABLE IF NOT EXISTS PTN (ProdID INTEGER PRIMARY KEY , ProdDateTime, ProdName, ProdPrice, ProdSize, ProdMat, ProdCat)');  
});  

alldetails();
   
function Insert() {
  var today = new Date();  
  var dd = today.getDate();  
  var mm = today.getMonth() + 1;  
  var hh = today.getHours();
  var min = today.getMinutes();
  var sec = today.getSeconds();
  var yyyy = today.getFullYear();  
  if (dd < 10) {
    dd = '0' + dd
  }  

  if (mm < 10) {  
    mm = '0' + mm  
  }

  if (hh < 10) {  
    hh = '0' + hh  
  }

  if (min < 10) {  
    min = '0' + min  
  }

  if (sec < 10) {  
    sec = '0' + sec  
  }
  var today = yyyy + '-' + mm + '-' + dd + ' ' + hh + ':' + min + ':' + sec;  
  var pID = document.getElementById("tbID").value;  
  var pName = document.getElementById("tbName").value;
  var pPrice = document.getElementById("tbPrice").value;
  var pSize = document.getElementById("tbSize").value;
  var pMat = document.getElementById("tbMat").value;
  var pCat = document.getElementById("tbCat").value;

  dbObj.transaction(function (tx) {
   tx.executeSql('insert into PTN(ProdID, ProdDateTime, ProdName, ProdPrice, ProdSize, ProdMat, ProdCat) values("'+ pID + '","'+ today + '","' + pName + '","' + pPrice + '","' + pSize + '","' + pMat + '","' + pCat + '")');
  });  
  alldetails(); 
}  
  
function del() {  
  var id = document.getElementById("ddlid").value;
  dbObj.transaction(function (tx) {
    tx.executeSql('delete from PTN where ProdID=' + id + '');
  });
  empidbind();
  alldetails();  
}  

function myFunction() {
  var id = document.getElementById("ddlid").value;
  dbObj.transaction(function (tx) {
    tx.executeSql('SELECT * from PTN where id=' + id + '', [], function (tx, results)
    {
      document.getElementById("tbID").value = results.rows.item(0).ProdID;
      document.getElementById("tbName").value = results.rows.item(0).ProdName;
      document.getElementById("tbPrice").value = results.rows.item(0).ProdPrice;
      document.getElementById("tbSizes").value = results.rows.item(0).ProdSize ;
      document.getElementById("tbMat").value = results.rows.item(0).ProdMat;
      document.getElementById("tbCat").value = results.rows.item(0).ProdCat;
    }, null);
  });
}  

function showdel() {
  empidbind();
  $('#tdid').show();
  $('#btnupdate').hide();
  $('#btnInsert').hide();
  $('#btndel').show();
  $('#btninsertshw').show();
  $('#clear_table').show();
  $('#btnupdateshw').show();
  $('#btndeleteshw').hide();
  $('#rowID').hide();
  $('#rowName').hide();
  $('#rowPrice').hide();
  $('#rowSize').hide();
  $('#rowMat').hide();
  $('#rowCate').hide();
}  

function showin() {
  $('#tdid').hide();
  $('#btnupdate').hide();
  $('#btnInsert').show();
  $('#btndel').hide();
  $('#btninsertshw').hide();
  $('#btnupdateshw').show();
  $('#btndeleteshw').show();
  $('#clear_table').show();
  $('#rowID').show();
  $('#rowName').show();
  $('#rowPrice').show();
  $('#rowSize').show();
  $('#rowMat').show();
  $('#rowCate').show();
  document.getElementById("tbID").value='';
  document.getElementById("tbName").value='';
  document.getElementById("tbPrice").value='';
  document.getElementById("tbSize").value='';
  document.getElementById("tbMat").value='';
  document.getElementById("tbCat").value='';
  empidbind();
}  

function empidbind() {
  dbObj.transaction(function (tx) {
    tx.executeSql('SELECT * from PTN', [], function (tx, results) {
      var len = results.rows.length, i;
      document.getElementById("ddlid").innerHTML = '';
      var str = '';
      for (i = 0; i < len; i++) {
        str += "<option value=" + results.rows.item(i).ProdID + ">" + results.rows.item(i).ProdID + "</option>";
        document.getElementById("ddlid").innerHTML += str;
        str = '';
      }
    }, null);
  });
}  

function showupdte() {
  empidbind();
  $('#tdid').show();
  $('#btnupdate').show();
  $('#btnInsert').hide();
  $('#btndel').hide();
  $('#btninsertshw').show();
  $('#clear_table').show();
  $('#btnupdateshw').hide();
  $('#btndeleteshw').show();
  $('#rowID').show();
  $('#rowName').show();
  $('#rowPrice').show();
  $('#rowSize').show();
  $('#rowMat').show();
  $('#rowCate').show();
}  

function updte() {
  var id = document.getElementById("ddlid").value;
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1;
  var hh = today.getHours();
  var min = today.getMinutes();
  var sec = today.getSeconds();
  var yyyy = today.getFullYear();
  if (dd < 10) {
    dd = '0' + dd
  }  

  if (mm < 10) {
    mm = '0' + mm  
  }

  if (hh < 10) {  
    hh = '0' + hh  
  }

  if (min < 10) {  
    min = '0' + min  
  }

  if (sec < 10) {  
    sec = '0' + sec  
  }

  var today = yyyy + '-' + mm + '-' + dd + ' ' + hh + ':' + min + ':' + sec;
  var pID = document.getElementById("tbID").value;  
  var pName = document.getElementById("tbName").value;
  var pPrice = document.getElementById("tbPrice").value;
  var pSize = document.getElementById("tbSize").value;
  var pMat = document.getElementById("tbMat").value;
  var pCat = document.getElementById("tbCat").value;
    
  dbObj.transaction(function (tx) {
      tx.executeSql('update PTN set ProdID ="' + pID + '",ProdDateTime="' + today + '",ProdName="' + pName + '",ProdPrice="' + pPrice + '",ProdSize="' + pSize + '",ProdMat="' + pMat + '",ProdCat="' + pCat + '" where ProdID=' + id + '');
  });
  alldetails();
}  

function restart() {
  dbObj.transaction(function (tx) {
    tx.executeSql("DROP TABLE PTN");
    tx.executeSql('CREATE TABLE IF NOT EXISTS PTN (ProdID INTEGER(5) PRIMARY KEY, ProdDateTime , ProdName varchar(128), ProdPrice INTEGER(4), ProdSize, ProdMat varchar(30), ProdCat)');
  });
  alldetails(); 
}  
  
function alldetails() {
  dbObj.transaction(function (tx) {
    tx.executeSql('SELECT * FROM PTN', [], function (tx, results) {
      var len = results.rows.length, i;
      $("#tablegrid").find("tr:gt(0)").remove();
      var str = '';
      for (i = 0; i < len; i++) {
        str += "<tr>";
        str += "<td>" + results.rows.item(i).ProdID + "</td>";
        str += "<td>" + results.rows.item(i).ProdDateTime + "</td>";
        str += "<td>" + results.rows.item(i).ProdName + "</td>";
        str += "<td>" + results.rows.item(i).ProdPrice + "</td>";
        str += "<td>" + results.rows.item(i).ProdSize + "</td>";
        str += "<td>" + results.rows.item(i).ProdMat + "</td>";
        str += "<td>" + results.rows.item(i).ProdCat + "</td>";
        str += "</tr>";
        document.getElementById("tablegrid").innerHTML += str;
        str = '';
      }
    }, null);
  });  
}   