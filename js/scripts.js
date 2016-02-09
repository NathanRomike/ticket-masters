function Movie(movieName, firstShowing, ticketAmount) {
  this.movieName = movieName;
  this.firstShowing = firstShowing;
  this.ticketAmount = ticketAmount;
  this.tickets = [];
}

Movie.prototype.reserveTicket = function() {
  if (this.ticketAmount > 0) {
    this.ticketAmount -= 1;
    return true;
  } else {
    return false;
  }
}

function Ticket(movie, age, matinee) {
  this.movie = movie;
  this.age = age;
  this.matinee = matinee;
}

Ticket.prototype.getPrice = function () {
  var maxPrice = 50;
  if (this.movie.firstShowing === true) {
    maxPrice -= 30;
  }
  if ((this.age === "Senior") || (this.age === "Child")) {
    maxPrice -= 5;
  }
  if (this.matinee === true) {
    maxPrice -= 8;
  }
  return maxPrice;
}

$(document).ready(function() {
  $("form#new-movie").submit(function(event) {
    event.preventDefault();

    var inputMovieName = $("input#new-movie-name").val();
    var inputCurrentShowing = $("select#new-first-showing-property").val();
    var inputTicketAmount = parseInt($("input#ticket-amount").val());
    var newMovie = new Movie(inputMovieName, (inputCurrentShowing === "true"), inputTicketAmount);
    if (newMovie.firstShowing) {
      var showingProperty = 'Second run';
    } else {
      var showingProperty = 'Premier';
    }
    $("#movies").append('<li class="new-movie">' +
      '<h3>' + newMovie.movieName + '</h3>' +
      '<p>' + showingProperty + '</p>' +
      '<p id="tickets-left'+newMovie.movieName+'">' + newMovie.ticketAmount + '</p>' +
      '<p class="link" id="add-ticket'+newMovie.movieName+'">' + 'buy ticket' + '</p>' + '</li>');

    $("#movies").find("#add-ticket"+newMovie.movieName).click(function() {
      $("#show-ticket-form").remove();
      $(".col-md-4").append('<div id="show-ticket-form">' +
        '<form id="new-ticket">'+
          '<div class="form-group">'+
            '<label for="age">Age category</label>'+
            '<select name="age" id="age">'+
              '<option value="Adult">Adult</option>'+
              '<option value="Senior">Senior</option>'+
              '<option value="Child">Child</option>'+
            '</select>'+
          '</div>'+
          '<div class="form-group">'+
            '<label for="matinee">Showing time</label>'+
            '<select name="matinee" id="matinee">'+
              '<option value="false">Evening</option>'+
              '<option value="true">Matinee</option>'+
            '</select>'+
        '  </div>'+
          '<button type="submit" class="btn">Reserve ticket for ' + newMovie.movieName + '</button>'+
        '</form>'+
        '<ul id="tickets">'+

        '</ul>'+
      '</div>');

      $("form#new-ticket").submit(function(event) {
        event.preventDefault();
        $(".price").remove();
        var inputAge = $("select#age").val();
        var inputMatinee = ($("select#matinee").val() === 'true');
        var newTicket = new Ticket(newMovie, inputAge, inputMatinee);
        $("#tickets").append('<li class="price">' + '<p>' + 'Ticket price is <strong>$' + newTicket.getPrice() + '</strong>' + '</p>' + '</li>');
        if (!newMovie.reserveTicket()) {
          $("#tickets").append('<li class="price">' + '<p>' + 'Sorry, this show is sold out' + '</p>' + '</li>');
        } else {
          $("#movies").find("#tickets-left"+newMovie.movieName).text(newMovie.ticketAmount);
        }
      });
    });

  });
});
