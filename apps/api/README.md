# Welcome to the documentation for our Societies API.

## Data layer

Our data layer exists on top of Drizzle ORM. We have CRUD functions as necessary for each resource that call functions in Drizzle to create, update, and modify rows in our database. Data layer documentation can be found in the `api/data` section of this documentation.

## Business layer

Our business layer calls functions in our data layer and is called upon by our service layer. We have functions here to align with each route in our service layer that contain the proper business logic and rules to call our data layer based on different functions exposed in the service layer. The documentation can be found under `api/controllers` in this documentation.
