import React from "react";

import { Decks } from "./index";
import { render } from "@testing-library/react";
import { useRouter } from "next/router";

jest.mock("next/router", () => ({
  withRouter: () => {},
  useRouter: jest.fn(),
}));

it("can render", () => {
  useRouter.mockReturnValue({
    query: { order: undefined, type: undefined },
  });

  render(<Decks />);
});
