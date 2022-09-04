
import setuptools

with open("README.md", "r", encoding="utf-8") as fhand:
    long_description = fhand.read()

setuptools.setup(
    name="over-simplified-downloader",
    version="0.0.1",
    author="EB RW",
    author_email="email@example.com",
    description=("An over-simplified downloader package to "
                "demonstrate python module and tool packaging."),
    long_description=long_description,
    long_description_content_type="text/markdown",
    url="https://github.com/jvrodley/gordian",
    project_urls={
        "Bug Tracker": "https://github.com/jvrodley/gordian/issues",
    },
    classifiers=[
        "Programming Language :: Python :: 3",
        "License :: OSI Approved :: MIT License",
        "Operating System :: OS Independent",
    ],
    install_requires=["requests"],
    packages=setuptools.find_packages(),
    python_requires=">=3.6",
    entry_points={
        "console_scripts": [
            "gordian = gordian.cli:main",
        ]
    }
)
