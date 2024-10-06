import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Card from "./Card";

import { act } from "react";

const el = {
  image: "https://via.placeholder.com/150",
  name: "Test Recipe",
  rating: 4.5,
  tags: ["Tag1", "Tag2", "Tag3"],
  id: 1,
};

test("renders the component Card & given props", async () => {
  await act(async () => {
    render(<Card el={el} />);
  });

  const img = screen.getByTestId(`img-recipe-${el.id}`);
  expect(img).toBeInTheDocument();
  expect(img).toHaveAttribute("alt", el.name);

  const title = screen.getByTestId(`title-recipe-${el.id}`);
  expect(title).toBeInTheDocument();
  expect(title).toHaveTextContent(el.name);

  const rating = screen.getByTestId(`rating-recipe-${el.id}`);
  expect(rating).toBeInTheDocument();
  expect(rating).toHaveTextContent(el.rating.toString());

  const firstTag = screen.getByTestId(`tag-recipe-${el.tags[0]}`);
  expect(firstTag).toBeInTheDocument();
  expect(firstTag).toHaveTextContent(el.tags[0]);

  const secondTag = screen.getByTestId(`tag-recipe-${el.tags[1]}`);
  expect(secondTag).toBeInTheDocument();
  expect(secondTag).toHaveTextContent(el.tags[1]);

  const link = screen.getByTestId(`link-recipe-${el.id}`);
  expect(link).toBeInTheDocument();
  expect(link).toHaveAttribute(
    "href",
    `https://dummyjson.com/recipes/${el.id}`
  );
});
