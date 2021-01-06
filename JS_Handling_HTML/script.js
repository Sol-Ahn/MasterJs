var crudApp = new (function () {
  // 수강 데이터를 담을 json 형식의 배열
  this.myClass = [
    { ID: "1", Class_Name: "운영체제", Category: "전공필수", Credit: 3 },
    { ID: "2", Class_Name: "컴퓨터구조론", Category: "전공선택", Credit: 4 },
    { ID: "3", Class_Name: "심리학의 이해", Category: "교양필수", Credit: 2 },
  ];

  // 선택할 수 있는 항목 미리 정의
  this.Category = ["전공필수", "전공선택", "교양필수", "교양선택"];
  // 확장성을 위해 table header에 담길 데이터를 배열에 담기
  this.col = [];
  // 위의 데이터를 토대로 table 생성
  this.createTable = () => {
    // 데이터를 만들고 채우는 코드
    // col에 table header에 해당하는 데이터를 삽입하는 코드
    // 비어있는 col 배열에 myClass 배열 속 객체들의 key값을 삽입
    for (var i = 0; i < this.myClass.length; i++) {
      for (var key in this.myClass[i]) {
        // key값을 col 배열에 담기
        // indexOf: 문자열 속에서 특정 문자열 검색
        if (this.col.indexOf(key) === -1) this.col.push(key);
      }
    }
  };
})();

/*
var div = document.getElementById("container");
// getElementByID: 주어진 문자열과 일치하는 id 속성을 가진 요소를 찾고, 이를 나타내는 element 객체를 반환함.
div.innerHTML = "<h1>수강관리 앱</h1>";
// innerHTML: 요소 내에 포함된 HTML 또는 XML 마크업을 가져오거나 설정함.
div.appendChild(table);
// appendChild: 새로운 노드를 해당 노드의 자식 노드 리스트의 가장 마지막에 추가함.
*/
