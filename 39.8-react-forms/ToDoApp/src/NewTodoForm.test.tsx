import { render, screen, fireEvent } from "@testing-library/react";
import NewTodoForm from "./NewTodoForm";

describe("NewTodoForm", () => {
  // mock add todo fn
  const addTodo = jest.fn();

  //smoke test
  it("renders without crashing", () => {
    render(<NewTodoForm addTodo={addTodo} />);
  });

  //snapshot test
  it("matches snapshot", () => {
    const { asFragment } = render(<NewTodoForm addTodo={addTodo} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("calls addTodo function", () => {
    render(<NewTodoForm addTodo={addTodo} />);
    const addTodoButton = screen.getByText("Add Todo");
    fireEvent.click(addTodoButton);
    expect(addTodo).toHaveBeenCalled();
  });
});
