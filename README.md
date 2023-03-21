# Gordian - Untangling the Gordian knot of OSint

## Team Members

- Eric Brichetto (aka BUTTS)
- Ryan Willett (aka MITH)
- John Rodley (aka T-REX)


## Tool Description
This sections discusses the purpose and motivation for the tool, and how it addresses a tool need you've identified.

## Installation
This section includes detailed instructions for installing the tool, including any terminal commands that need to be executed and dependencies that need to be installed. Instructions should be understandable by non-technical users (e.g. someone who knows how to open a terminal and run commands, but isn't necessarily a programmer), for example:

1. Make sure you have Python version 3.7 or greater installed, node version 16.13.1

2. Download the tool's repository using the command:

        git clone https://github.com/jvrodley/gordian.git

3. Move to the tool's directory and install the tool

        cd gordian/server
        pip install -r requirements.txt
        npm install

4. Run the tool
        
        ./dev_api_server

## GUI Usage
Point your browser at http://localhost:4001/index.html  
Click on Start Untangling.  
Click Open File Dialog
Navigate to gordian/server
Select tweets.csv OR tweets.xlsx
Hit APPLY
Note: Drag and Drop should work, but is untested
You will see the interaction form along with the detected edge-list scrolling off the bottom

## CLI Usage
This sections includes detailed instructions for using the tool. If the tool has a command-line interface, include common commands and arguments, and some examples of commands and a description of the expected output. If the tool has a graphical user interface or a browser interface, include screenshots and describe a common workflow.

## Additional Information
This section includes any additional information that you want to mention about the tool, including:
- Potential next steps for the tool (i.e. what you would implement if you had more time)
- Any limitations of the current implementation of the tool
- Motivation for design/architecture decisions
