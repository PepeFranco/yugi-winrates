import React from "react";

import { render, screen } from "@testing-library/react";
import { useRouter } from "next/router";

jest.mock("next/router", () => ({
  withRouter: () => {},
  useRouter: jest.fn(),
}));

it.todo("Win Rate Pie Chart");
