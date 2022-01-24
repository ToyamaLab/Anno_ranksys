<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset='utf-8'>
    <title>register</title>
</head>

<body>
<?php
$pageurl = $_GET['pageurl'];
echo "<p>URL: ".$pageurl."</p>";

$command = "python3 /work_stream/annotation/bertclick.py $pageurl";
exec($command,$output);
print "$output[0]";


?>
</body>

</html>