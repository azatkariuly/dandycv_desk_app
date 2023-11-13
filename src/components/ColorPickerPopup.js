import React, { useState } from 'react'

import '../css/ColorPickerPopup.css'

import { CustomPicker } from "react-color";
var { Hue, Saturation, EditableInput } = require("react-color/lib/components/common");


function ColorPickerPopup(props) {
    const [color, setColor] = useState(props.savedColor ? props.savedColor : '#000000');
  
    return (props.trigger) ? (
        <div className='popup-color-picker-overlay'>
            <div className='popup-color-picker-content'>
                <div className="popup-color-title">Color picker</div>
                <div className='hr' style={{marginLeft: '22px', marginRight: '22px'}} />

                <ColorPickerWrapped setTrigger={props.setTrigger}
                    color={color} setColor={setColor}
                    savedColor={props.savedColor} setSavedColor={props.setSavedColor}
                    setHexColorInput={props.setHexColorInput}/>
                
            </div>
        </div>
    ) : "" ;
}

class ColorPicker extends React.Component {

    saveFinalColor = () => {
        localStorage.setItem('selectedColor', this.props.hex)
        this.props.setSavedColor(this.props.hex)
        this.props.setHexColorInput(this.props.hex)

        // close the window
        this.props.setTrigger(false)
    };

    handleChange = data => {
        this.props.setColor(data);
    };

    onRGBChange = (data, color) => {
        var rgb = this.props.rgb

        if (color === 'r') {
            rgb.r = parseInt(data)
        } else if (color === 'g') {
            rgb.g = parseInt(data)
        } else {
            rgb.b = parseInt(data)
        }
        this.props.setColor(rgb)
    }

    onHSVChange = (data, color) => {
        var hsv = this.props.hsv

        console.log('hsv changed', this.props, hsv)

        if (color === 'h') {
            hsv.h = parseInt(data)
        } else if (color === 's') {
            hsv.s = parseInt(data)/100
        } else {
            hsv.v = parseInt(data)/100
        }

        this.props.setColor(hsv)
    }

