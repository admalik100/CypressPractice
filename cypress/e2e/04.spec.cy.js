/// <reference types = "Cypress" />
import WidgetsPage from '../PageObjects/WidgetsPage';

describe('Interacting with Widgets Module', () => {
  const wp = new WidgetsPage();
  beforeEach('Setting up TC Requirements', () => {
    cy.visit('/');
  });

  it('TC04 - Verify the progress bar', () => {
    cy.NavigateToModule('Widgets');
    cy.ValidateURLAndPageHeading('/widgets', 'Widgets');
    cy.NavigateToModule('Progress Bar');
    cy.ValidateURLAndPageHeading('/progress-bar', 'Progress Bar');
    wp.StartProgressBarAndValidateCompletion();
  });

  it('TC05 - Verify the tooltip', () => {
    cy.NavigateToModule('Widgets');
    cy.ValidateURLAndPageHeading('/widgets', 'Widgets');
    cy.NavigateToModule('Tool Tips');
    cy.ValidateURLAndPageHeading('/tool-tips', 'Tool Tips');
    wp.ClickHoverButtonandVerifyHoverBehavior();
  });
});
