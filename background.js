$(document).ready(function() {
  var author = $(location).attr('href').match(/twitter\.com\/(.*)/)[1];
  var sidebar = $('.ProfileHeaderCard');
  var navbar = $('.ProfileNav-item--tweets');
  var books = {};

  if (author) {
    fetch_books(author);
  }

  function fetch_books(author) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://www.authorgraph.com/authors/" + author + ".json", true);
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4) {
        if (xhr.status == 200) {
          var resp = JSON.parse(xhr.responseText);
          books = resp['books'].sort(function(a,b){return a.data.salesrank - b.data.salesrank});
          if (books.length > 0) {
            $(sidebar).after(sidebar_block());
            $(navbar).after(navbar_block());
          }
        }
      }
    }
    xhr.send();
  }

  function sidebar_block() {
    var title = books.length > 1 ? " Books" : " Book";
    var html_start = '<div class="PhotoRail" style="display: block;"><div class="PhotoRail-heading"><span class="glyphicon glyphicon-book"></span><span class="PhotoRail-headingText"><a href="http://www.authorgraph.com/authors/' + author + '" target="_blank"> ' + books.length + title + ' </a></span></div><div class="PhotoRail-mediabox">';

    var html_body = '';
    for (var i in books) {
      if (i > 5) break;
      html_body += '<span><a href="http://www.amazon.com/gp/product/' + books[i].asin + '?tag=authorgraph-20" target="_blank"><img src="' + books[i].image_url + '" style="height: 83px; width: 83px; margin: 5px 0 0 3px; border-radius: 4px"></a></span>';
    }

    var html_end = '</div></div>';
    return html_start + html_body + html_end;
  }

  function navbar_block() {
    var html = '<li class="ProfileNav-item ProfileNav-item--books"><a class="ProfileNav-stat ProfileNav-stat--link u-borderUserColor u-textCenter js-tooltip u-textUserColor" href="http://www.authorgraph.com/authors/' + author + '" target="_blank"><span class="ProfileNav-label">Books</span><span class="ProfileNav-value">' + books.length + '</span></a></li>';
    return html;
  }

});
