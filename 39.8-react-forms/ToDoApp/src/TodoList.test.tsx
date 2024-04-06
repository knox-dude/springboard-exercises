import { render, screen, fireEvent } from "@testing-library/react";
import TodoList from "./TodoList";

describe("TodoList", () => {

  //smoke test
  it("renders without crashing", () => {
    render(<TodoList />);
  });

  //snapshot test
  it("matches snapshot", () => {
    const { asFragment } = render(<TodoList />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("can add a todo", () => {
    render(<TodoList />);
    const inputElement = screen.getByPlaceholderText('Enter todo...');
    const addButtonElement = screen.getByText('Add Todo');
    fireEvent.change(inputElement, { target: { value: 'Test Todo' } });
    fireEvent.click(addButtonElement);
  
    expect(screen.getByText('Test Todo')).toBeInTheDocument();
  });

  it("can remove a todo", () => {
    render(<TodoList />);
    // first add task so we can remove it
    const inputElement = screen.getByPlaceholderText('Enter todo...');
    const addButtonElement = screen.getByText('Add Todo');
    fireEvent.change(inputElement, { target: { value: 'Test Todo' } });
    fireEvent.click(addButtonElement);

    expect(screen.getByText('Test Todo')).toBeInTheDocument();
    expect(screen.getByText('Remove')).toBeInTheDocument();

    // remove the task
    const removeButtonElement = screen.getByText('Remove');
    fireEvent.click(removeButtonElement);

    expect(screen.queryByText('Test Todo')).toBeNull();
  });

});
