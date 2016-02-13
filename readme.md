# House-Allotment-Management-System

##Description: 
  
  HAMS (House Allotment Management System) OR previously know as RAMS (Residential Allotment Mangement System) is specifically designed
  for institutions that deal with the allotment of houses of their employees, the purpose of this application is Improve Merit &
  Transparency, Automation of house allotment Process, with effect and efficency. this application is customly designed for a goverment
  institution to handle all sorts of house allotment requests on basis of basic pay scale. HAMS is prototype and after deployment more
  features will be included.

## Usage - Short Description
####Three Phase of Allotment:
1. Add application, search it and approve the qequest.
2. Find Application in waiting list and approve it.
3. Allot the House.

## How Application Cycle Works - Deatiled Description
A valid application is necessary for initializing the the allotment cycle, an application form must be filled out and save, once its done
the employee can be searched once founder there is green button on the right hand side parallel to each employee details. In order to add
the employee request to waiting list that green button must be clicked to approve the request. once the request is successfully sent to
waiting list it can be seen in the Relevant Waiting list, once the request is approved the allotment page will appear. to simplifcy and
make thing efficent the colony must be selected first and than the house. and by clicking Allot... Voila we are all done.

## Features
* Multiple User Login / User Registration.
* Searching, Sorting by all different particulars e.g Name, Father Name, Designation, BPS (Basic Pay Scale), Department, Date of E.T.G.S (Entry To Government Service) Date of Applicationm Date of Birth, Empployee Type, Service Type so on and so forth. Data Colums can be filtered by clicking on desired column button in column visibility.
* Drag and Drop Multiple Pictures Drag and Drop multiple pictures at the same time.

## Features by Tab
### General (Parameter Entries):
* BPS (Add / Edit / Delete)
* Designation (Add / Edit / Delete)
* Department (Add / Edit / Delete)
* Directorate (Add / Edit / Delete)

### Employee:
* Add Employee
* Seach Employee (Approve / Add / Edit / Delete)

### Accomodation:
* Add House
* Seach All Houses (Add / Edit / Delete)
* Occupied Houses List
* Available House List
* Add Colony
* Search Colony (Add / Edit / Delete)

### Waiting List:
* BPS-01 To BPS-22 waiting divided into 10 different types of waiting lists.

## Installtion
1. Simply Download the Application (All the dependencies are included)
2. Create Datebase by using the .sql file included
3. For changing database details alter Database section in Server.js file.

## Built With

* npm - v2.14.7
* gulp - v3.9.0
* Node.Js - v4.2.2
* Angular.js - v1.4.8
* Bootstrap - v2.3.8
* MD5 - v1.2.1
* body-parser - v1.12.4
* express - v4.12.2
* gulp - v3.9.0
* md5 v2.0.0
* mysql - v2.5.5

## ScreenShots:

#### Registration-View
![Registration-View](/screenshots/register.png?raw=true "Registration-View")

#### Login-View
![Login-View](/screenshots/login.png?raw=true "Login-View")

#### DashBoard-View
![DashBoard-View](/screenshots/dashboard.png?raw=true "Dashboard-View")

#### Add-Employee-Application-View
![Add-Employee-Application-View](/screenshots/addemployee.png?raw=true "Add-Employee-Application-View")

#### Search-Employee-Application-View
![Search-Employee-Application-View](/screenshots/searchemployee.png?raw=true "Search-Employee-Application-View")

#### Add-House-View
![Add-House-View](/screenshots/addhouse.png?raw=true "Add-House-View")

#### Search-House-View
![Search-House-View](/screenshots/searchhouse.png?raw=true "Search-House-View")

#### Available-Houses-View
![Available-Houses-View](/screenshots/availablehouses.png?raw=true "Available-Houses-View")

#### Occupied-Houses-View
![Occupied-Houses-View](/screenshots/occupiedhouses.png?raw=true "Occupied-Houses-View")

#### Add-Search-Colony-View
![Add/Search-Colony-View](/screenshots/add-seach-colony.png?raw=true "Add/Search-Colony-View")

#### WaitingList-View
![WaitingList-View](/screenshots/wl.png?raw=true "WaitingList-View")