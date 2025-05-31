/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

declare namespace Cypress {
  interface Chainable {
    login(email: string, password: string): Chainable<void>
    createAppointment(serviceId: string, date: string, time: string, notes?: string): Chainable<void>
    setupTestUser(): Chainable<void>
    setupTestAppointments(): Chainable<void>
  }
}

// Создание тестового пользователя
Cypress.Commands.add('setupTestUser', () => {
  const testUser = {
    id: '1',
    email: 'test@example.com',
    password: 'password123',
    firstName: 'Test',
    lastName: 'User',
    phone: '+7 (999) 123-45-67'
  };

  // Сохраняем пользователя в localStorage
  window.localStorage.setItem('mock_users', JSON.stringify([testUser]));
});

// Создание тестовых записей
Cypress.Commands.add('setupTestAppointments', () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split('T')[0];

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split('T')[0];

  const appointments = [
    {
      id: '1',
      userId: '1',
      serviceId: '1',
      serviceName: 'Тестовая услуга 1',
      date: tomorrowStr,
      time: '10:00',
      status: 'scheduled',
      price: 1000,
      duration: 60
    },
    {
      id: '2',
      userId: '1',
      serviceId: '2',
      serviceName: 'Тестовая услуга 2',
      date: yesterdayStr,
      time: '15:00',
      status: 'completed',
      price: 2000,
      duration: 30
    }
  ];

  window.localStorage.setItem('appointments', JSON.stringify(appointments));
});

// Login command
Cypress.Commands.add('login', (email: string, password: string) => {
  // Сначала создаем тестового пользователя и записи
  cy.setupTestUser();
  cy.setupTestAppointments();
  
  cy.visit('/login');
  cy.get('[data-testid="email-input"]').type(email);
  cy.get('[data-testid="password-input"]').type(password);
  cy.get('[data-testid="login-form"]').submit();
  
  // Проверяем, что авторизация прошла успешно
  cy.url().should('not.include', '/login');
});

// Create appointment command
Cypress.Commands.add('createAppointment', (serviceId: string, date: string, time: string, notes: string = '') => {
  cy.visit(`/services/${serviceId}`);
  cy.get('[data-testid="book-appointment-button"]').click();
  cy.get('[data-testid="date-slots"]').should('be.visible');
  cy.get('[data-testid="date-slots"] button').first().click();
  cy.get('[data-testid="time-slots"]').should('be.visible');
  cy.get('[data-testid="time-slots"] button').first().click();
  if (notes) {
    cy.get('[data-testid="notes-input"]').type(notes);
  }
  cy.get('[data-testid="submit-appointment-button"]').click();
});