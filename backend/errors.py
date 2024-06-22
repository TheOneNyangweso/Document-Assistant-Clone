"""Define exceptions for various situations, including details
of the problem in the form of a msg string attribute. 
These will flow up through the layers with no code changes
until the Web path functions catch them. They're also application-specific
rather than database-specific, preserving the sanctity of the layers.
    """


class Missing(Exception):
    def __init__(self, msg: str):
        self.msg = msg


class FailUpload(Exception):
    def __init__(self, msg: str):
        self.msg = msg


class Duplicate(Exception):
    def __init__(self, msg: str):
        self.msg = msg
