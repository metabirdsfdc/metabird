export function prettyPrintXml(xml: string): string {
    try {
        const PADDING = " ".repeat(4); // indent size

        xml = xml.replace(/(>)(<)(\/*)/g, "$1\n$2$3");

        let formatted = "";
        let indent = 0;

        xml.split("\n").forEach((line) => {
            if (line.match(/^<\/\w/)) {
                indent -= 1;
            }
            formatted += PADDING.repeat(indent) + line + "\n";
            if (line.match(/^<\w([^>]*[^/])?>/)) {
                indent += 1;
            }
        });

        return formatted.trim();
    } catch {
        return xml;
    }
}
