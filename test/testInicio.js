describe("Inicio", () => {
    // Navegamos a la página
    beforeEach(async () => {
      await page.goto('http://localhost:8080');
    });
  
    it("should display the title", async () => {
      // Comprobamos que el encabezado sea esperado
      await expect(page).toMatchElement('h1', { text: 'Música Recomendada' });
    });

  });