import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import App from "./App";

jest.mock("axios", () => ({
  __esModule: true,
  default: {
    get: () => ({
      data: [
        {
          id: 1,
          title: "post title",
        },
        {
          id: 2,
          title: "post title2",
        },
      ],
    }),
  },
}));

test("name, age input and post titles should be render ", async () => {
  render(<App />);
  const nameInput = screen.getByTestId("name");
  const ageInput = screen.getByTestId("age");
  const nameEl = screen.queryByTestId("entered-name");
  const ageEl = screen.queryByTestId("entered-age");
  expect(screen.queryByText("post title")).not.toBeInTheDocument();

  expect(nameInput).toBeInTheDocument();
  expect(ageInput).toBeInTheDocument();
  expect(nameEl).not.toBeInTheDocument();
  expect(ageEl).not.toBeInTheDocument();
  const titleList = await screen.findAllByTestId("post-title");
  expect(titleList).toHaveLength(2);
});

test("name and age inputs changes to be render ", () => {
  render(<App />);
  const nameInput = screen.getByTestId("name");
  const ageInput = screen.getByTestId("age");
  const testAge = "20";
  const testName = "John Doe";
  fireEvent.change(nameInput, { target: { value: testName } });
  fireEvent.change(ageInput, { target: { value: testAge } });
  expect(nameInput.value).toBe(testName);
  expect(ageInput.value).toBe(testAge);
});

test("name and age elements render", async () => {
  render(<App />);
  const nameInput = screen.getByTestId("name");
  const ageInput = screen.getByTestId("age");
  const button = screen.getByRole("button");
  const testAge = "20";
  const testName = "John Doe";
  fireEvent.change(nameInput, { target: { value: testName } });
  fireEvent.change(ageInput, { target: { value: testAge } });
  expect(nameInput.value).toBe(testName);
  expect(ageInput.value).toBe(testAge);
  fireEvent.click(button);
  await waitFor(() =>
    expect(screen.queryByTestId("entered-name")).toBeInTheDocument()
  );
  await waitFor(() =>
    expect(screen.queryByTestId("entered-age")).toBeInTheDocument()
  );
});
