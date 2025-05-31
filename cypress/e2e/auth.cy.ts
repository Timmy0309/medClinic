/// <reference types="cypress" />

describe('Authentication Tests', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('should display login form', () => {
    cy.get('[data-testid="login-form"]').should('be.visible');
    cy.get('[data-testid="email-input"]').should('be.visible');
    cy.get('[data-testid="password-input"]').should('be.visible');
  });



  it('should navigate to register page', () => {
    cy.get('[data-testid="register-link"]').click();
    cy.url().should('include', '/register');
  });

  it('should display register form', () => {
    cy.visit('/register');
    cy.get('[data-testid="register-form"]').should('be.visible');
    cy.get('[data-testid="email-input"]').should('be.visible');
    cy.get('[data-testid="password-input"]').should('be.visible');
    cy.get('[data-testid="firstName-input"]').should('be.visible');
    cy.get('[data-testid="lastName-input"]').should('be.visible');
    cy.get('[data-testid="phone-input"]').should('be.visible');
  });

  // Test successful login flow
  it('should login successfully with valid credentials', () => {
    const testUser = {
      email: 'test@example.com',
      password: 'password123'
    };

    cy.get('[data-testid="email-input"]').type(testUser.email);
    cy.get('[data-testid="password-input"]').type(testUser.password);
    cy.get('[data-testid="login-form"]').submit();
    
    // After successful login, we should be redirected to home
    cy.url().should('eq', Cypress.config().baseUrl + 'profile');
  });
});
