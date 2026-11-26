import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAllShows } from '../services/showService';
import type { Show } from '../services/showService';
import { getUnavailableSeats } from '../services/seatService';


function SeatSelection() {
  const { showId } = useParams();
  const navigate = useNavigate();

  const [show, setShow] = useState<Show | null>(null);
  const [unavailableSeats, setUnavailableSeats] = useState<string[]>([]);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        const shows = await getAllShows();

        const currentShow = shows.find(
          (item) => item.id === Number(showId)
        );

        if (!currentShow) {
          setError('Show not found.');
          return;
        }

        setShow(currentShow);

        const bookedSeats = await getUnavailableSeats(
          Number(showId)
        );

        setUnavailableSeats(bookedSeats);
      } catch (err) {
        console.error('Failed to load seat selection:', err);
        setError('Unable to load seats. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [showId]);

  const toggleSeat = (seatNumber: string) => {
    if (unavailableSeats.includes(seatNumber)) {
      return;
    }

    setSelectedSeats((previousSeats) =>
      previousSeats.includes(seatNumber)
        ? previousSeats.filter((seat) => seat !== seatNumber)
        : [...previousSeats, seatNumber]
    );
  };

  const capacity = show?.theatre.capacity ?? 0;
  const seatsPerRow = 15;
  const numberOfRows = Math.ceil(capacity / seatsPerRow);

  const rows = Array.from(
    { length: numberOfRows },
    (_, index) => String.fromCharCode(65 + index)
  );

  const totalPrice =
    (show?.ticketPrice ?? 0) * selectedSeats.length;

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <h4>Loading seat selection...</h4>
      </div>
    );
  }

  if (error || !show) {
    return (
      <div className="container py-5 text-center">
        <p className="text-danger">{error || 'Show not found.'}</p>
        <button
          className="btn btn-outline-danger"
          onClick={() => navigate('/shows')}
        >
          Back to Shows
        </button>
      </div>
    );
  }

  return (
    <main className="container py-5 seat-selection-page">
      <button
        className="btn btn-outline-secondary mb-4"
        onClick={() => navigate('/shows')}
      >
        ← Back to Shows
      </button>

      <div className="text-center mb-4">
        <p className="section-label">CHOOSE YOUR SEATS</p>
        <h2>{show.movie.title}</h2>
        <p className="text-secondary">
          {show.theatre.name} · {show.theatre.location}
        </p>
        <p>
          {show.showDate} | {show.showTime}
        </p>
      </div>

      {/* Cinema Screen */}
      <div className="cinema-screen">
        SCREEN
      </div>

      {/* Seat Legend */}
      <div className="seat-legend">
        <div>
          <span className="seat available"></span>
          Available
        </div>

        <div>
          <span className="seat selected"></span>
          Selected
        </div>

        <div>
          <span className="seat occupied"></span>
          Occupied
        </div>
      </div>

      {/* Seat Layout */}
      <div className="seat-layout">
        {rows.map((row) => {
          const firstSeatNumber =
            rows.indexOf(row) * seatsPerRow + 1;

          const seatsInThisRow = Math.min(
            seatsPerRow,
            capacity - (firstSeatNumber - 1)
          );

          return (
            <div className="seat-row" key={row}>
              <span className="row-label">{row}</span>

              {Array.from(
                { length: seatsInThisRow },
                (_, index) => {
                  const seatNumber = `${row}${index + 1}`;

                  const isOccupied =
                    unavailableSeats.includes(seatNumber);

                  const isSelected =
                    selectedSeats.includes(seatNumber);

                  return (
                    <button
                      key={seatNumber}
                      type="button"
                      className={`seat ${
                        isOccupied
                          ? 'occupied'
                          : isSelected
                            ? 'selected'
                            : 'available'
                      }`}
                      disabled={isOccupied}
                      title={seatNumber}
                      onClick={() => toggleSeat(seatNumber)}
                    >
                      {index + 1}
                    </button>
                  );
                }
              )}

              <span className="row-label">{row}</span>
            </div>
          );
        })}
      </div>

      {/* Selected Seats and Price */}
      <div className="seat-booking-summary">
        <h5>Booking Summary</h5>

        <p>
          <strong>Selected Seats:</strong>{' '}
          {selectedSeats.length > 0
            ? selectedSeats.join(', ')
            : 'None'}
        </p>

        <p>
          <strong>Number of Tickets:</strong>{' '}
          {selectedSeats.length}
        </p>

        <p>
          <strong>Price per Ticket:</strong> Rs.{' '}
          {show.ticketPrice.toLocaleString()}
        </p>

        <h4 className="seat-total">
          Total: Rs. {totalPrice.toLocaleString()}
        </h4>

        <button
          className="btn btn-danger w-100 mt-3"
          disabled={selectedSeats.length === 0}
          onClick={() =>
            alert(
              `Selected seats: ${selectedSeats.join(', ')}`
            )
          }
        >
          Continue Booking
        </button>
      </div>
    </main>
  );
}

export default SeatSelection;