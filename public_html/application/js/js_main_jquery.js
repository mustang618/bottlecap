// js_main.js

const COUNT = 25; // number of listings in a page

function get_query(name)
{
  return (location.search.split(name + '=')[1] || '').split('&')[0];
}

function api_reddit()
{
  var url_api = 'http://' + location.hostname + '/application/apis/api_reddit/api_reddit.php' + location.pathname + location.search;
  
  //window.alert(url_api);
  $.get( url_api, function( response ) {
    api_response_yes(response);
  }, "json" );
}

function api_response_yes(response)
{
  //window.alert(JSON.stringify(response));
  
  // innerHTML for divs by id
  var innerHTML_div_search = ''; // is shown only if there is a search query
  var innerHTML_div_pagination = '';
  var innerHTML_table_listings = ''

  // get variables
  var get_count = +get_query('count');
  var get_q = get_query('q'); // user search


  
  // process innerHTML for search

  var href_q; // is shown only if there is a search query
  if (get_q) { href_q = 'q=' + get_q + '&'; }
  else       { href_q = ''; }

  if (get_q)
  {
    innerHTML_div_search = $('#div_search').html();
    innerHTML_div_search = innerHTML_div_search.replace('$0', get_q);
    $('#div_search').html(innerHTML_div_search);
    $("#div_search").show(); // as it was display: none before
  }
  /*else
  {
    $("#div_search").hide();
  }*/



  // process innerHTML for listings

  // listing_number is the start number for listings shown on the side
  var listing_number = 1;
  if ( get_count % COUNT ) { listing_number = get_count - COUNT; }
  else                     { listing_number = get_count + 1; }

  // created a row in the table with all the html code
  // search $vars and replace with the response data
  var template = $('#table_listings').html();

  // create a table row for each of the data children

  for (var i in response.data.children)
  {
    // assign a thumbnail when the thumbnail is blank
    var response_thumbnail = response.data.children[i].data.thumbnail;
    var src_thumbnail;
    switch(response_thumbnail)
    {
      case 'default':
      case 'self':
      case 'image':
        //src_thumbnail = 'application/images/link_128x128.gif';
        src_thumbnail = 'application/images/logo_32x32.png';
        break;
      default:
        src_thumbnail = response.data.children[i].data.thumbnail;
    }

    var row = template;
    row = row.replace('$0', listing_number++);
    row = row.replace('$1', response.data.children[i].data.url);
    row = row.replace('$2', src_thumbnail);
    row = row.replace('$3', response.data.children[i].data.url);
    row = row.replace('$4', response.data.children[i].data.title);
    row = row.replace('$5', response.data.children[i].data.domain);
    row = row.replace('$6', response.data.children[i].data.domain);

    innerHTML_table_listings += row;

  }
  
  $('#table_listings').html(innerHTML_table_listings);
  $('#div_listings').show(); // as it was display: none before



  // process innerHTML for pagination 
  
  //innerHTML_div_pagination = 'view more: ';
  innerHTML_div_pagination = $('#div_pagination').html();

  // previous pagination link - this link is shown only after the first page
  
  if (response.data.before)
  {
    var href_count_before;
    if ( get_count % COUNT ) { href_count_before = 'count=' + (get_count - COUNT); }
    else                     { href_count_before = 'count=' + (get_count + 1); }
    var href_before = '&before=' + response.data.before;
    var a_prev_href = location.origin + location.pathname + '?' + href_q + href_count_before + href_before;
    innerHTML_div_pagination = innerHTML_div_pagination.replace('$0', a_prev_href);
  }
  
  // next pagination link
  
  if (response.data.after)
  {
    var href_count_after;
    if ( get_count % COUNT ) { href_count_after = 'count=' + (get_count - 1); }
    else                     { href_count_after = 'count=' + (get_count + COUNT); }
    var href_after = '&after=' + response.data.after;
    var a_next_href = location.origin + location.pathname + '?' + href_q + href_count_after + href_after;
    innerHTML_div_pagination = innerHTML_div_pagination.replace('$1', a_next_href);
  }

  $('#div_pagination').html(innerHTML_div_pagination);
  if (response.data.before) {$("#span_previous").show();}
  if (response.data.after) {$("#span_next").show();}
  $("#div_pagination").show(); // as it was display: none before

}

api_reddit();
