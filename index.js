var antlr4 = require('antlr4/index');
const RLexer = require("./R/RLexer.js")
const RParser = require("./R/RParser.js");
const RVisitor  = require("./R/RVisitor");
const RErrorListner = require("./R/RErrorListener");

let getRParsedTree = function (input) {
    var chars = new antlr4.InputStream(input);
    var lexer = new RLexer.RLexer(chars);
    var tokens = new antlr4.CommonTokenStream(lexer);
    var parser = new RParser.RParser(tokens);
    var errorListener = new RErrorListner.RErrorListner();
    parser.buildParseTrees = true;
    var parseError = null;
    parser.addErrorListener(errorListener);
    var tree = parser.prog();
    var visitor = new RVisitor.RVisitor();
    if (errorListener.errors.length > 0) {
        return {
            errors: errorListener.errors,
            tree: null,
        };
    }
    var result = visitor.visitProg(tree);
    return {
        errors: null,
        tree: result
    }
}

window.AntlrExpressionParsers = {
    R : {
        parse : getRParsedTree
    }
};
