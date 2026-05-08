"""Module for greeting functionality."""


def greet(name: str) -> str:
    """Return a greeting message for the given name.

    Args:
        name: The name to greet.

    Returns:
        A formatted greeting string.
    """
    return f"Hello, {name}!"


def main() -> None:
    """Run the main program logic."""
    print(greet("World"))


if __name__ == "__main__":
    main()
