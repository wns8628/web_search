//스크립트만 따로 뺐습니다.

//--유효성검사함수 일단 공백만 처리하겠습니다.--------------------------------------
 function vCheck(amIndex,inputData,selected){
    if(inputData == ""){
      alert("빈칸을 채워주세요!");
      return false;
    }
    if(amIndex==0){
        if(selected == "name") {
          alert("그런 이름을 가진 사람은 없습니다.");
            }else if(selected == "title"){
              alert("그런 직업을 가진사람은 없습니다.");
              }else if(selected == "major"){
                alert("그런 전공을 가진사람은 없습니다.");
                }else {
                  alert("그런 정보를 가진 사람을 찾을 수 없습니다.");
                }

      return false;
    }
    return true;
 }
//---------------------------------------------------------------------------

//테이블 생성함수----------------------------------------------------------------
  function ShowResume(count,elechileNodes,inputData,find){
    //부트스트랩쓰기위해서
    document.writeln('<link href="public/bootstrap-4.0.0-alpha.6-dist/css/bootstrap.min.css" rel="stylesheet" media="screen">');
    document.writeln('<link rel="stylesheet" href="public/style.css">');
    document.writeln( '<script type="text/javascript" src="public/jquery.js"></script>');


    document.writeln("<br><center><h1 class='jumbotron' id='result_main'>결과 : "+ count.length +" 명을 찾았습니다!</br>(  " + find + " : "+   inputData + " )</h1></center></br>")
    document.writeln('<center><input type="button" name="" class="btn btn-danger" value="다시 검색하기" onclick="history.back()"></center></br>');//뒤로가기 버튼

      var amindex = 0; //count인덱스값이랑 i랑비교해서 같을때만 인덱스를 증가시킨다.

      for( var i = 0; i < elechileNodes.length ; i++ ){ //0 1 2 3 4 5 돈다

        if(count[amindex] === i){
          document.writeln( "<table border=1 width=80% align=center>" );
             for ( var i1 = 0; i1 < elechileNodes[i].childNodes.length; i1++ ){

                  if(elechileNodes[i].childNodes.item( i1 ).nodeType != 3){

                    var curNode = elechileNodes[i].childNodes.item( i1 );
                    var value = curNode.firstChild;

                    document.writeln( "<tr>" );
                    // 각 자식노드의 노드이름 출력
                    document.writeln( "<td align='center'><strong>" + curNode.nodeName + "</strong></td>" );

                     // 노드값 프린트
                    document.writeln( "<td>" + value.nodeValue + "</td>" );
                    document.writeln( "</tr>" );

                   }

                 }
               document.writeln( "</table>" );
               document.writeln( "<hr>" );
               amindex++;
           }
         }
       }
//------------------------------------------------------------------------------

//메인함수-----------------------------------------------------------------------
function searchStart(xml){
   //세팅

   // var xmlDoc = new ActiveXObject( "Microsoft.XMLDOM" ); //액티브엑스
   // xmlDoc.load( "public/resume.xml" );

   var xmlDoc = loadXMLDoc("public/resume.xml");

   //뿌리가져옴
    var element = xmlDoc.documentElement;
    var elechileNodes = element.childNodes; //이력서개수=5개

  //변수선언
    var inputData = document.getElementById("inputName").value;
    var amIndex = 0;
    var loop = 0;
    var count = new Array();

    var x;
    var find;
    var selected = $("#select").val();


    if(selected == "all"){
        x = elechileNodes;
        find = "찾은 키워드";
      }else if(selected == "name"){
          x = element.getElementsByTagName("NAME");
          find = "찾은 사람";
        }else if(selected == "title"){
            x = element.getElementsByTagName("TITLE");
            find = "찾은 직업";
          }else if(selected == "major"){
              x = element.getElementsByTagName("MAJOR");
              find = "찾은 전공";
            }


    // console.log(x[9].childNodes.length);
    if(selected == "all"){
      //전체검색로직--------------------------------------------------
      for(var i = 0; i < x.length; i++){  //x.length = 5 // firefox = 11

            if( i >= x.length-1 && i >= 5 ) break;                        //파이어폭스 호환위해 넣은코드

              var i2 = 0;

            if(x[i].nodeType == 3 ){ i++; }                              //파이어폭스 호환위해 넣은코드

            while(i2 < x[i].childNodes.length){  // firefox = 21

              if( x[i].nodeType == 3 ) { i++; }                            //파이어폭스 호환위해 넣은코드
              if( x[i].childNodes[i2].nodeType == 3 ) { i2++; }            //파이어폭스 호환위해 넣은코드
              if( i >= x.length  ) break;                                  //파이어폭스 호환위해 넣은코드
              if( i2 >= x[i].childNodes.length ) break;                    //파이어폭스 호환위해 넣은코드


              if( inputData == x[i].childNodes[i2].firstChild.nodeValue.match(inputData)){ //부분검색
                    count[amIndex] = i;
                    i++;    //찾으면 바로 넘어감
                    i2=0;   //찾았으니 다음이력서는 0부터 다시검색해야하니깐
                    amIndex++;
               } else {
                  i2++;
               }
               if(i >= x.length) break;
             }
           }
      //-------------------------------------------------------------- //좀더개선하자
    }
    //부분검색로직--------------------------------------------------
    else {
        for(var i3 = 0 ; i3 < x.length ; i3++){  //x.length = 5 // firefox = 11

          if( inputData  == x[loop].firstChild.nodeValue.match(inputData) ){

               count[amIndex] = loop;
               loop++;
               amIndex++;

             } else {
              loop++;
            }
        }
    //-------------------------------------------------------------
    }

//유효성 검사
  var check  = vCheck(amIndex,inputData,selected);
//문제없으면 테이블생성 함수 실행
  if(check == true){  //즉 빈칸도있고 사람도있으면!
    ShowResume(count,elechileNodes,inputData,find);
  }

}
//------------------------------------------------------------------------------
