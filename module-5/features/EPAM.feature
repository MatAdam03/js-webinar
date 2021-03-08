Feature: EPAM job searching
  As a Job searcher
  I want to browser through EPAM Job offers by various criteria
  So I can find to best fitting offer for me

  Scenario Outline: Search for a job : <Country>
    Given EPAM career page is opened
    Then Job search form should be visible

    When Form location input field is filled with the <Country> <City>
    And Form skills input field is filled with the <Skill>
    Then Selected location and skill should be visible. Location: <City> Skill : <Skill>

    When The FIND button is clicked
    Then The job-listing page should be loaded
    And The position name should be visible. PositionName: <PositionName>
    And The fitting jobs should be listed with <Country> <City>
    And Apply button should be present

    When The APPLY button is clicked
    Then The Job detail page should be loaded with proper <City> and <PositionName>

    Examples:
      | Country | City     | Skill                     | PositionName             |
      | Hungary | Debrecen | Software Test Engineering | Test Automation Engineer |
      | Belarus | Minsk    | Cloud & DevOps            | DevOps Engineer          |