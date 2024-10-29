import React from "react";
import styles from "../styles/RoverCommands.module.css";
interface RoverCommandsProps {
  handleRoverCommands: (e: React.FormEvent<HTMLFormElement>) => void;
}

const RoverInput = ({ title }: { title: string }) => {
  const id = title.toLowerCase().replace(" ", "");
  return (
    <>
      <h4>{title}</h4>

      <label className={styles.label} htmlFor={`${id}StartPosition`}>
        Start Position
      </label>
      <input
        className={styles.input}
        type="text"
        key={`${id}StartPosition`}
        name={`${id}StartPosition`}
      />
      <label className={styles.label} htmlFor={`${id}Instructions`}>
        Instruction
      </label>
      <input
        className={styles.input}
        type="text"
        key={`${id}Instructions`}
        name={`${id}Instructions`}
      />
    </>
  );
};

const RoverGrid = () => (
  <>
    <label className={styles.label} htmlFor="GridEndPositionX">
      Grid End Position X
    </label>
    <input
      className={styles.input}
      type="text"
      key="GridEndPositionX"
      name="GridEndPositionX"
    />
    <label className={styles.label} htmlFor="GridEndPositionY">
      Grid End Position Y
    </label>
    <input
      className={styles.input}
      type="text"
      key="GridEndPositionY"
      name="GridEndPositionY"
    />
  </>
);

const RoverCommands = ({ handleRoverCommands }: RoverCommandsProps) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleRoverCommands(e);
  };

  return (
    <div className={styles.wrapper}>
      <h3>Rover Commands</h3>

      <form className={styles.form} onSubmit={handleSubmit}>
        {/* ==== GRID End POSITION ==== */}

        <RoverGrid />

        {/* ==== ROVER 1 ==== */}

        <RoverInput title="Rover 1" />

        {/* ==== ROVER 2 ==== */}

        <RoverInput title="Rover 2" />

        <button className={styles.button} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default RoverCommands;
