<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset='utf-8'>
    <title>register</title>
</head>

<body>
<?php
$contents = $_GET['contents'];
$pageurl = $_GET['pageurl'];

echo "<p>記事内容: ".$contents."</p>";
echo "<p>URL: ".$pageurl."</p>";

$command="python exec_from_php.py";
exec($command,$output);
print "$output[0]";
echo "<br>";
print "$output[1]";

?>
</body>

</html>