import React, {useState, useEffect } from "react";
import Peg from "./Peg";
import "../styles/litebrite.scss"
import { useHistory } from 'react-router-dom'

const colors = ["red", "orange", "blue", "yellow", "lime", "hotpink"];

interface LBProps {
  activeLights?: {
    [key: string]: any
  };
  classic?: string;
  color?: string;
  rows: number;
  cols: number;
}

type ActiveState = {
  active: boolean;
  color: string;
}
const Litebrite: React.FC<LBProps> = (props) => {

  const [activeLights, setActiveLights] = useState<Record<string,ActiveState>>({})
  const [selectedColor, setSelectedColor] = useState('orange')

  console.log('activeLights', activeLights)
  const history = useHistory()

  useEffect(() => {
    setActiveLights(props.activeLights || {})
  }, [props.activeLights])

  return (
    <div className="wrapper">
      <div className="logo">
        LITE*BRITE
        {/* <span className="l" data-shadow="L">L</span>
        <span className="i" data-shadow="I">I</span>
        <span className="t">T</span>
        <span className="yellow">E</span>
        <span className="yellow">*</span>
        <span className="yellow">B</span>
        <span className="green">R</span>
        <span className="blue">I</span>
        <span className="blue">T</span>
        <span className="purple">E</span> */}
      </div>
      <div className="game">
        <div
          className={`lite-brite ${
            props.classic ? " lite-brite--classic" : ""
          }`}
        >
          <div className="lite-brite__lights">
            {Array.from(new Array(props.rows)).map((_, x) => (
              <div className="row" id={`row-${x}`} key={`row-${x}`}>
                {Array.from(
                  new Array(
                    props.classic
                      ? x % 2 !== 0
                        ? props.cols - 1
                        : props.cols
                      : props.cols
                  )
                ).map((_, y) => {
                  const pegState = activeLights[`${x},${y}`]
                  return (
                    
                    <div
                      className="column"
                      id={`cols-${x}-${y}`} 
                      key={`cols-${x}-${y}`}
                    >
                      <Peg colorClass={`peg--${props.color}`}
                        onClick={() => {
                          const updatedLights = { ...activeLights };
                          const coordinateString = `${x},${y}`;

                          if (updatedLights[coordinateString]) delete updatedLights[coordinateString]
                          else {
                            updatedLights[coordinateString] = {
                              active: true,
                              color: selectedColor
                            }
                          }

                          setActiveLights(updatedLights)

                          // console.log({
                          //   updatedLights,
                          //   string: btoa(JSON.stringify(updatedLights))
                          // })
                          // setActiveLights(updatedLights)
                          const encodedSheet = btoa(JSON.stringify(updatedLights))
                          history.push(`/sheet/${encodedSheet}`)

                        }}
                        color={
                          pegState ? pegState.color : selectedColor
                        }
                        isActive={pegState ? pegState.active : false}
                      />
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
          <div className="light-brite__colors">
            {colors.map((color, i) => (
              <button
              key={i} className={`color-picker color-picker--${color} ${
                  color === selectedColor
                    ? " color-picker--active"
                    : ""
                }`}
                onClick={() => {
                  /** setState of selectedColor to 'blue' **/
                  setSelectedColor(color)
                }}
              >
                {color}
              </button>
            ))}

            <button className="btn"
              onClick={() => {
                const shouldClear = window.confirm("You sure you want to clear?");
                /** setState of selectedColor to 'blue' **/
                if (shouldClear) {
                  history.push('/')
                }
              }}
            >
              Clear
            </button>
            <button className="btn"
              onClick={() => {
                //console.log(window.location.href.url.parse)
                const url = new URL(window.location.href)
                console.log(url.pathname)
              }}>
                Save
            </button>
          </div>
        </div>
      </div>
    </div>    
  )
}

export default Litebrite