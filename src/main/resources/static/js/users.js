//========== 변수 ==========//

let isUsernameSameCheck = false; // 초기화하지 않으면 default 값이 true. 중복체크를 하지 않으면 넘어가지 않게 하기 위해서

//========== 

// 회원가입
$("#btnJoin").click(() => {
	join(); // 내부 코드는 가장 아래에 함수로 정의해서 빼버리기
});

// 유저네임 중복 체크
$("#btnUsernameSameCheck").click(() => {
	checkUsername();
});

// 로그인
$("#btnLogin").click(() => {
	login();
});

// DELETE : body 없다. 
$("#btnDelete").click(() => {
	resign();
});

// UPDATE
$("#btnUpdate").click(() => {
	update();
});



//========== function ==========//

function join() {
	if (isUsernameSameCheck == false) {
		alert("유저네임 중복 체크를 진행해주세요");
		return; // 실행종료. 아래 코드 진행안됨.
	}

	// 0. 통신 오브젝트 생성
	let data = {
		username: $("#username").val(),
		password: $("#password").val(),
		email: $("#email").val()
	};

	$.ajax("/join", {
		type: "POST",
		dataType: "json",
		data: JSON.stringify(data),
		headers: {
			"Content-Type": "application/json"
		}
	}).done((res) => {
		if (res.code == 1) {
			alert("회원가입성공");
			location.href = "/loginForm";
		}
	});
}

function checkUsername() {
	// 0. 통신 오브젝트 생성 (Get 요청은 body가 없다 = 통신을 해도 오브젝트 생성할 필요가 없음.)

	// 1. 사용자가 적은 username 값을 가져오기
	let username = $("#username").val();

	// 2. Ajax 통신
	$.ajax(`/users/usernameSameCheck?username=${username}`, {
		type: "GET",
		dataType: "json", // 서버로부터 받는 데이터 타입(이었으면 좋겠어~). 안적으면 기본 json! 
		async: true // 비동기적
	}).done((res) => { // res : 응답결과가 담긴다. 변수이름은 상관없음. res도 r도 다 됨  
		if (res.code == 1) { // 통신 성공
			if (res.data == false) {
				alert("아이디가 중복되지 않았습니다.");
				isUsernameSameCheck = true;
			} else {
				alert("아이디가 중복되었어요. 다른 아이디를 사용해주세요.");
				isUsernameSameCheck = false;
				$("#username").val("");
			}
		}
	});
}

function login() {
	let data = {
		username: $("#username").val(),
		password: $("#password").val()
	};

	$.ajax("/login", {
		type: "POST",
		dataType: "json",
		data: JSON.stringify(data),
		headers: {
			"Content-Type": "application/json; charset=utf-8"
		}
	}).done((res) => {
		if (res.code == 1) {
			location.href = "/";
		} else {
			alert("로그인 실패, 아이디 패스워드를 확인해주세요");
		}
	});
}

function resign() {
	let id = $("#id").val();

	$.ajax("/users/" + id, {
		type: "DELETE",
		dataType: "json"
	}).done((res) => {
		if (res.code == 1) {
			alert("회원탈퇴 완료");
			location.href = "/";
		} else {
			alert("회원탈퇴 실패");
		}
	});
}

function update() {
	let data = {
		password: $("#password").val(),
		email: $("#email").val()
	};
	let id = $("#id").val();

	$.ajax("/users/" + id, {
		type: "PUT",
		dataType: "json",
		data: JSON.stringify(data),
		headers: {
			"Content-Type": "application/json; charset=utf-8"
		}
	}).done((res) => {
		if (res.code == 1) {
			alert("회원수정완료");
			location.reload(); // f5
		} else {
			alert("업데이트에 실패하였습니다");
		}
	});
}