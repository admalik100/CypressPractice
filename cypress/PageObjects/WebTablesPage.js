class WebTablesPage {
  MenuList = '.menu-list';
  OptionWebTables = 'Web Tables';
  AddRecord = '#addNewRecordButton';
  AddRecordPopUp = '#registration-form-modal';
  FirstName = '#firstName';
  LastName = '#lastName';
  Email = '#userEmail';
  Age = '#age';
  Salary = '#salary';
  Dept = '#department';
  SubmitBtn = '#submit';
  AddedRow;
  TableRowData = '.rt-td';

  CickOnWebTablesInMenu() {
    cy.get(this.MenuList)
      .eq(0)
      .should('exist')
      .and('be.visible')
      .within(() => {
        cy.contains(this.OptionWebTables)
          .should('exist')
          .and('be.visible')
          .click();
      });
  }
  ClickOnAddButton() {
    cy.get(this.AddRecord).should('exist').and('be.visible').click();
  }

  ValidateAddRecordPopUpOpen() {
    cy.get(this.AddRecordPopUp)
      .should('exist')
      .and('be.visible')
      .and('have.text', 'Registration Form');
  }
  PopulateRecordWebTable(Fname, Lname, UserEmail, Age, Sal, Dept) {
    cy.get(this.FirstName)
      .should('exist')
      .and('be.visible')
      .clear()
      .type(Fname);

    cy.get(this.LastName).should('exist').and('be.visible').clear().type(Lname);
    cy.get(this.Email)
      .should('exist')
      .and('be.visible')
      .clear()
      .type(UserEmail);
    cy.get(this.Age).should('exist').and('be.visible').clear().type(Age);
    cy.get(this.Salary).should('exist').and('be.visible').clear().type(Sal);
    cy.get(this.Dept).should('exist').and('be.visible').clear().type(Dept);
  }
  SubmitWebTable() {
    cy.get(this.SubmitBtn)
      .should('exist')
      .and('be.visible')
      .and('have.text', 'Submit')
      .click();
  }

  ValidateRowContentAfterSubmit() {
    let RowCount;
    let UserData;
    let values = [];
    cy.readFile('cypress/fixtures/table.json', { timeout: 7000 }, (err) => {
      if (err) {
        throw new Error('Error Reading Fixture File');
      }
    }).then((data) => {
      RowCount = data.RowNumberFinal;
      if (RowCount % 2 == 0) {
        cy.get('[class    =   "rt-tr -even"]')
          .last()
          .children()
          .should('have.length', 7);
        cy.get('[class    =   "rt-tr -even"]')
          .last()
          .find(this.TableRowData)
          .each(($el) => {
            cy.wrap($el)
              .invoke('text')
              .then((text) => {
                values.push(text);
              });
          })
          .then(() => {
            cy.readFile(
              'cypress/fixtures/data.json',
              { timeout: 7000 },
              (err) => {
                if (err) {
                  throw new Error('Failed to read Fixture File');
                }
              }
            ).then((user) => {
              UserData = user;
              values.pop();
              console.log(values);
              console.log(UserData);
              expect(values).to.deep.eq([
                UserData.FName,
                UserData.LName,
                UserData.Age,
                UserData.Email,
                UserData.Salary,
                UserData.Dept,
              ]);
            });
          });
      } else {
        cy.get('[class    =   "rt-tr -odd"]')
          .last()
          .children()
          .should('have.length', 7);
        cy.get('[class    =   "rt-tr -even"]')
          .last()
          .find(this.TableRowData)
          .each(($el, $index) => {
            cy.wrap($el)
              .invoke('text')
              .then((text) => {
                values.push(text);
              });
          })
          .then(() => {
            cy.readFile(
              'cypress/fixtures/data.json',
              { timeout: 7000 },
              (err) => {
                if (err) {
                  throw new Error('Failed to read Fixture File');
                }
              }
            ).then((user) => {
              UserData = user;
              values.pop();
              console.log(values);
              console.log(UserData);
              expect(values).to.deep.eq([
                UserData.FName,
                UserData.LName,
                UserData.Age,
                UserData.Email,
                UserData.Salary,
                UserData.Dept,
              ]);
            });
          });
      }
    });
  }

  EditBtnClickSecondRow() {
    cy.get('[class    =   "rt-tr -even"]')
      .first()
      .find(this.TableRowData)
      .last()
      .find('.action-buttons')
      .should('exist')
      .and('be.visible')
      .find('#edit-record-2')
      .should('exist')
      .click();
  }

  UpdateDataandSave(Fname, Lname) {
    cy.get(this.FirstName)
      .should('exist')
      .and('be.visible')
      .clear()
      .type(Fname);

    cy.get(this.LastName).should('exist').and('be.visible').clear().type(Lname);
    this.SubmitWebTable();
  }

  ValidateUpdatedData() {
    let UserData;
    let values = [];
    cy.get('[class    =   "rt-tr -even"]')
      .first()
      .children()
      .should('have.length', 7);
    cy.get('[class    =   "rt-tr -even"]')
      .first()
      .find(this.TableRowData)
      .each(($el) => {
        cy.wrap($el)
          .invoke('text')
          .then((text) => {
            values.push(text);
          });
      })
      .then(() => {
        cy.readFile(
          'cypress/fixtures/updateuser.json',
          { timeout: 7000 },
          (err) => {
            if (err) {
              throw new Error('Failed to read Fixture File');
            }
          }
        ).then((user) => {
          UserData = user;
          values.pop();
          console.log(values);
          console.log(UserData);
          expect(values).to.deep.eq([
            UserData.FName,
            UserData.LName,
            UserData.Age,
            UserData.Email,
            UserData.Salary,
            UserData.Dept,
          ]);
        });
      });
  }
}

export default WebTablesPage;
