# Alloy CLI 
This is the command-line interface for Alloy projects. It downloads and installs blank templates for basic, craft and expression engine projects.
---

# Requirements
You'll need the following software installed to get started.

Node.js 0.12+: Use the installer provided on the NodeJS website.
With Node installed, run [sudo] npm install -g gulp bower.
Git: Use the installer for your OS.
Windows users can also try Git for Windows.


# CLI main commands 
The CLI has three main commands:

* ```alloy watch```
    * This command will start the development environment by creating a local server and watching changes in any file inside the dev folder.
* ```alloy build```
    * This command will prepare, compile and compress all the files inside the dev folder and put them inside the cms folder (including raw dev files).
* ```alloy buildDev```
    * This command is used to go backwards in the dev process. It copies files located in dev_files folder and places them inside the dev folder to start development. *This command will only work if the development of the project was initiated using this workflow.* Eg: You started a project using this workflow and it was pushed to production time ago. If you want to make changes on the project you would pull from the server and run this command. After this you will be able to develop as normal.


---

# Development Workflow

This workflow will be devided into cases, each case would follow a specific number of steps and tasks to be run.
The cases are the following

* Development from scratch
* Pushing to staging or production
* Development from existing project

---

## Development from scratch:
1. Create root folder for the new project and name it ‘projectname’.’domain’  (eg: uberrito.com). 
2. Move into the project folder and clone the development workflow structure repo from [here](https://github.com/wearealloy/web-workflow). This will create a folder called 'web-workflow' inside the root folder. Extract all its content to the root folder with the exception of the git folder, then delete the 'web-workflow' folder.
3. Run the command ```npm install``` from the root directory of the project. [Node.js](https://nodejs.org/en/) required.
4. Download Craft 3 CMS from [here](https://docs.craftcms.com/v3/installation.html#step-1-download-craft) and extract its content inside the cms folder located in the root of the project.
5. Locate the file ‘.env.example’ at ```root/cms/example_files/``` and copy and paste its content in the ‘.env’ file located in ```root/cms/```.
6. Locate the file ‘general.example.php’ at ```root/cms/example_files``` and copy and paste its content in the ‘general.php’ file located in ```root/cms/config/```.
7. Follow Craft 3 installation instructions [here](https://docs.craftcms.com/v3/installation.html#step-1-download-craft) 
    1. Follow steps [here](https://www.evernote.com/l/AAdH90XLgkdDfKnv7NvFTKlAbUJ_RGApuI4) in case you need help installing the cms web host for the first time.
    2. Remember to point the vhost to ```root/cms/web/``` folder***
8. Open ```gulpfile.js``` located in the root folder of the project, locate the variable ```vHost``` on line 22. Edit it and add the vHost url you are using to run the local environment (step 7.1).

After this steps you are ready to start development on your new project. All development will happen in the dev folder. Do not delete any files that came within the folder.

* To start development go to the root folder using the terminal and type the command: ```npm start``` (read section above for more info on this command)
* scss|sass|css files go inside ```dev/assets/_scss```, js files go inside ```dev/assets/_js```
* Any time you want to add  scss|sass|css or js files, they have to be included in the main.scss or main.js files respectively. If not they won’t be taken into consideration when watching or building the files for production.
* All HTML files go inside the ```template/``` folder. Twig can be used to write HTML files with no issue.
* Images go inside ```dev/assets/img/``` or ```dev/media``` depending on the use.

* Since craft uses the ```web/``` directory as entry point, all references in html, css and js files need be relative to that directory.

---
 
## Pushing to staging or production:
Go to root folder of project using terminal and run the command ```npm run build``` (more info in section above)
1. Create database in the server following this convention names and settings
    1. name: [project]_cmsdb_[prod/staging]
    2. username: [project]_craft3
    3. collation: utf8_general_ci
2. Move entire cms folder inside project folder to server.
3. Edit ‘.env’ file located at ‘root > cms’
    1. Comment out local environmental variables
    2. Add staging environmental variables (db user, db password, db name)
4. Once on the server, find the dev_files folder and change permissions to '644'.

---
   
## Development from existing project:

```diff
- This case only applies if the development of the project was initiated using this workflow.
```
This case only applies when you are going to start or continue development from a project that you pulled from         production or staging.

1. Create root folder for project if it doesn’t exist and name it ‘projectname’.’domain’  (eg: uberrito.com).
2. Export db from server and import it locally
3. Clone the [web-workflow](https://github.com/wearealloy/web-workflow) repo and place it inside the root folder.
4. Download all files from staging or production server and place them inside the cms folder located in the root of the project.
5. Edit ‘.env’ file located at ```root/cms/```
    1. Comment out staging or production environmental variables
    2. Add local environmental variables (db user, db password, db name)
6. Run the command ```npm run buildDev``` from the root of the project.

    You are now ready to start development. Read after steps on the 'Development from scratch’ case for more info.


