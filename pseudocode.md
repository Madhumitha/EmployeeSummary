### Requirements - 

1. The assignment must pass all unit tests 
2. Make the styling unique
3. Prompt the user for information 
   i) Email id 
   ii) Specific information - if intern - then school name 
			      else if an engineer then github username

4. Dependencies - jest for running provided tests 
		  inquirer for collecting input from the user

5. Workflow 

 	i) Run tests 
	ii) Create or update classes to pass a single test case
	iii) Repeat 


### Directory structure 

```
lib/ // Classes and helper code 
output/ // rendered output
templates/ //HTML template(s)
test/	// jest tests
  Employee.test.js
  Engineer.test.js
  Intern.test.js
  Manager.test.js
app.js  // Runs the application 
```

Idea from class - 

1. Create multiple HTML templates for each type of user. 

```
main.html
engineer.html
intern.html
manager.html
```

2. Make methods unique so that they are easier to test.

3. The different employee types should all inherit some methods and properties from a base class of ```Employee```

4. The project must have these classes : Employee, Manager, Engineer and Intern. The tests for these classes in the ```tests``` directory must all pass.

5. Employee parent class with the following properties and methods :

   a) name
   b) id
   c) title
   d) getName()
   e) getId()
   f) getEmail()
   g) getRole() //Returns Employee

6) In addition to Employee's properties and methods, Engineer will also have :

	a) github // Github username
	b) getGithub()
	c) getRole() //Overridden to return 'Engineer'

7) In addition to Employee's properties and methods, Intern will also have : 

	a) school
	b) getSchool()
	c) getRole() //Overridden to return 'Intern'

8) User input

The project must prompt the user to build an engineering team.
The team consists of a manager, and any number of engineers and interns.

9) Roster output 

The project must generate a team.html in the output directory, that displays a nicely formatted team roster. Each team member should display the following in no particular order:
a) Name
b) Role
c) ID 
d) Role-specific property (School, link to Github profile, or office number)

10) Add the application to your portfolio.

11) Use validation to ensure that the information provided is in the proper expected format. 

### Pseudo Code - 

1) Prompt the user function 
2) Create a base class Employee and child classes Manager, Engineer and Intern
3) Create a HTML

