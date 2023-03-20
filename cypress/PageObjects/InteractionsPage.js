class InteractionsPage {
  toBeDraggedElem = '#draggable';
  DropLocation = '#droppable';
  ValidationText = 'Dropped!';
  PerfromDragDropAndValidate() {
    cy.get(this.toBeDraggedElem)
      .should('exist')
      .and('be.visible')
      .drag(this.DropLocation, { force: true });
    cy.contains(this.ValidationText, { timeout: 10000 })
      .should('exist')
      .and('be.visible');
  }
}

export default InteractionsPage;
