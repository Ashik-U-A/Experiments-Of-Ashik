const path = require("path");
const fs = require("fs");

module.exports = function(source, map) {
    source = modify_source(source, this);
    console.log(source);
    this.callback(null, source, map);
};

function modify_source(source, loader_object) {
    let annotations = find_comments(source, loader_object);
    annotations.forEach(annotation => {
        annotation.literal_line = find_literal_line(
            source.substring(annotation.index)
        );
        if (annotation.literal_line !== null)
            source = generate_new_source(source, annotation);
    });
    return source;
}

function generate_new_source(source, annotation) {
    if (annotation.type === "style") {
        source = source.replace(
            annotation.literal_line.full_line,
            cook_source(annotation, "style")
        );
    } else if (annotation.type === "template") {
        source = source.replace(
            annotation.literal_line.full_line,
            cook_source(annotation, "template")
        );
    }
    return source;
}

function cook_source(annotation, type) {
    let new_literal =
        annotation.literal_line.accessor +
        " " +
        annotation.literal_line.variable_name +
        " " +
        (annotation.literal_line.variable_type !== undefined
            ? ":" + annotation.literal_line.variable_type
            : "") +
        "= " +
        "`" +
        (annotation.literal_line.content !== undefined
            ? annotation.literal_line.content + "\n"
            : "");
    if (type === "style") {
        new_literal +=
            "<style>\n" +
            fs.readFileSync(annotation.path, "utf8") +
            "\n</style>";
    } else if (type === "template") {
        console.log("TEMPLATE");
        console.log(fs.readFileSync(annotation.path, "utf8"));
        new_literal += fs.readFileSync(annotation.path, "utf8");
    }
    new_literal += "`;";
    return new_literal;
}

function find_comments(source, loader_object) {
    let regex = /\/\/\s?\[assign\s(style|template)\s?=\s?[',"](.*)[',"]\]/g;
    let annotations_object = [];
    let annotation;
    do {
        annotation = regex.exec(source);
        if (annotation) {
            annotations_object.push({
                index: annotation.index,
                type: annotation[1],
                path: path.resolve(loader_object.context, annotation[2])
            });
        }
    } while (annotation);
    return annotations_object;
}

function find_literal_line(source) {
    let regex = /(?:(?:(?:public)|(?:private))\s)(\w+)(?:\s?\:\s?(string)){0,1}\s?(?:=?\s*([",`,'])([\W\w\n\s]*)(\3))?;/g;
    let literal_line = regex.exec(source);
    console.log(literal_line);
    if (literal_line) {
        return {
            index: literal_line.index,
            full_line: literal_line[0],
            accessor:
                literal_line[0].substring(0, 2) === "pr"
                    ? "private"
                    : literal_line[0].substring(0, 2) === "pu"
                    ? "public"
                    : null,
            variable_name: literal_line[1],
            variable_type: literal_line[2],
            content: literal_line[4]
        };
    } else return null;
}
