import * as tl from 'azure-pipelines-task-lib/task';

function checkEmptyOrNotDefinedVariableFromPattern(variablePattern: string, isSecret: boolean, definedVariables: tl.VariableInfo[]) {

    var pattern = new RegExp(variablePattern, "i");

    var notFound = true;

    definedVariables.forEach(variable => {


        if (variable.secret === isSecret
            && variable.name.toLowerCase().startsWith("system.") == false) {

            // It is defined?
            if (pattern.test(variable.name)) {
                notFound = false;

                if (typeof (variable.value) === "undefined" || variable.value === "") {
                    tl.setResult(tl.TaskResult.Failed, `${variable.name} cannot be empty.`, false);
                }
            }
        }
    });
    
    // couldn't find the variable
    if (notFound) {
        tl.setResult(tl.TaskResult.Failed, `no variable found with pattern ${variablePattern}`);
    }

}

async function run() {
    try {
        let definedVariables = tl.getVariables()

        let secretsList = tl.getDelimitedInput("nonEmptySecrets", ",")
        let variablesList = tl.getDelimitedInput("nonEmptyVariables", ",")

        tl.debug(`Found ${secretsList.length}  secrets`);
        tl.debug(`Found ${variablesList.length}  variables`);

        // Validate secrets
        secretsList.forEach(variablePattern => {
            tl.debug(`Checking secret pattern ${variablePattern}`);
            checkEmptyOrNotDefinedVariableFromPattern(variablePattern.trim(), true, definedVariables);
        });

        // Validate variables (non secrets)
        variablesList.forEach(variablePattern => {
            tl.debug(`Checking pattern ${variablePattern}`);
            checkEmptyOrNotDefinedVariableFromPattern(variablePattern.trim(), false, definedVariables);
        });

    } catch (err) {
        tl.setResult(tl.TaskResult.Failed, err.message);
    }
}

run();

