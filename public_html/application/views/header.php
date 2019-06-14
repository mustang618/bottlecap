<!DOCTYPE html>
<html>
  <head>

    <title>bottlecap... a reddit-like web app (Actually, it even uses their apis!)</title>
    <link rel="shortcut icon" href="application/images/logo_32x32.png">

    <!-- bootstrap -->
    <link rel="stylesheet" type="text/css" href="application/css/bootstrap.min.php"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!--<meta name="viewport" content="width=device-width; initial-scale=1.0; maximum-scale=1.0; user-scalable=0;" />-->

    <!-- custom css -->
    <link rel="stylesheet" type="text/css" href="application/css/bottlecap.php"/>

    <!-- fonts -->
    <link rel="stylesheet" type="text/css" href="application/css/fonts.css"/>

    <!-- jquery -->
    <script src="application/js/jquery-3.2.1.min.js"></script>

  </head>
  <body>
    <div id="div_header">
      <a id="a_logoandtitle" href="/">
        <img src="application/images/logo_64x64_e6e6e6.png" alt="bottlecap"/>
        <span id="span_title">bottlecap</span>
      </a>
      <span id="span_menuandform">
        <span id="span_menu">
          <a href="/">hot</a>
          <a href="/new">new</a>
        </span>
        <form id="form_search" action="/search">
          <input id="q" name="q" type="text" maxlength="64" placeholder="search" value="<?=isset($_GET["q"]) ? $_GET["q"] : ""?>"/>
          <input type="submit" value="search">
        </form>
      </span>
    </div> <!-- div#header -->

<!-- * * * * * * * * * * end of header * * * * * * * * * * -->
