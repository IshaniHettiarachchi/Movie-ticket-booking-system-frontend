import { useEffect, useState } from 'react';
import { getAllShows } from '../services/showService';
import type { Show } from '../services/showService';

function Shows() {
    const [shows, setShows] = useState<Show[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        getAllShows()
            .then((data) => {
                console.log('SHOWS RECEIVED:', data);
                console.log('NUMBER OF SHOWS:', data.length);

                setShows(data);
                setError('');
            })
            .catch((err) => {
                console.error('Failed to load shows:', err);
                setError('Unable to load shows. Please try again.');
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const scheduledShows = shows.filter(
        (show) => show.status === 'SCHEDULED'
    );

    return (
        <>
            <main className="container py-5">
                <div className="section-heading">
                    <div>
                        <p className="section-label">PLAN YOUR VISIT</p>
                        <h2>Find Your Next Showtime</h2>
                    </div>
                    <span className="text-secondary">
                        Choose your favourite show
                    </span>
                </div>

                {loading && (
                    <div className="text-center py-5">
                        <p>Loading shows...</p>
                    </div>
                )}

                {!loading && error && (
                    <div className="text-center py-5">
                        <p className="text-danger">{error}</p>
                        <button
                            className="btn btn-outline-danger"
                            onClick={() => window.location.reload()}
                        >
                            Try Again
                        </button>
                    </div>
                )}

                {!loading && !error && (
                    <div className="row g-4 mt-2">
                        {scheduledShows.map((show) => (
                            <div
                                className="col-12 col-sm-6 col-lg-4"
                                key={show.id}
                            >
                                <div className="movie-card h-100">
                                    <div className="movie-info">
                                        <span className="badge bg-success mb-3">
                                            {show.status}
                                        </span>

                                        <h5>{show.movie.title}</h5>

                                        <p>
                                            <strong>Theatre:</strong> {show.theatre.name}
                                        </p>

                                        <p>
                                            <strong>Location:</strong> {show.theatre.location}
                                        </p>

                                        <p>
                                            <strong>Date:</strong> {show.showDate}
                                        </p>

                                        <p>
                                            <strong>Time:</strong> {show.showTime}
                                        </p>

                                        <p>
                                            <strong>Ticket Price:</strong> Rs. {show.ticketPrice}
                                        </p>

                                        <button
                                            className="btn btn-danger w-100"
                                            disabled
                                        >
                                            Book Tickets (Coming Soon)
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {scheduledShows.length === 0 && (
                            <div className="col-12 text-center py-4">
                                <p>No scheduled shows available yet.</p>
                            </div>
                        )}
                    </div>
                )}
            </main>
            <footer className="cinema-footer">
                <div className="container d-flex flex-column flex-md-row justify-content-between gap-2">
                    <span className="fw-bold">▶ CineBook</span>
                    <span>Movie Ticket Booking System · </span>
                </div>
            </footer>
        </>
    );
}
export default Shows;
