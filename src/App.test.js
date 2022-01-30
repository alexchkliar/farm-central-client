import { render, screen } from '@testing-library/react';
// import App from './App';
import Foods from './pages/Foods';
// import Food from './components/Food';
import userEvent from '@testing-library/user-event'

it('/foods renders', () => {
  render(<Foods />);
  const linkElement = screen.getByText(/Browse food/i);
  expect(linkElement).toBeInTheDocument();
});

// it("should toggle favorite class", async () => {
//   render(<Foods />);
//   const firstFavoriteButton = screen.getByText('favorite-icon')
//   // console.log(screen)
//   expect(firstFavoriteButton).toBeInTheDocument();

//   // console.log(firstFavoriteButton);
//   // expect(firstFavoriteButton).toBeInTheDocument();

// })
