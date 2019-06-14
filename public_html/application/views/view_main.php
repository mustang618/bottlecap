<?include("header.php")?>
    <div id="div_middle">
      <div id="div_search" style="display: none;">
        showing results for: <span id="span_search">$0</span>
      </div>
      <div id="div_listings" style="display: none;">
        <table id="table_listings">
          <td>
            $0
          </td>
          <td>
            <a href="$1"><img src="$2" alt=""/></a>
          </td>
          <td>
            <a href="$3">$4</a><br/><a class="listing_domain" href="//$5">$6</a>
          </td>
        </table>
      </div>
      <div id="div_pagination" style="display: none;">
        view more:
        <span id="span_previous" style="display: none;"><a href="$0">&lt;&nbsp;prev</a> | </span>
        <span id="span_next" style="display: none;"><a href="$1">next&nbsp;&gt;</a></span>
      </div>
    </div> <!-- div#middle -->
<?include("footer.php")?>

<!--<script src="application/js/js_main.js"></script>-->
<script src="application/js/js_main_jquery.js"></script>
