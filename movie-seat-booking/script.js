const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

let ticketPrice = +movieSelect.value;
const updateTotal = () => {
  total.innerText = count.innerText * ticketPrice;
};

const initialUI = () => {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
  if (selectedSeats !== null && selectedSeats.length > 0) {
    count.innerText = selectedSeats.length;
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
  }

  const selectedMovie = localStorage.getItem('selectedMovie');
  if (selectedMovie !== null) {
    movieSelect.value = selectedMovie;
  }

  const selectedMoviePrice = localStorage.getItem('selectedMovie');
  if (selectedMoviePrice !== null) {
    ticketPrice = +selectedMoviePrice;
  }
  updateTotal();
};

initialUI();

const updateSelectedCount = () => {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');
  count.innerText = selectedSeats.length;

  // Copy selected seats into arr
  // Map through array
  // Return a new array of indexes
  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));

  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));
};

container.addEventListener('click', (e) => {
  if (
    e.target.classList.contains('seat') &&
    !e.target.classList.contains('occupied')
  ) {
    e.target.classList.toggle('selected');

    updateSelectedCount();
    updateTotal();
  }
});

movieSelect.addEventListener('change', (e) => {
  ticketPrice = +e.target.value;

  localStorage.setItem('selectedMovie', e.target.value);
  updateTotal();
});
