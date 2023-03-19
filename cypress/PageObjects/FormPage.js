class FormPage {
  fName = '#firstName';
  lName = '#lastName';
  eMail = '#userEmail';
  Mobile = '#userNumber';
  DOB = '#dateOfBirthInput';
  Subj = '#subjectsContainer';
  CurrentAddr = '#currentAddress';
  YearSelector = '[class    =   "react-datepicker__year-select"]';
  MonthSelector = '[class    =   "react-datepicker__month-select"]';
  DateSelector =
    '[class    =   "react-datepicker__day react-datepicker__day--015"]';
  CitySelector = '#city';
  SubmitBtn = '#submit';
  formSuccessPopUp = '#example-modal-sizes-title-lg';
  CloseBtn = '#closeLargeModal';

  PopulateForm(FName, LName, Email, Num, DateOfBirth, Subjects, Addr) {
    cy.get(this.fName).should('exist').and('be.visible').clear().type(FName);
    cy.get(this.lName).should('exist').and('be.visible').clear().type(LName);
    cy.get(this.eMail).should('exist').and('be.visible').clear().type(Email);
    cy.contains('Male').click();
    cy.get(this.Mobile).should('exist').and('be.visible').clear().type(Num);
    cy.get(this.DOB)
      .should('exist')
      .and('be.visible')
      .click()
      .then(() => {
        cy.get(this.YearSelector)
          .should('exist')
          .and('be.visible')
          .select('1990');
        cy.get(this.MonthSelector)
          .should('exist')
          .and('be.visible')
          .select('January');
        cy.get(this.DateSelector).should('exist').and('be.visible').click();
      });
    cy.get(this.Subj).should('exist').and('be.visible').type(Subjects);
    cy.contains('Reading').click();
    cy.get('#uploadPicture').attachFile('Daco.png');
    cy.get(this.CurrentAddr)
      .should('exist')
      .and('be.visible')
      .clear()
      .type(Addr);
    cy.contains('Select State')
      .click()
      .then(() => {
        cy.contains('NCR').click();
      });
    cy.get(this.CitySelector).click().type('Delhi{enter}');
    cy.get(this.SubmitBtn).click({ force: true });
  }
  ValidateSavedData() {
    let x = 0;
    let values = [];
    let FormData;
    cy.get(this.formSuccessPopUp)
      .should('exist')
      .and('be.visible')
      .and('have.text', 'Thanks for submitting the form');
    cy.get('tbody')
      .find('tr')
      .then(($tr) => {
        x = $tr.length;
        cy.log(x);
        for (let i = 0; i < x; i++) {
          cy.get('tr')
            .eq(i + 1)
            .find('td')
            .eq(1)
            .invoke('text')
            .then((text) => {
              values.push(text);
            });
        }
        cy.fixture('formdata').then((data) => {
          FormData = data;

          expect(values).to.deep.eq([
            FormData.FName + ' ' + FormData.LName,
            FormData.Email,
            FormData.Gender,
            FormData.Mobile,
            FormData.DoB,
            '',
            FormData.Hobbies,
            'Daco.png',
            FormData.CurrentAddr,
            FormData.StateCity,
          ]);
        });
      });
    cy.get(this.CloseBtn).should('exist').click({ force: true });
  }
}
export default FormPage;
