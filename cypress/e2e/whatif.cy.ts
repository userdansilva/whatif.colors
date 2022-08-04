/// <reference types="cypress" />

describe("Whatif.colors", () => {
  beforeEach(() => {
    cy.visit("http://127.0.0.1:5173/");
  });

  it("should be able to create a theme", () => {
    cy.get(".btn").click();
    cy.get("#name").type("New Theme");
    cy.get("[data-testid='theme-title']").contains("New Theme");
    cy.get(".btn").click();
    cy.get("[data-testid='theme-title']").contains("New Theme");
  });

  it("should be able to update a theme", () => {
    cy.get(".btn").click();
    cy.get("#name").type("New Theme");
    cy.get(".btn").click();

    cy.get("[data-testid='theme-container']").invoke("show")
      .click();
    cy.get("[data-testid='theme-edit']").click();
    cy.get("#name").clear().type("Modified");
    cy.get(".btn").click();
    cy.get("[data-testid='theme-title']").contains("Modified");
  });

  it("should be able to remove a theme", () => {
    cy.get(".btn").click();
    cy.get("#name").type("New Theme");
    cy.get(".btn").click();

    cy.get("[data-testid='theme-container']").invoke("show")
      .click();
    cy.get("[data-testid='theme-remove']").click();
    cy.get("[data-testid='theme-title']").should("not.exist");
  });

  it("should be able to serach a theme", () => {
    cy.get(".btn").click();
    cy.get("#name").type("New Theme 1");
    cy.get(".btn").click();

    cy.get(".btn").click();
    cy.get("#name").type("New Theme 2");
    cy.get(".btn").click();

    cy.get("input[type=text]").clear().type("New Theme 1");
    cy.get("[data-testid='theme-title']").should("not.contain", "New Theme 2");
    cy.get("[data-testid='theme-title']").contains("New Theme 1");
  });
});
