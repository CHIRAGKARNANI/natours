import axios from 'axios';
import { showAlert } from './alerts';

const stripe = Stripe(
  'pk_test_51JM8rRSGJAyiT92ENWFz16LqOO5iOjs0cr76QjhVZh4D44FPA110rvhZO571KtoVFlna542DUs5WfjJgiZ57vzjD003mbyyRhG'
);

export const bookTour = async tourId => {
  try {
    // 1. Get Checkout session from API
    const session = await axios(
      `http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}`
    );
    console.log(session);

    // 2. Create Checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
