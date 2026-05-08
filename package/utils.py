"""Utility functions for basic mathematical and string operations."""


def add(a: int | float, b: int | float) -> int | float:
    """Return the sum of two numbers.

    Args:
        a: The first number.
        b: The second number.

    Returns:
        The sum of a and b.
    """
    return a + b


def multiply(a: int | float, b: int | float) -> int | float:
    """Return the product of two numbers.

    Args:
        a: The first number.
        b: The second number.

    Returns:
        The product of a and b.
    """
    return a * b


def reverse_string(text: str) -> str:
    """Return the reversed version of the input string.

    Args:
        text: The string to reverse.

    Returns:
        The reversed string.
    """
    return text[::-1]
