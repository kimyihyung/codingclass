<?php
    include "../connect/connect.php";
    include "../connect/session.php";
    include "../connect/sessionCheck.php";
?>

<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>게시판</title>

    <?php include "../include/link.php" ?>
</head>
<body>
    <div id="skip">
        <a href="#header">헤더 영역 바로가기</a>
        <a href="#main">컨텐츠 영역 바로가기</a>
        <a href="#footer">푸터 영역 바로가기</a>
    </div>
    <!-- //skip -->


    <?php include "../include/header.php" ?>
    <!-- //header -->

    <main id="main">
        <section id="board" class="container">
        <h2>게시판 보기 영역입니다.</h2>
            <div class="board__inner">
                <div class="board__title">
                    <h3>게시판</h3>
                    <p>웹디자이너, 웹퍼블리셔, 프론트엔드 개발자를 위한 게시판입니다.</p>
                </div>
                <div class="board__view">
                    <table>
                        <colgroup>
                            <col style="width: 20%">
                            <col style="width: 80%">
                        </colgroup>
                        <tbody>
<?php
    $myBoardID = $_GET['myBoardID'];

    

    // echo $myBoardID;

    // 페이지 뷰 + 1(UPDATE)
    $sql = "UPDATE myBoard SET boardView = boardView + 1  WHERE myBoardID = {$myBoardID}";
    $result = $connect -> query($sql);

    $sql = "SELECT b.boardTitle, m.youName, b.regTime, b.boardView, b.boardContents FROM myBoard b JOIN myMember m ON(m.myMemberID = b.myMemberID) WHERE b.myBoardID = {$myBoardID}";
    $result = $connect -> query($sql);


    if($result){
        $info = $result -> fetch_array(MYSQLI_ASSOC);

        // echo"<pre>";
        // var_dump($info);
        // echo"</pre>";

        // 조회수 상승 (업데이트 이용) mamp로 수업을 못 들어서인지 이해가 부족
    // $sql = "UPDATE myBoard SET boardView = boardView + 1 WHERE myBoardID = {$myBoardID}";
    // $connect -> query($sql);

        echo "<tr><th>제목</th><td>".$info['boardTitle']."</td></tr>";
        echo "<tr><th>등록자</th><td>".$info['youName']."</td></tr>";
        echo "<tr><th>등록일</th><td>".date('Y-m-d H:i', $info['regTime'])."</td></tr>";
        echo "<tr><th>조회수</th><td>".$info['boardView']."</td></tr>";
        echo "<tr><th>내용</th><td class='height'>".$info['boardContents']."</td></tr>";
    }
?>                            
                            <!-- <tr>
                                <th>제목</th>
                                <td>게시판 제목입니다.</td>
                            </tr>
                            <tr>
                                <th>등록자</th>
                                <td>YH</td>
                            </tr>
                            <tr>
                                <th>등록일</th>
                                <td>2022.02.02</td>
                            </tr>
                            <tr>
                                <th>조회수</th>
                                <td>9999</td>
                            </tr>
                            <tr>
                                <th>내용</th>
                                <td class="height">모든 것이 여러분에게 불리하게 다가오는 것처럼 느껴질때,
                                    비행기는 바람에 편승하는게 아니라 바람을 거슬러 이륙한다는 사실을 기억하세요.<br>
                                    행동하는 사람처럼 생각하고, 생각하는 사람처럼 행동하라.<br>
                                    남을 설득하기 위해서는 지성보다 이익에 호소해야 한다.<br>
                                    자세히 들여다보면, 대부분의 갑작스러운 성공은 오랜 시간이 걸렸습니다.<br>
                                    패배는 최악의 실패가 아니다. 시도조차 해보지 않은 것이 진정한 실패이다.<br>
                                    타인의 결점은 우리들의 눈앞에 있고, 우리들 자신의 결점은 우리의 등 뒤에 있다.<br>
                                    두려움은 희망없이 있을 수 없고 희망은 두려움없이 있을수 없다.<br>
                                    내일에 아무런 도움이 되지 않는다면 당신의 과거는 쫓아버려라.<br>
                                    인생은 짧고 예술은 길며, 기회는 순간이고, 경험은 흔들리며, 판단은 어렵다.
                                </td>
                            </tr> -->
                        </tbody>
                    </table>
                </div>
                <div class="board__btn">
                    <a href="boardModify.php?myBoardID=<?=$myBoardID?>">수정하기</a>
                    <a href="boardRemove.php?myBoardID=<?=$myBoardID?>" onclick="alert('정말 삭제하겠습니까?')">삭제하기</a>
                    <a href="board.php">목록보기</a>
                </div>
            </div>
    </section>
    </main>
</body>
</html>