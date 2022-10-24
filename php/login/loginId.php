<!-- 로그인 가입 팝업 -->
<div class="login__popup">
    <div class="login__inner">
        <div class="login__header">
            <h3>로그인</h3>
        </div>
        <div class="login__contents">
            <form name="login" action="../login/loginSave.php" method="post">
                <fieldset>
                    <legend>로그인 입력폼</legend>
                    <div>
                        <label for="youName" class="blind">이름</label>
                        <input type="text" name="youName" id="youName" placeholder="이름" required>
                    </div>
                    <div>
                        <label for="youEmail" class="blind">이메일</label>
                        <input type="text" name="youEmail" id="youEmail" placeholder="이메일" required>
                    </div>
                </fieldset>
                <button type="submit" class="input__button">아이디찾기</button>
            </form>
        </div>
        
    </div>
</div>