<? // index.php

// constants - usually in a config file ***
define("ARG0", "hot|new|search");

// validate url components
$url_path = trim(parse_url($_SERVER["REQUEST_URI"], PHP_URL_PATH));
$url_query = trim(parse_url($_SERVER["REQUEST_URI"], PHP_URL_QUERY));
$url_anchor = trim(parse_url($_SERVER["REQUEST_URI"], PHP_URL_FRAGMENT));

// get url path arguments: /arg0/arg1
// or in mvc architectural pattern the url path is: /controller/function
$url_args = explode("/", trim(parse_url($_SERVER["REQUEST_URI"], PHP_URL_PATH),"/"));
$url_arg0 = isset($url_args[0]) ? $url_args[0] : "";
$url_arg1 = isset($url_args[1]) ? $url_args[1] : "";

// Note: In this case, the arg0 does not represent the controller. If arg0 is valid and then route to the main controller. Otherwise, call the page_not_found controller.

// for testing
//echo "|$url_arg0|$url_arg1|$url_anchor|";

// determine controller/routing
if ( (!$url_arg0 || $url_arg0 == "/" || is_numeric(strpos(ARG0, $url_arg0))) &&
     (!$url_arg1) &&
     (!$url_anchor) )
{
  // validate query string here? ***
  $controller = "main";
}
else
{
  $controller = "pnf";
}

// and away we go...
include("application/controllers/controller_$controller.php");

exit;

?>
