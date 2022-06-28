import React, { Component } from 'react';
import './App.css';
import Navigation from "./components/navigation/navigation";
import Signin from "./components/signin/signin";
import Register from "./components/register/register";
import Logo from "./components/logo/logo";
import ImageLinkForm from "./components/imagelinkform/imagelinkform"
import Rank from "./components/rank/rank"
import FaceRecognition from './components/facerecognition/facerecognition';
import Particles from "react-tsparticles";
import Clarifai from 'clarifai';
import './particles.json';



const app = new Clarifai.App({
    apiKey: '55cdc1cb078f40a4b3d6e6c4a885e898'
});


class App extends Component {
    constructor() {
        super();
        this.state = {
            input: '',
            imageUrl: '',
            box: {},
            route: 'signin',
            isSignedIn: false
        }
    }

    calculateFaceLocation = (data) => {
        const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
        const image = document.getElementById('inputimage');
        const width = Number(image.width);
        const height = Number(image.height);
        return {
            leftCol: clarifaiFace.left_col * width,
            topRow: clarifaiFace.top_row * height,
            rightCol: width - (clarifaiFace.right_col * width),
            bottomRow: height - (clarifaiFace.bottom_row * height)
        }
    }

    displayFaceBox = (box) => {
        this.setState({box: box})
    }

    onInputChange = (event) => {
        this.setState({input: event.target.value});
    }

    onButtonSubmit = () => {
        this.setState({imageUrl: this.state.input});
        app.models
            .predict(
                Clarifai.FACE_DETECT_MODEL,
                this.state.input)
            .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
            .catch(err => console.log(err));
    }

    onRouteChange = (route) => {
        if (route === 'signout') {
            this.setState({isSignedIn: false})
        } else if (route === 'home') {
            this.setState({isSignedIn: true})
        }
        this.setState({route: route});
    }

    render() {
        const { isSignedIn, imageUrl, route, box } = this.state;
        return (
            <div className="App">
                <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange}/>
                {this.state.route === 'home'
                    ? <div>
                        <Logo />
                        <Rank />
                        <ImageLinkForm
                            onInputChange={this.onInputChange}
                            onButtonSubmit={this.onButtonSubmit}
                        />
                        <FaceRecognition box={box} imageUrl={imageUrl} />
                        <Particles className="particles" options={particlesOptions} />
                    </div>
                    : (
                        this.state.route === 'signin'
                        ? <Signin onRouteChange={this.onRouteChange}/>
                        : <Register onRouteChange={this.onRouteChange}/>
                    )

                }
            </div>
        );
    }

}

