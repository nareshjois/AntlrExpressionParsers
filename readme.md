# Expression Parsers using Antlr

This is a simple and fairly ugly version of expression parser for the we build using Antlr Javascript target.
This uses the Visitor Pattern to Generate a JSON Respresentation of Tree.

## Parsers Completed
[X] R

### Input

    rnorm(c(10,20,30), 10, sd = 1)

### Output

    {
        "error": null,
        "tree": [
            {
                "func": {
                    "value": "rnorm",
                    "position": 0
                },
                "params": [
                    {
                        "name": null,
                        "value": {
                            "func": {
                                "value": "c",
                                "position": 6
                            },
                            "params": [
                                {
                                    "name": "",
                                    "value": "10",
                                    "position": 8
                                },
                                {
                                    "name": "",
                                    "value": "20",
                                    "position": 11
                                },
                                {
                                    "name": "",
                                    "value": "30",
                                    "position": 14
                                }
                            ]
                        }
                    },
                    {
                        "name": "",
                        "value": "10",
                        "position": 19
                    },
                    {
                        "name": "sd",
                        "value": "1",
                        "position": 23
                    }
                ]
            }
        ]
    }    

## TODO

[X] Javascript
[X] Excel