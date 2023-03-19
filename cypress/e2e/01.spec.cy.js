/// <reference types  = "Cypress" />

import WebTablesPage from '../PageObjects/WebTablesPage';

describe('Interacting with WebTables Module', () => {
  const webtables = new WebTablesPage();
  let UserDetails;
  let UserDataUpdate;

  beforeEach('Setting up requirements for test case', () => {
    cy.fixture('data').then((Data) => {
      UserDetails = Data;
    });
    cy.fixture('updateuser').then((updateddata) => {
      UserDataUpdate = updateddata;
    });
  });
  it('TC01- Scenario A - Verify user can enter new data into the table', () => {
    cy.visit('/');
    cy.NavigateToModule('Elements');
    cy.ValidateURLAndPageHeading('/elements', 'Elements');
    webtables.CickOnWebTablesInMenu();
    cy.ValidateURLAndPageHeading('/webtables', 'Web Tables');
    cy.CheckTableRowPopulatedCount(true);
    webtables.ClickOnAddButton();
    webtables.ValidateAddRecordPopUpOpen();
    webtables.PopulateRecordWebTable(
      UserDetails.FName,
      UserDetails.LName,
      UserDetails.Email,
      UserDetails.Age,
      UserDetails.Salary,
      UserDetails.Dept
    );
    webtables.SubmitWebTable();
    cy.CheckTableRowPopulatedCount(false);
    cy.ValidateRowCountAfterSubmit();
    webtables.ValidateRowContentAfterSubmit();
  });

  it('TC01- Scenario B - Verify user can edit the row in a table', () => {
    cy.visit('/webtables');
    cy.ValidateURLAndPageHeading('/webtables', 'Web Tables');
    webtables.EditBtnClickSecondRow();
    webtables.UpdateDataandSave(UserDataUpdate.FName, UserDataUpdate.LName);
    webtables.ValidateUpdatedData();
  });
});
