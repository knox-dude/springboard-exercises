from random import choice

class WordFinder:
    """Finds random words from a dictionary."""

    def __init__(self, fileDir="words.txt"):
        """Reads and stores the given dictionary"""
        self.words = []
        self.fileDir = fileDir
        self._hasReadFile = False
        self._readFile()
        print(f"{len(self.words)} words read")

    def _readFile(self):
        """Populates self.words or returns if file has been read"""

        if self._hasReadFile: return

        with open(self.fileDir, "r") as fp:
            lines = fp.readlines()
            for line in lines:
                self.words.append(line.strip())

        self._hasReadFile = True

    def random(self):
        """Returns a random word from the file that was read"""
        return choice(self.words) 


class SpecialWordFinder(WordFinder):
    """WordFinder that excludes commented and blank lines"""

    def __init__(self, fileDir="words.txt"):
        """Reads and stores the given dictionary, skipping blank/commented lines"""
        super().__init__(fileDir)
        wordsBefore = len(self.words)
        self.words = [s for s in self.words if s and not s.startswith("#")]
        print(f"Removed {wordsBefore-len(self.words)} blank or commented words")
        