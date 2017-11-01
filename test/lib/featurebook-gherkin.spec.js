const gherkin = require('../../lib/featurebook-gherkin');
const chai = require('chai');
chai.should();

describe('featurebook-gherkin', function () {

  describe('#parse', function () {

    it('should parse a feature written in Polish', function () {
      // language=Gherkin
      const featureAsString =
          `# language: pl
      Funkcja: Logowanie do aplikacji

        Scenariusz: Logowanie jako admin
          Mając otwartą stronę \"/login.com\"
          Kiedy wpiszesz \"admin\" jako nazwę
          I wpiszesz \"***\" jako hasło
          I klikniesz przycisk \"Loguj\"
          Wtedy zalogujesz się jako administrator
      `;

      const feature = gherkin.parse(featureAsString);

      feature.should.have.property('language', 'pl');
      feature.should.have.property('type', 'Feature');
      feature.should.have.property('keyword', 'Funkcja');
      feature.should.have.property('name', 'Logowanie do aplikacji');

      const scenarioDefinitions = feature.scenarioDefinitions;

      scenarioDefinitions[0].should.have.deep.property('type', 'Scenario');
      scenarioDefinitions[0].should.have.deep.property('keyword', 'Scenariusz');
      scenarioDefinitions[0].should.have.deep.property('name', 'Logowanie jako admin');

      scenarioDefinitions[0].should.have.deep.property('steps[0].type', 'Step');
      scenarioDefinitions[0].should.have.deep.property('steps[0].keyword', 'Mając ');
      scenarioDefinitions[0].should.have.deep.property('steps[0].text', 'otwartą stronę "/login.com"');

      scenarioDefinitions[0].should.have.deep.property('steps[1].type', 'Step');
      scenarioDefinitions[0].should.have.deep.property('steps[1].keyword', 'Kiedy ');
      scenarioDefinitions[0].should.have.deep.property('steps[1].text', 'wpiszesz "admin" jako nazwę');

      scenarioDefinitions[0].should.have.deep.property('steps[2].type', 'Step');
      scenarioDefinitions[0].should.have.deep.property('steps[2].keyword', 'I ');
      scenarioDefinitions[0].should.have.deep.property('steps[2].text', 'wpiszesz "***" jako hasło');

      scenarioDefinitions[0].should.have.deep.property('steps[3].type', 'Step');
      scenarioDefinitions[0].should.have.deep.property('steps[3].keyword', 'I ');
      scenarioDefinitions[0].should.have.deep.property('steps[3].text', 'klikniesz przycisk "Loguj"');

      scenarioDefinitions[0].should.have.deep.property('steps[4].type', 'Step');
      scenarioDefinitions[0].should.have.deep.property('steps[4].keyword', 'Wtedy ');
      scenarioDefinitions[0].should.have.deep.property('steps[4].text', 'zalogujesz się jako administrator');
    });

    it('should parse a feature with a single scenario', function () {
      // language=Gherkin
      const featureAsString =
          `
        Feature: Hello World

          Hey Ma this feature has a very nice description with image

          ![Hello Screenshot](file://assets/images/hello_world.png)

          Scenario: Look Ma
            Given I am in a browser
            When I make a syntax error
            Then stuff should be red
      `;

      const feature = gherkin.parse(featureAsString);

      feature.should.have.property('language', 'en');
      feature.should.have.property('type', 'Feature');
      feature.should.have.property('keyword', 'Feature');
      feature.should.have.property('name', 'Hello World');

      const scenarioDefinitions = feature.scenarioDefinitions;
      scenarioDefinitions[0].should.have.property('type', 'Scenario');
      scenarioDefinitions[0].should.have.property('keyword', 'Scenario');
      scenarioDefinitions[0].should.have.property('name', 'Look Ma');

      scenarioDefinitions[0].should.have.deep.property('steps[0].type', 'Step');
      scenarioDefinitions[0].should.have.deep.property('steps[0].keyword', 'Given ');
      scenarioDefinitions[0].should.have.deep.property('steps[0].text', 'I am in a browser');

      scenarioDefinitions[0].should.have.deep.property('steps[1].type', 'Step');
      scenarioDefinitions[0].should.have.deep.property('steps[1].keyword', 'When ');
      scenarioDefinitions[0].should.have.deep.property('steps[1].text', 'I make a syntax error');

      scenarioDefinitions[0].should.have.deep.property('steps[2].type', 'Step');
      scenarioDefinitions[0].should.have.deep.property('steps[2].keyword', 'Then ');
      scenarioDefinitions[0].should.have.deep.property('steps[2].text', 'stuff should be red');
    });

    it('should parse a feature with a single scenario outline', function () {
      // language=Gherkin
      const featureAsString =
          `
        Feature: Eating cucumbers

          Scenario Outline: Eat
            Given there are <start> cucumbers
            When I eat <eat> cucumbers
            Then I should have <left> cucumbers

            Examples:
              | start | eat | left |
              | 12    | 5   | 7    |
              | 20    | 5   | 15   |
      `;

      const feature = gherkin.parse(featureAsString);

      feature.should.have.property('language', 'en');
      feature.should.have.property('type', 'Feature');
      feature.should.have.property('keyword', 'Feature');
      feature.should.have.property('name', 'Eating cucumbers');

      const scenarioDefinitions = feature.scenarioDefinitions;
      scenarioDefinitions[0].should.have.property('type', 'ScenarioOutline');
      scenarioDefinitions[0].should.have.property('keyword', 'Scenario Outline');
      scenarioDefinitions[0].should.have.property('name', 'Eat');

      scenarioDefinitions[0].should.have.deep.property('steps[0].type', 'Step');
      scenarioDefinitions[0].should.have.deep.property('steps[0].keyword', 'Given ');
      scenarioDefinitions[0].should.have.deep.property('steps[0].text', 'there are <start> cucumbers');

      scenarioDefinitions[0].should.have.deep.property('steps[1].type', 'Step');
      scenarioDefinitions[0].should.have.deep.property('steps[1].keyword', 'When ');
      scenarioDefinitions[0].should.have.deep.property('steps[1].text', 'I eat <eat> cucumbers');

      scenarioDefinitions[0].should.have.deep.property('steps[2].type', 'Step');
      scenarioDefinitions[0].should.have.deep.property('steps[2].keyword', 'Then ');
      scenarioDefinitions[0].should.have.deep.property('steps[2].text', 'I should have <left> cucumbers');

      scenarioDefinitions[0].examples[0].should.have.property('type', 'Examples');
      scenarioDefinitions[0].examples[0].should.have.property('keyword', 'Examples');

      scenarioDefinitions[0].examples[0].tableHeader.should.have.deep.property('type', 'TableRow');
      scenarioDefinitions[0].examples[0].tableHeader.should.have.deep.property('cells[0].value', 'start');
      scenarioDefinitions[0].examples[0].tableHeader.should.have.deep.property('cells[1].value', 'eat');
      scenarioDefinitions[0].examples[0].tableHeader.should.have.deep.property('cells[2].value', 'left');

      scenarioDefinitions[0].examples[0].tableBody.should.have.deep.property('[0].type', 'TableRow');
      scenarioDefinitions[0].examples[0].tableBody.should.have.deep.property('[0].cells[0].value', '12');
      scenarioDefinitions[0].examples[0].tableBody.should.have.deep.property('[0].cells[1].value', '5');
      scenarioDefinitions[0].examples[0].tableBody.should.have.deep.property('[0].cells[2].value', '7');

      scenarioDefinitions[0].examples[0].tableBody.should.have.deep.property('[1].type', 'TableRow');
      scenarioDefinitions[0].examples[0].tableBody.should.have.deep.property('[1].cells[0].value', '20');
      scenarioDefinitions[0].examples[0].tableBody.should.have.deep.property('[1].cells[1].value', '5');
      scenarioDefinitions[0].examples[0].tableBody.should.have.deep.property('[1].cells[2].value', '15');
    });

    it('should parse a feature with the background', function () {
      // language=Gherkin
      const featureAsString =
          `
        Feature: Simple feature with background

          A simple feature to make sure we can parse the Background keyword

          Background: a background can have name

          As well as description

            Given background step 1
            And background step 2

          Scenario: Scenario 1
            Given scenario step 1
            When scenario step 2
      `;

      const feature = gherkin.parse(featureAsString);

      feature.should.have.property('language', 'en');
      feature.should.have.property('type', 'Feature');
      feature.should.have.property('keyword', 'Feature');
      feature.should.have.property('name', 'Simple feature with background');

      feature.background.should.have.property('type', 'Background');
      feature.background.should.have.property('keyword', 'Background');
      feature.background.should.have.property('name', 'a background can have name');
      feature.background.should.have.property('description', '          As well as description');

      feature.background.steps.should.have.deep.property('[0].type', 'Step');
      feature.background.steps.should.have.deep.property('[0].keyword', 'Given ');
      feature.background.steps.should.have.deep.property('[0].text', 'background step 1');

      feature.background.steps.should.have.deep.property('[1].type', 'Step');
      feature.background.steps.should.have.deep.property('[1].keyword', 'And ');
      feature.background.steps.should.have.deep.property('[1].text', 'background step 2');

      feature.scenarioDefinitions[0].should.have.property('type', 'Scenario');
      feature.scenarioDefinitions[0].should.have.property('keyword', 'Scenario');
      feature.scenarioDefinitions[0].should.have.property('name', 'Scenario 1');

      feature.scenarioDefinitions[0].steps.should.have.deep.property('[0].type', 'Step');
      feature.scenarioDefinitions[0].steps.should.have.deep.property('[0].keyword', 'Given ');
      feature.scenarioDefinitions[0].steps.should.have.deep.property('[0].text', 'scenario step 1');

      feature.scenarioDefinitions[0].steps.should.have.deep.property('[1].type', 'Step');
      feature.scenarioDefinitions[0].steps.should.have.deep.property('[1].keyword', 'When ');
      feature.scenarioDefinitions[0].steps.should.have.deep.property('[1].text', 'scenario step 2');
    });

    it('should parse a feature with tags', function () {
      // language=Gherkin
      const featureAsString =
          `
        @FeatureTag1 @FeatureTag2
        Feature: Simple feature with tags

          A simple feature to make sure we can parse tags.

          @Scenario1Tag1 @Scenario1Tag2
          Scenario: Scenario 1
            Given scenario 1 step 1

          @Scenario2Tag1
          Scenario: Scenario 2
            Given scenario 2 step 1

          @ScenarioOutlineTag1
          Scenario Outline: Scenario Outline 1
            Given a variable <foo>
            Examples:
              | foo |
              | bar |
      `;
      const feature = gherkin.parse(featureAsString);

      feature.tags[0].name.should.equal('@FeatureTag1');
      feature.tags[1].name.should.equal('@FeatureTag2');

      feature.scenarioDefinitions[0].tags[0].name.should.equal('@Scenario1Tag1');
      feature.scenarioDefinitions[0].tags[1].name.should.equal('@Scenario1Tag2');

      feature.scenarioDefinitions[1].tags[0].name.should.equal('@Scenario2Tag1');
      feature.scenarioDefinitions[2].tags[0].name.should.equal('@ScenarioOutlineTag1');
    });

    it('should parse a feature with data tables', function () {
      // language=Gherkin
      const featureAsString =
          `
        Feature: Metadata

          Scenario: Provide information about authors and contributors
            Given the "authors" property in "featurebook.json" contains the following authors
              | firstName | lastName    | email                  |
              | Henryk    | Sienkiewicz | hsienkiewicz@gmail.com |
              | Eliza     | Orzeszkowa  | eorzeszkowa@gmail.com  |
            And the "contributors" property in "featurebook.json" contains the following contributors
              | firstName | lastName | email               |
              | Juliusz   | Slowacki | jslowacki@gmail.com |
            When I server the directory as a system specification
            And open it in my Web browser
            Then the authors should be listed beneath the specification's title
            And the contributors should be listed beneath the authors
      `;
      const feature = gherkin.parse(featureAsString);
      const firstScenarioDefinition = feature.scenarioDefinitions[0];

      feature.name.should.equal('Metadata');

      firstScenarioDefinition.name.should.equal('Provide information about authors and contributors');

      assertTableDataEqual(firstScenarioDefinition.steps[0].argument.rows, [
        ['firstName', 'lastName', 'email'],
        ['Henryk', 'Sienkiewicz', 'hsienkiewicz@gmail.com'],
        ['Eliza', 'Orzeszkowa', 'eorzeszkowa@gmail.com']
      ]);

      assertTableDataEqual(firstScenarioDefinition.steps[1].argument.rows, [
        ['firstName', 'lastName', 'email'],
        ['Juliusz', 'Slowacki', 'jslowacki@gmail.com']
      ]);
    });

    it('should parse a feature with doc strings', function () {
      // language=Gherkin
      const featureAsString =
          `
        Feature: Simple feature with doc string

          Background:
            Given the home page with Markdown body
            """
            Awesome Blog
            ============
            Welcome to Awesome Blog!
            """

          Scenario: Some scenario

            Given a blog post named "Random" with Markdown body
            """
            Some Title, Eh?
            ===============
            Here is the first paragraph of my blog post.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            """
            And a comment with Markdown body
            """
            This is awesome dude!
            """
            When I open it in a web browser
            Then it should be displayed as a nicely formatted HTML page
      `;

      const feature = gherkin.parse(featureAsString);
      const firstScenario = feature.scenarioDefinitions[0];

      feature.background.steps[0].argument.content.should.equal('Awesome Blog\n============\nWelcome to Awesome Blog!');

      firstScenario.steps[0].argument.content.should.equal(
        'Some Title, Eh?\n===============\nHere is the first paragraph of my blog post.\nLorem ipsum dolor sit amet, consectetur adipiscing elit.');

      firstScenario.steps[1].argument.content.should.equal('This is awesome dude!');
    });

    it('should parse a feature with the scenario outline and data table', function () {
      // language=Gherkin
      const featureAsString =
          `
        Feature: Simple feature with scenario outline and data table

          To make sure we can parse such a feature.

          Scenario Outline: Getting drinks for free
            Given the machine has the following choices
              | brand  |
              | cola   |
              | sprite |
            When I choose <choice>
            Then the output tray is <empty>
            And the machine delivers a can of <brand> to the output tray

            Examples:
              | choice | empty     | brand  |
              | cola   | not empty | cola   |
              | sprite | not empty | sprite |
      `;

      const feature = gherkin.parse(featureAsString);

      const firstScenarioDefinition = feature.scenarioDefinitions[0];
      const firstStep = firstScenarioDefinition.steps[0];

      feature.name.should.equal('Simple feature with scenario outline and data table');

      assertStepEqual(firstStep, 'Given ', 'the machine has the following choices');

      assertTableDataEqual(firstStep.argument.rows, [
        ['brand'],
        ['cola'],
        ['sprite']
      ]);

      assertTableHeaderEqual(firstScenarioDefinition.examples[0].tableHeader, ['choice', 'empty', 'brand']);
      assertTableDataEqual(firstScenarioDefinition.examples[0].tableBody, [
        ['cola', 'not empty', 'cola'],
        ['sprite', 'not empty', 'sprite']
      ]);
    });

    it('should parse a feature with the scenario outline and two examples', function () {
      // language=Gherkin
      const featureAsString =
          `
        Feature: Withdraw Fixed Amount

          The "Withdraw Cash" menu contains several fixed amounts to
          speed up transactions for users.

          Scenario Outline: Withdraw fixed amount
            Given I have <Balance> in my account
            When I choose to withdraw the fixed amount of <Withdrawal>
            Then I should <Outcome>
            And the balance of my account should be <Remaining>

            Examples: Successful withdrawal
              | Balance | Withdrawal | Outcome           | Remaining |
              | $500    | $50        | receive $50 cash  | $450      |
              | $500    | $100       | receive $100 cash | $400      |

            Examples: Attempt to withdraw too much
              | Balance | Withdrawal | Outcome              | Remaining |
              | $100    | $200       | see an error message | $100      |
              | $0      | $50        | see an error message | $0        |
      `;

      const feature = gherkin.parse(featureAsString);
      const firstScenario = feature.scenarioDefinitions[0];

      firstScenario.examples[0].name.should.equal('Successful withdrawal');
      assertTableHeaderEqual(firstScenario.examples[0].tableHeader, ['Balance', 'Withdrawal', 'Outcome', 'Remaining']);
      assertTableDataEqual(firstScenario.examples[0].tableBody, [
        ['$500', '$50', 'receive $50 cash', '$450'],
        ['$500', '$100', 'receive $100 cash', '$400']
      ]);

      firstScenario.examples[1].name.should.equal('Attempt to withdraw too much');
      assertTableHeaderEqual(firstScenario.examples[1].tableHeader, ['Balance', 'Withdrawal', 'Outcome', 'Remaining']);
      assertTableDataEqual(firstScenario.examples[1].tableBody, [
        ['$100', '$200', 'see an error message', '$100'],
        ['$0', '$50', 'see an error message', '$0']
      ]);
    });

    it('should preserve ordering when parsing scenarios and scenario outlines', function () {
      // language=Gherkin
      const featureAsString =
          `
        Feature: Simple feature with scenarios and scenario outlines

          To make sure we can preserve the order.

          Scenario Outline: first outline
            Given some variable <foo>
            Examples:
              | foo |
              | bar |

          Scenario: first scenario
            Given some step goes here

          Scenario Outline: second outline
            Given some other variable <bar>
            Examples:
              | bar |
              | foo |

          Scenario: second scenario
            Given some other step goes here
      `;

      const feature = gherkin.parse(featureAsString);

      feature.scenarioDefinitions[0].name.should.equal('first outline');
      feature.scenarioDefinitions[1].name.should.equal('first scenario');
      feature.scenarioDefinitions[2].name.should.equal('second outline');
      feature.scenarioDefinitions[3].name.should.equal('second scenario');
    });
  });

  function assertStepEqual(actualStep, expectedKeyword, expectedText) {
    actualStep.keyword.should.equal(expectedKeyword);
    actualStep.text.should.equal(expectedText);
  }

  function assertTableHeaderEqual(tableHeader, expectedCellValues) {
    tableHeader.cells.map(cellValue).should.deep.equal(expectedCellValues);

    function cellValue(cell) {
      return cell.value;
    }
  }

  function assertTableDataEqual(tableData, expectedCellValues) {
    tableData.map(cellValue).should.deep.equal(expectedCellValues);

    function cellValue(row) {
      return row.cells.map(function (cell) {
        return cell.value;
      });
    }
  }

});
