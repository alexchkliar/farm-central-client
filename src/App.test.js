import { render, screen } from '@testing-library/react';
import Foods from './pages/Foods';
import Food from './components/Food';
import userEvent from '@testing-library/user-event'
import { sampleFood, sampleUsers, addToFavorite } from '../test_data/testData'

describe("Food renders properly", () => {

  it('/foods renders', () => {
    render(<Foods />);
    const linkElement = screen.getByText(/Browse food/i);
    expect(linkElement).toBeInTheDocument();
  });


  it("Favorite class should render and clicking on favorite icon should toggle class name", () => {
    render(<Food food={sampleFood} userList={sampleUsers} addToFavorite={addToFavorite} />);
    const firstFavoriteButton = screen.getByTestId('favorite-icon')
    expect(firstFavoriteButton.className.includes("favorite-icon-div-favorited")).toBeFalsy()
    userEvent.click(firstFavoriteButton)
    expect(firstFavoriteButton.className.includes("favorite-icon-div-favorited")).toBeTruthy()
  })
})
