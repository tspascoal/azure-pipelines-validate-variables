# Variables Validator

Validates if required variables declared and not empty.

The list of variables to be checked are separated into secrets and not secrets.

You can check if a list of variables are set by it's name or by using a regular expression.

## Using it

```yml
- task: CheckVariables@0
  inputs:
    nonEmptySecrets: emptySecret, MySecret, Secret\..*
    nonEmptyVariables: emptyVar, varWithValue, nonExistantVar
```

Would result with the following errors (assuming that no `Secret.something` variable exists and all variable names are what their names represent)

> ##[error]emptySecret cannot be empty.
> ##[error]no variable found with pattern Secret\..*
> ##[error]emptyVar cannot be empty.
> ##[error]no variable found with pattern nonExistantVar


## Learn More

The [source](https://github.com/tspascoal/azure-pipelines-validate-variables) to this extension is available. Feel free to take, fork, and extend.
