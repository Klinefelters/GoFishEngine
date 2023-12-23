<a name="readme-top"></a>

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/klinefelters/GoFishEngine">
    <img src="images/logo.png" alt="Logo" width="150" height="150">
  </a>
<h3 align="center">GoFishEngine</h3>
  <p align="center">
    A python engine to create and test Go Fish bots
    <br />
    <a href="https://github.com/klinefelters/GoFishEngine/wiki"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/klinefelters/GoFishEngine/issues">Report Bug</a>
    ·
    <a href="https://github.com/klinefelters/GoFishEngine/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#development-setup">Development Setup</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project
<img src="images/Screenshot.png" alt="screenshot" width="960" height="540">




<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

* [![React][React-badge]][React-url]
* [![Flask][Flask-badge]][Flask-url]
* [![attrs][attrs-badge]][attrs-url]



<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple example steps.

### Prerequisites

* [Node](https://nodejs.org/en/)
* [Python](https://www.python.org/downloads/)

### Installation

1. Install the package
   ```sh
   pip install git+https://github.com/Klinefelters/GoFishEngine
   ```
2. Set up the engine:
  ```python
  from gofish import Engine
  from gofish.examplePlayers import RandPlayer
  from logging import INFO  # Echange this with debug to get more info

  engine = Engine(
      players=[
          RandPlayer("Random 0"),
          RandPlayer("Random 1"),
          # Add up to 7 players
      ],
      logLevel=INFO)
  ```
3. Render the results:
   - Print the game out to the terminal
   ```python
    engine.playGame()
   ```
   - Serve the game as a webgui at localhost:8000
   ```python
    engine.serveGame()
   ```
   - Evaulate players over any number of runs
   ```python
    print(engine.evaluatePlayers(runs=1000))
   ```
   - Yeild the game as a generator of summaries
   ```python
    while True:
        try:
            summary = next(engine.yieldGame())
            print(summary.getDict())
            input()
        except StopIteration:
            break
   ```
  example:
  ```python
  from gofish import Engine
  from gofish.examplePlayers import RandPlayer
  from logging import INFO  # Echange this with debug to get more info
  
  engine = Engine(
      players=[
          RandPlayer("Random 0"),
          RandPlayer("Random 1"),
          # Add up to 7 players
      ],
      logLevel=INFO)
  engine.serveGame()

  ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- Development Setup -->
 ## Development Setup
1. Clone the repo:
    ```bash
    git clone https://github.com/klinefelters/GoFishEngine
    ```
2. Install the client:
   ```bash
   cd client
   npm i
   ```
3. Now when testing run the following for hotreloads:
   ```bash
   npm run dev
   ```

 <p align="right">(<a href="#readme-top">back to top</a>)</p> 



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Klinefelters - klinefelters@etown.edu

Project Link: [https://github.com/klinefelters/GoFishEngine](https://github.com/klinefelters/GoFishEngine)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
<!-- ## Acknowledgments -->

<!-- <p align="right">(<a href="#readme-top">back to top</a>)</p> -->



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/klinefelters/GoFishEngine.svg?style=for-the-badge
[contributors-url]: https://github.com/klinefelters/GoFishEngine/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/klinefelters/GoFishEngine.svg?style=for-the-badge
[forks-url]: https://github.com/klinefelters/GoFishEngine/network/members
[stars-shield]: https://img.shields.io/github/stars/klinefelters/GoFishEngine.svg?style=for-the-badge
[stars-url]: https://github.com/klinefelters/GoFishEngine/stargazers
[issues-shield]: https://img.shields.io/github/issues/klinefelters/GoFishEngine.svg?style=for-the-badge
[issues-url]: https://github.com/klinefelters/GoFishEngine/issues
[license-shield]: https://img.shields.io/github/license/klinefelters/GoFishEngine.svg?style=for-the-badge
[license-url]: https://github.com/klinefelters/GoFishEngine/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/klinefelters
[product-screenshot]: images/screenshot.png
[React-badge]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Flask-badge]: https://img.shields.io/badge/Flask-%5E3.0.0-blue
[Flask-url]: https://flask.palletsprojects.com/
[attrs-badge]: https://img.shields.io/badge/attrs-%5E23.1.0-orange
[attrs-url]: https://www.attrs.org/
