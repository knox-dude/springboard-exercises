import { render, screen, fireEvent } from '@testing-library/react';
import Todo from './Todo'; 

describe('Todo component', () => {
  const mockRemove = jest.fn(); // Mock the remove function

  //smoke test
  it('renders without crashing', () => {
    render(<Todo id="1" text="test" remove={mockRemove} />);
  });

  //snapshot test
  it('matches snapshot', () => {
    const { asFragment } = render(<Todo id="1" text="test" remove={mockRemove} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('calls remove function', () => {
    render(<Todo id="1" text="test" remove={mockRemove} />);
    const removeButton = screen.getByText('Remove');
    fireEvent.click(removeButton);
    expect(mockRemove).toHaveBeenCalled();
  });
});