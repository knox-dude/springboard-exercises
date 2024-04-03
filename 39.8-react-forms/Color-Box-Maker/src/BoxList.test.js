import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BoxList } from "./BoxList";

describe("BoxList", () => {
    it("renders initial empty state", () => {
        render(<BoxList />);
        const emptyStateMessage = screen.getByText("No boxes yet. Click the 'Add a new box!' button to create a new box.");
        expect(emptyStateMessage).toBeInTheDocument();
    });

    it("renders boxes", async () => {
        render(<BoxList />);

        // Simulate adding a box
        const addBoxButton = screen.getByText("Add a new box!");
        userEvent.click(addBoxButton);

        // Wait for the box to be added and rendered
        await waitFor(() => {
            const box = screen.getByRole("listitem");
            expect(box).toBeInTheDocument();
        });
    });

    it("adds a new box", async () => {
        render(<BoxList />);

        // Simulate adding a box
        const addBoxButton = screen.getByText("Add a new box!");
        userEvent.click(addBoxButton);

        // Wait for the box to be added and rendered
        await waitFor(() => {
            const box = screen.getByRole("listitem");
            expect(box).toBeInTheDocument();
        });

        // Simulate adding another box
        userEvent.click(addBoxButton);

        // Wait for the second box to be added and rendered
        await waitFor(() => {
            const secondBox = screen.getByRole("listitem", { name: /second box/i });
            expect(secondBox).toBeInTheDocument();
        });
    });
});