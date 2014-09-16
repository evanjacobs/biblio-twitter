$(document).ready(function() {
    var current_user = $(location).attr('href').match(/twitter\.com\/(.*)/)[1];
    var elem = $('.ProfileHeaderCard');
    var books = {};

    if (current_user) {
      fetch_books(current_user);
    }

    function fetch_books(author) {
	var xhr = new XMLHttpRequest();
	xhr.open("GET", "https://www.authorgraph.com/authors/" + author + ".json", true);
	xhr.onreadystatechange = function() {
	    if (xhr.readyState == 4) {
		if (xhr.status == 200) {
		    var resp = JSON.parse(xhr.responseText);
		    var books = resp['books'];
		    if (books.length > 0) {
                      var block = books_block(books, author);
		      $(elem).after(block);
		    }
		}
	    }
	}
	xhr.send();
    }

    function books_block(books, author) {
      var title = books.length > 1 ? " Books" : " Book";
      var html_start = '<link href="//netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap.min.css" rel="stylesheet"><div class="PhotoRail" style="display: block;" data-loaded="true"><div class="PhotoRail-heading"><span class="glyphicon glyphicon-book"></span><span class="PhotoRail-headingText"><a href="/' + author + '/books" class="js-nav"> ' + books.length + title + ' </a></span></div>';

      var html_body = '';
      for (var i in books) {
        html_body += '<div class="PhotoRail-mediabox"><span><a href="http://www.amazon.com/dp/' + books[i].asin + '" target="_blank"><img src="' + books[i].image_url + '" style="height: 83px; width: 83px;" /></span></div>';
      }

      var html_end = '</div>';
      return html_start + html_body + html_end;
    }

});
