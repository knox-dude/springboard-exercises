def reverse_vowels(s):
    """Reverse vowels in a string.

    Characters which re not vowels do not change position in string, but all
    vowels (y is not a vowel), should reverse their order.

    >>> reverse_vowels("Hello!")
    'Holle!'

    >>> reverse_vowels("Tomatoes")
    'Temotaos'

    >>> reverse_vowels("Reverse Vowels In A String")
    'RivArsI Vewols en e Streng'

    reverse_vowels("aeiou")
    'uoiea'

    reverse_vowels("why try, shy fly?")
    'why try, shy fly?''
    """
    vowels = set('aeiouAEIOU')
    p1, p2 = 0, len(s)-1
    p2_stop = True
    while p1 < p2:
        if p2_stop:
            if s[p1] in vowels:
                p2_stop = False
            else:
                p1 += 1
        else:
            if s[p2] in vowels:
                newStr = s[:p1] + s[p2] + s[p1+1:p2] + s[p1]+s[p2+1:] # this was a tad brain bending
                s = newStr
                p1+=1; p2-=1
                p2_stop = True
            else:
                p2 -= 1
    return s