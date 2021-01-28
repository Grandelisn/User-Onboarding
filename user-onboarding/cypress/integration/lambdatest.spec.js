describe("User Onboarding", () =>{
    beforeEach(() => {
        cy.visit("http://localhost:3000")
    })

    const firstNameInput = () => cy.get('input[name="first_name"]');
    const lastNameInput = () => cy.get('input[name="last_name"]');
    const emailInput = () => cy.get('input[name="email"]');
    const passwordInput = () => cy.get('input[name="password"]');
    const termsInput = () => cy.get('input[name="terms"]');

    const submitBtn = () => cy.get('button[name="submit"]');

    it( 'Verify tests are working', () =>{
        expect( 1 + 2 ).to.equal( 3 );
    } )

    it( 'Check typing in the inputs', () => {
        firstNameInput()
            .should( 'have.value', '' )
            .type( 'Dewey' )
            .should( 'have.value', 'Dewey' )

        lastNameInput()
            .should( 'have.value', '' )
            .type( 'Finn' )
            .should( 'have.value', 'Finn' )

        emailInput()
            .should( 'have.value', '' )
            .type( 'dewey@finn.com' )
            .should( 'have.value', 'dewey@finn.com' )

        passwordInput()
            .should( 'have.value', '' )
            .type( 'Grimgor' )
            .should( 'have.value', 'Grimgor' )

        termsInput()
            .should( 'have.value', 'false' )
            .click()
            .should( 'have.value', 'true' )
    } )
    it( 'Check form validation to see if inputs are empty', () => {
        submitBtn().should( "be.disabled" );
        firstNameInput().type( "Sam" );
        submitBtn().should( "be.disabled" );
        firstNameInput().clear();

        firstNameInput().type( "Sam" );
        lastNameInput().type( "The Hobbit" );
        submitBtn().should( "be.disabled" );

        emailInput().type( "test@test.com" );
        passwordInput().type( "somepassword" )
        termsInput().click();
        submitBtn().should( "not.be.disabled" );

    })

    it( 'Check if we can submit form data', () => {
        cy.contains( 'Dewey Finn' ).should('not.exist');
        firstNameInput().type( "Dewey" );
        lastNameInput().type( "Finn" );
        emailInput().type( "dewey@finn.com" );
        passwordInput().type( "somePass" );
        termsInput().click();
        submitBtn().click();
        cy.contains( 'Dewey Finn' );
    } )
})