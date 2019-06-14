<? // api_reddit.php

// to call this api...
//   http://bottlecap.localhost/application/apis/api_reddit/api_reddit.php/?count=25&after=t3_foobar
// only GET methods are allowed
// request is the path info...
//   /?count=25&after=t3_foobar
// response is a json string created by reddit's api call...
//   https://www.reddit.com/hot.json?count=25&after=t3_foobar

// header
header("Content-Type: application/json");
// note: header for the http_response_code will also be sent upon exit of api

// global constants
define("REDDIT_URL", "https://www.reddit.com");
define("DEFAULT_TAB", "hot");
define("CHILDREN_COUNT", 25);

// To use reddit's api,
// request a url (with a method of GET) and the
// response will be data in a json string.
// Below are some examples of the request url for the reddit's api:
// https://www.reddit.com/hot.json
// https://www.reddit.com/new.json
// https://www.reddit.com/search.json?q=ques
// https://www.reddit.com/hot.json?count=25&after=t3_foobar
// https://www.reddit.com/new.json?count=25&after=t3_foobar
// https://www.reddit.com/search.json?q=ques&type=sr&count=25&after=t3_foobar
// https://www.reddit.com/search.json?q=ques&type=sr&count=29&before=t5_2w2fz

// A url, of course, is used to call this api. The request for this api is the section of the url following the api's file name. i.e.
// url: http://bottlecap.localhost/application/apis/api_reddit/api_reddit.php/?count=25&after=t3_foobar
// request: ?count=25&after=t3_foobar
// PHP already has some built in functions handling the url so there is no need to have a $request variable.
// So to use reddit's api, we will change the above url to...
// changed url: https://www.reddit.com/hot.json?count=25&after=t3_foobar

// method
$method = $_SERVER["REQUEST_METHOD"];

switch($method)
{
  case "GET":

    $tab_or_search = isset($_SERVER["ORIG_PATH_INFO"])
                   ? $_SERVER["ORIG_PATH_INFO"] == "/" 
                     ? "/" . DEFAULT_TAB
                     : $_SERVER["ORIG_PATH_INFO"]
                   : "/" . DEFAULT_TAB;

    //http_response_code(200); // header("HTTP/1.1 200 OK");
    //exit(json_encode("PATH_INFO=".$_SERVER["PATH_INFO"]));
    //exit(json_encode("PATH_INFO=".$_SERVER["ORIG_PATH_INFO"]));
    
    $query_string = $_SERVER["QUERY_STRING"]
                  ? "?" . $_SERVER["QUERY_STRING"]
                  : "";

    $url = REDDIT_URL
         . $tab_or_search
         . ".json"
         . $query_string;

    try
    {
      if (!($response = @file_get_contents($url)))
      {
        throw new Exception("<b>Warning</b>:  "
                          . "file_get_contents($url): "                                                   . "failed to open stream: HTTP request failed! "
                          . "HTTP/1.1 404 Not Found");
      }
      http_response_code(200); // header("HTTP/1.1 200 OK");
      //exit(json_encode($response));
      //exit(json_encode("url=".$url));
      //exit('{"url":."'.$url.'"}');
      exit($response);
    }
    catch (Exception $e)
    {
      http_response_code(500); // header("HTTP/1.1 500 Internal Server Error");
      exit(json_encode(Array("error" => $e->getMessage())));
    }

    break;

  case "POST":
  case "PUT":
  case "DELETE":
  default:
    http_response_code(405); // header("HTTP/1.1 405 Method Not Allowed");
    exit;
}

?>
