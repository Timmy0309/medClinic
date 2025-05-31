describe('Регистрация и вход', () => {
  const testEmail = `testuser${Date.now()}@example.com`;
  const testPassword = 'Test1234!';
  const testName = 'Test User';

  it('Переход на страницу регистрации и успешная регистрация', () => {
    cy.visit('/register');

    cy.get('input[name="email"]').type(testEmail);
    cy.get('input[name="password"]').type(testPassword);
    cy.get('input[name="name"]').type(testName);

    cy.get('form').submit();

    cy.contains(/успеш/i, { timeout: 5000 }).should('exist');
  });

  it('Переход на страницу логина и успешный вход с редиректом', () => {
    cy.visit('/login');

    cy.get('input[name="email"]').type(testEmail);
    cy.get('input[name="password"]').type(testPassword);

    cy.get('form').submit();

    cy.url().should('not.include', '/login');
    cy.contains(/профиль|запись|выход/i, { timeout: 5000 }).should('exist');
  });
});
