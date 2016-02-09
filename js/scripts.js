function Movie(movieName, firstShowing, ticketAmount) {
  this.movieName = movieName;
  this.firstShowing = firstShowing;
  this.ticketAmount = ticketAmount;
  this.tickets = [];
}

Movie.prototype.reserveTicket = function() {
  this.ticketAmount -= 1;
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
    var inputTicketAmount = $("input#ticket-amount").val();
    var newMovie = new Movie(inputMovieName, inputCurrentShowing, inputTicketAmount);

    if (newMovie.firstShowing) {
      var showingProperty = 'Premier';
    } else {
      var showingProperty = 'Second run';
    }
    $("#movies").append('<li class="new-movie">' +
      '<h3>' + newMovie.movieName + '</h3>' +
      '<p>' + showingProperty + '</p>' +
      '<p id="add-ticket">' + 'buy ticket' + '</p>' + '</li>');

    $("#movies").find("#add-ticket").click(function() {
      $("#show-ticket-form").show();
      $("form#new-ticket").submit(function(event) {
        event.preventDefault();
        var inputAge = $("select#age").val();
        var inputMatinee = ($("select#matinee").val() === 'true');
        var newTicket = new Ticket(newMovie, inputAge, inputMatinee);

        $("#tickets").append('<li class="price">' + '<p>' + 'Ticket price is <strong>$' + newTicket.getPrice() + '</strong>' + '</p>' + '</li>');
      });
    });

  });
});
