class WidgetsPage {
  ToolTipBtn = '#toolTipButton';
  HoverToolTip = '.tooltip-inner';
  HoverText = 'You hovered over the Button';
  StartBtn = '#startStopButton';
  ProgressBarDuringAnimation = '[class  = "progress-bar bg-info"]';
  ProgressBarAnimationComplete = '[class  = "progress-bar bg-success"]';
  ResetBtn = '#resetButton';
  ProgressBarColor = '.bg-success';
  ProgressBarColorVal = 'rgb(40, 167, 69)';

  ClickHoverButtonandVerifyHoverBehavior() {
    cy.get(this.ToolTipBtn)
      .should('exist')
      .scrollIntoView()
      .trigger('mouseover')
      .then(() => {
        cy.get(this.HoverToolTip)
          .should('exist')
          .and('be.visible')
          .and('have.text', this.HoverText);
      });
  }

  StartProgressBarAndValidateCompletion() {
    cy.get(this.StartBtn)
      .should('exist')
      .and('be.visible')
      .and('have.text', 'Start')
      .click()
      .then(() => {
        cy.get(this.ProgressBarDuringAnimation, { timeout: 20000 })
          .should('exist')
          .and('have.text', '99%')
          .then(() => {
            cy.get(this.ProgressBarAnimationComplete)
              .should('exist')
              .and('have.text', '100%');
            cy.get(this.ResetBtn).should('exist').and('have.text', 'Reset');
            cy.get(this.ProgressBarColor)
              .should('exist')
              .and('have.css', 'background-color', this.ProgressBarColorVal);
          });
      });
  }
}

export default WidgetsPage;
