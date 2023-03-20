// ***********************************************
// This example commands.js shows you how to
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
import 'cypress-file-upload';
import '@4tw/cypress-drag-drop';

Cypress.on('uncaught:exception', () => {
  return false;
});

Cypress.Commands.add('ValidateURLAndPageHeading', (urlLink, heading) => {
  cy.url({ timeout: 5000 }).should('include', urlLink);
  cy.get('.main-header')
    .should('exist')
    .and('be.visible')
    .and('have.text', heading);
});

Cypress.Commands.add('CheckTableRowPopulatedCount', (initial) => {
  let x;
  cy.get('body').then(($body) => {
    // cy.log($body.find('[class = "rt-tr -odd"]').length);
    x = $body.find('[class = "rt-tr -odd"]').length;
    // cy.log($body.find('[class = "rt-tr -even"]').length);
    x = x + $body.find('[class = "rt-tr -even"]').length;
    // cy.log(x);
    cy.readFile('cypress/fixtures/table.json', { timeout: 7000 }, (err) => {
      if (err) {
        return console.log(err);
      }
    }).then((data) => {
      if (initial == true) {
        data.RowNumber = x;
      } else {
        data.RowNumberFinal = x;
      }
      cy.writeFile('cypress/fixtures/table.json', JSON.stringify(data));
    });
  });
});

Cypress.Commands.add('ValidateRowCountAfterSubmit', () => {
  cy.readFile('cypress/fixtures/table.json', { timeout: 7000 }, (err) => {
    if (err) {
      return console.log(err);
    }
  }).then((data) => {
    if (data.RowNumberFinal == data.RowNumber + 1) {
      cy.log('*Row Added*');
    } else {
      throw new Error('Row not added');
    }
  });
});

Cypress.Commands.add('IsEven', (number) => {
  if (number % 2 == 0) {
    return true;
  } else {
    return false;
  }
});

Cypress.Commands.add('NavigateToModule', (ModuleName) => {
  cy.contains(ModuleName).click();
});
