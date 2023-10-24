"""Python serial number generator."""

class SerialGenerator:
    """Machine to create unique incrementing serial numbers.
    
    >>> serial = SerialGenerator(start=100)

    >>> serial.generate()
    100

    >>> serial.generate()
    101

    >>> serial.generate()
    102

    >>> serial.reset()

    >>> serial.generate()
    100
    """

    def __init__(self, start=100):
        """Creates a SerialGenerator object"""
        self.start = start-1
        self.current = self.start
    
    def generate(self):
        """Generates the next number in the sequence"""
        self.current += 1
        return self.current
    
    def reset(self):
        """Resets current value to initial start value"""
        self.current = self.start