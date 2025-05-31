/// <reference types="cypress" />

describe('Services Tests', () => {
  beforeEach(() => {
    cy.visit('/services');
  });

  it('should display services list', () => {
    cy.get('[data-testid="service-card"]').should('have.length.at.least', 1);
  });

  it('should navigate to service details', () => {
    cy.get('[data-testid="service-card"]').first().click();
    cy.url().should('include', '/services/');
    cy.get('[data-testid="service-details"]').should('be.visible');
  });

  it('should show service price and description in details', () => {
    cy.get('[data-testid="service-card"]').first().click();
    cy.get('[data-testid="service-price"]').should('be.visible');
    cy.get('[data-testid="service-description"]').should('be.visible');
  });

}); 