// js_main.js

const COUNT = 25;

function getQueryVariable(variable)
{
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}

function api_reddit()
{
  var url_api = 'http://' + window.location.hostname  + '/application/apis/api_reddit/api_reddit.php' + window.location.pathname + window.location.search;

  var request = new XMLHttpRequest();

  request.open('GET', url_api, true);
  request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  //request.onload = function()
  request.onreadystatechange = function()
  {
    if (request.readyState === XMLHttpRequest.DONE)
    {
      if (request.status == 200)
      {
        var response = JSON.parse(request.response);
        if (response)
        {
          api_response_yes(response);
        }
        else
        {
          api_response_no();
        }
      }
    }
  };
  request.send(null);
}

function api_response_yes(response)
{

  // innerHTML for divs by id
  var innerHTML_listings = "";
  var innerHTML_pagination = "";
  
  // get variables
  var get_count = +getQueryVariable("count");
  var get_q = getQueryVariable("q");
  
  // listing_number is the start number for listings shown on the side
  var listing_number = 1;
  if ( get_count % COUNT )
  {
    listing_number = get_count - COUNT;
  }
  else
  {
    listing_number = get_count + 1;
  }
  
  // innerHTML for pagination first
  
  var href_q;
  if (get_q)
  {
    href_q = 'q=' + get_q + '&';
  }
  else
  {
    href_q = '';
  }
  
  // previous pagination link
  
  if (response.data.before)
  {
    var href_count_before;
    if ( get_count % COUNT )
    {
      href_count_before = 'count=' + (get_count - COUNT);
    }
    else
    {  
      href_count_before = 'count=' + (get_count + 1);
    }
    var href_before = '&before=' + response.data.before;
    var a_prev_href = window.location.origin + window.location.pathname + '?' + href_q + href_count_before + href_before;
    innerHTML_pagination += '<a href="' + a_prev_href + '"><&nbsp;prev</a> | ';
  
  }
  
  // next pagination link
  
  if (response.data.after)
  {
    var href_count_after;
    if ( get_count % COUNT )
    {
      href_count_after = 'count=' + (get_count - 1);
    }
    else
    {  
      href_count_after = 'count=' + (get_count + COUNT);
    }
    var href_after = '&after=' + response.data.after;
    var a_next_href = window.location.origin + window.location.pathname + '?' + href_q + href_count_after + href_after;
    innerHTML_pagination += '<a href="' + a_next_href + '">next&nbsp;></a>';
  }
  
  // innerHTML pagination
  
  document.getElementById('pagination').innerHTML = 'view more: ' + innerHTML_pagination;
  
  // innerHTML for listings
  
  innerHTML_listings = '<table>';
  
  for (var index in response.data.children)
  {
    var response_thumbnail = response.data.children[index].data.thumbnail;
    var src_thumbnail;
    switch(response_thumbnail)
    {
      case 'default':
        src_thumbnail = 'application/images/link_128x128.gif';
        break;
      case 'self':
        //src_thumbnail = 'application/images/link_64x64.png';
        src_thumbnail = 'application/images/link_128x128.gif';
        break;
      case 'image':
        //src_thumbnail = 'application/images/link_64x64.png';
        src_thumbnail = 'application/images/link_128x128.gif';
        break;
      default:
        src_thumbnail = response_thumbnail;
    }
  
    innerHTML_listings += '<tr>' +
                            '<td>' + listing_number++ + '</td>' +
                            '<td width="100px">' +
                              '<a href="' + response.data.children[index].data.url + '">' +
                                '<img src="'+ src_thumbnail + '" alt="" width="64px"/>' +
                              '</a>' +
                            '</td>' +
                            '<td>' +
                              '<a href="' + response.data.children[index].data.url + '">' +
                                 response.data.children[index].data.title + 
                              '</a>' +
                              '<br/>' +
                              '(<a href="//' + response.data.children[index].data.domain + '">' +
                                 response.data.children[index].data.domain +
                              '</a>)' +
                            '</td>' +
                          '</tr>';
  }
  
  innerHTML_listings += '</table>';
  
  document.getElementById('listings').innerHTML = innerHTML_listings;

}

function api_response_no()
{
}

api_reddit();
