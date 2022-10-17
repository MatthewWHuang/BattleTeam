import { useEffect, useState } from "react";
import getClass from "../api/ClassAPI";
import TextBox from "./TextBox";

function SkillBox({ info }) {
  return (
    <div>
      <p style={{ margin: 0 }}>
        <b>{info.name}:</b>
      </p>
      <div style={{ paddingLeft: 25 }}>
        <p style={{ margin: 0 }}>
          <i>{info.tags.join(", ")}</i>
        </p>
        <p style={{ margin: 0 }}>
          <b>Description:</b>
          <i>{info.description}</i>
        </p>
        {Object.keys(info).map((s) => {
          if (["description", "name"].includes(s)) {
            return;
          } else {
            return (
              <p style={{ margin: 0 }}>
                <b>{s}:</b> {s.beginner || ""}
                {s.value}
              </p>
            );
          }
        })}
        {/* <p style={{ margin: 0 }}>
          <b>Damage:</b> x1.9+(Skill Level*0.1)
        </p>
        <p style={{ margin: 0 }}>
          <b>Cost:</b> 30 STA
        </p>
        <p style={{ margin: 0 }}>
          <b>Fits:</b> Physical Attack
        </p> */}
      </div>
    </div>
  );
}

function ClassBox({ cls }) {
  const [classInfo, setClassInfo] = useState({});
  useEffect(() => {
    const load = async () => {
      let info = await getClass(cls);
      setClassInfo(info);
    };
    load();
  }, []);
  if (!(classInfo && classInfo.name)) {
    return (
      <div
        style={{
          backgroundColor: "lightgoldenrodyellow",
          borderStyle: "solid",
          display: "flex",
          flexDirection: "column",
          paddingLeft: 20,
        }}
      >
        <h1>Loading...</h1>
      </div>
    );
  }
  return (
    <div
      style={{
        backgroundColor: "lightgoldenrodyellow",
        borderStyle: "solid",
        display: "flex",
        flexDirection: "column",
        paddingLeft: 20,
      }}
    >
      <h2 style={{ marginBottom: 0 }}>{classInfo.name}</h2>
      <h6 style={{ marginTop: 0 }}>
        <b>{classInfo.tier} Class</b>
      </h6>
      <p style={{ marginTop: 0 }}>
        <i>{classInfo.text}</i>
      </p>
      <div>
        <h4 style={{ marginBottom: 0 }}>Stats</h4>
        <div style={{ paddingLeft: 25 }}>
          <div>
            <h5 style={{ margin: 0 }}>Starting</h5>
            <div style={{ paddingLeft: 25 }}>
              {Object.keys(classInfo.stats.begin).map((s) => (
                <p style={{ margin: 0, marginLeft: 10 }} key={s}>
                  {s.toUpperCase()}: +{classInfo.stats.begin[s]}
                </p>
              ))}
            </div>
          </div>
          <div>
            <h5 style={{ margin: 0 }}>Per Level</h5>
            <div style={{ paddingLeft: 25 }}>
              {Object.keys(classInfo.stats.level).map((s) => (
                <p style={{ margin: 0, marginLeft: 10 }} key={s}>
                  {s.toUpperCase()}: +{classInfo.stats.level[s]}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div>
        <h4 style={{ marginBottom: 0 }}>Skills</h4>
        <div>
          {Object.keys(classInfo.skills).map((s) => (
            <div style={{ paddingLeft: 25 }} key={s}>
              <h5 style={{ marginBottom: 0, marginTop: 10 }}>0TH</h5>
              <TextBox style={{ width: 400 }}>
                <SkillBox />
              </TextBox>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ClassBox;
