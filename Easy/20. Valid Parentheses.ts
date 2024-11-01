function isValid(s: string): boolean {
    let bracket_stack : string[] = []
    for (let bracket of s) {
        switch (bracket) {
            case '(':
            case '[':
            case '{':
                bracket_stack.push(bracket)
                break;
            case ')':
                if (bracket_stack.pop() != '(') return false;
                break;
            case ']':
                if (bracket_stack.pop() != '[') return false;
                break;
            case '}':
                if (bracket_stack.pop() != '{') return false;
                break;
        }
    }

    return bracket_stack.length === 0
};