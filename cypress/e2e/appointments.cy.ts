/// <reference types="cypress" />

describe('Appointments Tests', () => {
  beforeEach(() => {
    // Login before each test
    cy.login('test@example.com', 'password123');
  });

  it('should display appointments lists', () => {
    cy.visit('/appointments');
    
    // Проверяем секцию предстоящих записей
    cy.get('[data-testid="upcoming-appointments"]').should('be.visible');
    cy.get('[data-testid="appointments-list"]').should('be.visible');
    cy.get('[data-testid="appointment-item"]').should('have.length.at.least', 1);
    
    // Проверяем секцию истории посещений
    cy.get('[data-testid="completed-appointments"]').should('be.visible');
    cy.get('[data-testid="completed-appointments-list"]').should('be.visible');
  });

  it('should show appointment details', () => {
    cy.visit('/appointments');
    cy.get('[data-testid="appointment-item"]').first().within(() => {
      cy.get('[data-testid="appointment-service"]').should('be.visible');
      cy.get('[data-testid="appointment-date"]').should('be.visible');
      cy.get('[data-testid="appointment-time"]').should('be.visible');
      cy.get('[data-testid="appointment-price"]').should('be.visible');
    });
  });

  it('should allow canceling appointment', () => {
    cy.visit('/appointments');
    cy.get('[data-testid="appointment-item"]').first().within(() => {
      cy.get('[data-testid="cancel-appointment-button"]').click();
    });
    cy.get('[data-testid="confirm-cancel-button"]').click();
    cy.get('[data-testid="appointment-status"]').should('contain', 'Отменен');
  });

  it('should create new appointment', () => {
    // Navigate to services
    cy.visit('/services');
    cy.get('[data-testid="service-card"]').first().click();
    cy.get('[data-testid="book-appointment-button"]').click();

    // Fill appointment form
    cy.get('[data-testid="date-slots"]').should('be.visible');
    cy.get('[data-testid="date-slots"] button').first().click();
    cy.get('[data-testid="time-slots"]').should('be.visible');
    cy.get('[data-testid="time-slots"] button').first().click();
    cy.get('[data-testid="notes-input"]').type('Test appointment notes');
    
    // Submit form
    cy.get('[data-testid="submit-appointment-button"]').click();
    
    // Verify success
    cy.url().should('include', '/appointments');
    cy.get('[data-testid="appointments-list"]').should('be.visible');
    cy.get('[data-testid="appointment-item"]').should('have.length.at.least', 1);
  });
}); 