def titleize(phrase):
    """Return phrase in title case (each word capitalized).

        >>> titleize('this is awesome')
        'This Is Awesome'

        >>> titleize('oNLy cAPITALIZe fIRSt')
        'Only Capitalize First'
    """
    phrase = phrase.split()
    return_str = ""
    for p in phrase:
        return_str += p.capitalize() + " "
    return return_str.strip() 

# Yeah there's definitely too many assumptions made with my solution, but it works so...
# for example any non-space whitespace in phrase would be converted into spaces (tabs -> spaces)