const particlesOptions = {
    "autoPlay": true,
    "background": {
        "color": {
            "value": "#FFF"
        },
        "image": "",
        "position": "",
        "repeat": "",
        "size": "",
        "opacity": 0
    },
    "backgroundMask": {
        "composite": "destination-out",
        "cover": {
            "color": {
                "value": "#fff"
            },
            "opacity": 0.5
        },
        "enable": true
    },
    "fullScreen": {
        "enable": true,
        "zIndex": -1
    },
    "detectRetina": true,
    "duration": 0,
    "fpsLimit": 120,
    "interactivity": {
        "detectsOn": "window",
        "events": {
            "onClick": {
                "enable": false,
                "mode": []
            },
            "onDiv": {
                "selectors": [],
                "enable": false,
                "mode": [],
                "type": "circle"
            },
            "onHover": {
                "enable": false,
                "mode": [],
                "parallax": {
                    "enable": false,
                    "force": 2,
                    "smooth": 10
                }
            },
            "resize": true
        },
        "modes": {
            "attract": {
                "distance": 200,
                "duration": 0.4,
                "easing": "ease-out-quad",
                "factor": 1,
                "maxSpeed": 50,
                "speed": 1
            },
            "bounce": {
                "distance": 200
            },
            "bubble": {
                "distance": 200,
                "duration": 0.4,
                "mix": false
            },
            "connect": {
                "distance": 80,
                "links": {
                    "opacity": 0.5
                },
                "radius": 60
            },
            "grab": {
                "distance": 100,
                "links": {
                    "blink": false,
                    "consent": false,
                    "opacity": 1
                }
            },
            "light": {
                "area": {
                    "gradient": {
                        "start": {
                            "value": "#ffffff"
                        },
                        "stop": {
                            "value": "#000000"
                        }
                    },
                    "radius": 1000
                },
                "shadow": {
                    "color": {
                        "value": "#000000"
                    },
                    "length": 2000
                }
            },
            "push": {
                "default": true,
                "groups": [],
                "quantity": 4
            },
            "remove": {
                "quantity": 2
            },
            "repulse": {
                "distance": 200,
                "duration": 0.4,
                "factor": 100,
                "speed": 1,
                "maxSpeed": 50,
                "easing": "ease-out-quad"
            },
            "slow": {
                "factor": 3,
                "radius": 200
            },
            "trail": {
                "delay": 1,
                "pauseOnStop": false,
                "quantity": 1
            }
        }
    },
    "manualParticles": [],
    "motion": {
        "disable": false,
        "reduce": {
            "factor": 4,
            "value": true
        }
    },
    "particles": {
        "bounce": {
            "horizontal": {
                "random": {
                    "enable": false,
                    "minimumValue": 0.1
                },
                "value": 1
            },
            "vertical": {
                "random": {
                    "enable": false,
                    "minimumValue": 0.1
                },
                "value": 1
            }
        },
        "collisions": {
            "bounce": {
                "horizontal": {
                    "random": {
                        "enable": false,
                        "minimumValue": 0.1
                    },
                    "value": 1
                },
                "vertical": {
                    "random": {
                        "enable": false,
                        "minimumValue": 0.1
                    },
                    "value": 1
                }
            },
            "enable": false,
            "mode": "bounce",
            "overlap": {
                "enable": true,
                "retries": 0
            }
        },
        "color": {
            "value": "#FF0000",
            "animation": {
                "h": {
                    "count": 0,
                    "enable": true,
                    "offset": 0,
                    "speed": 10,
                    "sync": true
                },
                "s": {
                    "count": 0,
                    "enable": false,
                    "offset": 0,
                    "speed": 1,
                    "sync": true
                },
                "l": {
                    "count": 0,
                    "enable": false,
                    "offset": 0,
                    "speed": 1,
                    "sync": true
                }
            }
        },
        "destroy": {
            "mode": "none",
            "split": {
                "count": 1,
                "factor": {
                    "random": {
                        "enable": false,
                        "minimumValue": 0
                    },
                    "value": 3
                },
                "rate": {
                    "random": {
                        "enable": false,
                        "minimumValue": 0
                    },
                    "value": {
                        "min": 4,
                        "max": 9
                    }
                },
                "sizeOffset": true
            }
        },
        "gradient": [],
        "groups": {},
        "life": {
            "count": 0,
            "delay": {
                "random": {
                    "enable": false,
                    "minimumValue": 0
                },
                "value": 0,
                "sync": false
            },
            "duration": {
                "random": {
                    "enable": false,
                    "minimumValue": 0.0001
                },
                "value": 0,
                "sync": false
            }
        },
        "links": {
            "blink": false,
            "color": {
                "value": "#fff"
            },
            "consent": false,
            "distance": 100,
            "enable": false,
            "frequency": 1,
            "opacity": 1,
            "shadow": {
                "blur": 5,
                "color": {
                    "value": "#00ff00"
                },
                "enable": false
            },
            "triangles": {
                "enable": false,
                "frequency": 1
            },
            "width": 1,
            "warp": false
        },
        "move": {
            "angle": {
                "offset": 0,
                "value": 90
            },
            "attract": {
                "distance": 200,
                "enable": true,
                "rotate": {
                    "x": 2000,
                    "y": 2000
                }
            },
            "decay": 0,
            "distance": {},
            "direction": "none",
            "drift": 0,
            "enable": true,
            "gravity": {
                "acceleration": 9.81,
                "enable": false,
                "inverse": false,
                "maxSpeed": 50
            },
            "path": {
                "clamp": false,
                "delay": {
                    "random": {
                        "enable": false,
                        "minimumValue": 0
                    },
                    "value": 0
                },
                "enable": true,
                "options": {
                    "sides": 6,
                    "turnSteps": 30,
                    "angle": 30
                },
                "generator": "polygonPathGenerator"
            },
            "outModes": {
                "default": "destroy",
                "bottom": "destroy",
                "left": "destroy",
                "right": "destroy",
                "top": "destroy"
            },
            "random": false,
            "size": false,
            "speed": 3,
            "spin": {
                "acceleration": 0,
                "enable": false
            },
            "straight": false,
            "trail": {
                "enable": true,
                "length": 20,
                "fillColor": {
                    "value": "#000"
                }
            },
            "vibrate": false,
            "warp": false
        },
        "number": {
            "density": {
                "enable": true,
                "area": 800,
                "factor": 1000
            },
            "limit": 0,
            "value": 0
        },
        "opacity": {
            "random": {
                "enable": false,
                "minimumValue": 0.1
            },
            "value": 1,
            "animation": {
                "count": 0,
                "enable": false,
                "speed": 2,
                "sync": false,
                "destroy": "none",
                "startValue": "random"
            }
        },
        "orbit": {
            "animation": {
                "count": 0,
                "enable": false,
                "speed": 1,
                "sync": false
            },
            "enable": false,
            "opacity": 1,
            "rotation": {
                "random": {
                    "enable": false,
                    "minimumValue": 0
                },
                "value": 45
            },
            "width": 1
        },
        "reduceDuplicates": false,
        "repulse": {
            "random": {
                "enable": false,
                "minimumValue": 0
            },
            "value": 0,
            "enabled": false,
            "distance": 1,
            "duration": 1,
            "factor": 1,
            "speed": 1
        },
        "roll": {
            "darken": {
                "enable": false,
                "value": 0
            },
            "enable": false,
            "enlighten": {
                "enable": false,
                "value": 0
            },
            "mode": "vertical",
            "speed": 25
        },
        "rotate": {
            "random": {
                "enable": false,
                "minimumValue": 0
            },
            "value": 0,
            "animation": {
                "enable": false,
                "speed": 0,
                "sync": false
            },
            "direction": "clockwise",
            "path": false
        },
        "shadow": {
            "blur": 0,
            "color": {
                "value": "#000000"
            },
            "enable": false,
            "offset": {
                "x": 0,
                "y": 0
            }
        },
        "shape": {
            "options": {},
            "type": "circle"
        },
        "size": {
            "random": {
                "enable": false,
                "minimumValue": 1
            },
            "value": 2,
            "animation": {
                "count": 0,
                "enable": false,
                "speed": 5,
                "sync": false,
                "destroy": "none",
                "startValue": "random"
            }
        },
        "stroke": {
            "width": 0
        },
        "tilt": {
            "random": {
                "enable": false,
                "minimumValue": 0
            },
            "value": 0,
            "animation": {
                "enable": false,
                "speed": 0,
                "sync": false
            },
            "direction": "clockwise",
            "enable": false
        },
        "twinkle": {
            "lines": {
                "enable": false,
                "frequency": 0.05,
                "opacity": 1
            },
            "particles": {
                "enable": false,
                "frequency": 0.05,
                "opacity": 1
            }
        },
        "wobble": {
            "distance": 5,
            "enable": false,
            "speed": 50
        },
        "zIndex": {
            "random": {
                "enable": true,
                "minimumValue": 0
            },
            "value": -4,
            "opacityRate": 1,
            "sizeRate": 1,
            "velocityRate": 1
        }
    },
    "pauseOnBlur": true,
    "pauseOnOutsideViewport": true,
    "responsive": [],
    "style": {},
    "themes": [],
    "zLayers": 100,
    "emitters": {
        "autoPlay": true,
        "fill": true,
        "life": {
            "wait": false
        },
        "rate": {
            "quantity": 1,
            "delay": 0.25
        },
        "shape": "square",
        "startCount": 0,
        "size": {
            "mode": "percent",
            "height": 0,
            "width": 0
        },
        "direction": "none",
        "position": {
            "x": 50,
            "y": 50
        }
    }
}

export default App;
