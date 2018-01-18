var antlr4 = require('antlr4/index');
const RLexer = require("./R/RLexer.js")
const RParser = require("./R/RParser.js");
const RVisitor  = require("./R/RVisitor");

let getRParsedTree = function (input) {
    var chars = new antlr4.InputStream(input);
    var lexer = new RLexer.RLexer(chars);
    var tokens  = new antlr4.CommonTokenStream(lexer);
    var parser = new RParser.RParser(tokens);
    parser.buildParseTrees = true;
    var parseError = null;
    try {
        var tree = parser.prog();
    } catch (e) {
        parseError = e;
    }
    var visitor = new RVisitor.RVisitor();
    var result = visitor.visitProg(tree);
    return {
        error : parseError,
        tree : result
    }
}

window.AntlrExpressionParsers = {
    R : {
        parse : getRParsedTree
    }
};
