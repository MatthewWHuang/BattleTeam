import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBook } from "../api/BooksAPI";
import TextBox from "./TextBox";
import { Link } from "react-router-dom";
import BookNavigationLink from "./BookNavigationLink";
import JsxParser from "react-jsx-parser";
import ClassBox from "./InfoBoxes";

function Book({ style, children }) {
  const { bookName } = useParams();
  const [book, setBook] = useState("loading");
  useEffect(() => {
    const get = async () => {
      const bookValue = await getBook(bookName);
      console.log(bookValue);
      setBook(bookValue);
      // document.getElementById("book").innerHTML = bookValue.value;
    };
    get();
  }, []);

  if (book === "loading") {
    return (
      <div>
        <h1>Loading Book...</h1>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "row" }} id="book">
      {/* <JsxParser
        components={{ BookNavigationLink, TextBox }}
        jsx={book.value}
      /> */}
      <div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            position: "fixed",
            marginLeft: 10,
            backgroundColor: "white",
            borderColor: "black",
            borderStyle: "solid",
            alignContent: "flex-start",
            textAlign: "left",
            top: 60,
            zIndex: 10,
            overflowX: "hidden",
            overflowY: "auto",
          }}
        >
          <BookNavigationLink to="BattleTeam" indentation={-1}>
            <b
              style={{
                borderBottomStyle: "solid",
                borderBottomWidth: "thin",
                borderBottomColor: "lightgrey",
                width: 400,
              }}
            >
              Battle Team
            </b>
          </BookNavigationLink>
          <BookNavigationLink to="CreatingYourCharacter">
            Creating your Character
          </BookNavigationLink>
          <BookNavigationLink to="YourCharacterSheet" indentation={1}>
            Your Character Sheet
          </BookNavigationLink>
          <BookNavigationLink to="NameTitle" indentation={2}>
            Name/Title
          </BookNavigationLink>
          <BookNavigationLink to="WhatAreRaces" indentation={2}>
            What are Races
          </BookNavigationLink>
          <BookNavigationLink to="WhatAreClasses" indentation={2}>
            What are Classes
          </BookNavigationLink>
          <BookNavigationLink to="Attributes" indentation={2}>
            Attributes
          </BookNavigationLink>
          <BookNavigationLink to="vit" indentation={3}>
            Vitality
          </BookNavigationLink>
          <BookNavigationLink to="wis" indentation={3}>
            Wisdom
          </BookNavigationLink>
          <BookNavigationLink to="int" indentation={3}>
            Intelligence
          </BookNavigationLink>
          <BookNavigationLink to="agi" indentation={3}>
            Agility
          </BookNavigationLink>
          <BookNavigationLink to="dex" indentation={3}>
            Dexterity
          </BookNavigationLink>
          <BookNavigationLink to="str" indentation={3}>
            Strength
          </BookNavigationLink>
          <BookNavigationLink to="per" indentation={3}>
            Perception
          </BookNavigationLink>
          <BookNavigationLink to="luk" indentation={3}>
            Luck
          </BookNavigationLink>
          <BookNavigationLink to="LevelExp" indentation={2}>
            Level/EXP
          </BookNavigationLink>
          <BookNavigationLink to="Pools" indentation={2}>
            Pools
          </BookNavigationLink>
          <BookNavigationLink to="Currency" indentation={2}>
            Currency
          </BookNavigationLink>
          <BookNavigationLink to="Skills" indentation={1}>
            Skills
          </BookNavigationLink>
          <BookNavigationLink to="MakingSkillsMorePowerful" indentation={2}>
            Making skills more powerful
          </BookNavigationLink>
          <BookNavigationLink to="GainingAClass" indentation={1}>
            Gaining a Class
          </BookNavigationLink>
          <BookNavigationLink to="ItemsAndWeapons" indentation={1}>
            Items and Weapons
          </BookNavigationLink>
          <BookNavigationLink to="Classes" indentation={1}>
            Classes
          </BookNavigationLink>
          <BookNavigationLink to="ClassList" indentation={1}>
            Class List
          </BookNavigationLink>
          <BookNavigationLink to="RaceList" indentation={1}>
            Race List
          </BookNavigationLink>
          <BookNavigationLink to="PlayingTheGame" indentation={0}>
            Playing the Game
          </BookNavigationLink>
          <BookNavigationLink to="Battle" indentation={1}>
            Battle
          </BookNavigationLink>
          <BookNavigationLink to="DeterminingTurnOrder" indentation={2}>
            Determining Turn Order
          </BookNavigationLink>
          <BookNavigationLink to="DeterminingTurnOrder" indentation={2}>
            On your turn
          </BookNavigationLink>
          <BookNavigationLink to="Attacking" indentation={2}>
            Attacking
          </BookNavigationLink>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            marginLeft: 450,
            fontFamily: "georgia",
            fontWeight: "lighter",
            width: "50%",
            textAlign: "left",
          }}
        >
          <div>
            <a id="BattleTeam">
              <h1 style={{ marginBottom: 10, fontWeight: 500 }}>Battle Team</h1>
            </a>
            <h4 style={{ color: "gray", marginTop: 10, fontWeight: 500 }}>
              By MW H and Eric Jensen
            </h4>
          </div>
          <div>
            <p>
              Battle Team is a tabletop RPG set in a world of fantasy. Players
              navigate characters through invaded villages, crumbing castles,
              gloomy forests…
            </p>
            <p>
              In Battle Team, each player creates a character. Through your
              adventures, your character will become stronger.
            </p>
            <p>
              To play, you will also need a Battle Master. The Battle Master(or
              BM) navigates through your adventures, controls enemies, describes
              locations, and handles gameplay.
            </p>
            <TextBox>
              <p>If you’re interested in becoming a Battle Master, see MW H.</p>
            </TextBox>
            <div>
              <a id="CreatingYourCharacter">
                <h2>1. Creating your character</h2>
              </a>
              <TextBox>
                <p>
                  For best use with this book, use our
                  <Link to="/create/character">
                    free digital character sheet
                  </Link>
                  to get started right away.
                </p>
              </TextBox>
              <div>
                <div>
                  <a id="YourCharacterSheet">
                    <h3>Your Character Sheet</h3>
                  </a>
                  <p>
                    Your character sheet shows your name, title, attributes,
                    level, EXP, resistances, speed, pools, Avoid/hit, currency,
                    class(see <a href="#WhatAreClasses">What are Classes</a> ),
                    race(see <a href="#WhatAreRaces">What are Races</a>), and
                    unassigned point counts.
                  </p>
                </div>
                <div>
                  <a id="NameTitle">
                    <h4>Name/Title</h4>
                  </a>
                  <p>
                    As you progress through adventures, your character may meet
                    certain conditions. Some of these conditions reward a Title
                    to prove you’ve completed the conditions. There is no limit
                    to the amount of titles you can have, however, you can only
                    have one active title at a time. You can switch your title
                    at any time.
                  </p>
                </div>
                <div>
                  <a id="WhatAreRaces">
                    <h4>What are Races</h4>
                  </a>
                  <p>
                    Through the world of Battle Team, there are many different
                    humanoid species called races. Your character belongs to one
                    of these races(see <a href="#RacesList">Races List</a>).
                  </p>
                </div>
                <div>
                  <a id="WhatAreClasses">
                    <h4>What are Classes</h4>
                  </a>
                  <p>
                    Your character belongs to one of the many classes throughout
                    the world. Classes define your character's style, what they
                    do, their whole life! See the
                    <a href="#RacesList">Class List</a>.
                  </p>
                </div>
                <div>
                  <div>
                    <a id="Attributes">
                      <h4>Attributes</h4>
                    </a>
                    <p>
                      Your character has attributes representing the aspects of
                      their body. The main attributes are Vitality(VIT),
                      Wisdom(WIS), Constitution(CON), Intelligence(INT),
                      Agility(AGI), Dexterity(DEX), Strength(STR),
                      Perception(PER), and Luck(LUK). Some classes also have
                      class attributes, like the Fighter's Stamina.
                    </p>
                  </div>
                  <div>
                    <a id="vit">
                      <h5>Vitality</h5>
                    </a>
                    <p>
                      Vitality controls the health of your character. It
                      declares how resistant they are to poison and disease, as
                      well as damage from the elements. It also controls how
                      much damage your character can take. Your Base Heath is
                      equal to ten times your Vitality. VIT starts with a base
                      value of 10.
                    </p>
                  </div>
                  <div>
                    <a id="wis">
                      <h5>Wisdom</h5>
                    </a>
                    <p>
                      Wisdom controls how good your character is at making
                      connections, like solving a puzzle. WIS also controls mana
                      regen, and, along with INT, how accurate your spells are.
                      WIS starts with a base value of 10.
                    </p>
                  </div>
                  <div>
                    <a id="int">
                      <h5>Intelligence</h5>
                    </a>
                    <p>
                      Intelligence controls how good you are at spotting small
                      details, like searching for lies in conversations. Along
                      with WIS, INT also controls how much magical power(mana)
                      you have, and how good you are at hitting with spells. INT
                      starts with a base value of 10.
                    </p>
                  </div>
                  <div>
                    <a id="agi">
                      <h5>Agility</h5>
                    </a>
                    <p>
                      Agility controls how fast your character can run, jump,
                      etc. AGI starts with a base value of 15.
                    </p>
                  </div>
                  <div>
                    <a id="dex">
                      <h5>Dexterity</h5>
                    </a>
                    <p>
                      Dexterity controls how good your character is with hitting
                      and avoiding physical attacks, like shooting a bow,
                      throwing a spear, diving away from a stone from a sling,
                      or swinging a sword. DEX starts with a base value of 10.
                    </p>
                  </div>
                  <div>
                    <a id="str">
                      <h5>Strength</h5>
                    </a>
                    <p>
                      Strength controls how strong(surprise!) your character is.
                      It helps if you’re trying to hold your ground against an
                      oncoming wave or lift up a boulder. It also helps with
                      some weapons, like clubs. STR starts with a base value of
                      0.
                    </p>
                  </div>
                  <div>
                    <a id="per">
                      <h5>Perception</h5>
                    </a>
                    <p>
                      Perception controls how good your character is at noticing
                      things like traps. It’s used to spot a covered hole in the
                      ground, an enemy sneaking up on you, or a pressure plate
                      creating an arrow barrage. PER starts with a base value of
                      10.
                    </p>
                  </div>
                  <div>
                    <a id="luk">
                      <h5>Luck</h5>
                    </a>
                    <p>
                      Luck controls how lucky your character is. It mainly
                      controls your loot when you slay an enemy, but other uses
                      may include rolling dice or drawing a card. LUK starts
                      with a base value of 0.
                    </p>
                  </div>
                </div>
                <div>
                  <a id="LevelExp">
                    <h4>Level/EXP</h4>
                  </a>
                  <p>
                    As you defeat monsters, you gain EXP. Once you hit your EXP
                    max, your character gets more powerful, and a higher EXP max
                    is set. You gain 5 attribute points to assign to your
                    attributes, and one skill point(see{" "}
                    <a href="#Skills">Skills</a>).
                  </p>
                </div>
                <div>
                  <a id="Pools">
                    <h4>Pools</h4>
                  </a>
                  <p>
                    Skills may add or subtract from pool values. Pools have a
                    maximum(the most they can hold), and a current value(how
                    much they are currently holding).
                  </p>
                  <p>
                    Your Health pool keeps track of how much more damage you can
                    take, while your Mana pool keeps track of how much more
                    mana(magical power) you have.
                  </p>
                </div>
                <div>
                  <a id="Currency">
                    <h4>Currency</h4>
                  </a>
                  <p>
                    In Battle Team, there are 6 main types of coins. 1 Diamond
                    coin is equal to 10 Amethyst coins, is equal to 100 Platinum
                    coins, is equal to 1,000 Gold coins, is equal to 10,000
                    Silver coins, is equal to 100,000 Copper coins.
                  </p>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignContent: "normal",
                    }}
                  >
                    <table style={{ borderCollapse: "collapse" }}>
                      <tbody>
                        <tr
                          style={{
                            border: "1px solid #ddd",
                            backgroundColor: "#bbb",
                          }}
                        >
                          <th style={{ border: "1px solid #ddd" }}>Copper</th>
                          <th style={{ border: "1px solid #ddd" }}>Silver</th>
                          <th style={{ border: "1px solid #ddd" }}>Gold</th>
                          <th style={{ border: "1px solid #ddd" }}>Platinum</th>
                          <th style={{ border: "1px solid #ddd" }}>Amethyst</th>
                          <th style={{ border: "1px solid #ddd" }}>Diamond</th>
                        </tr>
                        <tr
                          style={{
                            border: "1px solid #ddd",
                            backgroundColor: "#ddd",
                          }}
                        >
                          <td style={{ border: "1px solid #ddd" }}>1</td>
                          <td style={{ border: "1px solid #ddd" }}>0.1</td>
                          <td style={{ border: "1px solid #ddd" }}>0.01</td>
                          <td style={{ border: "1px solid #ddd" }}>0.001</td>
                          <td style={{ border: "1px solid #ddd" }}>0.0001</td>
                          <td style={{ border: "1px solid #ddd" }}>0.00001</td>
                        </tr>
                        <tr style={{ border: "1px solid #ddd" }}>
                          <td style={{ border: "1px solid #ddd" }}>10</td>
                          <td style={{ border: "1px solid #ddd" }}>1</td>
                          <td style={{ border: "1px solid #ddd" }}>0.1</td>
                          <td style={{ border: "1px solid #ddd" }}>0.01</td>
                          <td style={{ border: "1px solid #ddd" }}>0.001</td>
                          <td style={{ border: "1px solid #ddd" }}>0.0001</td>
                        </tr>
                        <tr
                          style={{
                            border: "1px solid #ddd",
                            backgroundColor: "#ddd",
                          }}
                        >
                          <td style={{ border: "1px solid #ddd" }}>100</td>
                          <td style={{ border: "1px solid #ddd" }}>10</td>
                          <td style={{ border: "1px solid #ddd" }}>1</td>
                          <td style={{ border: "1px solid #ddd" }}>0.1</td>
                          <td style={{ border: "1px solid #ddd" }}>0.01</td>
                          <td style={{ border: "1px solid #ddd" }}>0.001</td>
                        </tr>
                        <tr style={{ border: "1px solid #ddd" }}>
                          <td style={{ border: "1px solid #ddd" }}>1,000</td>
                          <td style={{ border: "1px solid #ddd" }}>100</td>
                          <td style={{ border: "1px solid #ddd" }}>10</td>
                          <td style={{ border: "1px solid #ddd" }}>1</td>
                          <td style={{ border: "1px solid #ddd" }}>0.1</td>
                          <td style={{ border: "1px solid #ddd" }}>0.01</td>
                        </tr>
                        <tr
                          style={{
                            border: "1px solid #ddd",
                            backgroundColor: "#ddd",
                          }}
                        >
                          <td style={{ border: "1px solid #ddd" }}>10,000</td>
                          <td style={{ border: "1px solid #ddd" }}>1,000</td>
                          <td style={{ border: "1px solid #ddd" }}>100</td>
                          <td style={{ border: "1px solid #ddd" }}>10</td>
                          <td style={{ border: "1px solid #ddd" }}>1</td>
                          <td style={{ border: "1px solid #ddd" }}>0.1</td>
                        </tr>
                        <tr style={{ border: "1px solid #ddd" }}>
                          <td style={{ border: "1px solid #ddd" }}>100,000</td>
                          <td style={{ border: "1px solid #ddd" }}>10,000</td>
                          <td style={{ border: "1px solid #ddd" }}>1,000</td>
                          <td style={{ border: "1px solid #ddd" }}>100</td>
                          <td style={{ border: "1px solid #ddd" }}>10</td>
                          <td style={{ border: "1px solid #ddd" }}>1</td>
                        </tr>
                      </tbody>
                    </table>
                    <h6
                      style={{ textAlign: "center", margin: 0, color: "#555" }}
                    >
                      Currency table
                    </h6>
                  </div>
                  <div>
                    <a id="Skills">
                      <h3>Skills</h3>
                    </a>
                    <p>
                      Classes grant skills—special things your character can do.
                      There is a wide range of skills, from attacks, to healing,
                      to speed boosts. Your character starts with one skill:
                      Magic Bolt.
                    </p>
                    <TextBox>
                      <b>
                        <p style={{ margin: 0 }}>Magic Bolt:</p>
                      </b>
                      <p style={{ margin: 0, marginLeft: 50 }}>
                        <b>Description: </b>
                        <i>A bolt of magic hits your target.</i>
                      </p>
                      <p style={{ margin: 0, marginLeft: 50 }}>
                        <b>Range:</b> <i>50</i>
                      </p>
                      <p style={{ margin: 0, marginLeft: 50 }}>
                        <b>Damage: </b>
                        <i style={{ color: "lightcyan", display: "inline" }}>
                          10 Pure
                        </i>
                      </p>
                      <p style={{ margin: 0, marginLeft: 50 }}>
                        <b>Cost: </b>
                        <i style={{ color: "blue", display: "inline" }}>
                          10 Mana
                        </i>
                      </p>
                    </TextBox>
                    <p>
                      Magic Bolt has a range of 50 squares, meaning you can aim
                      it at any target within 50 squares. If it hits, it deals
                      10 Pure damage. To cast it, it costs 10 Mana, meaning you
                      have to expend 10 Mana from your Mana pool to use Magic
                      Bolt.
                    </p>
                    <p>
                      Once you gain a class, you will gain more skills, however,
                      you will lose Magic Bolt(with the exception of getting a
                      class that has it already, like Mage).
                    </p>
                  </div>
                  <div>
                    <a id="MakingSkillsMorePowerful">
                      <h4>Making skills more powerful</h4>
                    </a>
                    <p>
                      When you level up, you gain a skill point to assign to
                      your skills. You can put it into any of your skills(or
                      save it), and a more powerful version of the skill will be
                      available to you. By default, the Character Sheet shows
                      the highest level of the skill you have available, however
                      <i>
                        , you can cast a lower level version of the skill at any
                        time.
                      </i>
                    </p>
                  </div>
                  <div>
                    <a id="GainingAClass">
                      <h3>Gaining a Class</h3>
                    </a>
                    <p>
                      Once you meet certain conditions known only to Battle
                      Masters, class(es) will become available to you. A class
                      gives you extra points in some attributes. Some classes
                      also have a class attribute that’s unlocked when you gain
                      the class. Once you choose a class, you can’t change your
                      mind, so choose wisely! Classes give a new skill at levels
                      1, 3, 5, 10, and 15.
                    </p>
                  </div>
                  <div>
                    <a id="ItemsAndWeapons">
                      <h3>Items and Weapons</h3>
                    </a>
                    <p>
                      What is a fighter without their sword? Weapons determine
                      the damage physical classes do with their weapon attacks.
                      Items like the Mage’s Staff do the same, but in a
                      different way. Most items have no damage value, while most
                      weapons do.
                    </p>

                    <TextBox>
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <b style={{ height: "min-content" }}>Example:</b>
                      </div>
                      <div>
                        The{" "}
                        <b style={{ color: "orange" }}>
                          Goggles of Unobstructed Sight
                        </b>{" "}
                        allow the user to see through up to half an inch of
                        solid material, except stone or metals. A{" "}
                        <b>Throwing Dagger</b> deals 2 damage with a range of 5
                        feet, or you can throw it to do 5 damage with a range of
                        feet equal to your DEX score.
                      </div>
                    </TextBox>
                  </div>
                  <div>
                    <a id="Classes">
                      <h3>Classes</h3>
                    </a>
                    <p>
                      While leveling up, there are certain milestones you will
                      hit, granting you upgrades.
                    </p>
                    <p> Level 5: +5 to all attributes.</p>
                    <p>Level 10: +5 to all attributes, +10 free stat points</p>
                    <p> Level 15: +10% to all resistances.</p>
                    <p>
                      Level 20: You’ve completed your study in the class and
                      proven yourself worthy to continue your training! You can
                      choose one of your class’ branching options(not included
                      in this book). You’ll advance from Beginner to Novice, and
                      go through the milestone again, before going to Adept at
                      Level 40. The list of Class Tiers is shown below.
                    </p>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignContent: "normal",
                        alignItems: "center",
                      }}
                    >
                      <table
                        style={{
                          borderCollapse: "collapse",
                          width: 200,
                        }}
                      >
                        <tbody>
                          <tr
                            style={{
                              border: "1px solid #ddd",
                              backgroundColor: "#bbb",
                            }}
                          >
                            <th style={{ border: "1px solid #ddd" }}>
                              Class Tiers
                            </th>
                          </tr>
                          <tr
                            style={{
                              border: "1px solid #ddd",
                              backgroundColor: "#ddd",
                            }}
                          >
                            <td style={{ border: "1px solid #ddd" }}>
                              Beginner{" "}
                            </td>
                          </tr>
                          <tr
                            style={{
                              border: "1px solid #ddd",
                            }}
                          >
                            <td style={{ border: "1px solid #ddd" }}>
                              Novice{" "}
                            </td>
                          </tr>
                          <tr
                            style={{
                              border: "1px solid #ddd",
                              backgroundColor: "#ddd",
                            }}
                          >
                            <td style={{ border: "1px solid #ddd" }}>Adept </td>
                          </tr>
                          <tr
                            style={{
                              border: "1px solid #ddd",
                            }}
                          >
                            <td style={{ border: "1px solid #ddd" }}>
                              Expert{" "}
                            </td>
                          </tr>
                          <tr
                            style={{
                              border: "1px solid #ddd",
                              backgroundColor: "#ddd",
                            }}
                          >
                            <td style={{ border: "1px solid #ddd" }}>Elite </td>
                          </tr>
                          <tr
                            style={{
                              border: "1px solid #ddd",
                            }}
                          >
                            <td style={{ border: "1px solid #ddd" }}>
                              Master{" "}
                            </td>
                          </tr>
                          <tr
                            style={{
                              border: "1px solid #ddd",
                              backgroundColor: "#ddd",
                            }}
                          >
                            <td style={{ border: "1px solid #ddd" }}>
                              Grandmaster{" "}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <h6
                        style={{
                          textAlign: "center",
                          margin: 0,
                          color: "#555",
                        }}
                      >
                        Currency table
                      </h6>
                    </div>
                    <p>
                      Classes of higher tiers will also grant attribute
                      improvement. This is in addition to your current
                      improvement, not instead, but the new improvements only
                      count from the starting level of the new improvement.
                    </p>
                  </div>
                  <div>
                    <a id="ClassList">
                      <h3>Class List</h3>
                    </a>
                    <p>
                      The Basic Rules contain the 4 Basic Classes, listed below.
                      Click on one to view details.
                    </p>
                    <ul>
                      <li>Fighter</li>
                      <li>Healer</li>
                      <li>Mage</li>
                      <li>Rouge</li>
                    </ul>
                  </div>
                  <div>
                    <a id="RaceList">
                      <h3>Race List</h3>
                    </a>
                    <p>
                      The Basic Rules contain 5 Races, listed below. Click on
                      one to view details.
                    </p>
                    <ul>
                      <li>Elf</li>
                      <ul>
                        <li>Light Elf</li>
                        <li>Wood Elf</li>
                        <li>Dark Elf</li>
                      </ul>
                      <li>Dwarf</li>
                      <ul>
                        <li>Stone Dwarf</li>
                      </ul>
                      <li>Human</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <a id="PlayingTheGame">
                <h2>2. Playing the Game</h2>
              </a>
              <div>
                <div>
                  <a id="Battle">
                    <h3>Battle</h3>
                  </a>
                  <p>
                    In Battle Team, perhaps the most important mechanic is
                    battle. When characters are attacked or attack a being,
                    combatants enter a turn-based system.
                  </p>
                </div>
                <div>
                  <a id="DeterminingTurnOrder">
                    <h4>Determining turn order</h4>
                  </a>
                  <p>
                    To determine turn order, order everyone by DEX from highest
                    to lowest. In the case of a tie, the person with the highest
                    AGI wins.
                  </p>
                  <p>
                    If you’re still tied, both people roll a d20 and add their
                    LUK. Highest result wins. If you still have a tie, keep
                    rerolling until there’s not.
                  </p>
                </div>
                <div>
                  <a id="OnYourTurn">
                    <h4>On your turn</h4>
                  </a>
                  <p>On your turn, take the following actions in order.</p>
                  <h5>Move</h5>
                  <p>Move up to your speed squares.</p>
                  <h5>Action</h5>
                  <p>
                    Use a skill or attack, or something else that takes up an
                    action, like getting on a mount.
                  </p>
                  <h5>Regen</h5>
                  <p>
                    Gain the corresponding amount of regen in all of your pools,
                    except HP.
                  </p>
                </div>
                <div>
                  <a id="Attacking">
                    <h4>Attacking</h4>
                  </a>
                  <p>
                    Once only one side remains, the battle is over. Resolve EXP
                    and start tracking HP regen.
                  </p>
                </div>
                <div>
                  <a id="EndingBattle">
                    <h4>Ending Battle</h4>
                  </a>
                  <p>
                    Once only one side remains, the battle is over. Resolve EXP
                    and start tracking HP regen.
                  </p>
                </div>
              </div>
              <div>
                <a id="Dying">
                  <h3>Dying</h3>
                </a>
                <p>
                  When a combatant reaches 0 HP, they die. All EXP toward the
                  next level is lost and they respawn at their designated
                  respawn point.
                </p>
              </div>
              <div>
                <div>
                  <a id="ActionsOutOfCombat">
                    <h3>Actions out of Combat</h3>
                  </a>
                  <p>
                    While out of combat, rounds are still tracked, but they can
                    be batched so you don’t have to iterate through every round.
                  </p>
                  <p>
                    Out of combat, you can take any of the actions listed below.
                    You can also Move and use skills and attacks as listed in
                    combat.
                  </p>
                  <p>
                    Out of combat, you gain regen from all pools every round,
                    including HP.
                  </p>
                </div>
                <div>
                  <a id="SetRespawnPoint">
                    <h4>Set Respawn Point</h4>
                  </a>
                  <p>
                    Setting a respawn point takes 5 minutes where you do not
                    enter combat, take damage, take an action, move, or be hit
                    by a spell. When you die, you’ll return to your respawn
                    point.
                  </p>
                </div>
                <div>
                  <a id="Search">
                    <h4>Search</h4>
                  </a>
                  <p>
                    You can use your PER to look for something or scan an area.
                  </p>
                </div>
                <div>
                  <a id="InteractWithAnObject">
                    <h4>Interact with an Object</h4>
                  </a>
                  <p>
                    <b>This action can also be used in combat.</b> You can pull,
                    push, lift, or otherwise interact with an object within one
                    square of you.
                  </p>
                </div>
                <ClassBox cls={"fighter"} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Book;
