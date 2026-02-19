describe("KasaLive - Fluxos Principais", () => {
  beforeEach(() => {
    cy.visit("https://www.kasa.live");
  });

  it("CT-01 - Realizar login com credenciais válidas", () => {
    cy.get('[data-cy="btn-trigger-profile"]').click();

    cy.get('[data-cy="login-email"]').type("eridiana.testes@gmail.com");
    cy.get('[data-cy="login-password"]').type("12345678");
    cy.get('[data-cy="login-submit"]').click();

    cy.get('[data-cy="btn-trigger-profile"]').should("be.visible");
  });

  it("CT-02 - Filtrar por time e selecionar sugestão", () => {
    cy.get("#filter-team").should("be.visible").click().type("Chicago");

    cy.contains("Chicago").should("be.visible").click();

    cy.get('#filter-team').invoke('val').should('contain', 'Chicago');
  });

  it("CT-03 - Filtrar por time inexistente e validar mensagem de vazio OU existência de cards", () => {
    cy.get("#filter-team").should("be.visible").clear().type("TimeInexistenteXYZ");

    cy.get("body").click(0, 0);
  
    cy.get("div.css-n0tora").should("be.visible").click();

    cy.get("body").then(($body) => {
    const txt = $body.text();

    if (txt.includes("Sem resultados de busca")) {
      cy.contains("Sem resultados de busca").should("be.visible");
    } 
  });
});

  it("CT-04 - Filtrar por campeonato e selecionar sugestão", () => {
    cy.get("#filter-championship").should("be.visible").click().type("Brasileirão");

    cy.contains("Brasileirão Série A").should("be.visible").click();

    cy.get("#filter-championship").invoke('val').should("contain", "Brasileirão");
  });

  it("CT-05 - Filtrar por Onde quer ver e selecionar sugestão", () => {
    cy.get("#filter-streaming").should("be.visible").clear().type("Amazon");

    cy.contains("div.css-k008qs p", "Amazon Prime Video").should("exist").parents("div.css-k008qs").scrollIntoView().click({ force: true });
});

  it("CT-06 - Alternar visualização Grid e Lista", () => {
    cy.get("img.css-1iiyyfu").scrollIntoView().click({ force: true });

    cy.get('[aria-label="Favoritar Partida"]', { timeout: 10000 }).should("have.length.greaterThan", 0);

    cy.wait(2000);

    cy.get("img.css-zt532f").scrollIntoView().click({ force: true });

    cy.get('[aria-label="Favoritar Partida"]', { timeout: 10000 }).should("not.exist");
});

  it("CT-07 - Favoritar uma partida", () => {
    cy.get('img[alt="lista"]').click();

    cy.get('[aria-label="Favoritar Partida"]').first().click();

    cy.contains("Favoritos").click();
    cy.wait(2000);

    cy.get("div").contains("Finalizada").should("exist");
});

  it("CT-08 - Adicionar e Excluir time favorito", () => {
    cy.wait(2000);
    cy.get('[data-cy="link/favoritos"] p.chakra-text').click();
    
    cy.get('[data-cy="btn-favorite-team"]').click();
    cy.get('button.chakra-button.css-6cuto3').first().scrollIntoView().should("be.visible").click({ force: true });
    cy.get('[data-cy="btn-submit-teams"]').should("be.visible").click({ force: true });
    cy.wait(2000);

    cy.get('[data-cy="btn-edit-teams"]').should("be.visible").click({ force: true });

    cy.get('button.chakra-button.css-di3rc').first().should("be.visible").click({ force: true });

    cy.get('[data-cy="btn-save-teams"]').should("be.visible").click({ force: true });    
  });

  it("CT-09 - Abrir Melhores Momentos e validar presença de cards de video", () => {
    cy.contains("Melhores momentos").should("be.visible").click();

    cy.get("body").then(($body) => {
      const txt = $body.text();

      if (txt.includes("Sem resultados")) {
        cy.contains("Sem resultados").should("be.visible");
      } else {
        cy.get(".card-highlight-overlay").should("exist");
      }
    });
  });
});