<?php 
	set_include_path('.:/usr/lib/php:/usr/local/lib/php:/home/idzhar/php');
	$contents = file_get_contents('index.html');
	if(isset($_GET['page']))
		$contents = file_get_contents($_GET['page']);
	eval('?>'.$contents);
?>