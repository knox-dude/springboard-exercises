def remove_every_other(lst):
    """Return a new list of other item.

        >>> lst = [1, 2, 3, 4, 5]

        >>> remove_every_other(lst)
        [1, 3, 5]

    This should return a list, not mutate the original:

        >>> lst
        [1, 2, 3, 4, 5]
    """
    list_to_return = []
    for idx, val in enumerate(lst):
        if idx % 2 == 0:
            list_to_return.append(val)
    return list_to_return