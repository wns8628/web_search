function loadXMLDoc(filename)
{
if ( navigator.userAgent.match('Firefox') == 'Firefox'){
  xhttp=new XMLHttpRequest();
  xhttp.open("GET",filename,false);
  xhttp.send();
  return xhttp.responseXML;
  } else {
    xhttp = new ActiveXObject( "Microsoft.XMLDOM" );
    xhttp.load( filename );
    return xhttp;
   }
}

// var xmlDoc = new ActiveXObject( "Microsoft.XMLDOM" ); //액티브엑스
//var x = element.childNodes;
//if( inputData  == x[loop].childNodes[2].firstChild.nodeValue ){
