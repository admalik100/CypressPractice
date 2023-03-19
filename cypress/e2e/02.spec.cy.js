/// <reference types = "Cypress" />
import ImagesPage from '../PageObjects/ImagesPage';

describe('Interacting with Images Module', () => {
  const ip = new ImagesPage();

  beforeEach('', () => {
    cy.visit('/');
  });

  it('TC02 - Verify broken image', () => {
    cy.NavigateToModule('Elements');
    cy.ValidateURLAndPageHeading('/elements', 'Elements');
    ip.NavigateToImagesPage();
    cy.ValidateURLAndPageHeading('/broken', 'Broken Links - Images');
    cy.get('img')
      .last()
      .should('exist')
      .scrollIntoView()
      .should('be.visible')
      .and('have.css', 'height', '16px')
      .and('have.css', 'width', '16px');
  });
});
