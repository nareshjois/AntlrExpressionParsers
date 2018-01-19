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
    parser.removeErrorListeners();
    parser.addErrorListener(errorListener);
    var tree = parser.prog();
    var visitor = new RVisitor.RVisitor();
    var result;
    try {
        result = visitor.visitProg(tree);
    } catch (e) {
        errorListener.errors.push({ line: 1, column: 1, message: "Unable to Parse Expression" });
    };
    return {
        errors: errorListener.errors,
        tree: result
    }
}

window.AntlrExpressionParsers = {
    R : {
        parse : getRParsedTree
    }
};
