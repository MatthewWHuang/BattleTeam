import React, { useRef, useEffect, useState, useContext } from "react";
import { getCharacter, idsToInfo } from "../api/CharacterAPI";
import { getCharacters } from "../api/AuthAPI";
import { AuthContext } from "../context/Auth.context";

function Gameboard({}) {
    const { state } = useContext(AuthContext);

    const canvasRef = useRef(null);
    const [mousePos, setMousePos] = useState({});
    const [pos, setPos] = useState({ x: 0, y: 0 });
    const [mouseDown, setMouseDown] = useState(false);
    const [mode, setMode] = useState("move");
    const [action, setAction] = useState({});
    const [character, setCharacter] = useState({});

    const [characters, setCharacters] = useState("loading");
    const draw = (ctx, frameCount) => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        var mouseX = mousePos.x - (mousePos.x % 10);
        var mouseY = mousePos.y - (mousePos.y % 10);
        var range =
            mode == "move"
                ? 3
                : Object.keys(action).includes("range")
                ? Math.abs(mouseX / 10 - pos.x) +
                      Math.abs(mouseY / 10 - pos.y) <=
                  eval(action.range.value) / 5
                : Infinity;
        if (!(mouseX / 10 == pos.x && mouseY / 10 == pos.y)) {
            ctx.fillStyle =
                Math.abs(mouseX / 10 - pos.x) + Math.abs(mouseY / 10 - pos.y) <=
                3
                    ? "#0F0"
                    : "#F00";
            ctx.beginPath();
            ctx.rect(mouseX + 1, mouseY + 1, 9, 9);
        }
        if (
            mouseDown &&
            Math.abs(mouseX / 10 - pos.x) + Math.abs(mouseY / 10 - pos.y) <=
                range
        ) {
            if (mode == "move") {
                setPos({ x: mouseX / 10, y: mouseY / 10 });
            } else if (mode == "action") {
            }
        }
        ctx.strokeStyle = "black";
        for (var x = 0; x <= ctx.canvas.width; x += 10) {
            ctx.moveTo(0.5 + x, 0);
            ctx.lineTo(0.5 + x, ctx.canvas.height);
        }
        for (var x = 0; x <= ctx.canvas.height; x += 10) {
            ctx.moveTo(0, 0.5 + x);
            ctx.lineTo(ctx.canvas.width, 0.5 + x);
        }
        ctx.stroke();
        ctx.fill();
        ctx.fillStyle = "#00FF00";
        ctx.beginPath();
        ctx.arc(
            (pos.x + 1) * 10 + 0.5 - 5,
            (pos.y + 1) * 10 + 0.5 - 5,
            4,
            0,
            2 * Math.PI
        );
        ctx.fill();
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        let frameCount = 0;
        let animationFrameId;

        //Our draw came here
        const render = () => {
            frameCount++;
            draw(context, frameCount);
            animationFrameId = window.requestAnimationFrame(render);
        };
        render();

        return () => {
            window.cancelAnimationFrame(animationFrameId);
        };
    }, [draw]);

    useEffect(() => {
        const canvas = canvasRef.current;

        const handleMouseMove = (e) => {
            var cRect = canvas.getBoundingClientRect(); // Gets CSS pos, and width/height
            var scaleX = canvas.width / cRect.width; // relationship bitmap vs. element for x
            var scaleY = canvas.height / cRect.height; // relationship bitmap vs. element for y

            setMousePos({
                x: Math.round(e.clientX - cRect.left) * scaleX,
                y: Math.round(e.clientY - cRect.top) * scaleY,
            });
        };

        window.addEventListener("mousemove", handleMouseMove);
        canvas.addEventListener("mousedown", (event) => {
            setMouseDown(true);
        });
        canvas.addEventListener("mouseup", (event) => {
            setMouseDown(false);
        });

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    useEffect(() => {
        const getData = async () => {
            const ids = await getCharacters(state.username);
            const names = await idsToInfo(ids);
            var newCharacters = Object.keys(names).map((id) => {
                const idVal = names[id];
                return {
                    id,
                    ...idVal,
                };
            });

            // for (let id in ids) {
            //   console.log(await getCharacter(id));
            //   console.log({ name: await getCharacter(id).name, id });
            //   newCharacters.push({ name: await getCharacter(id).name, id });
            // }
            // console.log("new characters");
            // console.log(newCharacters);
            setCharacters(newCharacters);
            setCharacter(newCharacters[0]);
        };
        getData();
        document.title = "Gameboard - Battle Team";
    });

    const characterChanged = async (e) => {
        const setNewCharacter = async () => {
            const newCharacter = await getCharacter(e.target.value);
            console.log("new", newCharacter);
            setCharacter(newCharacter);
        };
        setNewCharacter();
    };

    return (
        <div style={{ display: "flex", flexDirection: "row" }}>
            <canvas ref={canvasRef} style={{ height: "90vh" }} />
            <div style={{ display: "flex", flexDirection: "column" }}>
                <label htmlFor="character">Character: </label>
                <select
                    name="character"
                    style={{ width: "110px" }}
                    onChange={characterChanged}
                >
                    {characters == "loading"
                        ? null
                        : characters.map((char) => (
                              <option value={char.id} key={char.id}>
                                  {char.name}
                              </option>
                          ))}
                </select>
                <p>{JSON.stringify(character)}</p>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <button
                        onClick={() => {
                            setMode("action");
                            setAction({ range: { value: "5" } });
                        }}
                    >
                        Unarmed Attack
                    </button>
                    <button
                        onClick={() => {
                            setMode("move");
                        }}
                    >
                        Move
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Gameboard;
