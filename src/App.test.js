import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import App from "./App";
import { act } from "react";

// image data
const image = {
  image: {
    testId: "image-banner",
    alt: "banner",
    src: "https://www.instacart.com/company/wp-content/uploads/2022/11/cooking-statistics-hero.jpg",
  },
};

// navbar data
const navbar = {
  title: {
    testId: "my-recipe",
    text: "My Recipe",
  },
  form: {
    testId: "form-search",
    role: "search",
    input: {
      testId: "input-search",
      placeholder: "Recipe Name",
      ariaLabel: "Search",
      type: "search",
    },
  },
};

// footer data
const footer = {
  text: {
    testId: "footer-text",
    text: "© 2024 Company, Inc. All rights reserved.",
  },
  links: [
    {
      testId: "link-facebook",
      href: "https://facebook.com",
      icon: {
        className: "bi bi-facebook",
      },
    },
    {
      testId: "link-x",
      href: "https://x.com",
      icon: {
        className: "bi bi-twitter-x",
      },
    },
    {
      testId: "link-instagram",
      href: "https://instagram.com/",
      icon: {
        className: "bi bi-instagram",
      },
    },
  ],
};

// image test
describe("renders App component with NavBar, image banner, and Footer", () => {
  test("should have image banner rendered and have correct src and alt", async () => {
    await act(async () => {
      render(<App />);
    });
    const imageBanner = screen.getByTestId(image.image.testId);
    expect(imageBanner).toBeInTheDocument();
    expect(imageBanner).toHaveProperty("src", image.image.src);
    expect(imageBanner).toHaveProperty("alt", image.image.alt);
  });
});

// navbar test
describe("renders App component with NavBar, image banner, and Footer", () => {
  test("should render title and have correct text", async () => {
    await act(async () => {
      render(<App />);
    });
    const title = screen.getByTestId(navbar.title.testId);
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent(navbar.title.text);
  });

  test("should render form and have correct role", async () => {
    await act(async () => {
      render(<App />);
    });
    const form = screen.getByTestId(navbar.form.testId);
    expect(form).toBeInTheDocument();
    expect(form).toHaveAttribute("role", navbar.form.role);
  });

  test("should render input and have correct placeholder, aria-label, and type", async () => {
    await act(async () => {
      render(<App />);
    });
    const input = screen.getByTestId(navbar.form.input.testId);
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("placeholder", navbar.form.input.placeholder);
    expect(input).toHaveAttribute("aria-label", navbar.form.input.ariaLabel);
    expect(input).toHaveAttribute("type", navbar.form.input.type);
  });
});

// footer test
describe("renders App component with NavBar, image banner, and Footer", () => {
  test("should render footer text and have correct text", async () => {
    await act(async () => {
      render(<App />);
    });
    const footerText = screen.getByTestId(footer.text.testId);
    expect(footerText).toBeInTheDocument();
    expect(footerText).toHaveTextContent(footer.text.text);
  });

  test("should render footer links and have correct href and icon", async () => {
    await act(async () => {
      render(<App />);
    });
    footer.links.forEach((link) => {
      const footerLink = screen.getByTestId(link.testId);
      expect(footerLink).toBeInTheDocument();
      expect(footerLink).toHaveAttribute("href", link.href);
      expect(footerLink.firstChild).toHaveClass(link.icon.className);
    });
  });
});

// Fetching tests
describe("App Component", () => {
  beforeAll(() => {
    global.fetch = jest.fn();
  });

  test("should render Card components based on fetched recipes", async () => {
    const sampleData = {
      recipes: [
        {
          id: 1,
          name: "Recipe 1",
          image: "image1.jpg",
          rating: 55,
          tags: ["tag1", "tag2"],
          link: "https://dummyjson.com/recipes/1",
        },
        {
          id: 2,
          name: "Recipe 2",
          image: "image2.jpg",
          rating: 3,
          tags: ["tag3", "tag4"],
          link: "https://dummyjson.com/recipes/2",
        },
        {
          id: 3,
          name: "Recipe 3",
          image: "image3.jpg",
          rating: 5,
          tags: ["tag5", "tag6"],
          link: "https://dummyjson.com/recipes/3",
        },
      ],
    };

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(sampleData),
      })
    );

    await act(async () => {
      render(<App />);
    });

    // Using await with findBy queries
    const img1 = await screen.findByTestId(`img-recipe-1`);
    const title1 = await screen.findByTestId(`title-recipe-1`);

    const img2 = await screen.findByTestId(`img-recipe-2`);
    const title2 = await screen.findByTestId(`title-recipe-2`);

    const img3 = await screen.findByTestId(`img-recipe-3`);
    const title3 = await screen.findByTestId(`title-recipe-3`);

    // assert that fetched recipes are rendered
    expect(img1).toBeInTheDocument();
    expect(title1).toHaveTextContent("Recipe 1");

    expect(img2).toBeInTheDocument();
    expect(title2).toHaveTextContent("Recipe 2");

    expect(img3).toBeInTheDocument();
    expect(title3).toHaveTextContent("Recipe 3");
  });
});

// Error handling test
describe("error", () => {
  beforeAll(() => {
    global.fetch = jest.fn();
  });

  test("should handle error in fetchUsers and log the error", async () => {
    const errorMessage = "Failed to fetch";
    fetch.mockRejectedValueOnce(new Error(errorMessage));

    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});

    await act(async () => {
      render(<App />);
    });

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(expect.any(Error));
    });

    consoleSpy.mockRestore();
  });
});
