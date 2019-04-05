# Alloy CLI 
This is the command-line interface for Alloy projects. It downloads and installs blank templates for basic, craft and expression engine projects, as well as having functions like watch and build for development purposes.

## Requirements 
You'll need the following software installed to get started.

Node.js 0.12+: Use the installer provided on the [NodeJS](<https://nodejs.org/en/>) website.
With Node installed run `sudo npm install -g gulp bower`.
Git: Use the installer for your OS.
Windows users can also try Git for Windows.



## Installation

Download or clone the repo, extract it. Inside the main folder run the command `npm install -g`

After this you should be able to use the Alloy CLI commands.




## CLI main commands 
The CLI has three main commands:

- `alloy new`
  - For creating a new project from scratch.

* ```alloy watch```
    * This command will start the development environment by creating a local server and watching changes in any file inside the dev folder.
* ```alloy build```
    * This command will prepare, compile and compress all the files inside the dev folder and put them inside the cms folder (including raw dev files).
* ```alloy buildDev```
    * This command is used to go backwards in the dev process. It copies files located in dev_files folder and places them inside the dev folder to start development. *This command will only work if the development of the project was initiated using this workflow.* Eg: You started a project using this workflow and it was pushed to production time ago. If you want to make changes on the project you would pull from the server and run this command. After this you will be able to develop as normal.
* `alloy help` gives you a list of all the command and what they do.



## Development workflow

[Craft 3 development workflow](https://github.com/wearealloy/alloy-craft-template)

[Simple development workflow](https://github.com/wearealloy/alloy-basic-template)





