describe('Movie', function() {
  it('create movie object with tickets', function() {
    var newMovie = new Movie('rear window', false, 20);
    expect(newMovie.movieName).to.equal('rear window');
    expect(newMovie.firstShowing).to.equal(false);
    expect(newMovie.ticketAmount).to.equal(20);
    expect(newMovie.idlocal).to.equal(1);
    expect(newMovie.tickets).to.eql([]);
  });
});

describe('Ticket', function () {
  it('create ticket object with given properties', function () {
    var newMovie = new Movie('rear window', true, 20);
    var newTicket = new Ticket(newMovie, 'Senior', false);
    expect(newTicket.getPrice()).to.equal(15);
  });

  it('subtracts one ticket from total tickets when created', function() {
    var newMovie = new Movie('rear window', true, 20);
    var newTicket = new Ticket(newMovie, 'Senior', false);
    newMovie.reserveTicket();
    expect(newMovie.ticketAmount).to.equal(19);
  });
});
