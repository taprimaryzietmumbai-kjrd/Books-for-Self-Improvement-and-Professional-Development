/** ZIET Mumbai Workshop Book API. Bind to a Google Sheet. Set Script Property APP_KEY to a long random value. Deploy as Web App, execute as owner. */
const TAB='ZIET_Book_Data';
function doGet(e){const p=(e&&e.parameter)||{},key=p.key||'',action=p.action||'get';if(!auth_(key))return out_({ok:false,error:'Unauthorized'});if(action==='ping')return out_({ok:true,message:'ZIET Mumbai Book API active'});if(action==='get')return out_({ok:true,data:read_()});return out_({ok:false,error:'Unknown action'});}
function doPost(e){try{const x=JSON.parse(e.postData.contents||'{}');if(!auth_(x.key||''))return out_({ok:false,error:'Unauthorized'});if(x.action==='ping')return out_({ok:true,message:'ZIET Mumbai Book API active'});if(x.action==='save'){write_(x.data||{});return out_({ok:true,message:'Saved'});}return out_({ok:false,error:'Unknown action'});}catch(err){return out_({ok:false,error:String(err)});}}
function auth_(key){const expected=PropertiesService.getScriptProperties().getProperty('APP_KEY');return !!expected&&key===expected;}
function sheet_(){const ss=SpreadsheetApp.getActiveSpreadsheet();let sh=ss.getSheetByName(TAB);if(!sh){sh=ss.insertSheet(TAB);sh.appendRow(['Updated At','JSON Payload']);}return sh;}
function read_(){const sh=sheet_(),v=sh.getLastRow()>1?sh.getRange(2,2).getValue():'';try{return v?JSON.parse(v):{books:[],notes:[],resources:[],portfolio:{}};}catch(err){return{books:[],notes:[],resources:[],portfolio:{}};}}
function write_(data){const sh=sheet_(),v=JSON.stringify(data);if(sh.getLastRow()<2)sh.appendRow([new Date(),v]);else sh.getRange(2,1,1,2).setValues([[new Date(),v]]);}
function out_(obj){return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);}
