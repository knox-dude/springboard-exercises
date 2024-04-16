import Router from "react-router";
import DogDetails from './DogDetails';
import { render, screen, waitFor } from '@testing-library/react';

Router.useParams = jest.fn();

test('renders learn react link', () => {
  Router.useParams.mockReturnValue({a: "b"});	
  render(<DogDetail />)
});