    render() {
        return (
            <div className='color-picker-container'>
                <div className='color-picker-saturation'>
                    <Saturation 
                        {...this.props}
                        onChange={this.handleChange}
                        pointer={SaturationPointer}
                    />
                </div>
                <div className='color-picker-hue'>
                    <Hue
                        {...this.props}
                        direction={'vertical'}
                        pointer={HuePointer}
                        onChange={this.handleChange}
                    />
                </div>
                
                <div className='color-picker-config'>
                    <div style={{display: 'flex'}}>
                        <div style={{
                            textAlign: 'center',
                            marginTop: '12px',
                            marginLeft: '25px',
                            fontSize: '12px',
                        }}>
                            <span>new</span>
                            <div className='color-picker-checkboard' style={{
                                background: this.props.hex,
                            }}/>
                            <div className='color-picker-checkboard' style={{
                                background: this.props.savedColor,
                            }}/>
                            <span>current</span>
                        </div>

                        <div style={{
                            marginTop: '25px',
                            marginLeft: '32px',
                            display: 'flex',
                            flexDirection: 'column',
                        }}>
                            <button className="color-picker-btn-save" onClick={this.saveFinalColor}>
                                OK
                            </button>
                            <button className="color-picker-btn-cancel" onClick={() => this.props.setTrigger(false)}>
                                Cancel
                            </button>
                        </div>
                    </div>

                    <div style={{display: 'flex', color: '#A6A6A6', marginTop: '11px'}}>
                        <div>
                            <div className='popup-color-picker-grid'>
                                <span>H</span>
                                <EditableInput
                                    style={{
                                        wrap: {
                                          position: "relative",
                                          width: 77,
                                          height: 24
                                        },
                                        input: {
                                            position: "absolute",
                                            height: 24,
                                            width: 77,
                                            borderRadius: '20px',
                                            border: '1px solid rgba(166, 166, 166, 0.6)',
                                            textAlign: 'center',
                                            textTransform: 'uppercase',
                                        }
                                    }}
                                    value={Math.round(this.props.hsv.h)}
                                    onChange={data => this.onHSVChange(data, 'h')}
                                />
                                <div className='popup-color-picker-grid-sign'>
                                    &deg;
                                </div>
                            </div>

                            <div className='popup-color-picker-grid'>
                                <span>S</span>
                                <EditableInput
                                    style={{
                                        wrap: {
                                          position: "relative",
                                          width: 77,
                                          height: 24
                                        },
                                        input: {
                                            position: "absolute",
                                            height: 24,
                                            width: 77,
                                            borderRadius: '20px',
                                            border: '1px solid rgba(166, 166, 166, 0.6)',
                                            textAlign: 'center',
                                            textTransform: 'uppercase',
                                        }
                                    }}
                                    value={Math.round(this.props.hsv.s * 100)}
                                    onChange={data => this.onHSVChange(data, 's')}
                                />
                                <div className='popup-color-picker-grid-sign'>
                                    %
                                </div>
                            </div>

                            <div className='popup-color-picker-grid'>
                                <span>V</span>
                                <EditableInput
                                    style={{
                                        wrap: {
                                          position: "relative",
                                          width: 77,
                                          height: 24
                                        },
                                        input: {
                                            position: "absolute",
                                            height: 24,
                                            width: 77,
                                            borderRadius: '20px',
                                            border: '1px solid rgba(166, 166, 166, 0.6)',
                                            textAlign: 'center',
                                            textTransform: 'uppercase',
                                        }
                                    }}
                                    value={Math.round(this.props.hsv.v * 100)}
                                    onChange={data => this.onHSVChange(data, 'v')}
                                />

                                <div className='popup-color-picker-grid-sign'>
                                    %
                                </div>
                            </div>
                        </div>


                        <div>
                            <div className='popup-color-picker-grid'>
                                <span>R</span>
                                <EditableInput
                                    style={{
                                        wrap: {
                                          position: "relative",
                                          width: 77,
                                          height: 24
                                        },
                                        input: {
                                            position: "absolute",
                                            height: 24,
                                            width: 77,
                                            borderRadius: '20px',
                                            border: '1px solid rgba(166, 166, 166, 0.6)',
                                            textAlign: 'center',
                                            textTransform: 'uppercase',
                                        }
                                    }}
                                    value={this.props.rgb.r}
                                    onChange={data => this.onRGBChange(data, 'r')}
                                />
                            </div>

                            <div className='popup-color-picker-grid'>
                                <span>G</span>
                                <EditableInput
                                    style={{
                                        wrap: {
                                          position: "relative",
                                          width: 77,
                                          height: 24
                                        },
                                        input: {
                                            position: "absolute",
                                            height: 24,
                                            width: 77,
                                            borderRadius: '20px',
                                            border: '1px solid rgba(166, 166, 166, 0.6)',
                                            textAlign: 'center',
                                            textTransform: 'uppercase',
                                        }
                                    }}
                                    value={this.props.rgb.g}
                                    onChange={data => this.onRGBChange(data, 'g')}
                                />
                            </div>

                            <div className='popup-color-picker-grid'>
                                <span>B</span>
                                <EditableInput
                                    style={{
                                        wrap: {
                                          position: "relative",
                                          width: 77,
                                          height: 24
                                        },
                                        input: {
                                            position: "absolute",
                                            height: 24,
                                            width: 77,
                                            borderRadius: '20px',
                                            border: '1px solid rgba(166, 166, 166, 0.6)',
                                            textAlign: 'center',
                                            textTransform: 'uppercase',
                                        }
                                    }}
                                    value={this.props.rgb.b}
                                    onChange={data => this.onRGBChange(data, 'b')}
                                />
                            </div>
                            <div className='popup-color-picker-grid' style={{marginTop: '15px'}}>
                                <span>#</span>
                                <EditableInput
                                    style={{
                                        wrap: {
                                          position: "relative",
                                          width: 77,
                                          height: 24
                                        },
                                        input: {
                                            position: "absolute",
                                            height: 24,
                                            width: 77,
                                            borderRadius: '20px',
                                            border: '1px solid rgba(166, 166, 166, 0.6)',
                                            textAlign: 'center',
                                            textTransform: 'uppercase',
                                        }
                                    }}
                                    value={this.props.hex}
                                    onChange={data => this.props.setColor(data)}
                                />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

const ColorPickerWrapped = CustomPicker(ColorPicker);
  
function SaturationPointer() {
    return (
        <div
          style={{
            width: 16,
            height: 16,
            borderRadius: 16,
            background: 'none',
            border: "2px solid white",
            transform: 'translate(-50%, -50%)'
          }}
        />
    )
}

function HuePointer() {
    return (
      <div
        style={{
          width: '27px',
          height: '4px',
          borderRadius: '100px',
          background: '#FFF',
          border: "1px solid #000",
          transform: 'translate(0%, -50%)'
        }}
      />
    );
}

export default ColorPickerPopup