def same_frequency(num1, num2):
    """Do these nums have same frequencies of digits?
    
        >>> same_frequency(551122, 221515)
        True
        
        >>> same_frequency(321142, 3212215)
        False
        
        >>> same_frequency(1212, 2211)
        True
    """
    num1 = str(num1); num2 = str(num2)
    from collections import defaultdict     # I've used this before, it's really nice
    dict1 = defaultdict(int); dict2 = defaultdict(int) # all new entries have value 0 if not in dict
    for c in num1:
        dict1[c] += 1
    for c in num2:
        dict2[c] += 1
    return dict1 == dict2