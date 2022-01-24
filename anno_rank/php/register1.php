<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset='utf-8'>
    <title>register</title>
    <style type="text/css">
        textarea{
            width: 90%;
            height: 70px;
        }
    </style>
</head>
<body>
<?php
$htmlurl = $_GET['htmlurl'];
$word = $_GET['word'];

echo "<p>選択ワード: ".$word."</p>";
?>

<form name="register" action="http://trezia2.db.ics.keio.ac.jp/Annosys/register2.php" method="post">
    <textarea class="textlines" id="annotation" name="annotation" placeholder="annotation"></textarea><br>
    <p>ユーザー<br>
    <input type='radio' name='user' value='0'>toyama
    <input type='radio' name='user' value='1'>jun
    <input type='radio' name='user' value='2'>goto
    <input type='radio' name='user' value='3'>saeki
    <input type='radio' name='user' value='4'>li
    <input type='radio' name='user' value='5'>tsukuda
    <input type='radio' name='user' value='6'>yama
    <input type='radio' name='user' value='7'>ayumi
    <input type='radio' name='user' value='8'>kuri
    </p>

<?php
echo "<input type='hidden' name='htmlurl' value=$htmlurl>";
echo "<input type='hidden' name='word' value=$word>";
?>
<br>
    <input type="submit" value="submit">
</form>
</body>
</html>