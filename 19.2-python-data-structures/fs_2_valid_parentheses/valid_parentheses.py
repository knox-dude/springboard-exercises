def valid_parentheses(parens):
    """Are the parentheses validly balanced?

        >>> valid_parentheses("()")
        True

        >>> valid_parentheses("()()")
        True

        >>> valid_parentheses("(()())")
        True

        >>> valid_parentheses(")()")
        False

        >>> valid_parentheses("())")
        False

        >>> valid_parentheses("((())")
        False

        >>> valid_parentheses(")()(")
        False
    """
    stack = []
    for paren in parens:
        if paren == ")":
            if len(stack) == 0:
                return False
            stack.pop()
        else:
            stack.append(paren)
    return True if len(stack) == 0 else False
            