/// <reference types = "cypress" />

const random = (length = 5) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let str = '';
  for (let i = 0; i < length; i++) {
    str += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return str;
};

describe('API Tests', () => {
  it('Happy Flow - Creation of user account by (providing unique and valid user and pass) using the api provided', () => {
    let user = random();
    cy.writeFile('cypress/fixtures/apidata.json', { email: user });
    cy.request({
      method: 'POST',
      url: 'https://demoqa.com/Account/v1/User',
      body: {
        userName: user,
        password: Cypress.env('apiPass'),
      },
    }).then((response) => {
      expect(response.status).to.eq(201);
    });
  });
  it('Unhappy Flow - Creation of user account (by providing invalid pass) by using the api provided', () => {
    let user = random();
    cy.writeFile('cypress/fixtures/apidata.json', { email: user });
    cy.request({
      method: 'POST',
      failOnStatusCode: false,
      url: 'https://demoqa.com/Account/v1/User',
      body: {
        userName: user,
        password: Cypress.env('incorrectPass'),
      },
    }).then((response) => {
      expect(response.status).to.eq(400);
    });
  });

  it('Add a list of books for the created user', () => {
    // The test case has issues. after creating user and its token
    // and authorizing the user, the API still times out on request.
    let user = random();
    let apiData;
    let userData;
    let basicToken;
    let basicTokenEncoded;
    cy.request({
      method: 'POST',
      url: 'https://demoqa.com/Account/v1/User',
      body: {
        userName: user,
        password: Cypress.env('apiPass'),
      },
    }).then((response) => {
      expect(response.status).to.eq(201);
      cy.writeFile('cypress/fixtures/apidata.json', response.body, 'binary');
    });

    cy.request({
      method: 'POST',
      url: 'https://demoqa.com/Account/v1/GenerateToken',
      body: {
        userName: user,
        password: Cypress.env('apiPass'),
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('token');
      expect(response.body).to.have.property('status', 'Success');
      console.log(response.body);
      cy.writeFile(
        'cypress/fixtures/apiresponse.json',
        response.body,
        'binary'
      );
    });

    //////////////////////
    // This APi is working and does authorize the user, but that user is still
    // treated as a unauthorized user
    cy.request({
      method: 'POST',
      url: 'https://demoqa.com/Account/v1/Authorized',
      body: {
        userName: user,
        password: Cypress.env('apiPass'),
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      console.log(response.body);
      console.log(user);
    });

    ///////////////////////
    cy.fixture('apiresponse').then((data) => {
      apiData = data;
      cy.fixture('apidata').then((data) => {
        userData = data;

        console.log(apiData.token);
        console.log(userData.userID);
        console.log(userData.username);

        basicToken = userData.username + ':' + Cypress.env('apiPass');
        console.log(basicToken);
        basicTokenEncoded = btoa(basicToken);
        console.log(basicTokenEncoded);
        console.log(atob(basicTokenEncoded));
        cy.request({
          method: 'POST',
          url: 'https://demoqa.com/BookStore/v1/Books',
          headers: {
            authorization: 'Bearer ' + apiData.token,
          },
          body: {
            userId: userData.userID,
            collectionsOfIsbns: [
              {
                isbn: '9781449325862',
              },
            ],
          },
        }).then((response) => {
          expect(response.status).to.eq(201);
          console.log(response.body);
        });
      });
    });
  });
});
