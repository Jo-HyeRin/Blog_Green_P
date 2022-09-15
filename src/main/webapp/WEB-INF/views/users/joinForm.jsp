<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<%@ include file="../layout/header.jsp"%>

<div class="container">
   <form>
      <div class="mb-3 mt-3">
         <input id="username" type="text" class="form-control" placeholder="Enter username">
         <button id="btnUsernameSameCheck" class="btn btn-warning" type="button">유저네임 중복체크</button>
      </div>
      <div class="mb-3">
         <input id="password" type="password" class="form-control" placeholder="Enter password">
      </div>
      <div class="mb-3">
         <input id="email" type="email" class="form-control" placeholder="Enter email">
      </div>
      <button id="btnJoin" type="button" class="btn btn-primary">회원가입</button>
   </form>
</div>

<script>
   let isUsernameSameCheck = false; // 초기화하지 않으면 default 값이 true. 중복체크를 하지 않으면 넘어가지 않게 하기 위해서
   
   // 회원가입
   $("#btnJoin").click(()=>{
      if(isUsernameSameCheck == false){
         alert("유저네임 중복 체크를 진행해주세요");
         return; // 실행종료. 아래 코드 진행안됨.
      }
      
      // 0. 통신 오브젝트 생성
      let data = {
            username: $("#username").val(),
            password: $("#password").val(),
            email: $("#email").val()
      };
      
      $.ajax("/join",{
         type: "POST",
         dataType: "json",
         data: JSON.stringify(data),
         headers : {
               "Content-Type" : "application/json"
         }
      }).done((res)=>{
         if(res.code == 1){
        	 alert("회원가입성공");
            location.href = "/loginForm";
         }
      });
   });
   
   
   // 유저네임 중복 체크
   $("#btnUsernameSameCheck").click(()=>{
      // 0. 통신 오브젝트 생성 (Get 요청은 body가 없다 = 통신을 해도 오브젝트 생성할 필요가 없음.)
      
      // 1. 사용자가 적은 username 값을 가져오기
      let username = $("#username").val();   

      // 2. Ajax 통신
      $.ajax("/users/usernameSameCheck?username="+username,{
         type:"GET",
         dataType: "json", // 서버로부터 받는 데이터 타입(이었으면 좋겠어~). 안적으면 기본 json! 
         async: true // 비동기적
      }).done((res)=>{ // res : 응답결과가 담긴다. 변수이름은 상관없음. res도 r도 다 됨  
         console.log(res);
         if(res.code == 1){ // 통신 성공
            if(res.data == false){
               alert("아이디가 중복되지 않았습니다.");
               isUsernameSameCheck = true;
            }else{
               alert("아이디가 중복되었어요. 다른 아이디를 사용해주세요.");
               isUsernameSameCheck = false;
               $("#username").val("");
            }
         }
      });
   });
   

   
</script>

<%@ include file="../layout/footer.jsp"%>




