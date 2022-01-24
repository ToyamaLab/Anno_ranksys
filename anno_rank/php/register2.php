<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset='utf-8'>
</head>
<body>
<?php
    if(!$conn = pg_connect("host=localhost port=5432 dbname=saeki user=saeki password=yui1554")){
        print("ERROR!\n");
        exit;
    }

    $annotation = $_POST["annotation"];
    $word = $_POST["word"];
    $htmlurl = $_POST["htmlurl"];
    $userid=(int) $_POST["user"];

    echo "投稿ありがとうございます";
    $result1 = pg_prepare($conn, "annot_insert", 'INSERT INTO annotation1 (user_id, word, annotation, url, added_time) values ($1, $2, $3, $4, current_timestamp)');
    $result1 = pg_execute($conn, "annot_insert", array($userid, $word, $annotation, $htmlurl));
    pg_close($conn);
?>
</body>
</html>
