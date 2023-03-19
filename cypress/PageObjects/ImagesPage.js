class ImagesPage {
  BrokenImgsLink = 'Broken Links - Images';
  NavigateToImagesPage() {
    cy.contains(this.BrokenImgsLink).should('exist').and('be.visible').click();
  }
}

export default ImagesPage;
