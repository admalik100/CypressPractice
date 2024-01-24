/// <reference types = "cypress" />
import InteractionsPage from '../PageObjects/InteractionsPage';

// this is a repeated test, only adding it here to confirm and check the newly integrated code quality tool on PR
describe('Testing the interactions module', () => {
  const interact = new InteractionsPage();
  beforeEach('setting up testing requirements', () => {
    cy.visit('/');
  });

  it('TC06 - Verify user can drag and drop', () => {
    cy.NavigateToModule('Interactions');
    cy.ValidateURLAndPageHeading('/interaction', 'Interactions');
    cy.NavigateToModule('Droppable');
    cy.ValidateURLAndPageHeading('/droppable', 'Droppable');
    interact.PerfromDragDropAndValidate();
  });
});
