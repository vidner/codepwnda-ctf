<?php
function get_content($url)
{
    $session = curl_init();

    curl_setopt($session, CURLOPT_URL, $url);
    curl_setopt($session, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($session, CURLOPT_CONNECTTIMEOUT, 10);
    curl_setopt($session, CURLOPT_TIMEOUT, 10);
    curl_setopt($session, CURLOPT_HEADER, false);
    curl_setopt($session, CURLOPT_USERAGENT, "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36");

    $content = curl_exec($session);

    curl_close($session);

    return $content;
}
?>

<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>mpf-php</title>
  <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet">
  <link href="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" rel="stylesheet">
</head>

<body>
  <br />
  <div class="container justify-content-center">
    <div class="row align-items-center">
      <div class="col-12 card card-sm">
        <div class="card-body">
          
          <div class="row">
            <div class="col-8">
              <h1 class="display-3">mpf?</h1>
              <p class="lead">Give me a link and I'll visit that for you.</p>
            </div>
          </div>

          <hr class="my-4">

          <form autocomplete="off" action="/" method="POST">
            <div class="input-group">
              <input autocomplete="off" class="form-control form-control-lg form-control-borderless" type="text" name="url" placeholder="https://fb.me" autofocus value="http://facebook.com">
              <div class="input-group-append">
                <button class="btn btn-lg btn-success" type="submit"><i class="fa fa-globe"></i></button>
              </div>
            </div>
          </form>

        </div>
      </div>
    </div>

    <br />

    <div class="row">
      <div class="col-12 card">
        <pre>
<?php 
$content = "error";
if (isset($_POST['url']) && !empty($_POST["url"]))
    $content = get_content($_POST['url']);
echo $content;
?>
        </pre>
      </div>
    </div>

    <br />
    <hr />

    <footer>
      <div class="row">
        <div class="col-12">
          <p class="text-center font-italic">mpf-php</p>
          <!-- <p>circleous</p> -->
        </div>
      </div>
    </footer>

  </div>
</body>
</html>