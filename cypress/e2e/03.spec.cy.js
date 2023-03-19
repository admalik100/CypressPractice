/// <reference types= "Cypress" />

import FormPage from '../PageObjects/FormPage';

describe('Interacting with Form Module', () => {
  const fp = new FormPage();
  let Details;
  beforeEach('Setting up requirements for TC', () => {
    cy.fixture('formdata').then((data) => {
      Details = data;
    });
    cy.visit('/');
  });
  it('TC03 - Verify user can submit the form.', () => {
    cy.NavigateToModule('Forms');
    cy.ValidateURLAndPageHeading('/forms', 'Forms');
    cy.NavigateToModule('Practice Form');
    cy.ValidateURLAndPageHeading('/automation-practice-form', 'Practice Form');
    // Provided data for form (Subject = Cypress Assignment) does not work since we need to choose
    // a option from the drop down , custom subjects are not accepted.
    fp.PopulateForm(
      Details.FName,
      Details.LName,
      Details.Email,
      Details.Mobile,
      Details.DoB,
      Details.Subjects,
      Details.CurrentAddr
    );
    fp.ValidateSavedData();
  });
});
