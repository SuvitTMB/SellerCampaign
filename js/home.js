var dateString = new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' });
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear()+543;
today = dd + '/' + mm + '/' + yyyy;
var cleararray = "";
var xCodeDate = "SellerCampaign";

$(document).ready(function () {
  var str ="";
  if(sessionStorage.getItem("EmpID_Seller")==null) { location.href = "index.html"; }
  str += '<div><img src="'+ sessionStorage.getItem("LinePicture") +'" class="add-profile" width="100px"></div>';
  str += '<div class="NameLine" style="color:#111; font-weight: 600;">'+ sessionStorage.getItem("EmpName_Seller")+'</div>';
  $("#MyProfile").html(str);  
  Connect_DB();
  dbSellerCampaign = firebase.firestore().collection("SellerCampaign");
  dbSellerDate = firebase.firestore().collection("TNIdate");
  CheckDate();
});

var xDateBALife = "";
var xDateTNI = "";
var xDateMF = "";
function CheckDate() {
  dbSellerDate.where('CodeName','==',xCodeDate)
  .limit(1)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      xDateBALife = doc.data().DateUpload;
      xDateTNI = doc.data().ReportMonth;
      xDateMF = doc.data().ReportQMonth;
    });
    CheckSeller();
  });
}



function CheckSeller() {
  var str1 = "";
  var str2 = "";
  var str3 = "";
  var str11 = "";
  var str22 = "";
  var str33 = "";
  str11 += '<div><div class="font13" style="margin-bottom: 5px;"><b>BALife</b></div>';
  str11 += '<table class="table table-bordered" class="font13" style="background-color: #fff;">';
  str11 += '<thead><tr style="text-align: center;background-color: #93a3c1;">';
  str11 += '<th scope="col">รายการ</th><th scope="col">รายละเอียด</th><th scope="col">หน่วย</th></tr></thead><tbody>';
  str11 += '<tr><td colspan="3" style="text-align: center; font-weight: 600; height:50px;padding-top:10px;background-color:#f1f1f1;">ไม่มีข้อมูล</td></tr>';
  str11 += '</tbody></table>';
  $("#BALifeSeller").html(str11);

  str22 += '<div style="margin-top:30px;"><div><div class="font13" style="margin-bottom: 5px;"><b>TNI</b></div>';
  str22 += '<table class="table table-bordered" class="font13" style="background-color: #fff;">';
  str22 += '<thead><tr style="text-align: center;background-color: #93a3c1;">';
  str22 += '<th scope="col">รายการ</th><th scope="col">รายละเอียด</th><th scope="col">หน่วย</th></tr></thead><tbody>';
  str22 += '<tr><td colspan="3" style="text-align: center; font-weight: 600; height:50px;padding-top:10px;background-color:#f1f1f1;">ไม่มีข้อมูล</td></tr>';
  str22 += '</tbody></table></div>';
  $("#TNISeller").html(str22);

  str33 += '<div style="margin-top:30px;"><div><div class="font13" style="margin-bottom: 5px;"><b>MF</b></div>';
  str33 += '<table class="table table-bordered" class="font13" style="background-color: #fff;">';
  str33 += '<thead><tr style="text-align: center;background-color: #93a3c1;">';
  str33 += '<th scope="col">รายการ</th><th scope="col">รายละเอียด</th><th scope="col">หน่วย</th></tr></thead><tbody>';
  str33 += '<tr><td colspan="3" style="text-align: center; font-weight: 600; height:50px;padding-top:10px;background-color:#f1f1f1;">ไม่มีข้อมูล</td></tr>';
  str33 += '</tbody></table></div>';
  $("#MFSeller").html(str33);

  //console.log(sessionStorage.getItem("EmpID_Seller"));
  dbSellerCampaign.where('EmpID','==', parseFloat(sessionStorage.getItem("EmpID_Seller") ))
  //dbSellerCampaign.where('EmpID','==', sessionStorage.getItem("EmpID_Seller") )
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
    if(doc.data().Product=="BALife") { 
      //console.log("BALife");
      str1 += '<div><div class="font13" style="margin-bottom: 5px;"><b>BALife</b> : ข้อมูล ณ <font color="#f68b1f"><b>'+ xDateBALife +'</b></font></div>';
      str1 += '<table class="table table-bordered" class="font13" style="background-color: #fff;">';
      str1 += '<thead><tr style="text-align: center;background-color: #93a3c1;">';
      str1 += '<th scope="col">รายการ</th><th scope="col">รายละเอียด</th><th scope="col">หน่วย</th></tr></thead><tbody>';
      str1 += '<tr><th scope="row" style="text-align: left;">APE สะสมรายเดือน</th>';
      str1 += '<td style="text-align: right; font-weight: 600;">'+ numberWithCommas(doc.data().Month_APE) +'</td>';
      str1 += '<td style="text-align: center;">บาท</td></tr>';
      str1 += '<tr><th scope="row" style="text-align: left;">คะแนนสะสมรายเดือน</th>';
      str1 += '<td style="text-align: right; font-weight: 600;">'+ numberWithCommas(doc.data().Month_Point) +'</td>';
      str1 += '<td style="text-align: center;">Point</td></tr>';
      str1 += '<tr><th scope="row" style="text-align: left;">เงินรางวัลรายเดือน</th>';
      str1 += '<td style="text-align: right; font-weight: 600;">'+ numberWithCommas(doc.data().Month_Reward) +'</td>';
      str1 += '<td style="text-align: center;">บาท</td></tr>';
      str1 += '<tr><th scope="row" style="text-align: left;">APE สะสมรายไตรมาส</th>';
      str1 += '<td style="text-align: right; font-weight: 600;">'+ numberWithCommas(doc.data().Q_APE) +'</td>';
      str1 += '<td style="text-align: center;">บาท</td></tr>';
      str1 += '<tr><th scope="row" style="text-align: left;">APE สะสมรายปี</th>';
      str1 += '<td style="text-align: right; font-weight: 600;">'+ numberWithCommas(doc.data().YearAPE) +'</td>';
      str1 += '<td style="text-align: center;">บาท</td></tr>';
      str1 += '<tr><th scope="row" style="text-align: left;">คะแนนสะสมรายปี</th>';
      str1 += '<td style="text-align: right; font-weight: 600;">'+ numberWithCommas(doc.data().YearPoint) +'</td>';
      str1 += '<td style="text-align: center;">Point</td></tr></tbody></table>';
      str1 += '</div></div>';
      $("#BALifeSeller").html(str1);
      $("#SellerPosition").html("ตำแหน่ง "+ doc.data().EmpPosition);
    }

    if(doc.data().Product=="TNI") {
      //console.log("TNI");
      str2 += '<div style="margin-top:30px;"><div class="font13" style="margin-bottom: 5px;"><b>TNI</b> : ข้อมูล ณ <font color="#f68b1f"><b>'+ xDateTNI +'</b></font></div>';
      str2 += '<table class="table table-bordered" class="font13" style="background-color: #fff;">';
      str2 += '<thead><tr style="text-align: center;background-color: #93a3c1;">';
      str2 += '<th scope="col">รายการ</th><th scope="col">รายละเอียด</th><th scope="col">หน่วย</th></tr></thead><tbody>';
      str2 += '<tr><th scope="row" style="text-align: left;">เบี้ยประกันรายเดือน</th>';
      str2 += '<td style="text-align: right; font-weight: 600;">'+ numberWithCommas(doc.data().Premiun) +'</td><td style="text-align: center;">บาท</td></tr>';
      str2 += '<tr><th scope="row" style="text-align: left;">จำนวนกรมธรรม์</th>';
      str2 += '<td style="text-align: right; font-weight: 600;">'+ parseFloat(doc.data().Policy).toFixed(0) +'</td><td style="text-align: center;">ฉบับ</td></tr>';
      str2 += '<tr><th scope="row" style="text-align: left;">รางวัลรายเดือน</th><td style="text-align: right; font-weight: 600;">'+ numberWithCommas(doc.data().TNI_Reward) +'</td>';
      str2 += '<td style="text-align: center;">บาท</td></tr></tbody></table>';
      str2 += '<div id="A3"></div></div>';
      $("#TNISeller").html(str2);
      $("#SellerPosition").html("ตำแหน่ง "+ doc.data().EmpPosition);
    }  
    if(doc.data().Product=="MF") { 
      //console.log("MF");
      str3 += '<div style="margin-top:30px;">';
      str3 += '<div class="font13" style="margin-bottom: 5px;"><b>MF</b> : ข้อมูล ณ <font color="#f68b1f"><b>'+ xDateMF +'</b></font></div>';
      str3 += '<table class="table table-bordered" class="font13" style="background-color: #fff;">';
      str3 += '<thead><tr style="text-align: center;background-color: #93a3c1;">';
      str3 += '<th scope="col">รายการ</th><th scope="col">รายละเอียด</th><th scope="col">หน่วย</th></tr></thead><tbody>';
      str3 += '<tr><th scope="row" style="text-align: left;">Net New Type B&C</th>';
      str3 += '<td style="text-align: right; font-weight: 600;">'+ numberWithCommas(doc.data().NetNew_TypeBandC) +'</td>';
      str3 += '<td style="text-align: center;">บาท</td></tr>';
      //str3 += '<tr><th scope="row" style="text-align: left;">Net New Type B (ที่เข้าร่วม)</th>';
      str3 += '<tr><th scope="row" style="text-align: left;">Net New Type B</th>';
      str3 += '<td style="text-align: right; font-weight: 600;">'+ numberWithCommas(doc.data().NetNew_QTypeB) +'</td>';
      str3 += '<td style="text-align: center;">บาท</td></tr>';
      str3 += '<tr><th scope="row" style="text-align: left;">รางวัลรายไตรมาส</th>';
      str3 += '<td style="text-align: right; font-weight: 600;">'+ numberWithCommas(doc.data().MF_Reward) +'</td>';
      str3 += '<td style="text-align: center;">บาท</td></tr>';
      str3 += '</tbody></table></div>';
      $("#MFSeller").html(str3);
      $("#SellerPosition").html("ตำแหน่ง "+ doc.data().EmpPosition);
    }
    });
    document.getElementById('loading').style.display='none';
    document.getElementById('DisplaySeller').style.display='block';
  });
}



function addCommas(nStr) {
  nStr += '';
  x = nStr.split('.');
  x1 = x[0];
  x2 = x.length > 1 ? '.' + x[1] : '';
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + ',' + '$2');
  }
  return x1 + x2;
}

function numberWithCommas(num) {
  var valueString=num; //can be 1500.0 or 1500.00 
  var amount=parseFloat(valueString).toFixed(2);
  return formattedString= amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}