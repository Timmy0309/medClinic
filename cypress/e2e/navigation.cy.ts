/// <reference types="cypress" />

describe('Navigation Tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should navigate to the home page', () => {
    cy.url().should('include', '/');
    cy.get('h1').should('be.visible');
  });

  it('should navigate to services page', () => {
    cy.get('a[href="/services"]').first().click();
    cy.url().should('include', '/services');
  });

  it('should navigate to login page', () => {
    cy.get('a[href="/login"]').first().click();
    cy.url().should('include', '/login');
  });

  it('should show 404 page for non-existent routes', () => {
    cy.visit('/non-existent-page');
    cy.contains('404').should('be.visible');
  });
}); 