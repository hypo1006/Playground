var http = require('http');
//http 변수선언 -> 라이브러리를 불러옴

var app = http.createServer(function(client, server){ //서버메소드 생성 client-> 클라이언트가 서버에게  server-> 서버가 클라이언트에게 응답
    server.writeHead(200); // 서버 상태 전송 (404 -> 서버를 찾을 수 없음)
    server.write("Hello hypo1006"); //데이터 전송
    server.end(); // 응답 종료.
})
app.listen(80); // 클라이언트의 응답을 기다림.(80 -> 디폴트 값) 
console.log("서버가 작동합니다.");