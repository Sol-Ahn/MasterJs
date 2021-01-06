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
      // 각 객체 속의 key값 순회
      for (var key in this.myClass[i]) {
        // key값을 col 배열에 담기
        // indexOf: 문자열 속에서 특정 문자열 검색
        if (this.col.indexOf(key) === -1) this.col.push(key);
      }
    }

    // -----------------------------------------------------
    var table = document.createElement("table"); // table 태그에 해당하는 element 생성
    table.setAttribute("id", "classTable");

    // table row
    var tr = table.insertRow(-1); // table의 마지막에 새로운 행 추가

    // table header
    for (var h = 0; h < this.col.length; h++) {
      var th = document.createElement("th");
      th.innerHTML = this.col[h]; // table header가 하나의 행으로 완성됨.
      tr.appendChild(th);
    }

    // table data
    for (var i = 0; i < this.myClass.length; i++) {
      // table에 한 행 추가
      tr = table.insertRow(-1);
      // table header의 길이만큼 순회하며 그에 매칭되는 데이터 가져오기
      for (var j = 0; j < this.col.length; j++) {
        var tabCell = tr.insertCell(-1);
        tabCell.innerHTML = this.myClass[i][this.col[j]];
      }

      // button
      // update button
      this.td = document.createElement("td");
      tr.appendChild(this.td);
      var btUpdate = document.createElement("input");
      btUpdate.setAttribute("type", "button");
      btUpdate.setAttribute("value", "update");
      btUpdate.setAttribute("id", "edit" + i);
      btUpdate.setAttribute("style", "background-color:#44CCEB");
      btUpdate.setAttribute("onclick", "crudApp.update(this)");
      this.td.appendChild(btUpdate);

      // save button
      tr.appendChild(this.td);
      var btSave = document.createElement("input");
      btSave.setAttribute("type", "button");
      btSave.setAttribute("value", "save");
      btSave.setAttribute("id", "save" + i);
      btSave.setAttribute("style", "display:none");
      btSave.setAttribute("onclick", "crudApp.save(this)");
      this.td.appendChild(btSave);

      // delete button
      this.td = document.createElement("td");
      tr.appendChild(this.td);
      var btDelete = document.createElement("input");
      btDelete.setAttribute("type", "button");
      btDelete.setAttribute("value", "delete");
      btDelete.setAttribute("id", "delete" + i);
      btDelete.setAttribute("style", "background-color:#ED5650");
      btDelete.setAttribute("onclick", "crudApp.delete(this)");
      this.td.appendChild(btDelete);
    }

    // 입력 행 추가
    tr = table.insertRow(-1);
    for (var j = 0; j < this.col.length; j++) {
      var newCell = tr.insertCell(-1);
      if (j >= 1) {
        if (j == 2) {
          // 선택 항목 생성
          // select tag로 option tag 감싸주기
          var select = document.createElement("select");
          select.innerHTML = `<option value=""></option>`;
          // this.Category 순회
          for (var k = 0; k < this.Category.length; k++) {
            select.innerHTML =
              select.innerHTML +
              `<option value="${this.Category[k]}">${this.Category[k]}</option>`;
          }
          newCell.appendChild(select);
        } else {
          var tBox = document.createElement("input");
          tBox.setAttribute("type", "text");
          tBox.setAttribute("value", "");
          newCell.appendChild(tBox);
        }
      }
    }

    // create button
    this.td = document.createElement("td");
    tr.appendChild(this.td);
    var btCreate = document.createElement("input");
    btCreate.setAttribute("type", "button");
    btCreate.setAttribute("value", "create");
    btCreate.setAttribute("id", "new" + i);
    btCreate.setAttribute("style", "background-color:#207DD1");
    btCreate.setAttribute("onclick", "crudApp.create(this)");
    this.td.appendChild(btCreate);

    var div = document.getElementById("container");
    div.innerHTML = "<h2>수강관리 앱<h2>";
    div.appendChild(table);
  };

  // delete method
  this.delete = (oButton) => {
    // console.log(oButton); // delete button이 눌린 row에 해당하는 input tag
    var targetIdx = oButton.parentNode.parentNode.rowIndex;
    // console.log(targetIdx);
    this.myClass.splice(targetIdx - 1, 1);
    this.createTable();
  };
})();

crudApp.createTable();

/*
var div = document.getElementById("container");
// getElementByID: 주어진 문자열과 일치하는 id 속성을 가진 요소를 찾고, 이를 나타내는 element 객체를 반환함.
div.innerHTML = "<h1>수강관리 앱</h1>";
// innerHTML: 요소 내에 포함된 HTML 또는 XML 마크업을 가져오거나 설정함.
div.appendChild(table);
// appendChild: 새로운 노드를 해당 노드의 자식 노드 리스트의 가장 마지막에 추가함.
*/
