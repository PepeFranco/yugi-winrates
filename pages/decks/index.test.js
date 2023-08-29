import React from "react";

import { Decks } from "./index";
import { render, screen } from "@testing-library/react";
import { useRouter } from "next/router";

jest.mock("next/router", () => ({
  withRouter: () => {},
  useRouter: jest.fn(),
}));

it("can render", () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({}),
    })
  );

  useRouter.mockReturnValue({
    query: { order: undefined, type: undefined },
  });

  render(<Decks />);
  expect(screen.getByLabelText("Loading...")).toBeInTheDocument();
});
