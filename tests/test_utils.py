"""Tests for the package.utils module."""

import pytest

from package import add, multiply, reverse_string


class TestAdd:
    """Tests for the add function."""

    def test_add_two_positive(self) -> None:
        assert add(2, 3) == 5

    def test_add_negative_and_positive(self) -> None:
        assert add(-1, 1) == 0

    def test_add_float(self) -> None:
        assert add(1.5, 2.5) == 4.0


class TestMultiply:
    """Tests for the multiply function."""

    def test_multiply_two_positive(self) -> None:
        assert multiply(3, 4) == 12

    def test_multiply_by_zero(self) -> None:
        assert multiply(5, 0) == 0

    def test_multiply_negative(self) -> None:
        assert multiply(-2, 3) == -6


class TestReverseString:
    """Tests for the reverse_string function."""

    def test_reverse_simple(self) -> None:
        assert reverse_string("hello") == "olleh"

    def test_reverse_empty(self) -> None:
        assert reverse_string("") == ""

    def test_reverse_palindrome(self) -> None:
        assert reverse_string("racecar") == "racecar"

    def test_reverse_with_spaces(self) -> None:
        assert reverse_string("ab c") == "c ba"
