Feature: EPAM job searching
  As a Job searcher
  I want to browser through EPAM Job offers by various criteria
  So I can find to best fitting offer for me

  Scenario Outline: Search for a job : <Country>
    Given EPAM career page is opened
    Then Job search form should be visible

    #When Form location input field is filled with the <Country> <City>
    When form location input field is filled with the Country and City from <Test Data>
    #And Form skills input field is filled with the <Skill>
    And Form skills input field is filled with the <Test Data>
    #Then Selected location and skill should be visible. Location: <City> Skill : <Skill>
    Then Selected location and skill should be visible with Location and Skill of <Test Data>

    When The FIND button is clicked
    Then The job-listing page should be loaded
    # And The position name should be visible. PositionName: <PositionName>
    And The position name should be visible with the PositionName of <Test Data>
    #  And The fitting jobs should be listed with <Country> <City>
    And The fitting jobs should be listed with Country and City of <Test Data>
    And Apply button should be present

    When The APPLY button is clicked
    #  Then The Job detail page should be loaded with proper <City> and <PositionName>
    Then The Job detail page should be loaded with proper City and PositionName of <Test Data>
    

    #Examples:
    #  | Country | City     | Skill                     | PositionName             |
    #  | Hungary | Debrecen | Software Test Engineering | Test Automation Engineer |
    #  | Belarus | Minsk    | Cloud & DevOps            | DevOps Engineer          |

    Examples:
      | Test Data |
      | 1         |
      | 2         |